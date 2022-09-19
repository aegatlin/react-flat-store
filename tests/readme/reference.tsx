import React, { useEffect, useState } from 'react'
import { createContextStore, useStore } from '../..'

{
  function Component() {
    const { state, set, update } = useStore({ a: 1, b: '2' })
  }
}

{
  const { Store, useStore, useKey } = createContextStore({
    a: 1,
    b: '2',
    c: { three: 3 },
  })

  {
    function Parent({ children }) {
      return <Store>{children}</Store>
    }
  }

  {
    function Parent({ children }) {
      const [payload, setPayload] = useState({ a: 0, b: '', c: { three: 0 } })

      useEffect(() => {
        const getData = async () => {
          const newPayload = await Promise.resolve({
            a: 1,
            b: '2',
            c: { three: 3 },
          })
          setPayload(newPayload)
        }

        getData()
      }, [])

      return <Store state={payload}>{children}</Store>
    }
  }

  {
    const { Store, useStore, useKey } = createContextStore({ a: 1 })

    function Child() {
      const { key, value, update } = useKey('a')

      console.log(key, value) // initially => 'a', 1

      update(2) // eventually => 'a', 2
    }
  }
}
