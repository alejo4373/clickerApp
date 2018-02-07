import React, {Component} from 'react';

class DisplayCount extends Component {
  render() {
    const { purse, BTCValue, ETHValue, XRPValue } = this.props;
    console.log(BTCValue)
    return (
      <div>
        <h1> BTC: {purse.BTC}</h1>
        <p> BTC - USD {purse.BTCValue} </p>
        <h2> BTC/s: {purse.BTCPerSecond}</h2>
      </div>
    );
  }
}

export default DisplayCount;
