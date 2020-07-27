import React from 'react'

import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import Grid from '@material-ui/core/Grid';

import UserCard from '../containers/UserCard'

export default function RenderUserCards(props) {

    const renderCards = () => {
        if (props.cards.length > 0) {
            return props.cards.map(card => <UserCard key={card.id} card={card} deleteCard={props.deleteCard} />)
        }
        return (
            <div style={{ textAlign: 'center' }}>
                <h3> You have 0 cards! </h3>
                <Link to={`/dashboard/addcard`}><Button size="small" color="primary" variant="contained" onClick={() => props.setActionValue(2)}>Add New Card</Button> </Link>
            </div>
        )
    }

    return (
        <Container className="home-container">

            <h1 className="page-title"> My Cards</h1>
            <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
                {renderCards()}
            </Grid>

        </Container>
    )
}

