import React from 'react'
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import SportsCard from '../containers/SportsCard'

const useStyles = makeStyles({
    root: {
        boxShadow: "1px 1px 4px 1px black",
        margin: "5px",
        borderRadius: "5px"
    }
});

export default function TradeCard(props) {
    const classes = useStyles();

    return (
        <Grid item className={classes.root}>
            <SportsCard card={props.card} />
            <div className="user-card-actions">
                <Link to={`/dashboard/trades/${props.card.id}/new`} style={{ textDecoration: 'none' }}><Button size="small" color="primary" variant="contained" >Request Trade</Button></Link>
            </div>
        </Grid>
    )
}
