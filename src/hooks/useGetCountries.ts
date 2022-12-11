import useFetch from './useFetch'
import { useEffect, useState } from 'react'

type Country = {
  name: string
  population: number
  region: string
  capital: string
  flag: string
  code: string
}

type Countries = Country[]

export interface CountryRaw {
  name: { common: string; nativeName: { [key: string]: { common: string } } }
  capital: string[]
  region: string
  population: number
  flags: { svg: string }
  altSpellings: string[]
}

const URL =
  'https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags'

function useGetCountries(): [Countries | undefined, boolean, string] {
  const [countries, setCountries] = useState<Countries>()
  const [datas, loading, error] = useFetch<[]>(URL)

  useEffect(() => {
    if (datas) {
      const mappedCountries = datas.map((countryRaw: CountryRaw) => {
        return {
          name: countryRaw.name.common,
          population: countryRaw.population,
          capital: countryRaw.capital[0],
          region: countryRaw.region,
          flag: countryRaw.flags.svg,
          code: countryRaw.altSpellings[0],
        }
      })
      setCountries(mappedCountries)
    }
  }, [datas])

  return [countries, loading, error]
}

export default useGetCountries
