import { Dispatch, FunctionComponent, ReactNode } from 'react';
export interface Store<State> {
    state: State;
    set: (state: State) => void;
    update: <Key extends keyof State>(key: Key, value: State[Key]) => void;
}
export interface ContextStore<State> {
    Store: FunctionComponent<{
        state?: State;
        children: ReactNode;
    }>;
    useStore: () => Store<State>;
    useKey: <Key extends keyof State>(key: Key) => {
        key: Key;
        value: State[Key];
        update: (value: State[Key]) => void;
    };
}
export declare type Action = {
    type: string;
    [key: string]: any;
};
export interface ContextReducerStore<State> extends ContextStore<State> {
    useDispatch: () => Dispatch<Action>;
}
