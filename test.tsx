import React from 'react'
import { buildFlatStore } from '.'

const state = { email: '', rememberMe: false, other: { a: 1, b: 2 } }
const { Store, useStore, useKey } = buildFlatStore(state)

function SignInForm() {
  return (
    <Store>
      <Email />
      <RememberMe />
      <Submit />
    </Store>
  )
}

function Email() {
  const { key, value, update } = useKey('email')

  return (
    <input
      type="email"
      name={key}
      value={value}
      onChange={(e) => update(e.target.value)}
    />
  )
}

function RememberMe() {
  const { key, value, update } = useKey('rememberMe')
  const { value: other, update: updateOther } = useKey('other')
  updateOther({ a: other.a + 1, b: other.b + 2 })
  // other => { a: 2, b: 4 }

  return (
    <input
      type="checkbox"
      name={key}
      checked={value}
      onChange={() => update(!value)}
    />
  )
}

function Submit() {
  const { email, rememberMe } = useStore()
  const submit = () => {
    console.log({ email, rememberMe })
  }

  return <button onClick={submit}>Submit</button>
}
