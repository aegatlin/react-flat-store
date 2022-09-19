import React, {
  createContext,
  Dispatch,
  FunctionComponent,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'

interface Store<State> {
  state: State
  set: (state: State) => void
  update: <Key extends keyof State>(key: Key, value: State[Key]) => void
}

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

interface CreateContextStoreReturn<State> {
  Store: FunctionComponent<{ state?: State; children: ReactNode }>
  useStore: () => Store<State>
  useKey: <Key extends keyof State>(
    key: Key
  ) => {
    key: Key
    value: State[Key]
    update: (value: State[Key]) => void
  }
}

/**
 * createContextStore is a React Context based API.
 * @param {State} initialState - The initial state. Can also be provided via the returned `Store` component
 * @returns An object containing a Store component, a useStore hook, and a useKey hook
 */
export function createContextStore<State>(
  initialState: State
): CreateContextStoreReturn<State> {
  type ContextType = { state: State; setState: Dispatch<SetStateAction<State>> }

  const Context = createContext<ContextType>({
    state: initialState,
    setState: () => {},
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
