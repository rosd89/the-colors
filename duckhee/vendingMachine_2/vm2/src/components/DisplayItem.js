import React from "react";

const DisplayItem = ({ displayItemList }) => {
  return displayItemList.map((item, index) => (
    <li key={index}>
      <span>{item.title}</span>
      <button>{item.price}</button>
    </li>
  ));
};

export default DisplayItem;
