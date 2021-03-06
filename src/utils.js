import React from 'react'
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

const casesTypeColors = {
    cases: {
        hex: "#CC1034",
        multiplier: 800,
    },
    recovered: {
        hex: "#7dd71d",
        multiplier: 1200,
    },
    deaths: {
        hex: "#fb4443",
        multiplier: 2000,
    },
};

export const sortData = (data) => {

    const sortedData = [...data];
    sortedData.sort((a, b) => {
        if (a.cases > b.cases) {
            return -1
        } else {
            return 1
        }
    })
    return sortedData;
}

// draw circles on map with interactive tooltip
export const showDataOnMap = (data, casesType = 'cases') => {
    return data.map((country) => {
        // console.log(country);
        return (
            <Circle
                center={[country.countryInfo.lat, country.countryInfo.long]}
                fillOpacity={0.4}
                color={casesTypeColors[casesType].hex}
                fillColor={casesTypeColors[casesType].hex}
                radius={
                    Math.sqrt(country[casesType] * casesTypeColors[casesType].multiplier)
                }
            >
                <Popup>
                    <div className='info-container'>
                        <div className='info-flag' style={{ backgroundImage: `url(${country.countryInfo.flag})` }} />
                        <div className='info-name' >{country.country}</div>
                        <div className='info-cases' >cases:{numeral(country.cases).format("0,0")}</div>
                        <div className='info-deaths' >deaths:{numeral(country.deaths).format("0,0")}</div>
                        <div className='info-recovered' >recovered:{numeral(country.recovered).format("0,0")}</div>
                    </div>
                </Popup>
            </Circle>
        )
    })
}

// for formatiing the style of numbers
export const prettyPrintStat = (stat) => {
    return stat ? `+${numeral(stat).format("0.0a")}` : '+0'
}