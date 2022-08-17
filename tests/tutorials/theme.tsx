/*

Let's create a theme manager that fetches a user's default theme. (How one  
updates the default theme is outside of the scope of this demo.) Let's also
create a bespoke `useTheme` hook to make it easier to use.

*/

import React, { useEffect, useState } from 'react'
import { createFlatStore } from '../..'

enum Theme {
  Light,
  Dark,
}

const { Store, useStore, useKey } = createFlatStore({ theme: Theme.Light })
const useTheme = () => {
  const { value: theme, update } = useKey('theme')
  return { theme, update }
}

function App() {
  const [theme, setTheme] = useState(Theme.Light)

  /*

  Alternatively, you could rely on the default theme you provide to 
  `createFlatStore`, though it is perhaps bad practice to call a
  context-sensitive hook before the context has been provided.

  const defaultTheme = useStore()
  const [theme, setTheme] = useState(defaultTheme)

  */

  useEffect(() => {
    async function getTheme() {
      // async fetch...
      // let's say the user set his theme to Dark
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

  const themeString = theme == Theme.Light ? 'light' : 'dark'

  const toggle = () => {
    theme == Theme.Light ? update(Theme.Dark) : update(Theme.Light)
  }

  return (
    <div>
      <div>{themeString}</div>
      <button onClick={toggle}>Toggle</button>
    </div>
  )
}

function Body() {
  const { theme } = useTheme()

  const color = theme == Theme.Light ? 'bg-white' : 'bg-black'

  return <div className={color}></div>
}
