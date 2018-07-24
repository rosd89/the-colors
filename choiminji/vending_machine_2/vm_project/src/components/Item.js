import React, { Component } from 'react';


class Item extends Component {
  render() {
    const { info } = this.props;

    return (
      <div className='item'>
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