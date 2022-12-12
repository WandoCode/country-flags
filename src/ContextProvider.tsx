import { createContext, useState } from 'react'

interface Props {
  children: JSX.Element
}

export const ContextState = createContext({
  currMode: 'light',
  toggleMode: () => {},
})

function ContextProvider({ children }: Props) {
  const [mode, setMode] = useState<string>('light')

  const toggleMode = () => {
    mode === 'light' ? setMode('dark') : setMode('light')
  }

  return (
    <ContextState.Provider value={{ currMode: mode, toggleMode }}>
      {children}
    </ContextState.Provider>
  )
}

export default ContextProvider
