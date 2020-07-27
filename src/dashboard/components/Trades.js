import React, { Component } from 'react'

import Container from '@material-ui/core/Container';

import TradeRequests from './TradeRequests'

const tradesURL = "https://evening-crag-02028.herokuapp.com/trades/"
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
        return <h3 className="empty-message">No Trades At This Time!</h3>
    }
    render() {
        return (
            <Container className="home-container">
                <h1 className="page-title">Trades</h1>

                {
                    this.state.loading ?
                        <h3> ...Fetching data </h3>
                        :
                        this.renderRequests()
                }
            </Container>
        )
    }
}

