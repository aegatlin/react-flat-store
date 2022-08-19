import React from 'react'
import { createFlatStore } from '../..'

const { Store, useStore, useKey } = createFlatStore({ counter: 0 })

function CounterApp() {
  return <Store>...</Store>
}

function Counter() {
  const { key, value, update } = useKey('counter') // type-safe input
  const increment = () => update(value + 1)
  // ...
}

function Submit() {
  const { counter } = useStore()
  // ...
}
