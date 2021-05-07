import React from 'react'
import { MapContainer as LeafletMap, TileLayer } from 'react-leaflet'
import './Map.css'
import { showDataOnMap } from './utils'

function Map({ countries, casesType, center, zoom }) {
    // console.log(countries);
    return (
        <div className='map'>
            <LeafletMap center={center} zoom={zoom}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/** loop through and draw circles */}
                {showDataOnMap(countries, casesType)}
            </LeafletMap>
        </div>
    )
}

export default Map
