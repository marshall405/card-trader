import React, { Component } from 'react'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

const loginURL = "http://localhost:3001/login"
export default class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            errors: ""
        }
    }
    componentDidMount() {
        this.props.setValue(2)
    }
    handleSubmit = (e) => {
        e.preventDefault()
        fetch(loginURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(
                {

                    username: this.state.username,
                    password: this.state.password

                }
            )
        })
            .then(res => res.json())
            .then(json => {
                if (json.message) {
                    // some error occured
                    this.setState({ errors: json.message })
                } else {
                    window.localStorage.setItem("jwt", json.jwt)
                    window.localStorage.setItem("username", json.user.username)
                    window.localStorage.setItem("email", json.user.email)
                    window.localStorage.setItem("id", json.user.id)
                    this.props.logUserIn(json.user)
                }
            })
    }

    handleKeyUp = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    render() {
        return (
            <Container className="home-container">
                <h1 className="page-title"> Login </h1>
                <form className="login" onSubmit={this.handleSubmit}>
                    <TextField required
                        id="standard-required"
                        label="Username"
                        name="username"
                        onKeyUp={this.handleKeyUp}
                    />
                    <TextField
                        id="standard-password-input"
                        label="Password"
                        type="password"
                        name="password"
                        autoComplete="current-password"
                        onKeyUp={this.handleKeyUp}
                    />
                    <Button type="submit" className="login-button" variant="contained">Login</Button>
                </form>
                {
                    this.state.errors ?
                        this.state.errors
                        :
                        null
                }
            </Container>
        )
    }
}