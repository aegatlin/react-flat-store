import { useState } from 'react'
import { Store } from './types'

/**
 * `useStore` is a React hook.
 * @param {State} initialState - The initial state.
 * @returns `state`, the current state; `set`, a function that overwrites the
 * state; `update`, a function that updates a specific key.
 */
export function useStore<State>(initialState: State): Store<State> {
  const [state, setState] = useState(initialState)

  return {
    state,
    set: (state) => setState(state),
    update: (key, value) => setState({ ...state, [key]: value }),
  }
}
