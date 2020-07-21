import React, { useState } from 'react'

import RequestedCard from './RequestedCard'
import DisplayAvailableCard from './DisplayAvailableCard'


import Button from '@material-ui/core/Button';




export default function ViewTrade(props) {

    const renderOffering = () => {
        console.log(props)
        return props.trade.cards.map(card => <DisplayAvailableCard key={card.id} card={card} />)
    }
    return (
        <div>
            <div className="requested-card">
                <h3>Card Being Requested from {props.trade.tradee.username}</h3>
                <RequestedCard card={props.trade.requested_card} tradee={props.trade.tradee} />
            </div>


            <div className="cards-offered">
                <h3>Your cards being offered!</h3>
                <div className="offers">
                    {renderOffering()}
                </div>
            </div>
        </div>
    )
}
