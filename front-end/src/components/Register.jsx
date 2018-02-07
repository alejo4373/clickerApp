import React, { Component } from 'react'
import { Redirect } from 'react-router' 
import axios from 'axios'

class Register extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            message: '',
            loggedIn: false
        }
    }

    componentDidMount() {
        this.props.toggleRegisterTrue()
    }

    // User clicks Register button 
    handleRegister = e => {
        e.preventDefault();
        const { username, password } = this.state
        let pattern = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/

        // Check username length 
        if (username.length < 3) {
            this.setState({
                message: 'Username must be at least 3 characters'
            })
        }
        // Check password strength 
        else if (!pattern.test(password)) {
            this.setState({
                message: 'Password must be at least 6 characters and contain: lower, upper, number'
            })
        } else {
            // Make a post request to route /new with username, password 
            axios
                .post('/new', {
                    username: username,
                    password: password
                })
                .then(res => {
                    // let newUser = res.data

                    // Make a post request to /login with new user's username and password 
                    // axios
                    //     .post('/login', {
                    //         username: newUser.username,
                    //         password: newUser.password
                    //     })
                    //     .then(res => {
                    //         console.log(res.data)
                    //         this.setState({
                    //             user: res.data,
                    //             loggedIn: true
                    //         })
                    //     })
                    //     .catch(err => {
                    //         console.log(err)
                    //         this.setState({
                    //             message: 'Error logging in after register'
                    //         })
                    //     })
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
                        message: 'Error registering'
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
        console.log(this.state)

        // When user logs in, redirect to /clicker (game) page 
        if (loggedIn) {
            return <Redirect to='/clicker' />
        }

        return (
            <div>
                <form onSubmit={this.handleRegister}>
                    <h1>Register</h1>
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
                    <input type='submit' value='Register' />
                </form>
                <p>{message}</p>
            </div>
        )
    }
}


export default Register 