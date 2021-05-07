import React from 'react'
import './Table.css'

function Table(props) {
    return (
        <div className='table'>
            {
                props.countries.map((country) => {
                    return (
                        <tr>
                            <td>{country.country}</td>
                            <td><strong>{country.cases}</strong></td>
                        </tr>
                    )
                })
            }
        </div>
    )
}

export default Table
