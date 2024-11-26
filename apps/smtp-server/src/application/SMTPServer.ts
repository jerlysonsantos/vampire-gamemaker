import { createServer, Socket } from "net";
import { SMTPController } from "./controllers/SMTPController";
import { createSecureContext, TLSSocket } from "tls";
import { options } from "../config/tls";
import { SMTPSecureController } from "./controllers/SMTPSecureController";

const STATES = {
    INIT: 'INIT',
    HELO: 'HELO',
    MAIL: 'MAIL',
    RCPT: 'RCPT',
    DATA: 'DATA',
    END: 'END',
};


export class SMTPServer {
    private _host: string;
    private _port: number;

    private _currentState: typeof STATES;
    private _secure: boolean = false;

    private _smtpController: SMTPController;
    private _smtpSecureController: SMTPSecureController;

    constructor(host: string, port: number) {
        this._host = host;
        this._port = port;
    }

    private _onConnection(socket: Socket) {
        console.log('New connection.');

        this._smtpController = SMTPController.getInstanceOf(socket);
        this._smtpSecureController = SMTPSecureController.getInstanceOf();

        socket.write('220 smtp.example.com SMTP Server Ready\r\n');

        socket.on('data', (chunk: ArrayBuffer) => {
            const data = chunk.toString().trim();
            console.log(`C: ${data}`);

            if (!['EHLO', 'HELO', 'STARTTLS'].some(command => data.toUpperCase().startsWith(command))) {
                socket.write('500 Syntax error, command unrecognized\r\n');
                return;
            }

            if (!this._secure) {
                if (data.startsWith('EHLO') || data.startsWith('HELO')) {
                    this._smtpController.helo(data);
                }

                if (data === 'STARTTLS') {
                    this._smtpSecureController._startTLS(socket);
                }
            }
        })

        socket.on('end', () => {
            console.log('Conexão encerrada.');
        })

        socket.on('error', (err) => {
            console.error(`Erro na conexão: ${err}`);
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