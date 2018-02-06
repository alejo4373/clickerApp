import React, { Component } from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import axios from 'axios';

class Home extends Component {
    constructor() {
        super()
        this.state = {
            register: false,
            username: '',
            password: '',
            message: '',
            user: null, // mount user data once user logs in  
            loggedIn: false // toggle true once user logs in 
        }
    }

    // When user clicks Register, toggles Register screen 
    // When user clicks Login, toggles Login screen 
    toggleRegister = () => {
        this.setState({
            register: !this.state.register,
            username: '',
            password: ''
        })
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
                    this.setState({
                        user: res.data,
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

    // User clicks Register button 
    handleRegister = e => {
        e.preventDefault();
        const { username, password } = this.state

        // Check username length 
        if (username.length < 3) {
            this.setState({
                message: 'Username must be at least 3 characters'
            })
        } else {
            // Make a post request to route /new with new, username, password 
            axios
                .post('/new', {
                    username: username,
                    password: password
                })
                .then(res => {
                    console.log(res.data)
                    this.setState({
                        username: '',
                        password: '',
                        message: 'Successfully registered'
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
        const { register, username, password, message, user, loggedIn } = this.state
        console.log(this.state)

        if (loggedIn) {
            // Redirects after user submits form
            return <Redirect to='/clicker' />
        }

        return (
            <div>
                {register ?
                    <div>
                        <form onSubmit={this.handleRegister}>
                            <h1>Register</h1>
                            <input type='text' placeholder='username' name='username' value={username} onChange={this.handleInput} required />
                            <br />
                            <input type='password' placeholder='password' name='password' value={password} onChange={this.handleInput} required />
                            <br />
                            <input type='submit' value='Register' />
                        </form>
                        <div><p onClick={this.toggleRegister}>Login</p></div>
                        <p>{message}</p>
                        {/* <button onClick={this.toggleRegister}>Login</button> */}
                    </div>
                    :
                    <div>
                        <form onSubmit={this.handleLogin}>
                            <h1>Login</h1>
                            <input type='text' placeholder='username' name='username' value={username} onChange={this.handleInput} required />
                            <br />
                            <input type='password' placeholder='password' name='password' value={password} onChange={this.handleInput} required />
                            <br />
                            <input type='submit' value='Login' />
                        </form>
                        <div><p onClick={this.toggleRegister}>Register</p></div>
                        <p>{message}</p>
                        {/* <button onClick={this.toggleRegister}>Register</button> */}
                    </div>
                }
            </div>
        );
    }
}

export default Home; 