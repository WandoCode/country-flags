import React, { KeyboardEvent, useMemo, useRef, useState } from 'react'
import { SelectValue } from '../pages/Home'
import expandIcon from '../assets/expand-more.svg'

type Props = {
  setAsValue: React.Dispatch<React.SetStateAction<SelectValue>>
}

function Select({ setAsValue }: Props) {
  const menuRef = useRef<HTMLUListElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  const [isOpen, setIsOpen] = useState(false)
  const [currValue, setcurrValue] = useState<string | undefined>()

  const toggleMenuOpening = () => {
    if (!isOpen) {
      document.addEventListener('mousedown', handleClickDocument)
      document.addEventListener('keydown', handleKeyDown)
    }
    if (isOpen) {
      document.removeEventListener('mousedown', handleClickDocument)
      document.removeEventListener('keydown', handleKeyDown)
    }

    setIsOpen(!isOpen)
  }

  const changeValue = (value: string | null) => {
    let finalValue = undefined
    if (value !== null && value !== 'undefined') {
      finalValue = value
    }

    setAsValue(finalValue)
    setcurrValue(value !== null ? value : undefined)
  }

  const handleValue = (e: React.MouseEvent) => {
    const node = e.target as HTMLElement
    const targetValue = node.getAttribute('data-value')

    changeValue(targetValue)

    toggleMenuOpening()
  }

  const handleKeyDown = (e: globalThis.KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
        closeMenu()
        break

      case 'Enter':
        if (e.target) {
          const target = e.target as HTMLElement
          if (target.hasAttribute('data-value')) {
            const targetValue = target.getAttribute('data-value')
            toggleMenuOpening()

            changeValue(targetValue)
          }
        }
        break

      default:
        break
    }
  }
  const handleClickDocument = (e: MouseEvent) => {
    const target = e.target as HTMLElement

    if (
      !menuRef.current?.contains(target) &&
      target !== btnRef.current &&
      target !== imgRef.current
    ) {
      closeMenu()
    }
  }

  const closeMenu = () => {
    document.removeEventListener('mousedown', handleClickDocument)
    document.removeEventListener('keydown', handleKeyDown)

    setIsOpen(false)
  }

  const dorpdownClass = useMemo(() => {
    return isOpen
      ? 'select__dropdown select__dropdown--open'
      : 'select__dropdown'
  }, [isOpen])

  const iconClass = useMemo(() => {
    return isOpen ? 'select__icon' : 'select__icon select__icon--close'
  }, [isOpen])

  return (
    <div className="select">
      <button
        ref={btnRef}
        className="select__button"
        onClick={toggleMenuOpening}
        aria-expanded={isOpen}
        aria-controls="select-dropdown"
        aria-haspopup="true"
      >
        Filter by Region
        <img ref={imgRef} src={expandIcon} alt="" className={iconClass} />
      </button>
      <ul
        ref={menuRef}
        className={dorpdownClass}
        onClick={handleValue}
        id="select-dropdown"
        role="menu"
      >
        <li
          className="select__item"
          data-value="africa"
          role="option"
          aria-selected={currValue === 'africa'}
          tabIndex={0}
        >
          Africa
        </li>
        <li
          className="select__item"
          data-value="america"
          role="option"
          aria-selected={currValue === 'america'}
          tabIndex={0}
        >
          America
        </li>
        <li
          className="select__item"
          data-value="asia"
          role="option"
          aria-selected={currValue === 'asia'}
          tabIndex={0}
        >
          Asia
        </li>
        <li
          className="select__item"
          data-value="europe"
          role="option"
          aria-selected={currValue === 'europe'}
          tabIndex={0}
        >
          Europe
        </li>
        <li
          className="select__item"
          data-value="oceania"
          role="option"
          aria-selected={currValue === 'oceania'}
          tabIndex={0}
        >
          Oceania
        </li>
        <li
          className="select__item"
          role="option"
          data-value="undefined"
          aria-selected={currValue === 'undefined'}
          tabIndex={0}
        >
          None
        </li>
      </ul>
    </div>
  )
}

export default Select
