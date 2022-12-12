import './stylesheets/main.scss'
import Router from './Router'
import { RouterProvider } from 'react-router-dom'
import { useMemo, useContext } from 'react'
import { ContextState } from './ContextProvider'

function App() {
  const { currMode } = useContext(ContextState)

  const themeId = useMemo(() => {
    return currMode === 'light' ? '' : 'dark'
  }, [currMode])

  return (
    <div className="App" id={themeId}>
      <RouterProvider router={Router} />
    </div>
  )
}

export default App
