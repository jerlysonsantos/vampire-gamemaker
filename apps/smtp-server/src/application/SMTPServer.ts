/**
 * Me arrependo de ter feito isso usando POO no JS
 * Se um dia eu descobrir uma forma melhor, eu arrumo, até lá, é isso aí
 */
import { createServer, Socket } from "net";
import { SMTPController } from "./controllers/SMTPController";
import { SMTPSecureController } from "./controllers/SMTPSecureController";
import { ServerStateUseCase, STATES } from "../core/usecases/ServerStateUseCase";
import { ServerStateService } from "../infra/services/ServerStateService";

export class SMTPServer {
    private _host: string;
    private _port: number;

    private _smtpController: SMTPController;
    private _smtpSecureController: SMTPSecureController;

    private _serverStateUseCase: ServerStateUseCase;

    constructor(host: string, port: number) {
        this._host = host;
        this._port = port;
    }

    private _onConnection(socket: Socket) {
        console.log('New connection.');

        this._smtpController = SMTPController.getInstanceOf(socket);
        this._smtpSecureController = SMTPSecureController.getInstanceOf();
        this._serverStateUseCase = ServerStateService.getInstance();

        socket.write('220 smtp.example.com SMTP Server Ready\r\n');

        socket.on('data', (chunk: ArrayBuffer) => {
            const data = chunk.toString().trim();

            const [command, ...argsList] = data.split(' ');

            const args = argsList.join('')

            const commandUpper = command.toUpperCase();
            console.log(`C: ${data}`);
            console.log(`S: ${this._serverStateUseCase.currentState}`);

            if (this._serverStateUseCase.currentState === STATES.DATA) {
                if (data === '.') {
                    this._smtpController.exitDataMode();
                } else {
                    this._smtpController.registerData(data);
                }

                return;
            }

            if (!['EHLO', 'HELO', 'STARTTLS', 'QUIT', 'MAIL', 'RCPT', 'DATA'].some(command => commandUpper.startsWith(command))) {
                socket.write('500 Syntax error, command unrecognized\r\n');
                return;
            }

            if (commandUpper === 'QUIT') {
                this._smtpController.quit();

                return
            }


            if (this._serverStateUseCase.currentState === STATES.INIT) {
                if (commandUpper.startsWith('EHLO') || commandUpper.startsWith('HELO')) {
                    this._smtpController.helo(args);
                    return;
                }
            }

            if (this._serverStateUseCase.currentState === STATES.HELO) {
                if (commandUpper === 'STARTTLS') {
                    this._smtpSecureController._startTLS(socket);
                    return;
                }

                if (commandUpper.startsWith('MAIL') && (args && args.toUpperCase().startsWith('FROM:'))) {
                    this._smtpController.mailFrom(args);

                    return;
                }

                return
            }


            if (this._serverStateUseCase.currentState === STATES.MAIL) {
                if (commandUpper.startsWith('RCPT') && (args && args.toUpperCase().startsWith('TO:'))) {
                    this._smtpController.rcpTo(args);

                    return;
                }
            }

            if (this._serverStateUseCase.currentState === STATES.RCPT) {
                if (commandUpper.startsWith('DATA')) {
                    this._smtpController.enterDataMode();

                    return;
                }
            }


            socket.write('503 Bad sequence of commands\r\n');
        })

        socket.on('end', () => {
            console.log('Conexão encerrada.');

            this._serverStateUseCase.setSecure(false);
            this._serverStateUseCase.setCurrentState(STATES.INIT);

        })

        socket.on('error', (err) => {
            console.error(`Erro na conexão: ${err}`);

            this._serverStateUseCase.setSecure(false);
            this._serverStateUseCase.setCurrentState(STATES.INIT);
        })
    }

    private createServer() {
        return createServer(this._onConnection);
    }

    public initServer() {
        const server = this.createServer();
        server.listen(this._port, this._host, () => {
            console.log(`Servidor SMTP rodando em ${this._host}: ${this._port}`);
        });
    }

    static start(host: string, port: number) {
        const server = new SMTPServer(host, port);
        server.initServer();
    }
}