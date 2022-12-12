import moonIcon from '../assets/moon.svg'
import filledMoonIcon from '../assets/full-moon.svg'
import { useContext, useEffect } from 'react'
import { ContextState } from '../ContextProvider'

function DarkMode() {
  const { currMode, toggleMode } = useContext(ContextState)

  return (
    <button className="btn btn--dark-mode" onClick={() => toggleMode()}>
      {currMode === 'dark' && <img src={moonIcon} alt="Moon" />}
      {currMode === 'light' && <img src={filledMoonIcon} alt="Moon" />}
      Dark Mode
    </button>
  )
}

export default DarkMode
