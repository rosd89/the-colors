import React, { Component } from 'react';
import ItemList from './ItemList';
import PaymentArea from './PaymentArea';
import ItemExit from './ItemExit';
import './VMMachine.css';


class VMMachine extends Component {
  render() {
    const { data } = this.props;
    
    return (
      <div className='vm'>
        <ItemList data={data} />
        <PaymentArea />
        <ItemExit />
      </div>
    );
  }
}

export default VMMachine;