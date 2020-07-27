import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import DisplayAvailableCard from '../containers/DisplayAvailableCard'
export default class AvailableCards extends Component {
    constructor(props) {
        super(props)
        this.state = {
            availableCards: [],
            cardsIDsForOffer: [],
            loading: true
        }
    }

    componentDidMount() {
        const availableCards = this.props.cards.filter(card => {
            if (card.trade_id) {
                return false
            }
            return true
        })

        this.setState({ availableCards })
    }
    toggleSelectCard = id => {
        const cardsIDsForOffer = [...this.state.cardsIDsForOffer]
        const index = this.state.cardsIDsForOffer.indexOf(id)
        if (index > -1) {
            // remove id from cardsIDsForOffer 
            cardsIDsForOffer.splice(index, 1)
        } else {
            cardsIDsForOffer.push(id)
        }
        this.setState({ cardsIDsForOffer })
    }

    renderAvailableCards() {
        return this.state.availableCards.map(card => <DisplayAvailableCard key={card.id} card={card} toggleSelectCard={this.toggleSelectCard} clickCard={true} />)
    }
    handleSubmitOffer = () => {
        this.props.handleSubmitOffer(this.state.cardsIDsForOffer)
    }
    render() {
        return (
            <div style={{ borderTop: "10px solid #1f59b1", borderBottom: "10px solid #1f59b1", marginTop: "10px" }}>
                <h3 className="page-title"> My Available Cards For Trade</h3>
                <div className="submit-offer-container">
                    <p>Select 1 or more cards you are willing to offer.</p>
                    {
                        this.state.cardsIDsForOffer.length > 0 ?
                            <Button size="small" color="primary" variant="contained" onClick={this.handleSubmitOffer} >Submit Offer</Button>
                            :
                            null
                    }
                </div>
                <div className="available-cards-container">
                    {
                        this.state.availableCards.length === 0 ?
                            <h3>No Available Cards to Offer!"</h3>
                            :

                            this.renderAvailableCards()

                    }
                </div>
            </div>
        )
    }
}

