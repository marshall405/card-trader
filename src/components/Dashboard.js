import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'


import RenderCards from './RenderCards'
import UserHeader from '../containers/UserHeader'
import UserActions from '../components/UserActions'
export default class Dashboard extends Component {

    constructor(props) {
        super(props)

        this.state = {
            user: props.user,

        }
    }


    render() {
        return (
            <div>
                <UserHeader name={this.props.user.username} />
                <UserActions />
                <div className="home-container">
                    <Route path='/logout' exact render={() => this.props.logUserOut()} />
                    {/* <Route path='/signup' exact render={() => <Signup />} />
                    <Route path='/login' exact render={() => <Login logUserIn={this.props.logUserIn}/>} /> */}
                </div>
            </div>
        )
    }
}
