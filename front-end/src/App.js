import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
// import logo from './logo.svg'; import './App.css';
import Home from './components/Home';
import Clicker from './components/Clicker';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path='/' component={Home} />
          {/* <Route path='/clicker' component={Clicker} /> */}
        </Switch>
      </div>
    );
  }
}

export default App;
