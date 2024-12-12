import { UserRepository } from "src/core/repositories/UserRepository";
import { database } from "../../config/database";
import { User } from "../../core/entities/User";

export class UserRepositoryImpl implements UserRepository {
    findByEmail(email: string): Promise<User> {
        return new Promise((resolve, reject) => {

            database.each('SELECT * FROM users WHERE email = ?', email, (err, row: User) => {

                if (err) reject(err);

                resolve(new User(row.name, row.password, row.email))
            });

        });
    }

    findLike(attr: String): Promise<User[]> {
        return new Promise((resolve, reject) => {

            database.all('SELECT * FROM users WHERE name = ? OR email = ?;',
                [attr, attr]
                , (err, rows: User | User[]) => {

                    if (err) reject(err);

                    if (!rows) {
                        reject('550 User not found')
                    }

                    if (rows instanceof Array) {
                        resolve(rows.map(row => new User(row.name, row.password, row.email)))
                    } else {
                        resolve([new User(rows.name, rows.password, rows.email)])
                    }

                });

        });
    }
}