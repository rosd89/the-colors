import React, { Component } from 'react';
import ItemExit from './ItemExit';

class ItemExitArea extends Component {
  render() {
    const { data, selectedItem, onRemoveSelect } = this.props;
    let exitItem;

    if ( selectedItem !== null ) {
      data.some(v => {
        if ( +v.idx === +selectedItem) return exitItem = <ItemExit data={v} onRemoveSelect={onRemoveSelect} />;
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