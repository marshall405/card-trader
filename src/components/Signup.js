import React, { Component } from 'react'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

const userURL = "https://evening-crag-02028.herokuapp.com/users"
export default class Signup extends Component {
    state = {
        errors: [],
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        password_confirmation: ""
    }


    handleSubmit = (e) => {
        e.preventDefault()

        if (this.state.password === this.state.password_confirmation) {
            this.createNewUser()
        } else {
            this.setState({
                errors: [...this.state.errors, "Passwords must match!"]
            })
        }
    }

    createNewUser() {
        const { username, email, first_name, last_name, password } = this.state
        fetch(userURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                username,
                email,
                first_name,
                last_name,
                password
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.error) {
                    this.setState({ errors: json.error })
                } else {
                    window.localStorage.setItem("jwt", json.jwt)
                    window.localStorage.setItem("username", json.user.username)
                    window.localStorage.setItem("email", json.user.email)
                    window.localStorage.setItem("id", json.user.id)
                    this.props.logUserIn()
                }
            })
    }
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value.trim() })
    }

    renderErrors() {
        return this.state.errors.map(error => <h3 className="alert"> {error}</h3>)
    }
    render() {
        return (
            <Container className="home-container">
                <h1 className="page-title"> Signup </h1>
                <form className="signup" autoComplete="off" onSubmit={this.handleSubmit} >

                    <TextField required name="username" defaultValue={this.state.username} label="Username" onChange={this.handleChange} />
                    <TextField type="email" required name="email" label="Email" defaultValue={this.state.email} onChange={this.handleChange} />

                    <TextField required id="standard-required" name="first_name" label="First Name" defaultValue={this.state.first_name} onChange={this.handleChange} />
                    <TextField required id="standard-required" name="last_name" label="Last Name" defaultValue={this.state.last_name} onChange={this.handleChange} />

                    <TextField
                        required
                        name="password"
                        id="standard-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        defaultValue={this.state.password}
                        onChange={this.handleChange}
                    />
                    <TextField
                        required
                        id="standard-password-input"
                        name="password_confirmation"
                        label="Confirm Password"
                        type="password"
                        autoComplete="current-password"
                        defaultValue={this.state.password_confirmation}
                        onChange={this.handleChange}
                    />
                    <div >
                        <Button style={{ width: "300px" }} type="submit" className="login-button" variant="contained">Signup</Button>
                    </div>
                </form>
                {
                    this.state.errors.length > 0 ?
                        this.renderErrors()
                        :
                        null
                }
            </Container >
        )
    }
}