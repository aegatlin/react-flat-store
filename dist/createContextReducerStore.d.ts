import { Reducer } from 'react';
import { Action, ContextReducerStore } from './types';
export declare function createContextReducerStore<State>(reducer: Reducer<State, Action>, initialState: State): ContextReducerStore<State>;
