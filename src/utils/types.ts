export interface State {
    token?: string
}

export enum Type {
    SET_TOKEN = 'set_token',
};

export interface IAction {
    type: string,
    payload: State
}

export interface Context {
    state: State,
    dispatch: (action: IAction) => void
}

export interface IResponse {
    code: number,
    data: any,
    message: string
}