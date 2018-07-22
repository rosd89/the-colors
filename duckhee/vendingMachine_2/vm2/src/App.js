import React, { Component } from "react";
import RegistItem from "./components/RegistItem";
import DisplayItem from "./components/DisplayItem";
import Payment from "./components/Payment";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      balance: 0,
      data: [
        {
          id: 1,
          price: 1000,
          stock: 10,
          title: "coke",
          isAvailableSale: true
        },
        {
          id: 2,
          price: 500,
          stock: 5,
          title: "coffee",
          isAvailableSale: true
        },
        {
          id: 3,
          price: 300,
          stock: 3,
          title: "fanta",
          isAvailableSale: true
        }
      ],
      displayItemList: []
    };

    this.handleRegist = this.handleRegist.bind(this);
    this.handleDisplay = this.handleDisplay.bind(this);
    this.handlePutMoney = this.handlePutMoney.bind(this);
    this.handleSetBliing = this.handleSetBliing.bind(this);
    this.handleIsSale = this.handleIsSale.bind(this);
  }

  handleRegist(newItem) {
    const { data } = this.state;
    const isSameTitle = data.some(item => item.title === newItem.title);
    if (isSameTitle) {
      alert("같은 이름의 음료가 존재 합니다.");
      return;
    }
    this.setState({
      data: [...this.state.data, newItem]
    });
  }

  handleDisplay(addItemId) {
    const { displayItemList, data } = this.state;
    const newDisplayItem = data.filter(item => item.id === addItemId)[0];

    if (displayItemList.length >= 12) {
      alert("진열대 자리가 없습니다.(12개)");
      return false;
    }

    this.setState({
      displayItemList: [...displayItemList, newDisplayItem]
    });
  }

  handlePutMoney(newBalance) {
    this.setState({
      balance: newBalance
    });
  }

  handleSetBliing(billingId) {
    const { data } = this.state;
    const newBliingItem = data.filter(item => item.id === billingId)[0];
    if (newBliingItem.stock === 0) {
      alert("재고가 없습니다.");
      return;
    }
    const newBliingItemStock = newBliingItem.stock - 1;
    const isAvailableSale = newBliingItemStock <= 0 ? false : true;

    this.setState({
      data: data.map(
        item =>
          item.id === billingId
            ? {
                ...item,
                stock: newBliingItemStock,
                isAvailableSale: isAvailableSale
              }
            : item
      )
    });

    // this.handleIsSale();
  }

  handleIsSale() {
    const { data, balance } = this.state;
    const newdata = data.map(item => ({
      ...item,
      isAvailableSale: !!(balance < +item.price)
    }));
  }

  render() {
    return (
      <div className="app">
        <DisplayItem
          registedItemList={this.state.data}
          displayItemList={this.state.displayItemList}
          onSetBilling={this.handleSetBliing}
        />
        <Payment
          onPutMoney={this.handlePutMoney}
          balance={this.state.balance}
        />
        <RegistItem
          balance={this.state.balance}
          onRegist={this.handleRegist}
          onDisplay={this.handleDisplay}
          registedItemList={this.state.data}
        />
      </div>
    );
  }
}

export default App;
