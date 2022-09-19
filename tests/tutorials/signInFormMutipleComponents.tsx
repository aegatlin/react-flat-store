/*

Let's create a simple sign-in form for users.

(If the sign in form really _was_ this simple, we would probably use the
`useStore` API. But, for this tutorial, let's assume that some additional
complexity is present which encourages breaking down the component hierarchy. We
will then want to use the context-based `createContextStore` API to simplify the
multiple-component data management experience.)

(For an even simpler child component developer experience, see bespoke hooks in
the How-To's.)

*/

import React from 'react'
import { createContextStore } from '../..'

const { Store, useStore, useKey } = createContextStore({
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
  const {
    state: { email, rememberMe },
  } = useStore()

  const submit = () => {
    console.log('submitting JSON payload: ', { data: { email, rememberMe } })
  }

  return <button onClick={submit}>Submit</button>
}
