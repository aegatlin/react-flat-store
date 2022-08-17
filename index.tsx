import React, {
  createContext,
  Dispatch,
  FunctionComponent,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'

export function createFlatStore<State>(init: State): {
  Store: FunctionComponent<{ state?: State; children: ReactNode }>
  useStore: () => State
  useKey: <Key extends keyof State>(
    key: Key
  ) => { key: Key; value: State[Key]; update: (v: State[Key]) => void }
} {
  const Context = createContext<{
    state: State
    setState: Dispatch<SetStateAction<State>>
  }>({
    state: init,
    setState: () => {},
  })

  return {
    Store({ children, state }) {
      const [_state, _setState] = useState(state || init)

      return (
        <Context.Provider value={{ state: _state, setState: _setState }}>
          {children}
        </Context.Provider>
      )
    },
    useStore() {
      const { state } = useContext(Context)
      return state
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
