import React from 'react'
import CountryDetailed from './CountryDetailed';

const Coutries = ({ countries, coutryFilter, onClick }) => {
  const countriesFiltered = countries.filter(country => country.name.toLowerCase().includes(coutryFilter.toLowerCase()));
  if (countriesFiltered.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    );
  }
  else if (countriesFiltered.length > 1) {
    const listOfCountries = countriesFiltered.map((country) => 
      <li key={country.name}>{country.name}
      <button onClick={() => onClick(country.name)}>show</button>
    </li>);

    return (
      <ul>
        {listOfCountries}
      </ul>
    );
  } else if (countriesFiltered.length === 1) {
    return (
      <CountryDetailed country={countriesFiltered[0]} />
    );
  }
  else if (countriesFiltered.length === 0) {
    return (
      <div>
        No countries found with that filter
      </div>
    );
  }

};
export default Coutries;