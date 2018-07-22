import React, { Component } from 'react';

class PaymentArea extends Component {
  constructor() {
    super();
    this.cash = [ 100, 500, 1000, 5000, 10000 ];
    this.cashBtnList = document.createElement('ul');
    this.cash.forEach( v => {
      const btnElem = document.createElement('li');
      btnElem.innerText = v;
      this.cashBtnList.appendChild(btnElem);
    })
  }


  render() {
    
    return (
      <div className='paymentArea'>
        {this.cashBtnList}
      </div>
    );
  }
}

export default PaymentArea;