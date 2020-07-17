import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
// import { Counter } from './features/counter/Counter';
import './App.css';

import Home from './components/Home'
import Dashboard from './components/Dashboard'

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false
    }
  }

  render() {
    return (
      <Router>
        {
          this.state.loggedIn ?
            <Dashboard /> :
            <Home />
        }
      </Router>
    )
  }
}

