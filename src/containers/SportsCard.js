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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
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
    const { id, category, img_url, first_name, last_name, team, year, condition } = props.card.info || props.card
    const { user_id, username } = props.card.user || props.card
    return (

        <Grid item onMouseLeave={() => setToggle(true)}>

            <Card className={classes.box}>
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

                        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                            Team - {team}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                            Year - {year}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                            Condition - {condition}
                        </Typography>
                        {
                            username ?
                                <Typography variant="h5" color="primary" gutterBottom align="right">
                                    Belongs To - {username}
                                </Typography>
                                :
                                null
                        }

                    </CardContent>
                }
                <CardActions>
                    <Button size="small" onClick={() => setToggle(!toggle)}>{toggle ? "See Back" : "See Front"}</Button>
                </CardActions>
                {
                    props.loggedIn && !user_id ?
                        <div className="user-card-actions">
                            <Link to={`/dashboard/edit/${id}`} style={{ textDecoration: 'none' }}> <Button size="small" variant="contained" >Edit Card Details</Button></Link>
                            <Button size="small" color="secondary" variant="contained" >Delete Card</Button>
                        </div>
                        :
                        null
                }
                {
                    props.loggedIn && user_id ?
                        <div className="user-card-actions">
                            <Link to={`/dashboard/trades/${id}/new`} style={{ textDecoration: 'none' }}><Button size="small" color="primary" variant="contained" >Request Trade</Button></Link>
                        </div>
                        :
                        null
                }

            </Card >

        </Grid >



    )
}