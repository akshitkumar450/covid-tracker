import React from 'react'
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { CardContent } from '@material-ui/core';

function InfoBox(props) {
    return (
        <Card className='infoBox'>
            <CardContent>
                {/*tiel*/}
                <Typography color='textSecondary' className='infoBox__title'>
                    {props.title}
                </Typography>

                {/*cases*/}
                <h2 className='infoBox__cases'>{props.cases}</h2>

                {/*total*/}
                <Typography color='textSecondary' className='infoBox__total'>
                    {props.total}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
