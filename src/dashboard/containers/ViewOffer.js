import React from 'react'

import { Link } from "react-router-dom";
import OfferRequestedCard from './OfferRequestedCard'
import DisplayOfferedCard from './DisplayOfferedCard'

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

export default function ViewOffer(props) {
    const renderOffering = () => {
        return props.trade.cards.map(card => <DisplayOfferedCard key={card.id} card={card} clickCard={false} />)
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
            <div className="main-content">
            <div className="offer-actions">
                <h4> {props.trade.trader.username.toUpperCase()} has made you an offer for your {props.trade.requested_card.first_name + " " + props.trade.requested_card.last_name} card!</h4>
                <Button size="small" color="primary" variant="contained" onClick={acceptOffer}>Accept</Button>
                <Button size="small" color="secondary" variant="contained" onClick={declineOffer}>Decline</Button>
            </div>
            <div className="requested-card">
                <h3 className="page-title">Card requested </h3>
                <OfferRequestedCard card={props.trade.requested_card} />

            </div>


            <div className="cards-offered">
                <h3 className="page-title">{props.trade.trader.username.toUpperCase()} is offering {props.trade.cards.length > 1 ? `${props.trade.cards.length} cards` : `1 card`}</h3>
                <div className="offers">
                    {renderOffering()}
                </div>
            </div>
            </div>
        </Container>
    )
}
