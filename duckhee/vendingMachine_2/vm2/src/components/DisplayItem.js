import React, { Component } from 'react';

const DisplayItem = ({ displayItemList }) => {
  console.log(displayItemList);
  return displayItemList.map((item, index) => (
    <li key={index}>
      <span>{item.title}</span>
      <button>{item.price}</button>
    </li>
  ));
};

export default DisplayItem;