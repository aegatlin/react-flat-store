import React from 'react'
import { buildFlatStore } from '.'

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
  send: (data: { data: { email: string; rememberMe: boolean } }) => {
    // pretend to send data
  },
}

function Submit() {
  const { email, rememberMe } = useFlatStore()
  const submit = () => {
    api.send({ data: { email, rememberMe } })
  }

  return <button onClick={submit}>Submit</button>
}
