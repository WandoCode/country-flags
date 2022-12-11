import React, { useMemo, useRef, useState } from 'react'
import { SelectValue } from '../pages/Home'

type Props = {
  setAsValue: React.Dispatch<React.SetStateAction<SelectValue>>
}
//TODO: rendre le Select accessible
function Select({ setAsValue }: Props) {
  const menuRef = useRef<HTMLUListElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenuOpening = () => {
    if (!isOpen) document.addEventListener('mousedown', handleClickDocument)
    if (isOpen) document.removeEventListener('mousedown', handleClickDocument)

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

  const handleClickDocument = (e: MouseEvent) => {
    const target = e.target as HTMLElement

    if (!menuRef.current?.contains(target) && target !== btnRef.current) {
      document.removeEventListener('mousedown', handleClickDocument)
      setIsOpen(false)
    }
  }

  return (
    <div className="select">
      <button
        ref={btnRef}
        className="select__button"
        onClick={toggleMenuOpening}
      >
        Filter by Region
      </button>
      <ul ref={menuRef} className={dorpdownClass} onClick={handleValue}>
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
