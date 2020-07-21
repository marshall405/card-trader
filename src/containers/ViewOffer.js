import React, { useState } from 'react'

import RequestedCard from './RequestedCard'
import DisplayAvailableCard from './DisplayAvailableCard'


import Button from '@material-ui/core/Button';




export default function ViewOffer(props) {
    const renderOffering = () => {
        return props.trade.cards.map(card => <DisplayAvailableCard key={card.id} card={card} />)
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
        <div>
            <div>
                <h4> {props.trade.trader.username} has made you an offer!</h4>
                <Button size="small" color="primary" variant="contained" onClick={acceptOffer}>Accept</Button>
                <Button size="small" color="secondary" variant="contained" onClick={declineOffer}>Decline</Button>
            </div>
            <div className="requested-card">
                <h3>Card Being Requested</h3>
                <RequestedCard card={props.trade.requested_card} />

            </div>


            <div className="cards-offered">
                <h3>Cards being offered by {props.trade.trader.username}</h3>
                <div className="offers">
                    {renderOffering()}
                </div>
            </div>
        </div>
    )
}
