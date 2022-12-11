import axios from 'axios'

export interface CountryRaw {
  name: {
    common: string
    nativeName: { [key: string]: { common: string } }
  }
  capital: string[]
  region: string
  population: number
  flags: { svg: string }
  altSpellings: string[]
}

export interface CountryLargeRaw extends CountryRaw {
  subregion: string
  tld: string[]
  currencies: { [key: string]: { name: string } }
  languages: { [key: string]: string }
  borders: string[]
  nativeName: { [key: string]: { common: string } }
}

type GetCountries = Promise<
  { countriesRaw?: CountryRaw[]; error?: string } | undefined
>

type GetCountry = Promise<
  { countryRaw?: CountryLargeRaw; error?: string } | undefined
>

const getCountries = async (): GetCountries => {
  const URL =
    'https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags'

  try {
    const response = await axios.get(URL)
    return { countriesRaw: response.data }
  } catch (err: any) {
    if (axios.isAxiosError(err) && err.response) {
      const message: string = err.response.data.message
      return { error: message }
    }
  }
}

const getCountry = async (countryCode: string): GetCountry => {
  const url = `https://restcountries.com/v3.1/alpha/${countryCode}?fields=name,population,region,tld,subregion,languages,currencies,flags,borders`

  try {
    let rep: { countryRaw: CountryLargeRaw }
    const countriesNames: string[] = []

    const response = await axios.get(url)
    rep = { countryRaw: response.data }

    const bordersCode = rep.countryRaw.borders

    await Promise.all(
      bordersCode.map(async (countryCode) => {
        const urlCountryName = `https://restcountries.com/v3.1/alpha/${countryCode}?fields=name`

        const response = await axios.get(urlCountryName)
        countriesNames.push(response.data.name.common)
      })
    )

    rep.countryRaw.borders = countriesNames

    return rep
  } catch (err: any) {
    if (axios.isAxiosError(err) && err.response) {
      const message: string = err.response.data.message
      return { error: message }
    }
  }
}

const countryStore = {
  getCountries,
  getCountry,
}

export default countryStore
