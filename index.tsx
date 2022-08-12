import React, { createContext, ReactNode, useContext, useState } from 'react'

export function buildFlatStore<Store>(initialState: Store) {
  const Context = createContext<{ state: Store; setState: (s: Store) => void }>(
    {
      state: initialState,
      setState: (s: Store) => {},
    }
  )

  function FlatStore({ children }: { children: ReactNode }) {
    const [state, setState] = useState<Store>(initialState)
    return (
      <Context.Provider value={{ state, setState }}>
        {children}
      </Context.Provider>
    )
  }

  function useFlatStore(): Store {
    const { state } = useContext(Context)
    return state
  }

  function useFlatStoreKey<Key extends keyof Store>(
    key: Key
  ): { name: Key; value: Store[Key]; update: (v: Store[Key]) => void } {
    const { state, setState } = useContext(Context)

    return {
      name: key,
      value: state[key],
      update: (value) => setState({ ...state, [key]: value }),
    }
  }

  return {
    FlatStore,
    useFlatStore,
    useFlatStoreKey,
  }
}
