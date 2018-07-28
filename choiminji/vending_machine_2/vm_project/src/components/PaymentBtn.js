import React, { Component } from 'react';

class PaymentBtn extends Component {
  _handleInput = e => {
    const { onAddCash } = this.props;
    const clicked = +e.target.innerText;
    onAddCash(clicked);
  }

  render() {
    const { cashBtnInfo } = this.props;

    return (
      
        <li 
          className='payment--btn' 
          onClick={this._handleInput} 
        >
          {cashBtnInfo}
        </li>
      
    );
  }
}

export default PaymentBtn;