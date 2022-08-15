import React, { useEffect, useState } from 'react'
import { buildFlatStore } from '../..'

enum Theme {
  Light,
  Dark,
}

const { Store, useStore, useKey } = buildFlatStore({ theme: Theme.Light })

function App() {
  // This would use the default theme so you only had to define it once:
  // const defaultTheme = useStore()
  // const [theme, setTheme] = useState(defaultTheme)
  //
  // But it could be seen as bad practice to call a hook before it's context
  // is initialized (via Store). As such, you can supply another default:
  const [theme, setTheme] = useState(Theme.Light)

  useEffect(() => {
    async function getTheme() {
      // async fetch...
      // let's say the user set his theme to Dark
      setTheme(Theme.Dark)
    }

    getTheme()
  })

  return (
    <Store state={{ theme }}>
      <Header />
      <Body />
    </Store>
  )
}

function Header() {
  const { value: theme, update } = useKey('theme')
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
  const { value: theme } = useKey('theme')
  const color = theme == Theme.Light ? 'bg-white' : 'bg-black'

  return <div className={color}></div>
}
