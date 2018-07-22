import React from "react";
import classNames from "classnames";
import "./DisplayItem.css";

const DisplayItem = ({
  balance,
  registedItemList,
  displayItemList,
  onSetBilling
}) => {
  const handleClick = id => {
    onSetBilling(id);
    console.log(registedItemList);
  };
  const _getClassNames = id => {
    const isAvailableSale = registedItemList.filter(item => item.id === id)[0]
      .isAvailableSale;

    return classNames("display__btn", {
      ["display__btn--disabled"]: !isAvailableSale
    });
  };
  return displayItemList.map((item, index) => (
    <li key={index}>
      <span>{item.title}</span>
      <button
        onClick={() => handleClick(item.id)}
        className={_getClassNames(item.id)}
      >
        {item.price}
      </button>
    </li>
  ));
};

export default DisplayItem;
