import { useEffect, useState } from 'react'
import countryStore, { CountryLargeRaw } from '../store/countryStore'
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

      const rep = buildCountryLargeObject(countryRaw)

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

const buildCountryLargeObject = (rawDatas: CountryLargeRaw) => {
  const firstCurrency = Object.values(rawDatas.currencies)[0]
  const firstNativeName = Object.values(rawDatas.name.nativeName)[0]

  return {
    name: rawDatas.name.common,
    nativeName: firstNativeName?.common || '',
    region: rawDatas.region,
    subregion: rawDatas.subregion,
    population: rawDatas.population,
    capital: rawDatas.capital[0],
    tld: rawDatas.tld[0],
    currencies: firstCurrency?.name || '',
    languages: Object.values(rawDatas.languages),
    borders: rawDatas.borders,
    bordersName: rawDatas.bordersName,
    img: rawDatas.flags.svg,
  }
}

export default useGetCountry
