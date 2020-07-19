import React, { Component } from 'react'

export default class Trades extends Component {
    constructor(props) {
        super(props)
        this.state = {
            requestedTrades: []
        }
    }
    componentDidMount() {
        this.fetchTrades()
    }

    fetchTrades() {

    }
    render() {
        return (
            <div>
                <h1>Trades</h1>
            </div>
        )
    }
}

