import { useEffect, useState } from 'react'
import countryStore, { CountryRaw } from '../store/countryStore'

export type Error = string | undefined

type Country = {
  name: string
  population: number
  region: string
  capital: string
  flag: string
  code: string
}

type Countries = Country[]

function useGetCountries(): [Countries | undefined, boolean, Error] {
  const [countries, setCountries] = useState<Countries>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error>()

  const fetchCountries = async () => {
    setLoading(true)

    const response = await countryStore.getCountries()

    if (response?.countriesRaw) {
      const mappedCountries = response.countriesRaw.map(
        (countryRaw: CountryRaw) => {
          return {
            name: countryRaw.name.common,
            population: countryRaw.population,
            capital: countryRaw.capital[0],
            region: countryRaw.region,
            flag: countryRaw.flags.svg,
            code: countryRaw.altSpellings[0],
          }
        }
      )
      setCountries(mappedCountries)
    } else if (response?.error) {
      setError(response.error)
    }

    setLoading(false)

    return
  }

  useEffect(() => {
    fetchCountries()
  }, [])

  return [countries, loading, error]
}

export default useGetCountries
