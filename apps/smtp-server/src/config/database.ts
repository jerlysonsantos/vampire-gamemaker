import { Database } from 'sqlite3';
const database = new Database(':memory:');


const aa = database.exec(`
CREATE TABLE mails (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    'from' TEXT,
    'to' TEXT,
    subject TEXT,
    data TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

insert into mails ('from', 'to', subject, data)
    values ('user@user.com', 'user2@user.com', 'Teste', 'Subject: Teste\n\nTeste');
`);


export { database }