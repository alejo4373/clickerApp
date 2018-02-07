import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import axios from 'axios';
import Clicker from './Clicker';
import Register from './Register';
import Login from './Login';
import Logout from './Logout';

// /register 
// /login
// /logout 

class Home extends Component {
    constructor() {
        super()
        this.state = {
            register: false,
            user: null // mount user data once user logs in          
        }
    }

    // Making a single toggle function didn't work, so I made two separate functions 
    toggleRegisterTrue = () => {
        this.setState({
            register: true
        })
    }

    toggleRegisterFalse = () => {
        this.setState({
            register: false
        })
    }

    renderLoginPage = () => {
        return (
            <Login toggleRegisterFalse={this.toggleRegisterFalse} />
        )
    }

    renderRegister = () => {
        return (
            <Register toggleRegisterTrue={this.toggleRegisterTrue} />
        )
    }

    renderClicker = () => {
        return (
            <Clicker />
        )
    }

    renderLogout = () => {
        return (
            <Logout />
        )
    }

    render() {
        const { register, user } = this.state
        console.log(this.state)

        const menu = () => {
            if (user) {
                return <Link to='/logout'>Logout</Link>
            } else if (register) {
                return <Link to='/'>Login</Link>
            } else if (!register) {
                return <Link to='/register'>Register</Link>
            }
        }

        return (
            <div>
                <nav>
                    {menu()}
                </nav>

                <Route exact path='/' render={this.renderLoginPage} />
                <Route path='/register' render={this.renderRegister} />
                <Route path='/clicker' render={this.renderClicker} />
                <Route path='/logout' render={this.renderLogout} />
            </div>
        );
    }
}

export default Home; 