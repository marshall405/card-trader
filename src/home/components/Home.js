import React, { Component } from 'react'
import { Route } from "react-router-dom";
import Header from '../containers/Header'
import Signup from './Signup'
import Login from './Login'
import Homepage from '../containers/Homepage'
import ShowPage from './ShowPage'

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
                <Route path='/' exact render={() => <Homepage setValue={this.setValue} value={this.state.tabValue} />} />
              
                    <Route path='/cards' exact render={() => <RenderCards setValue={this.setValue} />} />
                    <Route path='/cards/:id' exact render={({ match }) => <ShowPage card_id={match.params.id} setValue={this.setValue} />} />
                

                    <Route path='/signup' exact render={() => <Signup logUserIn={this.props.logUserIn} setValue={this.setValue} />} />
                    <Route path='/login' exact render={() => <Login logUserIn={this.props.logUserIn} setValue={this.setValue} />} />
                
            </div>
        )
    }
}
