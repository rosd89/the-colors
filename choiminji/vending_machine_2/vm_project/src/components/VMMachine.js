import React, { Component } from 'react';
import ItemList from './ItemList';
import PaymentArea from './PaymentArea';
import ItemExit from './ItemExit';
import './VMMachine.css';


class VMMachine extends Component {
  
  state = {
    cash : 0,
    selection : false
  }

  

  render() {
    const { data } = this.props;
    
    return (
      <div className='vm'>
        <ItemList data={data} />
        <PaymentArea onInput={this._handleInput} selection={this.selection} />
        <ItemExit />
      </div>
    );
  }
}

export default VMMachine;