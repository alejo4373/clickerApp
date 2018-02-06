import React, { Component } from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
// import Clicker from './Clicker';

// /register 
// /login
// /logout 

const Register = ({ username, password, message, handleRegister, handleInput, toggleRegister }) => {
    return (
        <div>
            <form onSubmit={handleRegister}>
                <h1>Register</h1>
                <input
                    type='text'
                    placeholder='username'
                    name='username'
                    value={username}
                    onChange={handleInput}
                    required />
                <br />
                <input
                    type='password'
                    placeholder='password'
                    name='password'
                    value={password}
                    onChange={handleInput}
                    required />
                <br />
                <input type='submit' value='Register' />
            </form>
            <div><p onClick={toggleRegister}>Already have an account? Login</p></div>
            <p>{message}</p>
            {/* <button onClick={this.toggleRegister}>Login</button> */}
        </div>
    )
}

const Login = ({ username, password, message, handleLogin, handleInput, toggleRegister }) => {
    return (
        <div>
            <form onSubmit={handleLogin}>
                <h1>Login</h1>
                <input
                    type='text'
                    placeholder='username'
                    name='username'
                    value={username}
                    onChange={handleInput}
                    required />
                <br />
                <input
                    type='password'
                    placeholder='password'
                    name='password'
                    value={password}
                    onChange={handleInput}
                    required />
                <br />
                <input type='submit' value='Login' />
            </form>
            <div><p onClick={toggleRegister}>Register to make an account</p></div>
            <p>{message}</p>
            {/* <button onClick={this.toggleRegister}>Register</button> */}
        </div>
    )
}

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

    render() {
        const { register, username, password, message, user, loggedIn } = this.state
        console.log(this.state)

        if (loggedIn) {
            // Redirects after user submits form
            return <Redirect to='/clicker' />
        }

        return (
            <div>
                <nav>
                    {loggedIn ?
                        <Link to='/'>Logout</Link>
                        :
                        <Link to='/'>Login</Link>
                    }
                </nav>

                <Route exact path='/' render={this.renderLoginPage} />
                {/* <Route path='/clicker' component={Clicker} /> */}
            </div>
        );
    }
}

export default Home; 