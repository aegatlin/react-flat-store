/*

Let's create a simple sign-in form for users.

*/

import React from 'react'
import { buildFlatStore } from '../..'

const { Store, useStore, useKey } = buildFlatStore({
  email: '',
  rememberMe: false,
})

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
  const { key, value: email, update } = useKey('email')

  return (
    <input
      type="email"
      name={key}
      value={email}
      onChange={(e) => update(e.target.value)}
    />
  )
}

function RememberMe() {
  const { key, value: rememberMe, update } = useKey('rememberMe')

  return (
    <input
      type="checkbox"
      name={key}
      checked={rememberMe}
      onChange={() => update(!rememberMe)}
    />
  )
}

function Submit() {
  const { email, rememberMe } = useStore()
  const submit = () => {
    // async post...
    console.log({ email, rememberMe })
  }

  return <button onClick={submit}>Submit</button>
}
