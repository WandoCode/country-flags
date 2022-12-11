import useGetCountries from '../hooks/useGetCountries'
import { useState, useEffect } from 'react'
import CountryCard from '../components/CountryCard'
import searchCountry from '../features/searchCountry'
import { Countries } from '../hooks/useGetCountries'
import React from 'react'

function Home() {
  const [countries, loading, error] = useGetCountries()
  const [countriesDOM, setCountriesDOM] = useState<JSX.Element[]>([])
  const [searchInput, setSearchInput] = useState('')
  const [filteredCountries, setFilteredCountries] = useState<Countries>([])

  useEffect(() => {
    if (searchInput.length < 3) return
    const search = searchCountry(searchInput, countries)

    setFilteredCountries(search)
  }, [searchInput])

  useEffect(() => {
    const rep = filteredCountries.map((country, index) => {
      return <CountryCard country={country} key={index} />
    })

    setCountriesDOM(rep)
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
      {countriesDOM}
    </div>
  )
}

export default Home
