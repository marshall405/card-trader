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
            .then(data => {
                let cards = data.filter(d => d.user.user_id !== parseInt(window.localStorage.getItem("id")))
                this.setState({ cards, loading: !this.state.loading })
            })
    }

    filterCards() {
        return this.state.cards.filter(card => {
            let player = card.info.first_name + " " + card.info.last_name
            return ((card.info.category === this.state.category) || this.state.category === "all") && (player.toLocaleLowerCase().includes(this.state.search.toLocaleLowerCase().trim()))
        })

    }

    renderCards() {
        if (this.state.cards.length === 0) {
            return <h3> Sorry, No Cards to show at this time</h3>
        }
        const cards = this.filterCards()
        return cards.map(card => <SportsCard key={card.info.id} card={card} loggedIn={this.props.loggedIn} />)
    }

    setFilter = e => this.setState({ category: e.target.value })
    setSearch = e => this.setState({ search: e.target.value })

    render() {
        return (
            <Container maxWidth="xl" className="home-container">
                <Filter setFilter={this.setFilter} setSearch={this.setSearch} />
                <h1 className="page-title"> Viewing All Cards</h1>
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
