import { database } from "../../config/database";
import { Mail } from "../../core/entities/Mail";
import { MailRepository } from "../../core/repositories/MailRepository";

export class MailRepositoryImpl implements MailRepository {
    save(mail: Mail): Promise<void> {
        return new Promise((resolve, reject) => {
            const insert = database.prepare('INSERT INTO mails (mailFrom, mailTo, subject, data) VALUES (?, ?, ?, ?)')

            insert.run(mail.mailFrom, mail.mailTo, mail.subject, mail.data)

            insert.finalize((err) => {

                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })

        })
    }

    findByTo(to: string): Mail[] {
        const mails: Mail[] = []

        database.each('SELECT * FROM mails WHERE mailTo = ?', to, (err, row: Mail) => {
            mails.push(new Mail(row.mailFrom, row.mailTo, row.subject, row.data))
        });

        return mails
    }

    findByFrom(from: string): Promise<Mail[]> {
        return new Promise((resolve, reject) => {
            const mails: Mail[] = []

            const stmt = database.prepare('SELECT * FROM mails WHERE mailFrom = ?;')

            stmt.run(from);

            stmt.all((err, rows: Mail[]) => {
                if (err) {
                    reject(err)
                }

                for (const row of rows) {
                    mails.push(new Mail(row.mailFrom, row.mailTo, row.subject, row.data))
                }

                console.log(rows)

                stmt.finalize()
                resolve(mails)
            })
        });
    }
}