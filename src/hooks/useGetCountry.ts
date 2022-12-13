import { useEffect, useState } from 'react'
import countryStore from '../store/countryStore'
import { Error } from './useGetCountries'

type CountryLarge = {
  name: string
  nativeName: string
  region: string
  subregion: string
  population: number
  capital: string
  tld: string
  currencies: string
  languages: string[]
  borders: string[]
  bordersName: string[]
  img: string
}

function useGetCountry(
  countryCode: string
): [CountryLarge | undefined, boolean, Error] {
  const [country, setCountry] = useState<CountryLarge>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error>()

  const fetchCountryInfos = async () => {
    setLoading(true)

    const response = await countryStore.getCountry(countryCode)

    if (response?.error) setError(response.error)
    else if (response?.countryRaw) {
      const countryRaw = response.countryRaw

      const firstCurrency = Object.values(countryRaw.currencies)[0]
      const firstNativeName = Object.values(countryRaw.name.nativeName)[0]

      const rep: CountryLarge = {
        name: countryRaw.name.common,
        nativeName: firstNativeName.common,
        region: countryRaw.region,
        subregion: countryRaw.subregion,
        population: countryRaw.population,
        capital: countryRaw.capital[0],
        tld: countryRaw.tld[0],
        currencies: firstCurrency.name,
        languages: Object.values(countryRaw.languages),
        borders: countryRaw.borders,
        bordersName: countryRaw.bordersName,
        img: countryRaw.flags.svg,
      }

      setCountry(rep)
    }
    setLoading(false)

    return
  }

  useEffect(() => {
    fetchCountryInfos()
  }, [countryCode])

  return [country, loading, error]
}

export default useGetCountry
