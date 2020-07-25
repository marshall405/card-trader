import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'

import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import Typography from '@material-ui/core/Typography';


import Button from '@material-ui/core/Button';


const useStyles = makeStyles({
    root: {
        width: 310,
        height: 200,

    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 18,
    },
    box: {
        boxShadow: "0px 1px 10px rgba(0,0,0,.5)",
        padding: "13px"
    },
});


export default function SportsCard(props) {
    const classes = useStyles();
    const [toggle, setToggle] = useState(true)
    const { id, category, img_url, first_name, last_name, team, year, condition } = props.card.info
    const { user_id, username } = props.card.user

    return (
        <Grid item onMouseLeave={() => setToggle(true)}>

            <Card className={classes.box}>
                <Typography align="left" variant="subtitle1" color="textSecondary">
                    {category}
                </Typography>

                {toggle ?

                    <CardContent className={classes.root}>
                        <CardMedia style={{ textAlign: "center" }}>
                            <img src={img_url} />
                        </CardMedia>
                        <Typography align="center" className={classes.title} color="textSecondary" gutterBottom>
                            {first_name + ' ' + last_name}
                        </Typography>
                    </CardContent>

                    :

                    <CardContent className={classes.root}>
                        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                            Team - {team}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                            Year - {year}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                            Condition - {condition}
                        </Typography>
                        <Typography variant="h6" color="primary" gutterBottom align="right">
                            {username}
                        </Typography>
                    </CardContent>

                }
                <CardActions>
                    <Button size="small" onClick={() => setToggle(!toggle)}>{toggle ? "See Back" : "See Front"}</Button>
                </CardActions>
            </Card >

        </Grid >



    )
}