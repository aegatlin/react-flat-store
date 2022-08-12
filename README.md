# React Flat Store

React Flat Store is a strongly typed flat storage solution in React.

## Tutorial

### Sign In Form

```sh
npm i react-flat-store
```

```tsx
const state = { email: '', rememberMe: false }
const { FlatStore, useFlatStore, useFlatStoreKey } = buildFlatStore(state)

function SignInForm() {
  return (
    <FlatStore>
      <Email />
      <RememberMe />
      <Submit />
    </FlatStore>
  )
}

function Email() {
  const { name, value, update } = useFlatStoreKey('email')

  return (
    <input
      type="email"
      name={name}
      value={value}
      onChange={(e) => update(e.target.value)}
    />
  )
}

function RememberMe() {
  const { name, value, update } = useFlatStoreKey('rememberMe')

  return (
    <input
      type="checkbox"
      name={name}
      checked={value}
      onChange={() => update(!value)}
    />
  )
}

const api = {
  send: ({ email, rememberMe }) => {
    // pretend to send data
  },
}

function Submit() {
  const { email, rememberMe } = useFlatStore()
  const submit = () => {
    api.send({ email, rememberMe })
  }

  return <button onClick={submit}>Submit</button>
}
```

## Reference

It's less than 50 lines of code. Read it (or copy it) yourself! :D
