import React, { Component } from "react";
import "./App.css";

class Display extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>진열대</div>;
  }
}

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

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const newItem = {
      id: Date.now(),
      title: this._title.value,
      stock: this._stock.value,
      price: this._price.value
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
            <RegistedItemList
              registedItemList={registedItemList}
              onDisplay={onDisplay}
            />
          </ul>
        </div>
      </div>
    );
  }
}

const RegistedItemList = ({ registedItemList, onDisplay }) => {
  const handleClick = id => {
    onDisplay(id);
  };
  return registedItemList.map(item => (
    <li key={item.id}>
      <span>음료명 : {item.title}, </span>
      <span>재고 : {item.stock}, </span>
      <span>판매가격 : {item.price}</span>
      <button onClick={handleClick(item.id)}>상품 진열 추가</button>
    </li>
  ));
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      displayCount: 0
    };

    this.handleRegist = this.handleRegist.bind(this);
    this.handleDisplay = this.handleDisplay.bind(this);
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
    console.log(addItemId, "id", this.state.displayCount, "count");
    const count = this.state.displayCount + 1;
    this.setState({
      displayCount: count
    });
  }

  render() {
    return (
      <div className="app">
        <Display />
        <RegistItem
          onRegist={this.handleRegist}
          onDisplay={this.handleDisplay}
          registedItemList={this.state.data}
        />
      </div>
    );
  }
}

export default App;
