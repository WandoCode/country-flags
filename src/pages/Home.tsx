import useGetCountries from '../hooks/useGetCountries'
import { useState, useEffect } from 'react'
import CountryCard from '../components/CountryCard'

function Home() {
  const [countries, loading, error] = useGetCountries()
  const [countriesDOM, setCountriesDOM] = useState<JSX.Element[]>([])

  useEffect(() => {
    const rep = countries.map((country, index) => {
      return <CountryCard country={country} key={index} />
    })

    setCountriesDOM(rep)
  }, [countries])

  return <div className="home">{countriesDOM}</div>
}

export default Home
