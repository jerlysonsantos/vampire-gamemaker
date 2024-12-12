export class User {
    private _name: string;
    private _password: string;
    private _email: string;

    constructor(name: string, password: string, email: string) {
        this._name = name;
        this._password = password;
        this._email = email;
    }

    get name() {
        return this._name;
    }

    get password() {
        return this._password;
    }

    get email() {
        return this._email;
    }
}