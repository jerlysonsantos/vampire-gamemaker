import { Socket } from "net";
import { SMTPController } from "./SMTPController";
import { createSecureContext, TLSSocket } from "tls";
import { options } from "../../config/tls";

const STATES = {
    INIT: 'INIT',
    HELO: 'HELO',
    MAIL: 'MAIL',
    RCPT: 'RCPT',
    DATA: 'DATA',
    END: 'END',
};


export class SMTPSecureController {

    private static _instance: SMTPSecureController;

    private _smtpController: SMTPController;

    public _startTLS(socket: Socket) {
        try {
            console.log('Iniciando TLS...');
            socket.write('220 Ready to start TLS\r\n');

            const secureSocket = new TLSSocket(socket, { secureContext: createSecureContext(options) });
            // this._smtpController = new SMTPController(secureSocket);

            secureSocket.on('data', (chunk: ArrayBuffer) => {
                console.log('Conexão segura.', chunk.toString());
            });

            secureSocket.on('end', () => {
                console.log('Conexão encerrada.');
            })

            secureSocket.on('error', (err) => {
                console.error(`Erro na conexão: ${err}`);
            })

            socket.removeAllListeners();
        } catch (error) {
            console.error(`Erro ao iniciar TLS: ${error}`);
            socket.write('454 TLS not available due to temporary reason\r\n');
        }
    }

    private _onConnectionSecure(chunk: ArrayBuffer, socket: TLSSocket) {
        const state = this._smtpController.state;

        const data = chunk.toString().trim();
        console.log(`C: ${data}`);

        if (state.dataMode) {
            if (data === '.') {
                this._smtpController.exitDataMode();
            } else {
                this._smtpController.registerData(data);
            }

            return;
        }

        if (!['MAIL FROM:', 'RCPT TO:', 'DATA', 'QUIT', 'VRFY'].some(command => data.toUpperCase().startsWith(command))) {
            socket.write('500 Syntax error, command unrecognized\r\n');
            return;
        }

        if (data.startsWith('MAIL FROM:')) {
            this._smtpController.mailFrom(data);
        }

        if (data.startsWith('RCPT TO:')) {
            this._smtpController.rcpTo(data);
        }

        if (data.startsWith('VRFY')) {
            this._smtpController.verify(data);
        }

        if (data === 'DATA') {
            this._smtpController.enterDataMode();
        }

        if (data === 'QUIT') {
            this._smtpController.quit();
        }

        socket.on('end', () => {
            console.log('Conexão encerrada.');
        })

        socket.on('error', (err) => {
            console.error(`Erro na conexão: ${err}`);
        })
    }

    static getInstanceOf() {
        if (this._instance) {
            return this._instance;
        }

        this._instance = new SMTPSecureController();
        return this._instance;
    }
}