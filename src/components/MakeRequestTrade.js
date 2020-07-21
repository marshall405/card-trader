import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button';

import RequestedCard from '../containers/RequestedCard'
import AvailableCards from './AvailableCards'

const cardURL = "http://localhost:3001/cards/"
const makeTradeOfferURL = "http://localhost:3001/trades"
export default class MakeRequestTrade extends Component {

    constructor(props) {
        console.log(props)
        super(props)
        this.state = {
            requestedCard: {},
            loading: true,
            success: false
        }
    }

    componentDidMount() {
        this.fetchRquestedCard()

    }

    fetchRquestedCard() {
        fetch(cardURL + this.props.card_id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `bearer: ${window.localStorage.getItem("jwt")}`
            }
        })
            .then(res => res.json())
            .then(card => {
                this.setState({ requestedCard: card, loading: false })
            })
    }

    handleSubmitOffer = cardOfferIds => {
        // ready to create an offer
        fetch(makeTradeOfferURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `bearer: ${window.localStorage.getItem("jwt")}`
            },
            body: JSON.stringify({
                card_id: this.state.requestedCard.card.id,
                cards: cardOfferIds
            })
        })
            .then(res => res.json())
            .then(json => {
                console.log(json)
                this.setState({ success: true })
                setTimeout(() => this.props.history.push("/dashboard/trades/"), 400)

            })
    }
    render() {
        return (
            <div>
                <h1>Request Trade </h1>
                <div style={{ textAlign: 'right' }}>
                    <Link to="/dashboard/browse" style={{ textDecoration: 'none' }}><Button size="small" color="primary" variant="contained" >Back to Browsing</Button></Link>
                </div>
                {
                    this.state.success ?
                        <h5 className="success"> Trade created successfully!</h5>
                        :
                        null
                }
                {
                    this.state.loading ?
                        <div>
                            ...fetching Trade information
                    </div>
                        :

                        <>
                            <RequestedCard card={this.state.requestedCard} />
                            <AvailableCards cards={this.state.requestedCard} handleSubmitOffer={this.handleSubmitOffer} cards={this.props.cards} />
                        </>


                }
            </div>
        )
    }
}
