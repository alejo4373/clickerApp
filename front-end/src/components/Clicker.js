import React, {Component} from 'react';
import {Link, Route} from 'react-router-dom';
// import logo from './logo.svg'; import './App.css';
import Store from './Store';
import socketIOClient from "socket.io-client";
import CCC from '../ccc-streamer-utilities.js'
import DisplayCount from './DisplayCount'

const coinDisplayStyle = {
  display: 'inline-block',
  margin: '0 50px',
  textAlign: 'center'
}

class Clicker extends Component {
  constructor() {
    super();

    this.socket = socketIOClient('https://streamer.cryptocompare.com/');
    const subscription = ['5~CCCAGG~BTC~USD', '5~CCCAGG~ETH~USD', '5~CCCAGG~XRP~USD'];
    this.socket.emit('SubAdd', { subs: subscription });

    this.socket.on("m", function(message) {
      var messageType = message.substring(0, message.indexOf("~"));
      var res = {};
      if (messageType == CCC.STATIC.TYPE.CURRENTAGG) {
        res = CCC.CURRENT.unpack(message);
        handleSocketRes(res)
      }
    });

    const handleSocketRes = data => {
      if (data.PRICE) {
        let coin = data.FROMSYMBOL + 'Value';
        this.setState({
          [coin]: data.PRICE 
        })
      }
    }


    this.multiplier = 1.05;
    this.interval;

    this.state = {
      totalClicks: 0,
    
      BTCValue: 0,
      ETHValue: 0,
      XRPValue: 0,

      currentCoin: 'BTC',

      purse: {
        USD: 0,
        BTC: 0,
        BTCPerSecond: 0,
        ETH: 0,
        ETHPerSecond: 0,
        XRP: 0,
        XRPPerSecond: 0
      },

      inventory: {
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
    }
  }

  handleStorePurchase = e => {
    const { purse, inventory } = this.state;

    // if (purse.usd >= inventory[e.target.name].price) {

      const storeCopy = Object.assign({}, inventory);
      console.log(storeCopy[e.target.name].count, inventory[e.target.name].count)
      // storeCopy[e.target.name].count += 1;
      console.log(storeCopy[e.target.name].count, inventory[e.target.name].count)

      const newBTC = purse.BTC - storeCopy[e.target.name].price;
      const newBTCPerSecond = purse.BTCPerSecond + storeCopy[e.target.name].rate;

      if (this.interval) {
        clearInterval(this.interval);
      }

      this.interval = setInterval(()=> {
        this.setState({

          bitcoinAmount: this.state.bitcoinAmount + this.state.bitcoinPerSecond
        })
      }, 1000);

      this.setState({
        inventory: storeCopy,
        [purse.BTC]: newBTC,
        bitcoinPerSecond: newBTCPerSecond
      })
  }

  handleMineCoinBtn = e => {
    this.setState({
      currentCoin: e.target.value
    })
  }

  handleClickerBtn = e => {
    const currency = e.target.value
    const { purse } = this.state
    const newPurse = {...purse, [currency]: purse[currency] + 1 }

    this.setState({
      purse: newPurse,
      totalClicks: this.state.totalClicks + 1,
    })
  }

  handleCoinExchange = e => {
    e.preventDefault();
    const transactionCoinAmount = Number(e.target[0].value);
    const transactionType = e.target[1].value;
    const transactionCoinType = e.target.target;

    const transactionCoinValue = transactionCoinType === 'BTC' ? this.state.BTCValue :
                      transactionCoinType === 'ETH' ? this.state.ETHValue : this.state.XRPValue;

    const transactionCost = transactionCoinAmount * transactionCoinValue;
    const { purse } = this.state;

    if (transactionType === 'BUY') {
      if (transactionCoinAmount > 0 && transactionCost < purse.USD) {
        const newPurse = {...purse, [transactionCoinType]: purse[transactionCoinType] + transactionCoinAmount, USD: purse.USD - transactionCost}
        this.setState({ purse: newPurse })
      } else {
        console.log('Insufficient Funds or Amount must be greater than 0')
      }
    } else if (transactionType === 'SELL') {
      if (transactionCoinAmount > 0 && transactionCoinAmount <= purse[transactionCoinType]) {
        const newPurse = {...purse, [transactionCoinType]: purse[transactionCoinType] - transactionCoinAmount, USD: purse.USD + transactionCost}
        this.setState({ purse: newPurse })
      } else {
        console.log('you fucked up the sell!')
      }
    }
  }

  render() {
    const { purse, BTCValue, ETHValue, XRPValue, currentCoin } = this.state;
    const coinValueArr = [BTCValue, ETHValue, XRPValue];
    const coinPerSecondArr = [purse.BTCPerSecond, purse.ETHPerSecond, purse.XRPPerSecond]
    const coins = ['BTC', 'ETH', 'XRP'];

    return (
      <div>
        <div>
          {coins.map((coin, i) => (
            <div style={coinDisplayStyle} key={coin}>
              <h1> {coin}: {purse[coin]} </h1>
              <form onSubmit={this.handleCoinExchange} target={coin}>
                <input type='number' />
                <select>
                  <option></option>
                  <option value='BUY'>BUY</option>
                  <option value='SELL'>SELL</option>
                </select>
                <input type='submit' value='Submit' />
              </form>
              <p> {coin} - USD: ${coinValueArr[i]} </p>
              <h2> {coin}/s: {coinPerSecondArr[i]} </h2>
              <button value={coin} onClick={this.handleMineCoinBtn}>Mine {coin}</button>
            </div>
          ))}
        </div>
        <h1>USD ${purse.USD || 0} </h1>
        <div>
          <h1>Total Clicks: {this.state.totalClicks}</h1>
          <button onClick={this.handleClickerBtn} value={currentCoin}>Click me</button>
        </div>

        <Store
          inventory={this.state.inventory}
          handleStorePurchase={this.handleStorePurchase}
        />
      </div>

    );
  }
}

export default Clicker;
