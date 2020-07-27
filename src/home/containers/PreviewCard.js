import React from 'react'
import { Link } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
    root: {
        boxShadow: "0px 0px 2px 0px black",
        margin: "5px",
        borderRadius: "5px"
    }
});

export default function PreviewCard(props) {
    const classes = useStyles();
    const { title, category, img_url, condition, created_at } = props.card
    return (
        <Grid item className={classes.root + " preview"}>
            <div className="preview-img-container">
                <Link to={`/cards/${props.card.id}`} >
                    <img src={img_url} alt="player" />
                </Link>
            </div>

            <div>
                <Link to={`/cards/${props.card.id}`}>
                    <h4> {title || "TITLE GOES HERE"} </h4>
                </Link>

                <Typography variant="subtitle1" color="textSecondary" >
                    {condition}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" >
                    {props.requestedTrades === 1 ? `${props.requestedTrades} pending trade` : `${props.requestedTrades} pending trades`}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" >
                    Added On: {created_at.split("T")[0]}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" >
                    {category}
                </Typography>
            </div>
        </Grid>
    )
}