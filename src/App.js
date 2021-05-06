import React, { useState, useEffect } from 'react'
import './App.css';
import { FormControl, MenuItem, Select } from '@material-ui/core';
import axios from 'axios'
import InfoBox from './InfoBox';
import Map from './Map';
import Card from '@material-ui/core/Card';
import { CardContent } from '@material-ui/core';

function App() {
  const [countries, setCountries] = useState([])
  const [city, setCity] = useState('worldwide')

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
      {/**left part */}
      <div className='app__left'>
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

        <div className='app__stats'>
          <InfoBox title='coronovirus cases' cases={123} total={2000} />
          <InfoBox title='coronovirus recovered' cases={465} total={100} />
          <InfoBox title='coronovirus deaths' cases={456} total={50} />
        </div>
        {/**box for cases */}
        {/**box for recovered */}
        {/**box for deaths */}

        {/** map*/}
        <Map />
      </div>

      {/**right part */}
      <Card className='app__right'>
        <CardContent>
          <h3>live cases</h3>
          {/** table*/}
          <h3>world wide</h3>
          {/** graph*/}
        </CardContent>
      </Card>

    </div>
  );
}

export default App;
