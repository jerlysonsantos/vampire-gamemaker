import { database } from "../../config/database";
import { Mail } from "../../core/entities/Mail";
import { MailRepository } from "src/core/repositories/MailRepository";

export class MailRepositoryImpl implements MailRepository {
    save(mail: Mail): void {
        const insert = database.prepare('INSERT INTO mails (\'from\', \'to\', subject, data) VALUES (?, ?, ?, ?)')

        insert.run(mail.from, mail.to, mail.subject, mail.data)

        insert.finalize()

        return;
    }

    findByTo(to: string): Mail[] {
        const mails: Mail[] = []

        database.each('SELECT * FROM mails WHERE \'to\' = ?', to, (err, row: Mail) => {
            mails.push(new Mail(row.from, row.to, row.subject, row.data))
        });

        return mails
    }

    findByFrom(from: string): Promise<Mail[]> {
        return new Promise((resolve, reject) => {
            const mails: Mail[] = []

            const stmt = database.prepare('SELECT * FROM mails WHERE \'from\' = ?;')

            stmt.run(from);

            stmt.all((err, rows: Mail[]) => {
                if (err) {
                    reject(err)
                }

                for (const row of rows) {
                    mails.push(new Mail(row.from, row.to, row.subject, row.data))
                }

                console.log(rows)

                stmt.finalize()
                resolve(mails)
            })
        });
    }
}