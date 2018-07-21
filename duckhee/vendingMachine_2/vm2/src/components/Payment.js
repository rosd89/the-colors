import React from "react";
import PaymentItems from "./PaymentItems";

const Payment = ({ balance, onPutMoney }) => {
  const handleClick = e => {
    const newBalance = +balance + +e.target.value;
    onPutMoney(newBalance);
  };
  return (
    <div>
      <div className="payment__balance">{balance}</div>
      <ul>
        <PaymentItems onClick={handleClick} />
      </ul>
    </div>
  );
};

export default Payment;
