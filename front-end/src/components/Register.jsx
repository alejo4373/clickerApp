import React, { Component } from 'react' 

const Register = ({ username, password, message, handleRegister, handleInput, toggleRegister }) => {
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
            <div><p onClick={this.toggleRegister}>Already have an account? Login</p></div>
            <p>{message}</p>
            {/* <button onClick={this.toggleRegister}>Login</button> */}
        </div>
    )
}

export default Register 