import React, { useState, useEffect } from 'react'


import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';

import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';

import SportsCard from '../containers/SportsCard'
import Filter from "./Filter"
export default function RenderUserCards(props) {
    const [category, setCategory] = useState("all")
    const [search, setSearch] = useState("")

    useEffect(() => {

    })
    const filterCards = () => {
        return props.cards.filter(card => {
            let player = card.first_name + " " + card.last_name
            return ((card.category === category) || category === "all") && (player.toLocaleLowerCase().includes(search.toLocaleLowerCase().trim()))
        })
    }
    const renderCards = () => {
        const cards = filterCards()
        return cards.map(card => <SportsCard key={card.id} card={card} loggedIn={true} />)
    }

    const setFilter = (e) => {
        setCategory(e.target.value)
    }
    const handleSearch = (e) => {
        setSearch(e.target.value)
    }
    return (
        <Container maxWidth="xl" className="home-container">
            <Filter setFilter={setFilter} setSearch={handleSearch} />
            <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
                {renderCards()}
            </Grid>

        </Container>
    )
}

