import React, { Component } from 'react';
import ItemExit from './ItemExit';

class ItemExitArea extends Component {
  render() {
    const { data, selectedItem } = this.props;
    let exitItem;
    if ( selectedItem ) {
      data.some(v => {
        if ( +v.idx === +selectedItem) return exitItem = <ItemExit data={v} />;
        else return false; 
      }); 
    }

    return (
      <div className='item--exit'>
        {exitItem}
      </div>
    );
  }
}

export default ItemExitArea;