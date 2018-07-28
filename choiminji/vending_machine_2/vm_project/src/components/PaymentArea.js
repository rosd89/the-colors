import React, { Component } from 'react';
import PaymentBtn from './PaymentBtn'

class PaymentArea extends Component {
  render() {
    const { cash, cashBtn, onAddCash, onResetCash } = this.props;
    const btnList = cashBtn.map(
      (info,index) => <PaymentBtn cashBtnInfo={info} onAddCash={onAddCash} key={index} />
    )

    return (
      <div className='paymentArea'>
        <ul className='payment--list' >
          {btnList}
        </ul>
        <button 
          type='button' 
          className='payment--btn payment--returnBtn'
          onClick={onResetCash}
        >잔돈반환</button>
        <p className='payment--display'>{cash}</p>
      </div>
    );
  }
}

export default PaymentArea;