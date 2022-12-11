import React, { useMemo, useState } from 'react'
import { SelectValue } from '../pages/Home'

type Props = {
  setAsValue: React.Dispatch<React.SetStateAction<SelectValue>>
}
//TODO: rendre le Select accessible
function Select({ setAsValue }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  const dorpdownClass = useMemo(() => {
    return isOpen
      ? 'select__dropdown select__dropdown--open'
      : 'select__dropdown'
  }, [isOpen])

  const handleValue = (e: React.MouseEvent) => {
    const node = e.target as HTMLElement
    const targetValue = node.getAttribute('data-value')
    setAsValue(targetValue !== null ? targetValue : undefined)
  }
  return (
    <div className="select">
      <button className="select__button" onClick={handleClick}>
        Filter by Region
      </button>
      <ul className={dorpdownClass} onClick={handleValue}>
        <li className="select__item" data-value="africa">
          Africa
        </li>
        <li className="select__item" data-value="america">
          America
        </li>
        <li className="select__item" data-value="asia">
          Asia
        </li>
        <li className="select__item" data-value="europe">
          Europe
        </li>
        <li className="select__item" data-value="oceania">
          Oceania
        </li>
        <li className="select__item">None</li>
      </ul>
    </div>
  )
}

export default Select
