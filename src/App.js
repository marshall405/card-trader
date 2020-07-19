import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect, useHistory } from 'react-router-dom'
// import { Counter } from './features/counter/Counter';

// custom styles
import './App.css';
import "./assets/styles/header.css"
import './assets/styles/home.css'
import './assets/styles/filter.css'
import './assets/styles/login.css'
import './assets/styles/newCardForm.css'
import './assets/styles/userCards.css'
import './assets/styles/availablecards.css'


import Home from './components/Home'
import Dashboard from './components/Dashboard'
const userURL = "http://localhost:3001/users"
export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false
    }
  }

  componentWillMount() {
    this.autoLogin()
  }

  autoLogin() {
    const jwt = window.localStorage.getItem("jwt")

    if (jwt) {
      fetch(userURL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `bearer: ${jwt}`
        }
      })
        .then(res => res.json())
        .then(json => {
          if (!json.message) {
            this.logUserIn()
          }
        })
    }
  }
  logUserIn = () => {
    this.setState({ loggedIn: true })
  }

  logUserOut = () => {
    window.localStorage.clear()
    window.location.href = "/"
  }
  render() {
    return (
      <Router>
        {this.state.loggedIn ?
          <Redirect to="/dashboard" />
          :
          <Home logUserIn={this.logUserIn} />
        }

        <Route path="/dashboard" render={() => <Dashboard />} />
        <Route path='/logout' render={() => this.logUserOut()} />

      </Router>
    )
  }
}

