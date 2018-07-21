import React from "react";

const ItemList = ({ registedItemList, onDisplay }) => {
  const handleClick = id => {
    onDisplay(id);
  };
  return registedItemList.map(item => (
    <li key={item.id}>
      <span>음료명 : {item.title}, </span>
      <span>재고 : {item.stock}, </span>
      <span>판매가격 : {item.price}</span>
      <button onClick={() => handleClick(item.id)}>상품 진열 추가</button>
    </li>
  ));
};

export default ItemList;
