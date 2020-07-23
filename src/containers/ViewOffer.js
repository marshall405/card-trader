import React, { useState } from 'react'

import { Link } from 'react-router-dom'

import RequestedCard from './RequestedCard'
import DisplayAvailableCard from './DisplayAvailableCard'


import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';




export default function ViewOffer(props) {
    const renderOffering = () => {
        return props.trade.cards.map(card => <DisplayAvailableCard key={card.id} card={card} clickCard={false} />)
    }
    const acceptOffer = () => {
        const confirm = window.confirm("Are you sure you accept this trade?")
        if (confirm) {
            props.acceptOffer(props.trade.id, props.trade.requested_card.id)
        }
    }
    const declineOffer = () => {
        const confirm = window.confirm("Are you sure you wan't to decline this offer?")
        if (confirm) {
            props.declineOffer(props.trade.id)
        }
    }
    return (
        <Container className="home-container">
            <div style={{ textAlign: 'right' }}>
                <Link to="/dashboard/offers" style={{ textDecoration: 'none' }}><Button size="small" color="primary" variant="contained" >Back to Offers</Button></Link>
            </div>
            <div className="offer-actions">
                <h4> {props.trade.trader.username} has made you an offer!</h4>
                <Button size="small" color="primary" variant="contained" onClick={acceptOffer}>Accept</Button>
                <Button size="small" color="secondary" variant="contained" onClick={declineOffer}>Decline</Button>
            </div>
            <div className="requested-card">
                <h3 className="page-title">Card Being Requested</h3>
                <RequestedCard card={props.trade.requested_card} />

            </div>


            <div className="cards-offered">
                <h3 className="page-title">Cards being offered by {props.trade.trader.username}</h3>
                <div className="offers">
                    {renderOffering()}
                </div>
            </div>
        </Container>
    )
}
