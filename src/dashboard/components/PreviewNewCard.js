import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
    root: {
        boxShadow: "0px 0px 2px 0px black",
        margin: "5px",
        borderRadius: "5px"
    },
    img: {
        display: "flex",
        alignItems: "center",
        border: "2px solid black",
        marginRight: "40px",
        width: "140px",
        justifyContent: "center"
    }
});
export default function PreviewNewCard(props) {
    const classes = useStyles();
    const { title, category, condition, img } = props

    return (
        <Grid item className={classes.root + " preview"}>
            <div className={classes.img}>

                {
                    img ?
                        <img src={img} alt="player" />
                        :
                        <h3> IMAGE HERE </h3>
                }
            </div>

            <div>

                <h4> {title || "TITLE GOES HERE"} </h4>


                <Typography variant="subtitle1" color="textSecondary" >
                    {condition}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" >
                    0 pending trades
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" >
                    Added On: today's date...
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" >
                    {category}
                </Typography>
            </div>
        </Grid>
    )
}
