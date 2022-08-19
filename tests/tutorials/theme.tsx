/*

Let's create a theme manager that fetches a user's default theme. (How one  
updates the default theme is outside of the scope of this demo.) Let's also
create a bespoke `useTheme` hook to make it easier to use.

*/

import React, { useEffect, useState } from 'react'
import { createFlatStore } from '../..'

enum Theme {
  Light = 'light',
  Dark = 'dark',
}

const { Store, useStore, useKey } = createFlatStore({ theme: Theme.Light })

const useTheme = () => {
  const { value: theme, update } = useKey('theme')
  return { theme, update }
}

function App() {
  const [theme, setTheme] = useState(Theme.Light)

  /*

  Alternatively, you could rely on the default theme you provided to
  `createFlatStore`, though it is perhaps bad practice to call a
  context-sensitive hook before the context itself has been provided.

  const { theme: defaultTheme } = useStore()
  const [theme, setTheme] = useState(defaultTheme)

  */

  useEffect(() => {
    async function getTheme() {
      /*

      If the user's default theme is Theme.Dark, you might run into a problem
      where the pre-fetch theme is Theme.Light, and it would then unpleasantly
      flash from Light -> Dark . While not within the scope of this library,
      possible solutions include: server-side props; isLoading state that
      is true until initial fetch completion.

      */

      setTheme(Theme.Dark)
    }

    getTheme()
  }, [theme])

  return (
    <Store state={{ theme }}>
      <Header />
      <Body />
    </Store>
  )
}

function Header() {
  const { theme, update } = useTheme()

  const toggle = () => update(theme == Theme.Light ? Theme.Dark : Theme.Light)

  return (
    <div>
      <div>{theme}</div>
      <button onClick={toggle}>Toggle</button>
    </div>
  )
}

function Body() {
  const { theme } = useTheme()

  const color = theme == Theme.Light ? 'bg-white' : 'bg-black'

  return <div className={color}></div>
}
