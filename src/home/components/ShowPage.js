import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import ImgModal from '../../dashboard/containers/ImgModal'


const cardURL = "http://localhost:3001/cards/";
export default class ShowPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            card: {},
            user: {},
            show: false,
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

    setShow = () => {
        this.setState({ show: !this.state.show })
    }
    render() {
        const { title, first_name, last_name, team, img_url, year, condition } = this.state.card
        return (
            <Container maxWidth="xl" className="home-container mobile-home">
                <h1 className="page-title"> </h1>
                <div style={{ textAlign: 'right' }}>
                    <Link to="/cards" style={{ textDecoration: 'none' }}><Button size="small" color="primary" variant="contained" >Back to Browsing</Button></Link>
                </div>
                <div className="show">
                    <div className="show-img-container home-show-page-img">
                        <img src={img_url} alt="player" onClick={this.setShow} />
                    </div>

                    <div className="content">
                        <div>
                            <h4> {title || "Missing Desc..."} </h4>
                            <Typography gutterBottom>
                                {first_name + ' ' + last_name}
                            </Typography>
                            <Typography gutterBottom>
                                {team}
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

                <Button size="small" color="primary" variant="contained" onClick={() => this.setState({ offer: !this.state.offer })}>Make an offer</Button>

                {
                    this.state.offer ?
                        <h3 className="alert"> Please login or signup to make an offer! </h3>
                        :
                        null
                }


                {
                    this.state.show ?
                        <ImgModal img_url={img_url} setShow={this.setShow} />
                        :
                        null
                }
            </Container >
        )
    }
}

