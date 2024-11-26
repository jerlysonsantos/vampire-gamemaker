export class SMTPState {
    private _mailFrom: string | null;
    private _recipients: string[];
    private _dataMode: boolean;
    private _emailData: string;

    constructor() {
        this.mailFrom = null;
        this.recipients = [];
        this.dataMode = false;
        this.emailData = '';
    }

    set mailFrom(value: string | null) {
        this._mailFrom = value;
    }

    get mailFrom(): string | null {
        return this._mailFrom;
    }

    set recipients(value: string[]) {
        this._recipients = value;
    }

    get recipients(): string[] {
        return this._recipients;
    }

    set dataMode(value: boolean) {
        this._dataMode = value;
    }

    get dataMode(): boolean {
        return this._dataMode;
    }

    set emailData(value: string) {
        this._emailData = value;
    }

    get emailData(): string {
        return this._emailData;
    }
}