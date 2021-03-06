import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

// custom styles
import './App.css';
import "./assets/styles/header.css"
import './assets/styles/home.css'
import './assets/styles/filter.css'
import './assets/styles/login.css'
import './assets/styles/newCardForm.css'
import './assets/styles/userCards.css'
import './assets/styles/availablecards.css'
import './assets/styles/trades.css'
import './assets/styles/offers.css'
import './assets/styles/homepage.css'
import './assets/styles/main.css'
import './assets/styles/preview.css'
import './assets/styles/show.css'


import Home from './home/components/Home'
import Dashboard from './dashboard/components/Dashboard'
const userURL = `${process.env.REACT_APP_API}/users`
export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false
    }
  }

  componentDidMount() {
    this.autoLogin()
  }

  autoLogin() {
    if (!this.state.loggedIn) {
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
          <Redirect to="/dashboard/" /> // MUST CHANGE TO DASHBOARD!!!!!!!!!!!!!
          :
          <Home logUserIn={this.logUserIn} />
        }

        <Route path="/dashboard" render={() => <Dashboard />} />
        <Route path='/logout' render={() => this.logUserOut()} />

      </Router>
    )
  }
}

