import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';

export default class TradeOffers extends Component {
    render() {
        return (
            <div>
                <div className="trade-container">
                    {
                        this.props.trades.map(trade => {
                            return (
                                <div className="trade-details">
                                    <h3 className="page-title"> Status: {trade.status} </h3>
                                    <h5> Request from <span style={{ fontSize: '16px', color: 'red' }}>{trade.trader.username} </span></h5>
                                    <div className="thumbnail-container">
                                        <img src={trade.requested_card.img_url} className="thumbnail" alt="card" />
                                    </div>
                                    <ul>
                                        <li> {trade.requested_card.first_name} {trade.requested_card.last_name}</li>
                                        <li> Year: {trade.requested_card.year}</li>
                                        <li> Team: {trade.requested_card.team}</li>

                                    </ul>
                                    <h6> Offering {trade.cards.length > 1 ? `${trade.cards.length} cards` : '1 card'}  </h6>
                                    <div>
                                        <Link to={`/dashboard/offers/${trade.id}`}><Button size="small" color="primary" variant="contained" >View Offer</Button> </Link>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
