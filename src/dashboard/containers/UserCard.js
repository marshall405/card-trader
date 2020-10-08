import React from 'react'
import { Link } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import SportsCard from './SportsCard'
import EditIcon from '../components/EditIcon'
import DeleteIcon from '../components/DeleteIcon'

const useStyles = makeStyles({
    root: {
        boxShadow: "1px 1px 4px 1px black",
        margin: "5px",
        borderRadius: "5px",
        backgroundColor: "#FFF"
    }
});

export default function UserCard(props) {
    const classes = useStyles();

    const deleteCard = () => props.deleteCard(props.card.id)

    return (
        <Grid item className={classes.root}>
            <SportsCard card={props.card} />
            <div className="user-card-actions">
                <Link to={`/dashboard/edit/${props.card.id}`} style={{ textDecoration: 'none' }}>
                    <EditIcon />
                </Link>

                <DeleteIcon deleteCard={deleteCard} />
            </div>
        </Grid>
    )
}
