import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import IMG from '../assets/images/download.jpg'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import Typography from '@material-ui/core/Typography';


import Button from '@material-ui/core/Button';


const useStyles = makeStyles({
    root: {
        width: 100,
        height: 150,

    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 12,
    },
    box: {
        boxShadow: "0px 1px 10px rgba(0,0,0,.5)",
        padding: "13px"
    },
    small: {
        fontSize: 11
    }
});
export default function DisplayAvailableCard(props) {
    const classes = useStyles();
    const [toggle, setToggle] = useState(true)
    const [selected, setSelected] = useState(false)
    const { id, category, img_url, first_name, last_name, team, year, condition } = props.card
    const toggleSelectCard = (id, e) => {
        e.stopPropagation()
        setSelected(!selected)
        props.toggleSelectCard(id)
    }
    return (

        <Grid item style={selected ? { border: "2px solid blue" } : null} onMouseLeave={() => setToggle(true)} onClick={(e) => toggleSelectCard(id, e)}>
            <Card className={classes.box} >
                <Typography align="left" variant="subtitle1" color="textSecondary">
                    {category}
                </Typography>
                {toggle ?
                    <CardContent className={classes.root}>
                        <CardMedia style={{ textAlign: "center" }}>
                            <img src={IMG} />
                        </CardMedia>
                        <Typography align="center" className={classes.title} color="textSecondary" gutterBottom>
                            {first_name + ' ' + last_name}
                        </Typography>
                    </CardContent>
                    :
                    <CardContent className={classes.root}>

                        <Typography className={classes.small} variant="subtitle1" color="textSecondary" gutterBottom>
                            Team - {team}
                        </Typography>
                        <Typography className={classes.small} variant="subtitle1" color="textSecondary" gutterBottom>
                            Year - {year}
                        </Typography>
                        <Typography className={classes.small} variant="subtitle1" color="textSecondary" gutterBottom>
                            Condition - {condition}
                        </Typography>
                    </CardContent>
                }
                <CardActions>
                    <Button size="small" onClick={(e) => {e.stopPropagation();setToggle(!toggle)}}>{toggle ? "See Back" : "See Front"}</Button>
                </CardActions>

            </Card >

        </Grid >

    )
}
