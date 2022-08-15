import { FunctionComponent, ReactNode } from 'react';
export declare function buildFlatStore<State>(init: State): {
    Store: FunctionComponent<{
        state?: State;
        children: ReactNode;
    }>;
    useStore: () => State;
    useKey: <Key extends keyof State>(key: Key) => {
        key: Key;
        value: State[Key];
        update: (v: State[Key]) => void;
    };
};
