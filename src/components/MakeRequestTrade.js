import React, { Component } from 'react'

import Container from '@material-ui/core/Container';

import RequestedCard from '../containers/RequestedCard'

const cardURL = "http://localhost:3001/cards/"
export default class MakeRequestTrade extends Component {

    constructor(props) {
        super(props)
        this.state = {
            requestedCard: {},
            availableCards: [],
            loading: true
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

    render() {
        console.log(this.state.requestedCard)
        return (
            <div>
                <h1>Request Trade </h1>
                {
                    this.state.loading ?
                        <div>
                            ...fetching Trade information
                    </div>
                        :

                        <Container maxWidth="l" >
                            <RequestedCard card={this.state.requestedCard} />
                        </Container>


                }
            </div>
        )
    }
}
