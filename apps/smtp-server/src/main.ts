import { SMTPServer } from './application/SMTPServer';

const HOST = '127.0.0.1';
const PORT = 587;

SMTPServer.start(HOST, PORT);
