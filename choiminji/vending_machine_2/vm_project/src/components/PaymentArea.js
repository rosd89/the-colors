import React, { Component } from 'react';

class PaymentArea extends Component {
  constructor() {
    super();
    this.cash = [ 100, 500, 1000, 5000, 10000 ];
  }

  _handleInput = e => {
    const cash = this.props.cash;
    const clicked = e.target.innerText;


  }

  render() {
    const { cash } = this.props;
    
    return (
      <div className='paymentArea'>
        <ul className='payment--list' >
          <li
            className='payment--btn' 
            onClick={this._handleInput}
          >{this.cash[0]}</li>
          <li
            className='payment--btn' 
            onClick={this._handleInput}
          >{this.cash[1]}</li>
          <li
            className='payment--btn' 
            onClick={this._handleInput}
          >{this.cash[2]}</li>
          <li
            className='payment--btn' 
            onClick={this._handleInput}
          >{this.cash[3]}</li>
          <li
            className='payment--btn' 
            onClick={this._handleInput}
          >{this.cash[4]}</li>
          <li
            className='payment--btn payment--btn__white' 
            onClick={this._handleReturn}
          >잔돈반환</li>
        </ul>
        <p className='payment--display'>{cash}</p>
      </div>
    );
  }
}

export default PaymentArea;