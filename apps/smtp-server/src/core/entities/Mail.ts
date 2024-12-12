export class Mail {
    private _from: string;
    private _to: string;
    private _subject: string;
    private _data: string;

    constructor(from: string, to: string, subject: string, data: string) {
        this._from = from;
        this._to = to;
        this._subject = subject
        this._data = data;
    }

    get mailFrom() {
        return this._from;
    }

    get mailTo() {
        return this._to;
    }

    get data() {
        return this._data;
    }

    get subject() {
        return this._subject;
    }
}