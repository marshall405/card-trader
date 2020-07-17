import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import Header from '../containers/Header'
import Signup from '../components/Signup'
import Login from '../components/Login'
import Card from '../containers/Card'
const cardsURL = "http://localhost:3001/cards"

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cards: []
        }
    }

    componentDidMount() {
        this.fetchAllCards()
    }

    fetchAllCards() {
        fetch(cardsURL)
            .then(res => res.json())
            .then(cards => {
                this.setState({ cards })
            })
    }

    renderCards() {
        return this.state.cards.map(card => <Card key={card.info.id} card={card} />)
    }
    render() {
        return (
            <div>
                <Header />
                <Route path='/' exact render={() => this.renderCards()} />




                <Route path='/signup' exact render={() => <Signup />} />
                <Route path='/login' exact render={() => <Login />} />
            </div>
        )
    }
}
