import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import axios from 'axios'
import numeral from 'numeral'

const options = {
    legend: {
        display: false
    },
    elements: {
        point: {
            radius: 0
        }
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0")
            }
        }
    },
    scales: {
        xAxes: [
            {
                title: 'time',
                time: {
                    format: 'MM/DD/YY',
                    tooltipFormat: 'll'
                }
            }
        ],
        yAxes: [
            {
                gridLines: {
                    display: false
                },
                ticks: {
                    callback: function (value, index, values) {
                        return numeral(value).format("0a")
                    }
                }
            }
        ]
    }
}

function LineGraph({ casesType = 'cases' }) {
    const [data, setData] = useState({})

    const buildChartData = (data, casesType = 'cases') => {
        const chartData = []
        let lastDataPoint;

        for (let date in data.cases) {
            if (lastDataPoint) {
                const newDataPoint = {
                    x: date,
                    y: data[casesType][date] - lastDataPoint
                }
                chartData.push(newDataPoint)
            }
            lastDataPoint = data[casesType][date];
        };
        return chartData
    }

    useEffect(() => {
        const lastDays = async () => {
            const lastData =
                await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
            // console.log(lastData.data.cases);
            const chartData = buildChartData(lastData.data, casesType)
            setData(chartData)
        }
        lastDays()
    }, [casesType])

    return (
        <div className='linegraph'>
            {
                data?.length > 0 && (
                    <Line
                        data={{
                            datasets: [{
                                data: data,
                                backgroundColor: 'rgba(204,16,52,0.5)',
                                borderColor: '#CC1034',
                            }]
                        }}
                        options={options}
                    />
                )
            }

        </div>
    )
}

export default LineGraph
