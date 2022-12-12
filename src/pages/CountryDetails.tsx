import { Link, useParams } from 'react-router-dom'
import { useState, useMemo } from 'react'
import useGetCountry from '../hooks/useGetCountry'
import { formatPopulation } from '../helpers/helpers'
import backIcon from '../assets/back.svg'

function CountryDetails() {
  let { code = '' } = useParams<string>()

  const [country, loading, error] = useGetCountry(code)

  const languagesDOM = useMemo(() => {
    const langString = country?.languages.reduce((prec, lang) => {
      return `${lang}, ${prec}`
    }, '')

    return langString?.slice(0, -2)
  }, [country])

  const populationFormatted = useMemo(() => {
    if (country?.population) return formatPopulation(country.population)
  }, [country])

  const bordersDOM = useMemo(() => {
    if (country?.borders)
      return country.bordersName.map((borderName, index) => {
        return (
          <Link
            to={`/details/${country.borders[index]}`}
            className="link link--sm country-details__border"
            key={index}
          >
            {borderName}
          </Link>
        )
      })
  }, [country])

  return (
    <div className="country-details">
      <Link to="/" className="link link--back">
        <img src={backIcon} alt="back arrow" />
        Back
      </Link>
      <div className="country-details__container">
        <img src={country?.img} alt="" className="country-details__img" />
        <div className="country-details__text">
          <h2 className="h2 h2--lg">{country?.name}</h2>

          <ul className="country-details__list">
            <li className="country-details__item">
              <span className="bold">Native Name: </span>
              {country?.nativeName}
            </li>
            <li className="country-details__item">
              <span className="bold">Population: </span>
              {populationFormatted}
            </li>
            <li className="country-details__item">
              <span className="bold">Region: </span>
              {country?.region}
            </li>
            <li className="country-details__item">
              <span className="bold">Sub Region: </span>
              {country?.subregion}
            </li>
            <li className="country-details__item">
              <span className="bold">Capital: </span>
              {country?.capital}
            </li>
          </ul>
          <ul className="country-details__list">
            <li className="country-details__item">
              <span className="bold">Top Level Domain: </span>
              {country?.tld}
            </li>
            <li className="country-details__item">
              <span className="bold">Currency: </span>
              {country?.currencies}
            </li>
            <li className="country-details__item">
              <span className="bold">Languages: </span>
              {languagesDOM}
            </li>
          </ul>

          {country?.borders && (
            <div className="country-details__borders">
              <h3 className="h3">Border Countries: </h3>
              <div className="country-details__border-wrapper">
                {bordersDOM}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CountryDetails
