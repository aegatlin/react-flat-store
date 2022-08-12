import React from 'react'
import { buildFlatStore } from '.'

const state = { email: '', rememberMe: false, other: { a: 1, b: 2 } }
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
  const { value: other, update: updateOther } = useFlatStoreKey('other')
  updateOther({ a: other.a + 1, b: other.b + 2 })

  return (
    <input
      type="checkbox"
      name={name}
      checked={value}
      onChange={() => update(!value)}
    />
  )
}

function Submit() {
  const { email, rememberMe } = useFlatStore()
  const submit = () => {
    console.log('send: ', { email, rememberMe })
  }

  return <button onClick={submit}>Submit</button>
}
