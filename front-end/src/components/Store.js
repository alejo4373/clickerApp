import React, {Component} from 'react';
// import logo from './logo.svg'; import './App.css';

class Store extends Component {
    render() {        
        return (
            <div>
                <h1>Store</h1>
                <div>
                    <button name='secondHandLaptop' onClick={this.props.handleStorePowerUpCount}>Buy Second Hand Laptop
                    </button>
                    <button name='newLaptop' onClick={this.props.handleStorePowerUpCount}>Buy New Laptop
                    </button>
                    <button name='desktop' onClick={this.props.handleStorePowerUpCount}>Buy Desktop
                    </button>
                </div>
            </div>
        );
    }
}

export default Store;
