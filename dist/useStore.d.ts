import { Store } from './types';
/**
 * `useStore` is a React hook.
 * @param {State} initialState - The initial state.
 * @returns `state`, the current state; `set`, a function that overwrites the
 * state; `update`, a function that updates a specific key.
 */
export declare function useStore<State>(initialState: State): Store<State>;
