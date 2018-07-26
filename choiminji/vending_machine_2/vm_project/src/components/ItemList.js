import React, { Component } from 'react';
import Item from './Item';

class ItemList extends Component {
  render() {
    const { data, cash, onSelect } = this.props;
    const list = data.map(
      info => <Item info={info} cash={cash} key={info.idx} onSelect={onSelect} />
    )

    return (
      <div className='itemList'>
        {list}
      </div>
    );
  }
}

export default ItemList;