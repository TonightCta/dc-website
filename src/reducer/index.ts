

import { Context, IAction, State, Type } from "../utils/types";

export const defaultState: State = {
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
        default:
            return state;
    }
};
