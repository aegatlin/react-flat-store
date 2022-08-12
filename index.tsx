import React, { createContext, ReactNode, useContext, useState } from 'react'

export function buildFlatStore<Store>(initialState: Store) {
  const Context = createContext<{ state: Store; setState: (s: Store) => void }>(
    {
      state: initialState,
      setState: (s: Store) => {},
    }
  )

  function Store({ children }: { children: ReactNode }) {
    const [state, setState] = useState<Store>(initialState)
    return (
      <Context.Provider value={{ state, setState }}>
        {children}
      </Context.Provider>
    )
  }

  function useStore(): Store {
    const { state } = useContext(Context)
    return state
  }

  function useKey<Key extends keyof Store>(
    key: Key
  ): { key: Key; value: Store[Key]; update: (v: Store[Key]) => void } {
    const { state, setState } = useContext(Context)

    return {
      key,
      value: state[key],
      update: (value) => setState({ ...state, [key]: value }),
    }
  }

  return { Store, useStore, useKey }
}
