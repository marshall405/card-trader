import React, { Component } from 'react'
import { Link } from "react-router-dom";

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import ViewTrade from '../containers/ViewTrade'
const tradeURL = `${process.env.REACT_APP_API}/trades/`
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
    cancelTrade = () => {
        const jwt = window.localStorage.getItem("jwt")
        fetch(tradeURL + this.props.trade_id, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `bearer: ${jwt}`
            }
        })
            .then(res => res.json())
            .then(json => {
                this.props.clearTradeId(json.cards)

                this.props.history.push('/dashboard/trades')
            })
    }
    render() {
        return (
            <Container className="home-container">
                <h3 className="page-title">Viewing Trade Request</h3>
                <div style={{ textAlign: 'right' }}>
                    <Link to="/dashboard/trades" style={{ textDecoration: 'none' }}><Button size="small" color="primary" variant="contained" >Back to Trade Requests</Button></Link>
                </div>
                <div className="offer-actions">
                    <Button size="small" color="secondary" variant="contained" onClick={this.cancelTrade}>Cancel Trade</Button>
                </div>
                {
                    this.state.loading ?
                        <h3> ...Fetching data</h3>
                        :
                        <>
                            <ViewTrade trade={this.state.trade} />
                        </>
                }
            </Container>
        )
    }
}
