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
  const [countryInfo, setCountryInfo] = useState({})

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

  useEffect(() => {
    const fetchWorldwide = async () => {
      const fetchWorldData = await axios.get('https://disease.sh/v3/covid-19/all')
      // console.log(fetchWorldData.data); //object
      setCountryInfo({
        todayCases: fetchWorldData.data.todayCases,
        todayDeaths: fetchWorldData.data.todayDeaths,
        todayRecovered: fetchWorldData.data.todayRecovered,
        deaths: fetchWorldData.data.deaths,
        cases: fetchWorldData.data.cases,
        recovered: fetchWorldData.data.recovered
      })
    }
    fetchWorldwide()
  }, [])

  // to handle which country we have clicked
  const onCountryChange = async (e) => {
    const countryCode = e.target.value
    // console.log(e.target);
    const url = countryCode === 'worldwide'
      ? 'https://disease.sh/v3/covid-19/all' //on initial app load it does not fetch data from it
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    const fetchedCountryData = await axios.get(url)
    // console.log(fetchedCountryData.data); //object
    setCity(countryCode)

    // or we can store the whole object in our state and use it directly instead of saving key value pairs
    setCountryInfo({
      todayCases: fetchedCountryData.data.todayCases,
      todayDeaths: fetchedCountryData.data.todayDeaths,
      todayRecovered: fetchedCountryData.data.todayRecovered,
      deaths: fetchedCountryData.data.deaths,
      cases: fetchedCountryData.data.cases,
      recovered: fetchedCountryData.data.recovered
    })
  }
  // console.log(countryInfo);

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
          <InfoBox
            title='coronovirus cases'
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            title='coronovirus recovered'
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBox
            title='coronovirus deaths'
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
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
