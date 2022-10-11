import { FunctionComponent, ReactNode } from 'react';
interface Store<State> {
    state: State;
    set: (state: Partial<State>) => void;
    update: <Key extends keyof State>(key: Key, value: State[Key]) => void;
}
/**
 * `useStore` is a React hook.
 * @param {State} initialState - The initial state.
 * @returns `state`, the current state; `set`, a function that overwrites the
 * state; `update`, a function that updates a specific key.
 */
export declare function useStore<State>(initialState: State): Store<State>;
interface CreateContextStoreReturn<State> {
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
/**
 * createContextStore is a React Context based API.
 * @param {State} initialState - The initial state. Can also be provided via the returned `Store` component
 * @returns An object containing a Store component, a useStore hook, and a useKey hook
 */
export declare function createContextStore<State>(initialState: State): CreateContextStoreReturn<State>;
export {};
