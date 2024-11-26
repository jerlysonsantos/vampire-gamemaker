import fs from 'fs';
import path from 'path';

const options = {
    key: fs.readFileSync(path.join(__dirname, './tls/certificates/private.key')),
    cert: fs.readFileSync(path.join(__dirname, './tls/certificates/certificate.crt')),
};

export { options }
