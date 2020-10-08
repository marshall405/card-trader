import React, { Component } from 'react'

import Container from '@material-ui/core/Container';

import AvailableCards from './AvailableCards'

const makeTradeOfferURL = `${process.env.REACT_APP_API}/trades`
export default class MakeOffer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            success: false
        }
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
                card_id: this.props.card_id,
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

                {
                    this.state.success ?
                        <h5 className="success"> Trade created successfully!</h5>
                        :
                        null
                }

                <AvailableCards handleSubmitOffer={this.handleSubmitOffer} cards={this.props.cards} />

            </Container>
        )
    }
}
