import moonIcon from '../assets/moon.svg'
import filledMoonIcon from '../assets/full-moon.svg'
import { useContext } from 'react'
import { ContextState, Context } from '../ContextProvider'

function DarkMode() {
  const { currMode, toggleMode } = useContext(ContextState) as Context

  return (
    <button className="btn btn--dark-mode" onClick={() => toggleMode()}>
      {currMode === 'dark' && <img src={filledMoonIcon} alt="Moon" />}
      {currMode === 'light' && <img src={moonIcon} alt="Moon" />}
      Dark Mode
    </button>
  )
}

export default DarkMode
