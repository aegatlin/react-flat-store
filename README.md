# React Flat Store

React Flat Store is a strongly-typed state management utility ideally suited for simple state management needs.

Call `buildFlatStore` with initial state. Receive `Store`, a React component that stores the state, `useStore`, a React hook that returns the state, and `useKey`, a React hook that returns `key`, `value`, and `update` for a specific key. That's it!

## Table of Contents

- Tutorials: A walkthrough of how to use React Flat Store
- How To: Simple demos of how to accomplish particular tasks
- Reference: Detailed explanation of the API

## Tutorials

- [Create a simple sign in form](/tests/tutorials/signInForm.tsx)
- [Create a theme manager](/tests/tutorials/theme.tsx)

## How To

- [Create bespoke hooks](/tests/howTo/bespokeHooks.tsx)
- [Create generic hooks](/tests/howTo/genericHooks.tsx)

## Reference

All the code is in a single, small, [index](/index.tsx) file. It can be a helpful reference in addition to the information below.

### buildFlatStore

`buildFlatStore` creates a React context from the input default state. That context is then leveraged internally by the returned component and hooks.

- Input: Default state
- Output: An object containing `Store`, `useStore`, and `useKey`

```ts
const { Store, useStore, useKey } = buildFlatStore({
  a: 1,
  b: '2',
  c: { three: 3 },
})
```

### Store

`Store` is a React component that stores the state. There are no required props.

```tsx
function Parent() {
  return <Store>...</Store>
}
```

If the default state from `buildFlatStore` is insufficient, you can use the optional `state` key to set the state reactively. It has to be the same type as the default state.

```tsx
function Parent() {
  const [state, setState] = useState({ a: 2, b: '3', c: { four: 4 } })

  /*

  State can be retrieved here, asynchronously, via useEffect, etc.

  useEffect(() => {
    async function getData() {
      ...
      setState({...})
    }

    getData()
  }, [])

  */

  return <Store state={state}>...</Store>
}
```

### useStore

`useStore` is a React hook that returns the current state. There are no inputs.

```tsx
function Child() {
  const { a, b, c } = useStore()

  // ...
}
```

### useKey

`useKey` is a React hook that returns `key`, `value`, and an `update` function for a specific key. The only input is a strongly typed `key` value.

- Input: The key name. Strongly typed. Typos or non-existent field names will result in type errors.
- Outputs:
  - `key`: The key name.
  - `value`: The key's value. Strongly typed.
  - `update`: An update function which updates the key's value to a new value. Strongly typed. No output.

```tsx
function Child() {
  const { key, value, update } = useKey('child')
  update('new string') // value => 'new string'
  update(4) // type error!

  // ...
}
```
