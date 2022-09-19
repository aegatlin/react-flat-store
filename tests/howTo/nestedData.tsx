/*

Nested data is strongly typed. Default values like `{ a: [] }` will prevent
TypeScript's type-inference capabilities from working properly. In such
scenarios, you should provide a type to `createContextStore`.

Note: Updating deeply nested data will be difficult in this library because it is
optimized for flat storage needs. (Introducing functionality that would
facilitate deep updates would increase the complexity of the library, which is
an anti-goal.)

*/

import React from 'react'
import { createContextStore } from '../..'

interface Nested {
  a: {
    b: {
      c: number
      d: string[]
    }
  }
}

const { Store, useKey } = createContextStore<Nested>({
  a: { b: { c: 0, d: [] } },
})

function App() {
  return (
    <Store>
      <A />
    </Store>
  )
}

function A() {
  const { value, update } = useKey('a')

  const addNewContent = () => {
    const newValue = {
      ...value,
      b: { c: value.b.c, d: [...value.b.d, 'newContent'] },
    }
    update(newValue)

    // The following update attempts result in type errors:
    // update({ e: 4 }) // type error: e not assignable to provided object type.
    // update({ ...value, b: { c: '1' } }) // type error: 'string' not assignable to 'number'
    // update({ ...value, b: { c: 1 } }) // type error: property 'd' is missing
  }

  return (
    <div>
      <button onClick={addNewContent}>Add Content</button>
    </div>
  )
}
