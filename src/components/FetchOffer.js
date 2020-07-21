import React, { Component } from 'react'

import ViewOffer from '../containers/ViewOffer'
const tradeURL = "http://localhost:3001/offers/"
export default class FetchTrade extends Component {
    constructor(props) {
        super(props)
        this.state = {
            trade: {},
            loading: true,
            success: false
        }
    }

    componentDidMount() {
        this.fetchOffer()
    }

    fetchOffer() {
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
                console.log(json)
                this.setState({ trade: json, loading: false })
            })
    }

    acceptOffer = (id, card_id) => {
        this.updateTrade(id, "accepted")
        this.props.removeCard(card_id)
    }

    declineOffer = (id) => {
        this.updateTrade(id, "declined")
    }
    updateTrade(id, status) {
        const jwt = window.localStorage.getItem("jwt")
        fetch(tradeURL + id, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `bearer: ${jwt}`
            },
            body: JSON.stringify({
                status: status
            })
        })
            .then(res => res.json())
            .then(json => {
                this.setState({ success: true })
                this.props.history.push("/dashboard/offers")
            })
    }
    render() {
        return (
            <div>
                <h3>Trade {this.props.trade_id}</h3>
                {
                    this.state.success ? <h3 className="success"> Trade has been confirmed!</h3> : null
                }
                {
                    this.state.loading ?
                        <h3> ...Fetching data</h3>
                        :
                        <ViewOffer trade={this.state.trade} acceptOffer={this.acceptOffer} declineOffer={this.declineOffer} />
                }
            </div>
        )
    }
}
