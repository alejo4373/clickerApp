import React, { Component } from 'react'
import { Redirect } from 'react-router'
import axios from 'axios'

class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            message: '',
            loggedIn: false
        }
    }

    // User clicks Login button 
    handleLogin = e => {
        e.preventDefault()
        const { username, password } = this.state

        // Check username length 
        if (username.length < 3) {
            this.setState({
                message: 'Username must be at least 3 characters'
            })
        } else {
            // Make a post request to route /login with username, password 
            axios
                .post('/login', {
                    username: username,
                    password: password
                })
                .then(res => {
                    console.log(res.data)
                    this.props.setUser(res.data)
                    this.setState({
                        loggedIn: true
                    })
                })
                .catch(err => {
                    console.log(err)
                    this.setState({
                        username: '',
                        password: '',
                        message: 'Error logging in'
                    })
                })
        }
    }

    // Track input changes in name, username, password 
    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const { username, password, message, loggedIn } = this.state

        if (loggedIn) {
            return <Redirect to='/users' />
        }

        return (
            <div>
                <form onSubmit={this.handleLogin}>
                    <h1>Login</h1>
                    <input
                        type='text'
                        placeholder='username'
                        name='username'
                        value={username}
                        onChange={this.handleInput}
                        required />
                    <br />
                    <input
                        type='password'
                        placeholder='password'
                        name='password'
                        value={password}
                        onChange={this.handleInput}
                        required />
                    <br />
                    <input type='submit' value='Login' />
                </form>
                <div><p onClick={this.toggleRegister}>Register to make an account</p></div>
                <p>{message}</p>
                {/* <button onClick={this.toggleRegister}>Register</button> */}
            </div>
        )
    }
}


export default Login 