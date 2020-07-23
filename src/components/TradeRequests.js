import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';

export default class TradeRequests extends Component {
    render() {
        return (
            <div>
                <div className="trade-container">
                    {
                        this.props.trades.map(trade => {



                            return (
                                <div className="trade-details">
                                    <h3> Status: {trade.status} </h3>
                                    <h5>Requested Card</h5>
                                    <div className="thumbnail-container">
                                        <img src={trade.requested_card.img_url} className="thumbnail" />
                                    </div>
                                    <ul>
                                        <li> {trade.requested_card.first_name} {trade.requested_card.last_name}</li>
                                        <li> Year: {trade.requested_card.year}</li>
                                        <li> Team: {trade.requested_card.team}</li>
                                    </ul>
                                    <div>
                                        <Link to={`/dashboard/trades/${trade.id}`}><Button size="small" color="primary" variant="contained" >View Trade</Button> </Link>
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
