import { ReactNode } from 'react';
export declare function buildFlatStore<Store>(initialState: Store): {
    Store: ({ children }: {
        children: ReactNode;
    }) => JSX.Element;
    useStore: () => Store;
    useKey: <Key extends keyof Store>(key: Key) => {
        key: Key;
        value: Store[Key];
        update: (v: Store[Key]) => void;
    };
};
