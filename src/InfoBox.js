import React from 'react'
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { CardContent } from '@material-ui/core';
import './InfoBox.css'

function InfoBox(props) {
    return (
        <Card
            className=
            {`infoBox ${props.active && 'infoBox--selected'} ${props.isRed && 'infoBox--red'}`}
            onClick={props.onClick}>
            <CardContent>
                <Typography color='textSecondary' className='infoBox__title'>
                    {props.title}
                </Typography>

                <h2 className={`infoBox__cases && ${!props.isRed && 'infoBox__cases--green'}`}>{props.cases}</h2>

                <Typography color='textSecondary' className='infoBox__total'>
                    {props.total}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
