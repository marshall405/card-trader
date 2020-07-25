import React from 'react'

import RequestedCard from './RequestedCard'
import DisplayAvailableCard from './DisplayAvailableCard'

export default function ViewTrade(props) {

    const renderOffering = () => {
        return props.trade.cards.map(card => <DisplayAvailableCard key={card.id} card={card} />)
    }
    return (
        <div>
            <div className="requested-card">
                <h3 className="page-title">Card Requested </h3>
                <RequestedCard card={props.trade.requested_card} tradee={props.trade.tradee} />
            </div>

            <div className="cards-offered">
                <h3 className="page-title">Your cards being offered!</h3>
                <div className="offers">
                    {renderOffering()}
                </div>
            </div>
        </div>
    )
}
