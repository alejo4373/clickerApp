import React, { Component } from 'react'
import { Redirect } from 'react-router' 
import axios from 'axios' 

class Logout extends Component {
    constructor() {
        super() 
        this.state = {
            loggedIn: true 
        }
    }

    handleLogout = () => {
        axios
            .get('/logout')
            .then(res => {
                console.log(res.data)
                this.props.setUser(null) 
                this.setState({
                    loggedIn: false 
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        const { loggedIn } = this.state 

        // When user logs out, redirect to home (login) page 
        if(!loggedIn) {
            return <Redirect to='/'/>
        }
        return (
            <div>
                <p>Are you sure you want to log out?</p>
                <button onClick={this.handleLogout}>Logout</button>
            </div>
        )
    }
}

export default Logout 