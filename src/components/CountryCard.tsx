import { Country } from '../hooks/useGetCountries'
import { formatPopulation } from '../helpers/helpers'

type Props = { country: Country }

function CountryCard({ country }: Props) {
  const populationFormatted = formatPopulation(country.population)
  return (
    <div className="country-card">
      <img
        src={country.flag}
        alt={`Flag of $ ${country.name}`}
        className="country-card__img"
      />
      <div>
        <h2 className="h2">{country.name}</h2>
        <ul>
          <li className="country-card__population">
            Population: {populationFormatted}
          </li>
          <li className="country-card__region">Region: {country.region}</li>
          <li className="country-card__capital">Capital: {country.capital}</li>
        </ul>
      </div>
    </div>
  )
}

export default CountryCard
