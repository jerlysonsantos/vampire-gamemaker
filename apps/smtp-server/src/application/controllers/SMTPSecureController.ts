import { Socket } from "net";
import { SMTPController } from "./SMTPController";
import { createSecureContext, TLSSocket } from "tls";
import { options } from "../../config/tls";
import { ServerStateUseCase, STATES } from "../../core/usecases/ServerStateUseCase";
import { ServerStateService } from "../../infra/services/ServerStateService";

export class SMTPSecureController {

    private static _instance: SMTPSecureController;

    private _smtpController: SMTPController;
    private _serverStateUseCase: ServerStateUseCase;

    public _startTLS(socket: Socket) {
        try {
            console.log('Iniciando TLS...');
            socket.write('220 Ready to start TLS\r\n');

            const secureContext = createSecureContext(options);

            const secureSocket = new TLSSocket(socket, { isServer: true, requestCert: false, secureContext });

            this._smtpController = new SMTPController(secureSocket);
            this._serverStateUseCase = ServerStateService.getInstance();

            secureSocket.on('data', (chunk: ArrayBuffer) => {
                this._onConnectionSecure(chunk, secureSocket);

                this._serverStateUseCase.setSecure(true);
            });

            secureSocket.on('end', () => {
                console.log('Conexão encerrada.');
                this._serverStateUseCase.setSecure(false);
                this._serverStateUseCase.setCurrentState(STATES.INIT);
            })

            secureSocket.on('error', (err) => {
                console.error(`Erro na conexão: ${err}`);

                this._serverStateUseCase.setSecure(false);
                this._serverStateUseCase.setCurrentState(STATES.INIT);
            })


            socket.removeAllListeners();
        } catch (error) {
            console.error(`Erro ao iniciar TLS: ${error}`);
            socket.write('454 TLS not available due to temporary reason\r\n');
        }
    }

    private _onConnectionSecure(chunk: ArrayBuffer, socket: TLSSocket) {

        const data = chunk.toString().trim();

        console.log(`C: ${data}`);

        const [command, ...args] = data.split(' ');

        const commandUpper = command.toUpperCase();

        if (this._serverStateUseCase.currentState === STATES.DATA) {
            if (data === '.') {
                this._smtpController.exitDataMode();
            } else {
                this._smtpController.registerData(data);
            }

            return;
        }

        if (!['MAIL', 'RCPT', 'DATA', 'QUIT', 'VRFY'].some(command => commandUpper.startsWith(command))) {
            socket.write('500 Syntax error, command unrecognized\r\n');
            return;
        }

        if (this._serverStateUseCase.currentState === STATES.HELO) {
            if (commandUpper.startsWith('MAIL') && (args[0] && args[0].toUpperCase().startsWith('FROM:'))) {
                this._smtpController.mailFrom(args[0]);

                return;
            }


            if (commandUpper.startsWith('VRFY')) {
                this._smtpController.verify(data);

                return;
            }

            if (commandUpper === 'QUIT') {
                this._smtpController.quit();

                return;
            }
        }

        if (this._serverStateUseCase.currentState === STATES.MAIL) {
            if (commandUpper.startsWith('RCPT') && (args[0] && args[0].toUpperCase().startsWith('TO:'))) {
                this._smtpController.rcpTo(args[0]);

                return;
            }
        }

        if (this._serverStateUseCase.currentState === STATES.RCPT) {
            if (commandUpper === 'DATA') {
                this._smtpController.enterDataMode();

                return;
            }
        }

        socket.write('503 Bad sequence of commands\r\n');
    }

    static getInstanceOf() {
        if (this._instance) {
            return this._instance;
        }

        this._instance = new SMTPSecureController();
        return this._instance;
    }
}