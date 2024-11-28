import { ServerStateUseCase, STATES } from "../../core/usecases/ServerStateUseCase";

export class ServerStateService implements ServerStateUseCase {
    static _instance: ServerStateService;

    private _currentState: STATES;
    private _secure: boolean;

    constructor() {
        this._currentState = STATES.INIT;
        this._secure = false;
    }

    public setCurrentState(state: STATES): void {
        this._currentState = state;
    }

    public setSecure(secure: boolean): void {
        this._secure = secure;
    }

    get currentState(): STATES {
        return this._currentState;
    }

    get secure(): boolean {
        return this._secure;
    }

    static getInstance(): ServerStateService {
        if (!ServerStateService._instance) {
            ServerStateService._instance = new ServerStateService();
        }

        return ServerStateService._instance;
    }
}