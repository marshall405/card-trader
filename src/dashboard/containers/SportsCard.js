import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card'

import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import Typography from '@material-ui/core/Typography';


import Button from '@material-ui/core/Button';


const useStyles = makeStyles({
    root: {
        width: 310,
        height: 300
    },
    title: {
        fontSize: 18,
    },
    box: {
        boxShadow: "none"
    },
});


export default function SportsCard(props) {
    const classes = useStyles();
    const [toggle, setToggle] = useState(true)
    const { title, img_url, first_name, last_name, team, year, condition, created_at } = props.card

    return (


        <Card className={classes.box} onMouseLeave={() => setToggle(true)}>
            {toggle ?
                <CardContent className={classes.root}>
                    <Typography align="center" className={classes.title} color="textSecondary" gutterBottom>
                        {first_name + ' ' + last_name}
                    </Typography>
                    <CardMedia style={{ textAlign: "center" }}>
                        <img src={img_url} alt="player" />
                    </CardMedia>

                    <Typography align="center" className={classes.title} color="textSecondary" gutterBottom>
                        {title}
                    </Typography>
                </CardContent>
                :
                <CardContent className={classes.root}>
                    <Typography color="textSecondary" gutterBottom>
                        {props.card.category}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                        Team - {team}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                        Year - {year}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                        Condition - {condition}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                        Added On - {created_at.split("T")[0]}
                    </Typography>
                </CardContent>
            }
            <CardActions>
                <Button size="small" onClick={() => setToggle(!toggle)}>{toggle ? "Details" : "Front"}</Button>
            </CardActions>

            {/* {
                    props.loggedIn && !user_id ?
                        <div className="user-card-actions">
                            <Link to={`/dashboard/edit/${id}`} style={{ textDecoration: 'none' }}> <Button size="small" variant="contained" >Edit Card Details</Button></Link>
                            <Button size="small" color="secondary" variant="contained" onClick={() => props.deleteCard(id)}>Delete Card</Button>
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
                } */}

        </Card >
    )
}