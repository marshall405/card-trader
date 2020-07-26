import React, { useState } from 'react'
import { Link } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'

import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import Typography from '@material-ui/core/Typography';


import Button from '@material-ui/core/Button';

import ImgModal from './ImgModal'


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
    viewImg: {
        '&:hover': {
            cursor: "pointer"
        }
    },
    flex: {
        display: 'flex',
        justifyContent: 'space-between'
    }
});
export default function RequestedCard(props) {
    const classes = useStyles();
    const [toggle, setToggle] = useState(true)
    const [show, setShow] = useState(false)
    const { id, img_url, first_name, last_name, team, year, condition } = props.card.card || props.card

    const viewImage = () => {
        setShow(!show)
    }
    return (
        <Grid item onMouseLeave={() => setToggle(true)} style={{ width: "380px" }}>
            <Card className={classes.box}>
                {toggle ?
                    <CardContent className={classes.root}>
                        <CardMedia style={{ textAlign: "center" }}>
                            <img className={classes.viewImg} src={img_url} alt="player" onClick={viewImage} />
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
                    </CardContent>
                }
                <CardActions className={classes.flex}>
                    <Button size="small" onClick={() => setToggle(!toggle)}>{toggle ? "Details" : "Front"}</Button>
                    <Link to={`/dashboard/cards/${id}`} ><Button size="small" > View Page</Button> </Link>
                </CardActions>

            </Card >

            {
                show ?
                    <ImgModal img_url={img_url} setShow={viewImage} />
                    :
                    null
            }
        </Grid >
    )
}
