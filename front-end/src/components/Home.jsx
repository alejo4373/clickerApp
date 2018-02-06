import React, { Component } from 'react';
import { Link, Route, Redirect} from 'react-router-dom';
// import logo from './logo.svg';
// import './App.css';
import axios from 'axios';
// Created a login branch... 

class Home extends Component {
    constructor() {
        super()
        this.state = {
            register: false,
            username: '',
            password: '',
            name: '',
            user: null
        }
    }

    toggleRegister = () => {
        this.setState({
            register: !this.state.register,
            username: '',
            password: '',
            name: ''
        })
    }

    handleLogin = e => {
        e.preventDefault()

        axios
            .post('/login') //TBD
            .then(res => {
                this.setState({
                    user: res.data
                })
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    }

    handleRegister = e => {
        e.preventDefault();

        axios
            .post('/new') // TBD
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const { register, username, password, name, user} = this.state
        console.log(this.state)
        if (user) {
            //Redirects after user submits form
            return (
                <Redirect to={{
                    pathname: '/clicker'
                }} />
            )
        }

        return (
            <div>
                {register ?
                    <div>
                        <form onSubmit={this.handleRegister}>
                            <h1>Register</h1>
                            <input type='text' placeholder='name' name='name' value={name} onChange={this.handleInput} />
                            <input type='text' placeholder='username' name='username' value={username} onChange={this.handleInput} />
                            <input type='password' placeholder='password' name='password' value={password} onChange={this.handleInput} />
                            <input type='submit' value='Register' />
                        </form>
                        <button onClick={this.toggleRegister}>Login</button>
                    </div>
                    :
                    <div>
                        <form onSubmit={this.handleLogin}>
                            <h1>Login</h1>
                            <input type='text' placeholder='username' name='username' value={username} onChange={this.handleInput} />
                            <input type='password' placeholder='password' name='password' value={password} onChange={this.handleInput} />
                            <input type='submit' value='Login' />
                        </form>
                        <button onClick={this.toggleRegister}>Register</button>
                    </div>
                }
            </div>
        );
    }
}

export default Home;

//Add redirect 