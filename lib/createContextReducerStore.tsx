import React, {
  createContext,
  Dispatch,
  Reducer,
  useContext,
  useReducer,
} from 'react'
import { Action, ContextReducerStore } from './types'

export function createContextReducerStore<State>(
  reducer: Reducer<State, Action>,
  initialState: State
): ContextReducerStore<State> {
  const Context = createContext<{
    state: State
    dispatch: Dispatch<Action>
  }>({ state: initialState, dispatch: () => undefined })

  const internalReducer: Reducer<State, Action> = (state, action) => {
    switch (action.type) {
      case '_set': {
        return action.data.state
      }
      case '_update': {
        return { ...state, [action.data.key]: action.data.value }
      }
      default: {
        return reducer(state, action)
      }
    }
  }

  const action: {
    set: (state: State) => Action
    update: <Key extends keyof State>(key: Key, value: State[Key]) => Action
  } = {
    set: (state) => ({ type: '_set', data: { state } }),
    update: (key, value) => ({ type: '_update', data: { key, value } }),
  }

  return {
    Store({ children }) {
      const [state, dispatch] = useReducer(internalReducer, initialState)

      return (
        <Context.Provider value={{ state, dispatch }}>
          {children}
        </Context.Provider>
      )
    },
    useStore() {
      const { state, dispatch } = useContext(Context)

      return {
        state,
        set: (state) => dispatch(action.set(state)),
        update: (key, value) => dispatch(action.update(key, value)),
      }
    },
    useKey(key) {
      const { state, dispatch } = useContext(Context)

      return {
        key,
        value: state[key],
        update: (value) => dispatch(action.update(key, value)),
      }
    },
    useDispatch() {
      const { dispatch } = useContext(Context)
      return dispatch
    },
  }
}
