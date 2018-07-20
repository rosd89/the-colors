import React, { Component } from 'react';


class ItemInfo extends Component {
  render() {
    const { info } = this.props;

    return (
      <div className='item'>
        <div className='item--img'>
          <img src={info.imgUrl} alt={info.name} />
        </div>
        <div className='item-info'>
          <p className='item-info--name'>{info.name}</p>
          <p className='item-info--price'>{info.price}</p>
        </div>
        { 
          ( _ => {
            if ( info.count === 0 ) {
              alert(1);
              return <div className='item--soldOut'>Sold Out</div>
            }
          })()
        }
      </div>
    );
  }
}

export default ItemInfo;