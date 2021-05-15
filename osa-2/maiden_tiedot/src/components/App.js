import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Coutries from './Coutries'

function App() {
  const [countries, setCountries] = useState([]);
  const [coutryFilter, setCoutryFilter] = useState('');

  const hook = () => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data);
      });
  }

  useEffect(hook, [])
  const handleCountryFilterChange = (event) => {
    setCoutryFilter(event.target.value);
  };


  return (
    <div>
      Find countries: <input value={coutryFilter} onChange={handleCountryFilterChange} />
      <Coutries countries={countries} coutryFilter={coutryFilter} onClick={setCoutryFilter} />
    </div>
  );
}

export default App;
