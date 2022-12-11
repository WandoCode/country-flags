import useGetCountries from '../hooks/useGetCountries'
import React, { useState, useEffect, useCallback } from 'react'
import CountryCard from '../components/CountryCard'
import searchCountry from '../features/searchCountry'
import { Countries } from '../hooks/useGetCountries'

function Home() {
  const [countries, loading, error] = useGetCountries()
  const [searchInput, setSearchInput] = useState('')
  const [filteredCountries, setFilteredCountries] = useState<Countries>([])

  useEffect(() => {
    const search = searchCountry(searchInput, countries)

    setFilteredCountries(search)
  }, [searchInput])

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
        <label htmlFor="search">{/* Todo: mettre imgage de loupe */}</label>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search for a country..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </form>
      {createCountryCard()}
    </div>
  )
}

export default Home
