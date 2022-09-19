/*

Let's create a simple sign-in form for users. When there is only a single
component, or the component hierarchy is simple, the `useStore` API is ideal. (If
the component hierarchy grows in complexity over time, we can painlessly
"upgrade" to contexts, and use the `useContextStore` API.)

*/

import React from 'react'
import { useStore } from '../..'

function SignInForm() {
  const {
    state: { email, rememberMe },
    update,
  } = useStore({ email: '', rememberMe: false })

  const submit = () => {
    console.log('submitting JSON payload: ', { data: { email, rememberMe } })
  }

  return (
    <div>
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => update('email', e.target.value)}
      />
      <input
        type="checkbox"
        name="rememberMe"
        checked={rememberMe}
        onChange={() => update('rememberMe', !rememberMe)}
      />
      <button onClick={submit}>Submit</button>
    </div>
  )
}
