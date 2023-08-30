

import { Context, IAction, State, Type } from "../utils/types";

export const defaultState: State = {
    token: sessionStorage.getItem('t2_token') || '',
};

export const defaultContext: Context = {
    state: defaultState,
    dispatch: (_: IAction) => { }
}

export const defaultStateInit = (defaultState: State) => {
    return defaultState
}

export const initState = (state: State, action: IAction) => {
    const { type, payload } = action;
    switch (type) {
        case Type.SET_TOKEN:
            sessionStorage.setItem('t2_token', payload.token as string);
            return { ...state, token: payload.token }
        default:
            return state;
    }
};
