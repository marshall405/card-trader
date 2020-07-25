import React, { Component } from 'react'
import Filter from './Filter'
import Search from './Search'

import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import PreviewCard from '../containers/PreviewCard'
const cardsURL = "http://localhost:3001/cards"




export default class RenderCards extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            loading: true,
            category: "All",
            condition: "All",
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
            return (
                (card.info.category === this.state.category) || this.state.category === "All") &&
                (player.toLocaleLowerCase().includes(this.state.search.toLocaleLowerCase().trim()) &&
                    (card.info.condition === this.state.condition || this.state.condition === "All")
                )
        })

    }

    renderCards() {
        if (this.state.cards.length === 0) {
            return <h3> Sorry, No Cards to show at this time</h3>
        }
        const cards = this.filterCards()
        return cards.map(card => <PreviewCard key={card.info.id} card={card.info} requestedTrades={card.trades.requested_trades} />)
    }

    setCategory = category => this.setState({ category })
    setCondition = condition => this.setState({ condition })
    setSearch = e => this.setState({ search: e.target.value })

    render() {
        return (
            <Container maxWidth="xl" className="home-container">
                <Search setSearch={this.setSearch} />

                <h1 className="page-title"> All Cards</h1>

                <div className="main">

                    <Filter setCategory={this.setCategory} setCondition={this.setCondition} category={this.state.category} condition={this.state.condition} />
                    <div className="content">
                        {this.state.loading ?
                            <CircularProgress align="center" />
                            :
                            <Grid container direction="column" justify="center" spacing={1}>
                                {this.renderCards()}
                            </Grid>
                        }
                    </div>
                </div>
            </Container>
        )
    }
}
