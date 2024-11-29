import { SMTPServer } from './application/SMTPServer';

const HOST = '127.0.0.1';
const PORT = Number(process.argv[2]) || 2525;

SMTPServer.start(HOST, PORT);
