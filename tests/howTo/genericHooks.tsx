/*

Let's say you had multiple, simple form pages. You could rename the exports of 
`createFlatStore` to more semantically meaningful for form, like `useForm` and
`useField`, while still keeping the builder generic, so that it can read in
various different initial states.

*/

import React from 'react'
import { createFlatStore } from '../..'

function formBuilder<FormState>(state: FormState) {
  const { Store, useStore, useKey } = createFlatStore(state)
  return { Form: Store, useForm: useStore, useField: useKey }
}

// Now, you can leverage this form builder across multiple form pages:

// SignInPage
// const { Form, useForm, useField } = formBuilder({ email: '', password: '' })
// ...

// AddContactPage
const { Form, useForm, useField } = formBuilder({
  name: '',
  number: '',
  address: '',
  email: '',
})

function Email() {
  const { key, value: email, update } = useField('email')

  return (
    <input
      type="text"
      name={key}
      value={email}
      onChange={(e) => update(e.target.value)}
    />
  )
}
