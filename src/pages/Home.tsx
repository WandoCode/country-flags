import useGetCountries from '../hooks/useGetCountries'
import React, { useState, useEffect, useCallback } from 'react'
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

  return (
    <div className="home">
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
      <div className="country-cards">{createCountryCard()}</div>
    </div>
  )
}

export default Home
