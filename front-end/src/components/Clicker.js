import React, {Component} from 'react';
import {Link, Route} from 'react-router-dom';
// import logo from './logo.svg'; import './App.css';
import Store from './Store';

class Clicker extends Component {
  constructor() {
    super();

    this.multiplier = 1.05;

    this.state = {
      totalClicks: 0,
      store: {
        secondHandLaptop: {
          price: 30,
          count: 0,
          rate: 2
        },
        newLaptop: {
          price: 100,
          count: 0,
          rate: 50
        },
        desktop: {
          price: 600,
          count: 0,
          rate: 100
        }
      }
      //add more later
    }
  }

  handleStorePowerUpCount = e => {
    const storeCopy = this.state.store;
    storeCopy[e.target.name].count++;
    this.setState({
      store: storeCopy
    })
  }

  handleClicker = () => {
    this.setState({
      totalClicks: this.state.totalClicks + 1
    })
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <div>
          <h1>{this.state.totalClicks}</h1>
          <button onClick={this.handleClicker}>Click me</button>
        </div>

        <Store
          store={this.state.store}
          handleStorePowerUpCount={this.handleStorePowerUpCount}/>
      </div>

    );
  }
}

export default Clicker;
