import React, { Component } from 'react';

class ItemExit extends Component {
  render() {
    const { data, onRemoveSelect } = this.props;
    return (
      <span onClick={onRemoveSelect}>
        <img className='item--exitImg' src={data.imgUrl} alt={data.name} />
      </span>
    );
  }
}

export default ItemExit;