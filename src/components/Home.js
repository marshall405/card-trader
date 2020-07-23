import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import Header from '../containers/Header'
import Signup from './Signup'
import Login from './Login'
import Homepage from '../containers/Homepage'

import RenderCards from './RenderCards'






export default class Home extends Component {
    state = {
        tabValue: 0
    }

    setValue = tabValue => this.setState({ tabValue });
    render() {
        return (
            <div>
                <Header setValue={this.setValue} value={this.state.tabValue} />
                <div className="home-container">
                    <Route path='/' exact render={() => <Homepage setValue={this.setValue} />} />
                    <Route path='/cards' exact render={() => <RenderCards setValue={this.setValue} />} />
                    <Route path='/signup' exact render={() => <Signup logUserIn={this.props.logUserIn} setValue={this.setValue} />} />
                    <Route path='/login' exact render={() => <Login logUserIn={this.props.logUserIn} setValue={this.setValue} />} />
                </div>
            </div>
        )
    }
}
