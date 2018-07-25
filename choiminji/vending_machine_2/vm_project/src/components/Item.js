import React, { Component } from 'react';


class Item extends Component {
  render() {
    const { info, cash } = this.props;
    console.log(+info.price <= cash, +info.price , cash)
    const compare = ( +info.price <= cash ) ? "valid" : "invalid";
    

    return (
      <div className={'item item__'+(compare)}>
        <div className='item--img'>
          <img src={info.imgUrl} alt={info.name} />
        </div>
        <div>
          <p className='item--name item--modifier'>{info.name}</p>
          <p className='item--price item--modifier'>{info.price}</p>
        </div>
        { 
          ( _ => {
            if ( info.count === 0 ) return <div className='item--soldOut'>Sold Out</div>
          })()
        }
      </div>
    );
  }
}

export default Item;