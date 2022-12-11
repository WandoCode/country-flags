import { Countries } from '../hooks/useGetCountries'

function searchCountry(searchInupt: string, countries: Countries): Countries {
  const searchArray = searchInupt.toLowerCase().split(' ')

  const searchWords = searchArray.filter((word) => word.length > 2)

  if (searchWords.length === 0) return countries

  let filteredCountries = [...countries]
  searchWords.forEach((word) => {
    filteredCountries = wordInCountries(word, filteredCountries)
  })

  return filteredCountries
}

const wordInCountries = (word: string, countries: Countries) => {
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
export default searchCountry
