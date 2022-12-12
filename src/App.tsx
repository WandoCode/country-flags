import './stylesheets/main.scss'
import Router from './Router'
import { RouterProvider } from 'react-router-dom'
import { useMemo, useContext, useEffect } from 'react'
import { Context, ContextState } from './ContextProvider'

function App() {
  const { currMode, setMode } = useContext(ContextState) as Context

  const themeId = useMemo(() => {
    return currMode === 'light' ? '' : 'dark'
  }, [currMode])

  useEffect(() => {
    let colorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'

    setMode(colorScheme)

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (event) => {
        colorScheme = event.matches ? 'dark' : 'light'
        setMode(colorScheme)
      })
  }, [])

  return (
    <div className="App" id={themeId}>
      <RouterProvider router={Router} />
    </div>
  )
}

export default App
