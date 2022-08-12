# React Flat Store

React Flat Store is a strongly typed flat storage solution in React.

Call `buildFlatStore` with initial state. Receive `Store`, a React component that stores the state, `useStore`, a React hook that returns the state, and `useKey`, a React hook that returns `key`, `value`, and `update` for a specific key. That's it!

## Table of Contents

- Tutorial: A walkthrough of how to use React Flat Store
- Reference: Detailed explanation of the API

## Tutorial

### Simple Data Store

Let's create a simple data store that will store and update a single child value, and then submit that data on button click.

```sh
npm i react-flat-store
```

```tsx
const init = { child: 'initial' }
const { Store, useStore, useKey } = buildFlatStore(init)

function Parent() {
  return (
    <Store>
      <Child />
      <Button />
    </Store>
  )
}

function Child() {
  const { key, value, update } = useKey('child')

  return (
    <input
      type="text"
      name={key}
      value={value}
      onChange={(e) => update(e.target.value)}
    />
  )
}

function Button() {
  const { child } = useStore()
  const submit = () => {
    console.log({ child })
  }

  return <button onClick={submit}>Submit</button>
}
```

## Reference

Note: There is not a lot of code (under 50 lines). So it could be helpful to read it if you are looking for more information.

### buildFlatStore

- Input: initial state.
- Output: `Store`, `useStore`, `useKey`

```ts
const { Store, useStore, useKey } = buildFlatStore({
  a: 1,
  b: '2',
  c: { three: 3 },
})
```

### Store

`Store` is a React component that stores your data and provides it (via React contexts) to the children components.

There are no props.

```tsx
function Parent() {
  return <Store>...</Store>
}
```

### useStore

`useStore` is a React hook that returns the current state.

- Inputs: none
- Outputs: state

```tsx
function Child() {
  const { a, b, c } = useStore()

  // ...
}
```

### useKey

`useKey` is a React hook that returns `key`, `value`, and an `update` function for a specific key.

- Inputs:
  - `key`: The key name. It is strongly typed, so typos or field names that are not present in the initial state will throw type errors.
- Outputs:
  - `key`: The key name.
  - `value`: The key's value. It is strongly typed.
  - `update`: An update function which updates the key's value. The update function is strongly typed.
    - Inputs: new `value`. It is strongly typed
    - Outputs: void

```tsx
function Child() {
  const { key, value, update } = useKey('child')
  update('new string') // value => 'new string'
  update(4) // type error!

  // ...
}
```
