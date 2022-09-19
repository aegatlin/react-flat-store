import React from 'react'
import { createContextStore, useStore } from '../..'

{
  function SimpleCounter() {
    const {
      state: { counter },
      update,
    } = useStore({ counter: 0 })

    const inc = () => update('counter', counter + 1)
    const dec = () => update('counter', counter - 1)

    return (
      <div>
        <button onClick={inc}>Increment</button>
        <button onClick={dec}>Decrement</button>
        <span>{counter}</span>
      </div>
    )
  }
}

{
  const { Store, useStore, useKey } = createContextStore({ counter: 0 })
  const useCounter = () => useKey('counter')

  function ContextCounter() {
    return (
      <Store>
        <div>
          <Increment />
          <Decrement />
          <Counter />
        </div>
        <Submit />
      </Store>
    )
  }

  function Increment() {
    const { value, update } = useCounter()
    return <button onClick={() => update(value + 1)}>Increment</button>
  }

  function Decrement() {
    const { value, update } = useCounter()
    return <button onClick={() => update(value - 1)}>Decrement</button>
  }

  function Counter() {
    const { value } = useCounter()
    return <span>{value}</span>
  }

  function Submit() {
    const { state } = useStore()
    const submit = () => console.log(state)
    return <button onClick={submit}>Submit</button>
  }
}
