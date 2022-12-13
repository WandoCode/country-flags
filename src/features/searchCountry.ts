import { parseSearchInput } from '../helpers/helpers'
import { Countries } from '../hooks/useGetCountries'

const lookForWordInCountriesProperties = (
  word: string,
  countries: Countries
) => {
  return countries.filter((country) => {
    const values = Object.values(country)
    return values.some((value) => {
      if (typeof value !== 'number' && value) {
        if (value.toLowerCase().includes(word)) {
          return true
        }
      }
      return false
    })
  })
}

function searchCountry(searchInupt: string, countries: Countries): Countries {
  const searchWords = parseSearchInput(searchInupt)

  if (searchWords.length === 0) return countries

  let filteredCountries = [...countries]
  searchWords.forEach((word) => {
    filteredCountries = lookForWordInCountriesProperties(
      word,
      filteredCountries
    )
  })

  return filteredCountries
}

export default searchCountry
