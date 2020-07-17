import React, { Component } from 'react'
import Filter from './Filter'
// material UI
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';

import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';

import SportsCard from '../containers/SportsCard'
const cardsURL = "http://localhost:3001/cards"




export default class RenderCards extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            loading: true,
            category: "all",
            search: ""
        }
    }

    componentDidMount() {
        this.fetchAllCards()
    }

    fetchAllCards() {
        fetch(cardsURL)
            .then(res => res.json())
            .then(cards => {
                this.setState({ cards, loading: !this.state.loading })
            })
    }

    filterCards() {
        return this.state.cards.filter(card => {
            let player = card.info.first_name + " " + card.info.last_name
            return ( (card.info.category === this.state.category) || this.state.category === "all") && (player.includes(this.state.search))
        })

    }

    renderCards() {
        const cards = this.filterCards()
        return cards.map(card => <SportsCard key={card.info.id} card={card} />)
    }

    setFilter = e => this.setState({ category: e.target.value })
    setSearch = e => this.setState({ search: e.target.value })
    render() {
        return (
            <Container maxWidth="xl" className="home-container">
                <Filter setFilter={this.setFilter} setSearch={this.setSearch} />
                {this.state.loading ?
                    <CircularProgress />
                    :
                    <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
                        {this.renderCards()}
                    </Grid>
                }
            </Container>
        )
    }
}
