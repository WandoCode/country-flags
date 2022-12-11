import { Countries, Country } from '../hooks/useGetCountries'

function searchCountry(searchInupt: string, countries: Countries) {
  const searchArray = searchInupt.toLowerCase().split(' ')

  const filteredCountry = countries.filter((country) => {
    return unitSearch(searchArray, country)
  })

  return filteredCountry
}

const unitSearch = (words: string[], country: Country) => {
  for (const key in country) {
    const value = country[key]

    if (typeof value !== 'number' && value) {
      const valueIsPartOfWords = words.some((word) => {
        return value.toLowerCase().includes(word)
      })

      return valueIsPartOfWords
    }
  }
  return false
}
export default searchCountry
