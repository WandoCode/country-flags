import moonIcon from '../assets/moon.svg'
import filledMoonIcon from '../assets/full-moon.svg'
import { useContext, useEffect } from 'react'
import { ContextState, Context } from '../ContextProvider'

function DarkMode() {
  const { currMode, toggleMode } = useContext(ContextState) as Context

  return (
    <button className="btn btn--dark-mode" onClick={() => toggleMode()}>
      {currMode === 'dark' && (
        <img src={filledMoonIcon} alt="Moon" loading="lazy" />
      )}
      {currMode === 'light' && <img src={moonIcon} alt="Moon" loading="lazy" />}
      Dark Mode
    </button>
  )
}

export default DarkMode
