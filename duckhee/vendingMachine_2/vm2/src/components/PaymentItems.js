import React from "react";

const MoneyAmount = [100, 500, 1000, 5000, 10000, 50000];

const PaymentItems = ({ onClick }) => {
  const handleClick = money => {
    onClick(money);
  };
  return MoneyAmount.map(money => (
    <li key={money}>
      <button value={money} type="button" onClick={handleClick}>
        {money}
      </button>
    </li>
  ));
};

export default PaymentItems;
