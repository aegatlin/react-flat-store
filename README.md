# React Flat Store

React Flat Store is a strongly-typed state management utility ideally suited for simple state management needs.

```tsx
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
```

## Tutorials

- [Create a simple sign in form](/tests/tutorials/signInForm.tsx)
- [Create a theme manager](/tests/tutorials/theme.tsx)

## How To

- [Create bespoke hooks](/tests/howTo/bespokeHooks.tsx)
- [Create generic hooks](/tests/howTo/genericHooks.tsx)
- [Work with types and nested data](/tests/howTo/nestedData.tsx)

## Reference

The code is in a small [index.tsx](/index.tsx) file. Reading it could be a helpful reference in addition to the information below.

### createFlatStore

- Input: Default state
- Output: An object containing `Store`, `useStore`, and `useKey`

```ts
const { Store, useStore, useKey } = createFlatStore({
  a: 1,
  b: '2',
  c: { three: 3 },
})
```

### Store

`Store` is a React component that provides the state for its component hierarchy. There are no required props.

```tsx
function Parent() {
  return <Store>...</Store>
}
```

There is one optional prop, `state`, which allows you to set the state reactively. It is strongly typed to the default state from `createFlatStore`.

```tsx
function Parent() {
  const [state, setState] = useState({ a: 1, b: '2', c: { three: 3 } })

  // async state updates can occur here...

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

`useKey` is a React hook that returns `key`, `value`, and an `update` function for a specific key. The only input is a strongly typed `key` name.

- Input: The key name. Strongly typed. Typos or non-existent field names will result in type errors.
- Outputs:
  - `key`: The key name.
  - `value`: The key's value. Strongly typed.
  - `update`: An update function which updates the key's value to a new value. Strongly typed. No output.

```tsx
function Child() {
  const { key, value, update } = useKey('child')

  const onClick = () => update('new value')

  // ...
}
```
