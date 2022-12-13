import useGetCountries from '../hooks/useGetCountries'
import React, { useState, useEffect, useCallback, useMemo } from 'react'
import CountryCard from '../components/CountryCard'
import searchCountry from '../features/searchCountry'
import { Countries } from '../hooks/useGetCountries'
import Select from '../components/Select'

export type SelectValue = string | undefined

function Home() {
  const [countries, loading, error] = useGetCountries()
  const [searchInput, setSearchInput] = useState('')
  const [filteredCountries, setFilteredCountries] = useState<Countries>([])
  const [selectValue, setSelectValue] = useState<SelectValue>()

  useEffect(() => {
    let searchString = ''
    if (selectValue) searchString += selectValue
    searchString += ` ${searchInput}`

    const search = searchCountry(searchString, countries)

    setFilteredCountries(search)
  }, [searchInput, selectValue])

  const createCountryCard = useCallback(() => {
    if (filteredCountries.length === 0) return 'No result found...'
    return filteredCountries.map((country, index) => {
      return <CountryCard country={country} key={index} />
    })
  }, [filteredCountries])

  useEffect(() => {
    setFilteredCountries(countries)
  }, [countries])

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault()
  }

  const homeClass = useMemo(() => {
    return loading ? 'home hide-on-load' : 'home'
  }, [loading])

  const loaderClass = useMemo(() => {
    return loading ? 'loading' : 'loading loading--hide'
  }, [loading])

  return (
    <>
      <div className={loaderClass}>
        <div className="loading__container">
          <div className="loading__bar"></div>
        </div>
      </div>

      <div className={homeClass}>
        <form className="home__search" onSubmit={submitForm}>
          <label htmlFor="search" className="input__label">
            {/* Todo: mettre imgage de loupe */}

            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search for a country..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="input"
            />
          </label>
          <Select setAsValue={setSelectValue} />
        </form>
        <section className="country-cards">{createCountryCard()}</section>
      </div>
    </>
  )
}

export default Home
