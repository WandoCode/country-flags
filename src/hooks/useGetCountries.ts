import { useEffect, useState } from 'react'
import countryStore, { CountryRaw } from '../store/countryStore'

export type Error = string | undefined

export interface Country {
  [key: string]: string | number
  population: number
  region: string
  capital: string
  flag: string
  code: string
}

export type Countries = Country[]

function useGetCountries(): [Countries, boolean, Error] {
  const [countries, setCountries] = useState<Countries>([])
  const [loading, setLoading] = useState(true)
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
            code: countryRaw.cca2,
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
