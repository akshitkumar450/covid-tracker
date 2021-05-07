import React, { useState, useEffect } from 'react'
import './App.css';
import { FormControl, MenuItem, Select } from '@material-ui/core';
import axios from 'axios'
import InfoBox from './InfoBox';
import Map from './Map';
import Card from '@material-ui/core/Card';
import { CardContent } from '@material-ui/core';
import Table from './Table';
import { prettyPrintStat, sortData } from './utils';
import LineGraph from './LineGraph';
import "leaflet/dist/leaflet.css"

function App() {
  const [countries, setCountries] = useState([])
  const [city, setCity] = useState('worldwide')
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])

  const [mapCenter, setMapCenter] = useState({
    lat: 34.80746,
    lng: -40.4796
  })
  const [zoom, setZoom] = useState(3)
  const [mapCountries, setMapCountries] = useState([])
  const [casesType, setCasesType] = useState('cases')

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

      // console.log(fetchedCountriesData.data);
      // we have to sort it of bases of no of cases
      const sortedData = sortData(fetchedCountriesData.data)
      setTableData(sortedData)

      // unsorted data
      // setTableData(fetchedCountriesData.data)

      setCountries(fetchedCountries)
      setMapCountries(fetchedCountriesData.data)
    }
    getCountriesData()
  }, [])
  // all countries (object ->>name and value)
  // console.log(countries);
  // console.log(tableData);

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
      ? 'https://disease.sh/v3/covid-19/all' //on initial app load it does not fetch data from it ,to do it make request in useEffect
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    const fetchedCountryData = await axios.get(url)
    //console.log(fetchedCountryData.data); //object
    setMapCenter([fetchedCountryData.data.countryInfo.lat, fetchedCountryData.data.countryInfo.long])
    setZoom(6)
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
            isRed={true}
            active={casesType === 'cases'}
            onClick={(e) => setCasesType('cases')}
            title='coronovirus cases'
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={prettyPrintStat(countryInfo.cases)}
          />
          <InfoBox
            active={casesType === 'recovered'}
            onClick={(e) => setCasesType('recovered')}
            title='coronovirus recovered'
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={prettyPrintStat(countryInfo.recovered)}
          />
          <InfoBox
            isRed={true}
            active={casesType === 'deaths'}
            onClick={(e) => setCasesType('deaths')}
            title='coronovirus deaths'
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={prettyPrintStat(countryInfo.deaths)}
          />
        </div>

        {/**inital center and zoom of the map when it loads */}
        <Map countries={mapCountries} casesType={casesType} center={mapCenter} zoom={zoom} />
      </div>

      {/**right part */}
      <Card className='app__right'>
        <CardContent>
          <h3>live cases</h3>
          <Table countries={tableData} />

          <h3>world wide {casesType}</h3>
          <LineGraph casesType={casesType} />
        </CardContent>
      </Card>

    </div>
  );
}

export default App;
