import { ReactNode } from 'react';
export declare function buildFlatStore<Store>(initialState: Store): {
    FlatStore: ({ children }: {
        children: ReactNode;
    }) => JSX.Element;
    useFlatStore: () => Store;
    useFlatStoreKey: <Key extends keyof Store>(key: Key) => {
        name: Key;
        value: Store[Key];
        update: (v: Store[Key]) => void;
    };
};
