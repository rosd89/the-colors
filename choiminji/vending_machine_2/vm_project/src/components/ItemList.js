import React, { Component } from 'react';
import ItemInfo from './ItemInfo';

class ItemList extends Component {
  render() {
    const { data } = this.props;
    const list = data.map(
      info => <ItemInfo info={info} key={info.idx} />
    )

    return (
      <div className='itemList'>
        {list}
      </div>
    );
  }
}

export default ItemList;