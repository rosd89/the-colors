import React, { Component } from 'react';


class Item extends Component {
  constructor(props) {
    super(props);
    this.idx = props.info.idx;
  }

  _handleSelect = e => {
    const { info, cash, onSelect } = this.props;
    const elem = document.querySelectorAll('.item__valid');
    if ( cash === 0 ) {
      alert("금액을 먼저 투입하세요!");
      return;
    }

    if ( +info.price > cash ) {
      console.log("상품이 비싸");
      return;
    }
    
    if ( elem.length > 0 ) {
      elem.forEach( v => {
        if ( +v.dataset.idx === +this.idx ) v.classList.add('item__selected') 
      })
    }

    onSelect(info);
  }

  render() {
    const { info, cash } = this.props;
    const compare = ( +info.price <= cash ) ? 'valid' : 'invalid';
    
    return (
      <div className={'item item__'+(compare)} data-idx={this.idx} onClick={this._handleSelect}>
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