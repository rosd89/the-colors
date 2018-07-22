import React, { Component } from "react";
import ItemList from "./ItemList";

class RegistItem extends Component {
  constructor(props) {
    super(props);

    this._title = null;
    this._stock = null;
    this._price = null;

    this.setTitleInputRef = element => {
      this._title = element;
    };
    this.setStockInputRef = element => {
      this._stock = element;
    };
    this.setPriceInputRef = element => {
      this._price = element;
    };
    this._isAvailableSale = !!(this.props.balance < +this._price);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const newItem = {
      id: Date.now(),
      title: this._title.value,
      stock: this._stock.value,
      price: this._price.value,
      isAvailableSale: this._isAvailableSale
    };
    this.props.onRegist(newItem);
    this.clearInput();
    this._title.focus();
  }

  clearInput() {
    this._title.value = "";
    this._stock.value = "";
    this._price.value = "";
  }

  render() {
    const { registedItemList, onDisplay } = this.props;
    return (
      <div className="regist">
        <form onSubmit={this.handleSubmit}>
          <label>
            title:
            <input type="text" ref={this.setTitleInputRef} />
          </label>
          <label>
            stock:
            <input type="text" ref={this.setStockInputRef} />
          </label>
          <label>
            price:
            <input type="text" ref={this.setPriceInputRef} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <div className="reigsteredItemList">
          <ul>
            <ItemList
              registedItemList={registedItemList}
              onDisplay={onDisplay}
            />
          </ul>
        </div>
      </div>
    );
  }
}

export default RegistItem;
