import React, { Component } from "react";
import RegistItem from './components/RegistItem';
import DisplayItem from './components/DisplayItem';
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      displayItemList: []
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

  render() {
    return (
      <div className="app">
        <DisplayItem displayItemList={this.state.displayItemList} />
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
