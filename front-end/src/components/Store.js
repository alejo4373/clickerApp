import React, {Component} from 'react';
// import logo from './logo.svg'; import './App.css';

class Store extends Component {
    calculateRate = props => {}

    render() {
        console.log("Store: ", this.props.secondHandLaptop)

        return (
            <div>
                <h1>Store</h1>
                <div>
                    <button name='secondHandLaptop' onClick={this.props.handleStorePowerUpCount}>Buy Second Hand Laptop
                    </button>Count: {this.props.store.secondHandLaptop.count}
                    <br></br>
                    <button name='newLaptop' onClick={this.props.handleStorePowerUpCount}>Buy New Laptop
                    </button>Count: {this.props.store.newLaptop.count}
                    <br></br>
                    <button name='desktop' onClick={this.props.handleStorePowerUpCount}>Buy Desktop
                    </button>Count: {this.props.store.desktop.count}
                    <br></br>
                </div>
            </div>
        );

    }
}

export default Store;
