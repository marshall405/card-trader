import React, { Component } from 'react'

import TradeRequests from './TradeRequests'

const tradesURL = "http://localhost:3001/trades/"
export default class Trades extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tradeRequests: [],
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
                const pending = json.traders.filter(trade => trade.status === "pending")
                this.setState({
                    tradeRequests: pending,
                    loading: false
                })
            })
    }
    renderRequests() {
        if (this.state.tradeRequests.length > 0) {
            return <TradeRequests trades={this.state.tradeRequests} />
        }
        return "No Trades At This Time!"
    }
    render() {
        return (
            <div>
                <h1>Trades</h1>

                {
                    this.state.loading ?
                        <h3> ...Fetching data </h3>
                        :
                        this.renderRequests()
                }
            </div>
        )
    }
}

