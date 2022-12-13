import React, { createContext, useState } from 'react'

interface Props {
  children: JSX.Element
}

export interface Context {
  currMode: string
  toggleMode: () => void
  setMode: React.Dispatch<React.SetStateAction<string>>
}

export const ContextState = createContext({})

function ContextProvider({ children }: Props) {
  const [mode, setMode] = useState<string>('light')

  const toggleMode = () => {
    mode === 'light' ? setMode('dark') : setMode('light')
  }

  return (
    <ContextState.Provider
      value={
        { currMode: mode, toggleMode: toggleMode, setMode: setMode } as Context
      }
    >
      {children}
    </ContextState.Provider>
  )
}

export default ContextProvider
