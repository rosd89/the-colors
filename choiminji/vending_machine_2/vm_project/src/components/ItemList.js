import React, { Component } from 'react';
import Item from './Item';

class ItemList extends Component {
  render() {
    const { data } = this.props;
    const list = data.map(
      info => <Item info={info} key={info.idx} />
    )

    return (
      <div className='itemList'>
        {list}
      </div>
    );
  }
}

export default ItemList;