import React, { Component } from 'react'


import TradeOffers from './TradeOffers'
const tradesURL = "http://localhost:3001/offers/"
export default class Offers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tradeOffers: [],
            loading: true
        }
    }
    componentDidMount() {
        this.fetchTrades()
    }

    fetchTrades() {
        const jwt = window.localStorage.getItem("jwt")
        fetch(tradesURL, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `bearer: ${jwt}`
            }
        })
            .then(res => res.json())
            .then(json => {

                const pending = json.tradees.filter(trade => trade.status === "pending")
                this.setState({
                    tradeOffers: pending,
                    loading: false
                })
            })
    }

    renderOffers() {
        if (this.state.tradeOffers.length > 0) {
            return <TradeOffers trades={this.state.tradeOffers} />
        }
        return "No Offers At This Time!"
    }
    render() {
        return (
            <div>
                <h1>Offers</h1>

                {
                    this.state.loading ?
                        <h3> ...Fetching offers </h3>
                        :
                        this.renderOffers()
                }
            </div>
        )
    }
}