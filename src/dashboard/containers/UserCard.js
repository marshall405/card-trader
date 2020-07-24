import React from 'react'
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import SportsCard from '../containers/SportsCard'

const useStyles = makeStyles({
    root: {
        boxShadow: "1px 1px 4px 1px black",
        margin: "5px",
        borderRadius: "5px"
    }
});

export default function UserCard(props) {
    const classes = useStyles();
    return (
        <Grid item className={classes.root}>
            <SportsCard card={props.card} />
            <div className="user-card-actions">
                <Link to={`/dashboard/edit/${props.card.id}`} style={{ textDecoration: 'none' }}> <Button size="small" variant="contained" >Edit Card Details</Button></Link>
                <Button size="small" color="secondary" variant="contained" onClick={() => props.deleteCard(props.card.id)}>Delete Card</Button>
            </div>
        </Grid>
    )
}
