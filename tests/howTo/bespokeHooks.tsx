/*

Bespoke hooks are simple hooks that depend on `useKey`, but rearrange or 
rename the return values. This can simplify the developer experience when
working with keys.

*/

import React from 'react'
import { createFlatStore } from '../..'

const { useKey } = createFlatStore({ email: '', password: '' })

const useEmail = () => {
  const { value: email, update } = useKey('email')
  return { email, update }
}

const usePassword = () => {
  const { value: password, update } = useKey('password')
  return { password, update }
}

// Now, you can leverage these simpler hooks in child components:

function Email() {
  const { email, update } = useEmail()

  return (
    <input
      type="text"
      name="email"
      value={email}
      onChange={(e) => update(e.target.value)}
    />
  )
}
