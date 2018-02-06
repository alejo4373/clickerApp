import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
// import logo from './logo.svg';
// import './App.css';
import Store from './components/Store';

class Clicker extends Component {
  constructor() {
    super();

    this.state = {
      totalClicks: 0
    }
  }

  handleClicker = () => {
    this.setState({ 
      totalClicks: this.state.totalClicks ++
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClicker}>Click me</button>
      </div>
    );
  }
}

export default Clicker;
