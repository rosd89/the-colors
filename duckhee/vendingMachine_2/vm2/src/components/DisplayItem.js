import React, { Component } from "react";
import classNames from "classnames";
import "./DisplayItem.css";

class DisplayItem extends Component {
  constructor(props) {
    super(props);

    this.state ={
      displayItemList: this.props.displayItemList
    }

    this.handleClick = this.handleClick.bind(this);
    this._getClassNames = this._getClassNames.bind(this);
  }

  handleClick(id) {
    this.props.onSetBilling(id);
  };
  _getClassNames(id) {
    const isAvailableSale = this.props.registedItemList.filter(item => item.id === id)[0].isAvailableSale;
    return classNames("display__btn", {
      ["display__btn--disabled"]: !isAvailableSale
    });
  };

  render() {
    return this.props.displayItemList.map((item, index) => (
      <li key={index}>
        <span>{item.title}</span>
        <button
          onClick={() => this.handleClick(item.id)}
          className={this._getClassNames(item.id)}
        >
          {item.price}
        </button>
      </li>
    ));
  };

}


export default DisplayItem;
