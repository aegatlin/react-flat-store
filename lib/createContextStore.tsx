import React, { createContext, useContext, useState } from 'react'
import { ContextStore } from './types'

/**
 * createContextStore is a React Context based API.
 * @param {State} initialState - The initial state. Can also be provided via the returned `Store` component
 * @returns An object containing a Store component, a useStore hook, and a useKey hook
 */
export function createContextStore<State>(
  initialState: State
): ContextStore<State> {
  const Context = createContext<{
    state: State
    setState: (state: State) => void
  }>({
    state: initialState,
    setState: () => undefined,
  })

  return {
    Store({ state, children }) {
      const [s, setS] = useState(state || initialState)

      return (
        <Context.Provider value={{ state: s, setState: setS }}>
          {children}
        </Context.Provider>
      )
    },
    useStore() {
      const { state, setState } = useContext(Context)

      return {
        state,
        set: (state) => setState(state),
        update: (key, value) => setState({ ...state, [key]: value }),
      }
    },
    useKey(key) {
      const { state, setState } = useContext(Context)

      return {
        key,
        value: state[key],
        update: (value) => setState({ ...state, [key]: value }),
      }
    },
  }
}
