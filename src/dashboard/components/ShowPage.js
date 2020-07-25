import React, { Component } from 'react'
import { Link } from "react-router-dom";

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import MakeOffer from './MakeOffer';

const cardURL = "http://localhost:3001/cards/";
export default class ShowPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            card: {},
            user: {},
            offer: false,
        }
    }

    componentDidMount() {
        this.fetchCard()
    }

    fetchCard() {
        fetch(cardURL + this.props.card_id)
            .then(res => res.json())
            .then(json => this.setState({ card: json.card, user: json.user }))
    }
    render() {
        const { title, first_name, last_name, img_url, year, condition } = this.state.card
        return (
            <Container maxWidth="xl" className="home-container">
                <h1 className="page-title"> </h1>
                <div style={{ textAlign: 'right' }}>
                    <Link to="/dashboard/browse" style={{ textDecoration: 'none' }}><Button size="small" color="primary" variant="contained" >Back to Browsing</Button></Link>
                </div>
                <div className="show">
                    <div className="show-img-container">
                        <img src={img_url} alt="player" />
                    </div>

                    <div className="content">
                        <div>
                            <h4> {title || "TITLE GOES HERE"} </h4>
                            <Typography gutterBottom>
                                {first_name + ' ' + last_name}
                            </Typography>
                            <Typography gutterBottom>
                                Year - {year}
                            </Typography>
                            <Typography gutterBottom>
                                Condition - {condition}
                            </Typography>
                        </div>
                        <div>
                            <Typography gutterBottom>
                                Owner Info - {this.state.user.username}
                            </Typography>
                        </div>
                    </div>
                </div>
                <div style={{ textAlign: 'center', margin: '30px' }}>
                    <Button size="large" color="primary" variant="contained" onClick={() => this.setState({ offer: !this.state.offer })}>Make an offer</Button>
                </div>
                {
                    this.state.offer ?
                        <MakeOffer card_id={this.state.card.id} cards={this.props.cards} history={this.props.history} setActionValue={this.props.setActionValue} setTradeId={this.props.setTradeId} />
                        :
                        null
                }

            </Container >
        )
    }
}

