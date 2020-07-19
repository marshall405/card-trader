import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import DisplayAvailableCard from '../containers/DisplayAvailableCard'
const userCardsURL = `http://localhost:3001/cards/user/`
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
        this.fetchAvailableCards()
    }

    fetchAvailableCards() {
        fetch(userCardsURL + window.localStorage.getItem("id"), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `bearer: ${window.localStorage.getItem("jwt")}`
            }
        })
            .then(res => res.json())
            .then(cards => {
                const availableCards = cards.filter(card => !card.trade_id)

                this.setState({ availableCards, loading: false })

            })
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
        return this.state.availableCards.map(card => <DisplayAvailableCard key={card.id} card={card} toggleSelectCard={this.toggleSelectCard} />)
    }
    handleSubmitOffer = () => {
        this.props.handleSubmitOffer(this.state.cardsIDsForOffer)
    }
    render() {
        return (
            <div>
                <h3> Your Available Cards For Trade</h3>
                <p>Select 1 or more cards you are willing to offer</p>
                {
                    this.state.cardsIDsForOffer.length > 0 ?
                        <Button size="small" color="primary" variant="contained" onClick={this.handleSubmitOffer} >Submit Offer</Button>
                        :
                        null
                }
                <div className="available-cards-container">
                    {
                        this.state.loading ?
                            "fetcing data"
                            :
                            this.renderAvailableCards()
                    }
                </div>
            </div>
        )
    }
}

