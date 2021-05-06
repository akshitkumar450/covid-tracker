import React, { useState, useEffect } from 'react'
import './App.css';
import { FormControl, MenuItem, Select } from '@material-ui/core';
import axios from 'axios'

function App() {
  const [countries, setCountries] = useState([])
  const [city, setCity] = useState('worldwide')

  // loads when the components load and never after
  // with fetch

  // useEffect(() => {
  //   const getCountriesData = async () => {
  //     await fetch('https://disease.sh/v3/covid-19/countries')
  //       .then((response) => response.json())
  //       .then((data) => {
  //         const countries = data.map((country) => {
  //           return (
  //             {
  //               name: country.country, // united states,india...
  //               value: country.countryInfo.iso2 //country code UK,USA,IN..
  //             }
  //           )
  //         })
  //         setCountries(countries)
  //       })
  //   }
  //   getCountriesData()

  // }, [])

  // axios
  useEffect(() => {
    const getCountriesData = async () => {
      const fetchedCountriesData = await axios.get('https://disease.sh/v3/covid-19/countries')
      // console.log(countries.data); //array
      const fetchedCountries = fetchedCountriesData.data.map((country) => {
        return (
          {
            name: country.country,
            value: country.countryInfo.iso2
          }
        )
      })
      setCountries(fetchedCountries)
    }
    getCountriesData()
  }, [])

  // all countries (object ->>name and value)
  // console.log(countries);

  // to handle which country we have clicked

  const onCountryChange = (e) => {
    const countryCode = e.target.value
    // console.log(e.target);
    setCity(countryCode)
  }

  return (
    <div className="app">
      <div className='app__header'>
        <h1>covid-19 tracker</h1>
        <FormControl className='app__dropdown'>
          <Select
            value={city}  //default value and  this will change when we select from dropdown
            variant='outlined'
            onChange={onCountryChange}
          >
            {/**loop through all the countries for the options */}
            <MenuItem value='worldwide'>WorldWide</MenuItem>  {/*this  will be shown by default*/}
            {
              countries.map((country) => {
                return (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                )
              })
            }
          </Select>
        </FormControl>
      </div>



      {/**header */}
      {/**title+ dropdown for country */}

      {/**box for recovered */}
      {/**box for cases */}
      {/**box for deaths */}

      {/** table*/}
      {/** graph*/}

      {/** map*/}

    </div>
  );
}

export default App;
