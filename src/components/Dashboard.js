import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'


import RenderCards from './RenderCards'
import Trades from './Trades'
import EditCard from './EditCard'
import DeleteCard from './DeleteCard'
import MakeRequestTrade from './MakeRequestTrade'
import RenderUserCards from './RenderUserCards'
import AddNewCard from './AddNewCard'
import UserHeader from '../containers/UserHeader'
import UserActions from '../components/UserActions'

const userCardsURL = `http://localhost:3001/cards/user/`
export default class Dashboard extends Component {

    constructor(props) {
        console.log(props)
        super(props)

        this.state = {
            cards: []
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
            .then(cards => this.setState({ cards }))
    }
    addCard = card => {
        const cards = [...this.state.cards]
        cards.unshift(card)
        this.setState({ cards })
    }
    updateCard = updatedCard => {
        const cards = [...this.state.cards]
        const indexOfCard = cards.findIndex(card => card.id === updatedCard.id)
        cards.splice(indexOfCard, 1, updatedCard)
        this.setState({ cards })
    }

    render() {
        return (
            <div>
                <UserHeader />
                <UserActions />
                <div className="home-container">
                    <Route path='/dashboard' exact render={() => <RenderUserCards cards={this.state.cards} />} />
                    <Route path='/dashboard/browse' render={() => <RenderCards loggedIn={true} />} />
                    <Route path='/dashboard/addcard' render={() => <AddNewCard addCard={this.addCard} />} />
                    <Route path='/dashboard/edit/:id' render={({ match }) => <EditCard card_id={match.params.id} card={this.state.cards.find(card => card.id == match.params.id)} updateCard={this.updateCard} />} />
                    <Route path='/dashboard/delete/:id' render={({ match }) => <DeleteCard card_id={match.params.id} card={this.state.cards.find(card => card.id == match.params.id)} />} />
                    <Route path='/dashboard/trade/:id' render={({ history, match }) => <MakeRequestTrade history={history} card_id={match.params.id} card={this.state.cards.find(card => card.id == match.params.id)} />} />
                    <Route path='/dashboard/trades/' render={({ history, match }) => <Trades />} />

                </div>
            </div>
        )
    }
}
