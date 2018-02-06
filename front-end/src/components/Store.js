import React, {Component} from 'react';
import {Link, Route} from 'react-router-dom';
// import logo from './logo.svg'; import './App.css';

class Store extends Component {
    constructor() {
        super();

        this.state = {
            secondHandLaptop: {price: 30, count: 0}, 
            newLaptop: {price: 100, count: 0},
            desktop: {price: 600, count: 0},
            //add more later
        }
    }

    render() {
        return (
            <div>
                <h1>Store</h1>
                <div><button>Buy Second Hand Laptop </button> </div>
            </div>
        );
    }
}

export default Store;
