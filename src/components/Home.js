import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import Header from '../containers/Header'
import Signup from './Signup'
import Login from './Login'

import RenderCards from './RenderCards'






export default class Home extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="home-container">
                    <Route path='/' exact render={() => <RenderCards />} />
                    <Route path='/signup' exact render={() => <Signup logUserIn={this.props.logUserIn} />} />
                    <Route path='/login' exact render={() => <Login logUserIn={this.props.logUserIn} />} />
                </div>
            </div>
        )
    }
}
