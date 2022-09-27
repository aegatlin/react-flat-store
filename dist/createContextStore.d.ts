import { ContextStore } from './types';
/**
 * createContextStore is a React Context based API.
 * @param {State} initialState - The initial state. Can also be provided via the returned `Store` component
 * @returns An object containing a Store component, a useStore hook, and a useKey hook
 */
export declare function createContextStore<State>(initialState: State): ContextStore<State>;
