import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
// import logo from './logo.svg';
// import './App.css';
import Home from './components/Home';

class App extends Component {
  render() {
    return (
      <div>
        <nav>
          <Link to='/'>Login</Link>{' '}
        </nav>
        <div>
          <Route exact path='/' component={Home} />
        </div>
      </div>
    );
  }
}

export default App;
