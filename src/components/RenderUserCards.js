import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import Grid from '@material-ui/core/Grid';

import SportsCard from '../containers/SportsCard'
import Filter from "./Filter"
export default function RenderUserCards(props) {
    const [category, setCategory] = useState("all")
    const [search, setSearch] = useState("")

    const filterCards = () => {
        return props.cards.filter(card => {
            let player = card.first_name + " " + card.last_name
            return ((card.category === category) || category === "all") && (player.toLocaleLowerCase().includes(search.toLocaleLowerCase().trim()))
        })
    }
    const renderCards = () => {
        const cards = filterCards()
        if (cards.length > 0) {
            return cards.map(card => <SportsCard key={card.id} card={card} loggedIn={true} deleteCard={props.deleteCard} />)
        }
        return (
            <div style={{ textAlign: 'center' }}>
                <h3> You have 0 cards! </h3>
                <Link to={`/dashboard/addcard`}><Button size="small" color="primary" variant="contained" onClick={() => props.setActionValue(2)}>Add New Card</Button> </Link>
            </div>
        )
    }

    const setFilter = (e) => {
        setCategory(e.target.value)
    }
    const handleSearch = (e) => {
        setSearch(e.target.value)
    }
    return (
        <Container className="home-container">
            <Filter setFilter={setFilter} setSearch={handleSearch} />
            <h1 className="page-title"> Viewing Your Cards</h1>
            <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
                {renderCards()}
            </Grid>

        </Container>
    )
}

