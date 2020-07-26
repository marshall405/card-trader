import React from 'react'

import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';

export default function Homepage(props) {

    if (props.value !== 0) props.setValue(0)
    return (
        <div className="jumbotron">
            <div className="overlay"></div>
            <h1 style={{ textAlign: 'center', margin: "0px 50px" }}> Start trading today!</h1>
            <ul>
                <li> <h3>FOOTBALL</h3> </li>
                <li> <h3>BASKETBALL</h3> </li>
                <li> <h3>BASEBALL</h3></li>

            </ul>
            <div>
                <p> Start browsing now!</p>
                <Link to={`/cards`}><Button size="small" variant="contained" onClick={() => props.setValue(1)}>View Cards</Button> </Link>
            </div>
            <div>
                <p> When you're ready to start adding your cards, puting in trade reqeusts, viewing your trades or accepting offers! </p>
                <div>
                    <Link to={`/login`}><Button size="small" variant="contained" onClick={() => props.setValue(2)}>Login</Button> </Link>
                    <Link to={`/signup`}><Button size="small" variant="contained" onClick={() => props.setValue(3)}>Signup</Button> </Link>
                </div>
            </div>

        </div>
    )
}
