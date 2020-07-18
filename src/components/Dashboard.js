import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'


import RenderCards from './RenderCards'
import RenderUserCards from './RenderUserCards'
import AddNewCard from './AddNewCard'
import UserHeader from '../containers/UserHeader'
import UserActions from '../components/UserActions'
export default class Dashboard extends Component {

    constructor(props) {
        super(props)

        this.state = {
            user: props.user,
            cards: props.user.cards
        }
    }

    updateUserCards = card => {
        const cards = [...this.state.cards]
        cards.unshift(card)
        this.setState({ cards })
    }

    render() {
        return (
            <div>
                <UserHeader name={this.state.user.username} />
                <UserActions />
                <div className="home-container">

                    <Route path='/' exact render={() => <RenderUserCards cards={this.state.cards} />} />
                    <Route path='/browse' render={() => <RenderCards />} />
                    <Route path='/addcard' render={() => <AddNewCard updateUserCards={this.updateUserCards} />} />
                    <Route path='/logout' render={() => this.props.logUserOut()} />

                </div>
            </div>
        )
    }
}
