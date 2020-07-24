import React from 'react'

import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';

export default function Homepage(props) {

    if (props.value !== 0) props.setValue(0)
    return (
        <div className="jumbotron">
            <div className="overlay"></div>
            <h1> Start trading today!</h1>
            <div>
                <p> You can start browsing now!</p>
                <Link to={`/cards`}><Button size="small" variant="contained" >View Cards</Button> </Link>
            </div>
            <div>
                <p> When you're ready to start adding your cards, puting in trade reqeusts, viewing your trades or accepting offers! </p>
                <div>
                    <Link to={`/login`}><Button size="small" variant="contained" >Login</Button> </Link>
                    <Link to={`/signup`}><Button size="small" variant="contained" >Signup</Button> </Link>
                </div>
            </div>

        </div>
    )
}
