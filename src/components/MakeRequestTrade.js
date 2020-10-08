import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import RequestedCard from '../containers/RequestedCard'
import AvailableCards from './AvailableCards'

const cardURL = "https://evening-crag-02028.herokuapp.com/cards/"
const makeTradeOfferURL = "https://evening-crag-02028.herokuapp.com/trades"
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

                this.setState({ success: true })
                setTimeout(() => {
                    this.props.setTradeId(json.cards, json.trade.id)

                    this.props.setActionValue(3)
                    this.props.history.push("/dashboard/trades/")
                }, 400)

            })
    }
    render() {
        return (
            <Container className="home-container">
                <h1 className="page-title">Request Trade </h1>
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
                            <AvailableCards handleSubmitOffer={this.handleSubmitOffer} cards={this.props.cards} />
                        </>


                }
            </Container>
        )
    }
}
