import { createConnection, Socket } from "net";
import { SMTPState } from "../../core/entities/SMTPState";
import { MailUseCase } from "../../core/usecases/MailUseCase";
import { MailService } from "../../infra/services/MailService";
import { ServerStateUseCase, STATES } from "../../core/usecases/ServerStateUseCase";
import { ServerStateService } from "../../infra/services/ServerStateService";
import { rules } from "../../config/rules";

export class SMTPController {
    private _socket: Socket
    private _state: SMTPState

    private _mailUseCase: MailUseCase;
    private _serverStateUseCase: ServerStateUseCase;

    constructor(socket: Socket) {
        this._socket = socket;
        this._state = new SMTPState()

        this._mailUseCase = new MailService()
        this._serverStateUseCase = ServerStateService.getInstance();
    }

    private resetState() {
        this._state = new SMTPState();
    }

    public helo(domain: string) {
        if (!this.isValidDomain(domain)) {
            this._socket.write('501 Syntax error in parameters or arguments\r\n');
        } else {
            this._socket.write(`250-Hello ${domain}\r\n`);
            this._socket.write('250-STARTTLS\r\n');
            this._socket.write('250 OK\r\n');

            this._serverStateUseCase.setCurrentState(STATES.HELO);
        }
    }

    public mailFrom(email: string) {
        this._state.mailFrom = email.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi)[0];
        this._socket.write('250 OK\r\n');

        this._serverStateUseCase.setCurrentState(STATES.MAIL);
    }

    public rcpTo(rawEmails: string) {
        const emails = rawEmails.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi)

        this._state.recipients = emails;
        this._socket.write('250 OK\r\n');

        this._serverStateUseCase.setCurrentState(STATES.RCPT);
    }

    public enterDataMode() {
        if (this._state.mailFrom && this._state.recipients.length) {
            this._state.dataMode = true;
            this._socket.write('354 Start mail input; end with \r\n.\r\n');

            this._serverStateUseCase.setCurrentState(STATES.DATA);
        } else {
            this._socket.write('503 Bad sequence of commands\r\n');
        }
    }

    public exitDataMode() {
        this._state.dataMode = false;
        console.log('E-mail recebido:');

        this.sendMail(
            this._state.mailFrom,
            this._state.recipients,
            this._state.emailData
        )

        this._socket.write('250 OK\r\n');

        this.resetState();
        this._serverStateUseCase.setCurrentState(STATES.HELO);
    }

    public registerData(data: string) {
        this._state.emailData += data + '\n';
    }

    public async verify(data: string) {
        try {
            const userMail = data.split(' ')[1];

            const mail = await this._mailUseCase.listMailsFrom(userMail);

            this._socket.write(`250 ${mail.from}\r\n`);
        } catch (error) {
            this._socket.write(`${error.message}\r\n`);
        }
    }

    public quit() {
        this._socket.write('221 Bye\r\n');
        this._socket.end();
    }

    private isValidDomain(domain: string) {
        const domainRegex = /^[a-zA-Z0-9-]{1,63}(\.[a-zA-Z]{2,})+$/;
        const ipRegex = /^\[(\d{1,3}\.){3}\d{1,3}\]$/;
        return domainRegex.test(domain) || ipRegex.test(domain);
    }

    private async sendMail(mailFrom: string, recipients: string[], data: string) {
        for (const recipient of recipients) {
            const host = recipient.split("@")[1]

            if (rules.domains.some(domain => domain === host)) {
                this.sendEmailInMailBox(mailFrom, recipients, data)
            } else {
                await this.forwardEmail(mailFrom, recipient, data);
            }

        }
    }

    private sendEmailInMailBox(mailFrom: string, recipients: string[], data: string) {
        console.log("Email salvo na mail box")
        console.log(this._state);

        this._mailUseCase.sendMail(
            mailFrom,
            recipients,
            data
        );
    }

    private forwardEmail(mailFrom: string, recipient: string, data: string): Promise<void> {
        console.log("Encaminhando e-mail")

        return new Promise((resolve, reject) => {
            const client = createConnection({ host: recipient.split("@")[1], port: 25 }, () => {
                console.log('Connected to target SMTP server');
            });

            client.setEncoding('utf8');

            let responseBuffer = '';
            let step = 0;

            client.on('data', (chunk) => {
                responseBuffer += chunk;

                if (responseBuffer.includes('\r\n')) {
                    const lines = responseBuffer.split('\r\n');
                    responseBuffer = '';

                    for (const line of lines) {
                        console.log('SMTP Server:', line);
                        if (step === 0 && line.startsWith('220')) {
                            client.write(`EHLO localhost\r\n`);
                            step++;
                        } else if (step === 1 && line.startsWith('250')) {
                            client.write(`MAIL FROM:<${mailFrom}>\r\n`);
                            step++;
                        } else if (step === 2 && line.startsWith('250')) {
                            client.write(`RCPT TO:<${recipient}>\r\n`);
                            step++;
                        } else if (step === 3 && line.startsWith('250')) {
                            client.write(`DATA\r\n`);
                            step++;
                        } else if (step === 4 && line.startsWith('354')) {
                            client.write(data + '\r\n.\r\n');
                            step++;
                        } else if (step === 5 && line.startsWith('250')) {
                            client.end();
                            resolve();
                        } else if (line.startsWith('550') || line.startsWith('500')) {
                            client.end();
                            reject(new Error(`SMTP Error: ${line}`));
                        }
                    }
                }
            });

            client.on('error', (err) => {
                console.error('Error with target SMTP server:', err);
                reject(err);
            });

            client.on('end', () => {
                console.log('Disconnected from target SMTP server');
            });
        });
    }
    get state() {
        return this._state;
    }

    static getInstanceOf(socket: Socket) {
        return new SMTPController(socket);
    }
}