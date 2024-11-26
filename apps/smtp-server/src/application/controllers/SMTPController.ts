import { Socket } from "net";
import { SMTPState } from "../../core/entities/SMTPState";
import { MailUseCase } from "../../core/usecases/MailUseCase";
import { MailService } from "../../infra/services/MailService";

export class SMTPController {
    private _socket: Socket
    private _state: SMTPState

    private _mailUseCase: MailUseCase;

    constructor(socket: Socket) {
        this._socket = socket;
        this._state = new SMTPState()

        this._mailUseCase = new MailService()
    }

    private resetState() {
        this._state = new SMTPState();
    }

    public helo(data: string) {
        const domain = data.split(' ')[1];

        if (!this.isValidDomain(domain)) {
            this._socket.write('501 Syntax error in parameters or arguments\r\n');
        } else {
            this._socket.write(`250-Hello ${domain}\r\n`);
            this._socket.write('250-STARTTLS\r\n');
            this._socket.write('250 OK\r\n');
        }
    }

    public mailFrom(data: string) {
        this._state.mailFrom = data.split(':')[1].trim();
        this._socket.write('250 OK\r\n');
    }

    public rcpTo(data: string) {
        this._state.recipients.push(data.split(':')[1].trim());
        this._socket.write('250 OK\r\n');
    }

    public enterDataMode() {
        if (this._state.mailFrom && this._state.recipients.length) {
            this._state.dataMode = true;
            this._socket.write('354 Start mail input; end with \r\n.\r\n');
        } else {
            this._socket.write('503 Bad sequence of commands\r\n');
        }
    }

    public exitDataMode() {
        this._state.dataMode = false;
        console.log('E-mail recebido:');
        console.log(this._state);

        this._mailUseCase.sendMail(
            this._state.mailFrom,
            this._state.recipients,
            this._state.emailData
        );

        this._socket.write('250 OK\r\n');

        this.resetState();
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

    get state() {
        return this._state;
    }

    static getInstanceOf(socket: Socket) {
        return new SMTPController(socket);
    }
}