export enum STATES {
    INIT = 'INIT',
    HELO = 'HELO',
    MAIL = 'MAIL',
    RCPT = 'RCPT',
    DATA = 'DATA',
    END = 'END',
};


export interface ServerStateUseCase {
    currentState: STATES;
    secure: boolean;

    setCurrentState(state: STATES): void;
    setSecure(secure: boolean): void;
}