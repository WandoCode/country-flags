import { Country } from '../hooks/useGetCountries'
import { formatPopulation } from '../helpers/helpers'
import { Link } from 'react-router-dom'

type Props = { country: Country }

function CountryCard({ country }: Props) {
  const populationFormatted = formatPopulation(country.population)
  return (
    <Link to={`details/${country.code}`} className="country-card">
      <div>
        <img src={country.flag} alt={`Flag of $ ${country.name}`} />
      </div>
      <div>
        <div className="country-card__text">
          <h2 className="h2">{country.name}</h2>
          <ul className="country-card__details">
            <li className="country-card__population">
              <span className="bold"> Population: </span>
              {populationFormatted}
            </li>
            <li className="country-card__region">
              <span className="bold">Region:</span> {country.region}
            </li>
            <li className="country-card__capital">
              <span className="bold">Capital:</span> {country.capital}
            </li>
          </ul>
        </div>
      </div>
    </Link>
  )
}

export default CountryCard
