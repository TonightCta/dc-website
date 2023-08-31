

import { Context, IAction, State, Type } from "../utils/types";

export const defaultState: State = {
    token: sessionStorage.getItem('token') || '',
    address:sessionStorage.getItem('address') || ''
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
            sessionStorage.setItem('token', payload.token as string);
            return { ...state, token: payload.token }
        case Type.SET_ADDRESS:
            sessionStorage.setItem('address',payload.address as string);
            return { ...state,address:payload.address }
        default:
            return state;
    }
};
