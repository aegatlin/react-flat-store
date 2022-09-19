# React Flat Store

React Flat Store is a strongly-typed state management utility ideally suited for "flat" data. There is a simple `useStore` API for component state management, and a `createContextStore` API for multi-component state management using React Contexts.

```sh
npm install react-flat-store
```

```js
// Simple use case
import { useStore } from 'react-flat-store'

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
```

```js
// Context-based use case
import { createContextStore } from 'react-flat-store'

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
```

## Tutorials

- [Create a simple sign in form in a single component using `useStore`](./tests/tutorials/singInFormSingleComponent.tsx)
- [Create a simple sign in form across multiple component using `useContextStore`](./tests/tutorials/signInFormMutipleComponents.tsx)
- [Create a theme manager](./tests/tutorials/theme.tsx)

## How To

- [Create bespoke hooks](./tests/howTo/bespokeHooks.tsx)
- [Create generic hooks](./tests/howTo/genericHooks.tsx)
- [Work with types and nested data](./tests/howTo/nestedData.tsx)

## Reference

### useStore

- Input: initial state
- Output: An object containing `state`, `set`, and `update`

```js
function Component() {
  const { state, set, update } = useStore({ a: 1, b: '2' })
}
```

`state` is the current state.

`set` is a function that overwrites the entire state: `set(newState)`

`update` is a function that updates a particular key: `update(key, newValue)`

### createContextStore

- Input: initial state
- Output: An object containing `Store`, `useStore`, and `useKey`

```ts
const { Store, useStore, useKey } = createContextStore({
  a: 1,
  b: '2',
  c: { three: 3 },
})
```

#### Store

`Store` is a React component that provides state context. There are no required props and one optional prop, `state`. It is recommended to supply the state when you call `createContextStore`, but you might not know the initial values until a runtime fetch, in which case you can provide the `state` inline.

```tsx
function Parent({ children }) {
  return <Store>{children}</Store>
}
```

```tsx
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
```

#### useStore

`useStore` is a React hook that behaves identically to the context-less `useStore` API listed above. It returns `state`, `set`, and `update`. There are no inputs.

#### useKey

- Input: `key: string`. The key name.
- Outputs:
  - `key: string`: The key name.
  - `value: State[Key]`: The key's value. Strongly typed.
  - `update: (key: string, newValue: State[Key]) => void`: An update function which updates the key's value to a new value. Strongly typed. No output.

```tsx
const { Store, useStore, useKey } = createContextStore({ a: 1 })

function Child() {
  const { key, value, update } = useKey('a')

  console.log(key, value) // initially => 'a', 1

  update(2) // eventually => 'a', 2
}
```
