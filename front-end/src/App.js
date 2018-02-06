import React, {Component} from 'react';
import {Link, Route} from 'react-router-dom';
// import logo from './logo.svg'; import './App.css';
import Home from './components/Home';
import Clicker from './components/Clicker';


class App extends Component {
  render() {
    return (
      <div>
        <nav>
          <Link to='/'>Login</Link>{' '}
        </nav>
        <div>
          <Route exact path='/' component={Home}/>
          <Route exact path='/clicker' component={Clicker}/>

        </div>
      </div>
    );
  }
}

export default App;
