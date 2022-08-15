import { buildFlatStore } from '../..'

/*

If you had multiple simple forms, you could rename the exports of 
`buildFlatStore` to more semantically meaningful names while still keeping
the builder generic:

*/

function formBuilder<FormState>(initialState: FormState) {
  const { Store, useStore, useKey } = buildFlatStore(initialState)
  return { Form: Store, useForm: useStore, useField: useKey }
}

// Now, you can leverage this form builder across multiple form pages:

// SignInPage
// const { Form, useForm, useField } = formBuilder({ email: '', password: '' })

// AddContactPage
// const {Form, useForm, useField} = formBuilder({name: '', number: '', address: '', email: ''})
