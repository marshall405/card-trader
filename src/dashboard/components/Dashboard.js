import React, { Component } from 'react'
import { Route } from 'react-router-dom'


import RenderCards from './RenderCards'
import EditCard from './EditCard'
import RenderUserCards from './RenderUserCards'
import AddNewCard from './AddNewCard'
import UserHeader from '../containers/UserHeader'
import UserActions from './UserActions'
import ShowPage from './ShowPage'

import FetchTrade from './FetchTrade'
import Trades from './Trades'

import FetchOffer from './FetchOffer'
import Offers from './Offers'

const userCardsURL = `${process.env.REACT_APP_API}/cards/user/`
const delCardURL = `${process.env.REACT_APP_API}/cards/`

export default class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            cards: [],
            action: 1
        }
    }

    componentDidMount() {
        this.fetchUserCards()
    }

    fetchUserCards() {
        fetch(userCardsURL + window.localStorage.getItem("id"), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `bearer: ${window.localStorage.getItem("jwt")}`
            }
        })
            .then(res => res.json())
            .then(cards => {
                this.setState({ cards })
            })
    }
    addCard = card => {
        const cards = [...this.state.cards]
        cards.unshift(card)
        this.setState({ cards })
    }
    updateCard = updatedCard => {
        const cards = [...this.state.cards]
        const indexOfCard = cards.findIndex(card => card.id === updatedCard.id)
        // replace card with edited card
        cards.splice(indexOfCard, 1, updatedCard)
        this.setState({ cards })
    }
    removeCard = id => {
        const cards = [...this.state.cards]
        const indexOfCard = cards.findIndex(card => card.id === id)
        // remove card 
        cards.splice(indexOfCard, 1)
        this.setState({ cards })
    }

    deleteCard = id => {
        const jwt = window.localStorage.getItem("jwt")
        fetch(delCardURL + id, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `bearer: ${jwt}`
            }
        })
            .then(res => res.json())
            .then(json => this.removeCard(id))
    }

    setTradeId = (tradeCards, tradeID) => {
        const tradeCardIds = tradeCards.map(card => card.id)
        const cards = [...this.state.cards]
        cards.forEach(card => {
            if (tradeCardIds.indexOf(card.id) > -1) {
                card.trade_id = tradeID
            }
        })
        this.setState({ cards })
    }
    clearTradeId = tradeCards => {
        const tradeCardIds = tradeCards.map(card => card.id)
        const cards = [...this.state.cards]
        cards.forEach(card => {
            if (tradeCardIds.indexOf(card.id) > -1) {
                card.trade_id = null
            }
        })
        this.setState({ cards })
    }
    setActionValue = newValue => {
        this.setState({ action: newValue })
    }
    render() {
        return (
            <div className="dashboard">
                <UserHeader setActionValue={this.setActionValue} />
                <UserActions setActionValue={this.setActionValue} action={this.state.action} />
                <div className="home-container">
                    <Route path='/dashboard' exact render={() => <RenderUserCards cards={this.state.cards} deleteCard={this.deleteCard} setActionValue={this.setActionValue} />} />
                    <Route path='/dashboard/browse' render={() => <RenderCards loggedIn={true} />} />
                    <Route path='/dashboard/addcard' render={() => <AddNewCard addCard={this.addCard} setActionValue={this.setActionValue} />} />
                    <Route path='/dashboard/edit/:id' render={({ match }) => <EditCard card_id={match.params.id} card={this.state.cards.find(card => card.id === parseInt(match.params.id))} updateCard={this.updateCard} />} />
                    <Route path='/dashboard/trades/:id' exact render={({ history, match }) => <FetchTrade history={history} trade_id={match.params.id} clearTradeId={this.clearTradeId} />} />
                    <Route path='/dashboard/trades/' exact render={({ history, match }) => <Trades />} />
                    <Route path='/dashboard/offers/' exact render={({ history, match }) => <Offers />} />
                    <Route path='/dashboard/offers/:id' exact render={({ history, match }) => <FetchOffer history={history} trade_id={match.params.id} removeCard={this.removeCard} />} />
                    <Route path='/dashboard/cards/:id' render={({ history, match }) => <ShowPage history={history} card_id={match.params.id} card={this.state.cards.find(card => card.id === parseInt(match.params.id))} cards={this.state.cards} setActionValue={this.setActionValue} setTradeId={this.setTradeId} />} />

                </div>
            </div>
        )
    }
}
