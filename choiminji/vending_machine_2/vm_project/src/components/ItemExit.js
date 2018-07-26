import React, { Component } from 'react';

class ItemExit extends Component {
  render() {
    const { data } = this.props;
    return (
      <span>
        <img className='item--exitImg' src={data.imgUrl} alt={data.name} />
      </span>
    );
  }
}

export default ItemExit;