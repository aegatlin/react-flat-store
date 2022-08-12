# React Flat Store

React Flat Store is a strongly typed flat storage solution in React.

Call `buildFlatStore` with an initial state. In return you get a React wrapper component, `FlatStore` that stores the state and provides functionality to child components via two hooks. `useFlatStore` returns the entire state, and `useFlatStoreKey` return the `name` and `value` of a particular key, as well as an `update` function. That's it!

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
const { FlatStore, useFlatStore, useFlatStoreKey } = buildFlatStore(init)

function Parent() {
  return (
    <FlatStore>
      <Child />
      <Button />
    </FlatStore>
  )
}

function Child() {
  const { name, value, update } = useFlatStoreKey('child')

  return (
    <input
      type="text"
      name={name}
      value={value}
      onChange={(e) => update(e.target.value)}
    />
  )
}

function Button() {
  const { child } = useFlatStore()
  const submit = () => {
    console.log('do something with the payload: ', JSON.stringify({ child }))
  }

  return <button onClick={submit}>Submit</button>
}
```

## Reference

Note: There is not a lot of code (under 50 lines). So it could be helpful to read it if you are stuck. Or send in a PR/Issue. Thanks! :D

### buildFlatStore

- Input: initial state.
- Output: `FlatStore`, `useFlatStore`, `useFlatStoreKey`

```ts
const { FlatStore, useFlatStore, useFlatStoreKey } = buildForm({
  a: 1,
  b: '2',
  c: { three: 3 },
})
```

### FlatStore

`FlatStore` is a React component that stores your data and provides it (via React contexts) to the children components.

There are no props.

```tsx
function Parent() {
  return <FlatStore>...</FlatStore>
}
```

### useFlatStore

`useFlatStore` is a React hook that returns the state of the store.

- Inputs: none
- Outputs: store state

```tsx
function Child() {
  const { a, b, c } = useFlatStore()

  // ...
}
```

### useFlatStoreKey

`useFlatStoreKey` is a React hook that returns a key's name and value, as well as an update function.

- Inputs: 
  - `name`: The key name
    - The key name is strongly typed, so typos or field names that are not present in the initial state will throw type errors.
- Outputs:
  - `name`: The key name.
  - `value`: The value associated with that key. The value is strongly typed.
  - `update`: An update function. The update function is strongly typed.
    - Inputs: new `value`. Will throw a type error unless it matches the corresponding key's type.
    - Outputs: void

```tsx
// Assuming an initial store state of: { child: 'initial' }
function ChildComponent() {
  const { name, value, update } = useFlatStoreKey('child')
  // name => 'child'; value => 'initial'

  update('new string') // value => 'new string'
  update(4) // type error!

  // ...
}
```
