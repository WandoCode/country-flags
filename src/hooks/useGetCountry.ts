import { useEffect, useState, useCallback } from 'react'
import useFetch from './useFetch'
import { CountryRaw } from './useGetCountries'
import axios from 'axios'

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
}

interface CountryLargeRaw extends CountryRaw {
  subregion: string
  tld: string[]
  currencies: { [key: string]: { name: string } }
  languages: { [key: string]: string }
  borders: string[]
  nativeName: { [key: string]: { common: string } }
}

function useGetCountry(
  countryCode: string
): [CountryLarge | undefined, boolean, string] {
  const url = `https://restcountries.com/v3.1/alpha/${countryCode}?fields=name,population,region,tld,subregion,languages,currencies,flags,borders`

  const [country, setCountry] = useState<CountryLarge>()
  const [tempCountry, setTempCountry] = useState<CountryLarge>()
  const [datas, loading, error, setError] = useFetch<CountryLargeRaw>(url)
  const [countriesBorderCode, setCountriesBorderCode] = useState<string[]>([])

  useEffect(() => {
    if (datas && !error) {
      const firstLang = Object.keys(datas.languages)[0]
      const firstCurrency = Object.keys(datas.currencies)[0]

      const rep: CountryLarge = {
        name: datas.name.common,
        nativeName: datas.name.nativeName[firstLang].common,
        region: datas.region,
        subregion: datas.subregion,
        population: datas.population,
        capital: datas.capital[0],
        tld: datas.tld[0],
        currencies: datas.currencies[firstCurrency].name,
        languages: Object.keys(datas.languages),
        borders: [],
      }

      setTempCountry(rep)
      setCountriesBorderCode(datas.borders)
    }
  }, [datas])

  const getBorderNames = async () => {
    const countriesNames: string[] = []
    try {
      await Promise.all(
        countriesBorderCode.map(async (countryCode) => {
          const urlCountryName = `https://restcountries.com/v3.1/alpha/${countryCode}?fields=name`

          const response = await axios.get(urlCountryName)
          countriesNames.push(response.data.name.common)
        })
      )
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        const message = err.response.data.message
        setError(message)
      }
    }

    if (tempCountry) {
      const countryCopy = JSON.parse(JSON.stringify(tempCountry))
      countryCopy.borders = countriesNames
      setCountry(countryCopy)
    }
    return countriesNames
  }

  useEffect(() => {
    getBorderNames()
  }, [countriesBorderCode])

  return [country, loading, error]
}

export default useGetCountry
