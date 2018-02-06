import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import axios from 'axios';
import Clicker from './Clicker';
import Register from './Register';
import Login from './Login'; 

// /register 
// /login
// /logout 

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
                    let newUser = res.data

                    // Make a post request to /login with new user's username and password 
                    axios
                        .post('/login', {
                            username: newUser.username,
                            password: newUser.password
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
                                message: 'Error logging in after register'
                            })
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

    renderLoginPage = () => {
        const { register, username, password, message, user, loggedIn } = this.state

        return (
            register ?
                <Register
                    username={username}
                    password={password}
                    message={message}
                    handleRegister={this.handleRegister
                    }
                    handleInput={this.handleInput}
                    toggleRegister={this.toggleRegister} />
                :
                <Login
                    username={username}
                    password={password}
                    message={message}
                    handleLogin={this.handleLogin}
                    handleInput={this.handleInput}
                    toggleRegister={this.toggleRegister} />

        )
    }

    renderClicker = () => {
        return (
            <Clicker />
        )
    }

    render() {
        const { register, username, password, message, user, loggedIn } = this.state
        console.log(this.state)

        // if (loggedIn) {
        //     // Redirects after user submits form
        //     return <Redirect to='/clicker' />
        // }

        return (
            <div>
                <nav>
                    {loggedIn ?
                        <Link to='/logout'>Logout</Link>
                        :
                        <Link to='/'>Login</Link>
                    }
                </nav>

                <Route exact path='/' render={this.renderLoginPage} />
                <Route path='/clicker' render={this.renderClicker} />
            </div>
        );
    }
}

export default Home; 