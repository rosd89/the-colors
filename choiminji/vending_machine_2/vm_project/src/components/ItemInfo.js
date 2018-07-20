import React, { Component } from 'react';


class ItemInfo extends Component {
  render() {
    const { info } = this.props;

    return (
      <div className='item'>
        <div className='item--img'>
          <img src={info.imgUrl} alt={info.name} />
        </div>
        <div className='itemInfo'>
          <p className='itemInfo--name itemInfo--elem'>{info.name}</p>
          <p className='itemInfo--price itemInfo--elem'>{info.price}</p>
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

export default ItemInfo;