import React from 'react'
import Weather from './Weather';

const CountryDetailed = ({ country }) => {
    return (
        <div>
            <h1>{country.name}</h1>
                Capital: {country.capital}<br />
                Population: {country.population}
            <h2>Spoken languages</h2>
            <ul>
                {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
            </ul>
            <img src={country.flag} alt="Coutry flag" width="150px" />
            <h2>Weather in {country.capital}</h2>
            <Weather country={country} />
        </div>
    );
};

export default CountryDetailed;