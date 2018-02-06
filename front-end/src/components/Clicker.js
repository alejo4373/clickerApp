import React, {Component} from 'react';
import {Link, Route} from 'react-router-dom';
// import logo from './logo.svg'; import './App.css';
import Store from './Store';

class Clicker extends Component {
  constructor() {
    super();

    this.state = {
      totalClicks: 0
    }
  }

  handleClicker = () => {
    this.setState({
      totalClicks: this.state.totalClicks + 1
    })
  }

  render() {
    console.log(this.state.totalClicks)
    return (
      <div>
        <div>
          <h1>{this.state.totalClicks}</h1>
          <button onClick={this.handleClicker}>Click me</button>
        </div>

        <Store /> 
      </div>

    );
  }
}

export default Clicker;
