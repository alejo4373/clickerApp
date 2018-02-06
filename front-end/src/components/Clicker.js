import React, {Component} from 'react';
import {Link, Route} from 'react-router-dom';
// import logo from './logo.svg'; import './App.css';
import Store from './Store';

class Clicker extends Component {
  constructor() {
    super();

    this.multiplier = 1.05;
    this.interval;

    this.state = {
      totalClicks: 0,
      bitcoinAmount: 0,
      bitcoinPerSecond: 0,
      store: {
        secondHandLaptop: {
          price: 2,
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

    if (this.state.bitcoinAmount >= this.state.store[e.target.name].price) {
    
      const storeCopy = this.state.store;
      storeCopy[e.target.name].count++;

      const newBitcoinAmount = this.state.bitcoinAmount - storeCopy[e.target.name].price;
      const newBitcoinPerSecond = this.state.bitcoinPerSecond + storeCopy[e.target.name].price;

      this.interval = setInterval(()=> {
        this.setState({
          bitcoinAmount: this.state.bitcoinAmount + this.state.bitcoinPerSecond
        })
      }, 1000);

      this.setState({
        store: storeCopy,
        bitcoinAmount: newBitcoinAmount,
        bitcoinPerSecond: newBitcoinPerSecond
      })
    }
  }

  handleClicker = () => {
    this.setState({
      totalClicks: this.state.totalClicks + 1,
      bitcoinAmount: this.state.bitcoinAmount + 1
    })
  }

  render() {

    return (
      <div>
        <div>
          <h1> BTC: {this.state.bitcoinAmount}</h1>
          <h2> BTC/s: {this.state.bitcoinPerSecond}</h2>
        </div>
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
