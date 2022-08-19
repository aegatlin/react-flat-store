import React, { useState } from 'react'
import { createFlatStore } from '../..'

{
  const { Store, useStore, useKey } = createFlatStore({
    a: 1,
    b: '2',
    c: { three: 3 },
  })

  {
    function Parent() {
      return <Store>...</Store>
    }
  }

  {
    function ParentV2() {
      const [state, setState] = useState({ a: 1, b: '2', c: { three: 3 } })

      // async state updates can occur here...

      return <Store state={state}>...</Store>
    }
  }

  function Child() {
    const { a, b, c } = useStore()

    // ...
  }
}

{
  const { Store, useStore, useKey } = createFlatStore({ someKey: '' })

  function Child() {
    const { key, value, update } = useKey('someKey')

    const onClick = () => update('new value')

    // ...
  }
}
