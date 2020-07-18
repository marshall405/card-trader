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


import Home from './components/Home'
import Dashboard from './components/Dashboard'
const userURL = "http://localhost:3001/users"
export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false,
      user: {}
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
          this.logUserIn(json)
        })
    }
  }
  logUserIn = user => {
    this.setState({
      loggedIn: true,
      user: user
    })

  }
  logUserOut = () => {
    window.localStorage.clear()
    window.location.href = "/"
    this.setState({
      loggedIn: false,
      user: ""
    })
  }
  render() {
    return (
      <Router>
        {this.state.loggedIn ?
          <Dashboard logUserOut={this.logUserOut} user={this.state.user} />
          :
          <Home logUserIn={this.logUserIn} />
        }
      </Router>
    )
  }
}

