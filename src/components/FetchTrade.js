import React, { Component } from 'react'

import ViewTrade from '../containers/ViewTrade'
const tradeURL = "http://localhost:3001/trades/"
export default class FetchTrade extends Component {
    constructor(props) {
        super(props)
        this.state = {
            trade: {},
            loading: true
        }
    }

    componentDidMount() {
        this.fetchTrade()
    }

    fetchTrade() {
        const jwt = window.localStorage.getItem("jwt")
        fetch(tradeURL + this.props.trade_id, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `bearer: ${jwt}`
            }
        })
            .then(res => res.json())
            .then(json => {
                this.setState({ trade: json, loading: false })
            })
    }
    render() {
        return (
            <div>
                <h3>Trade {this.props.trade_id}</h3>
                {
                    this.state.loading ?
                        <h3> ...Fetching data</h3>
                        :
                        <>
                            <ViewTrade trade={this.state.trade} />
                        </>
                }
            </div>
        )
    }
}
