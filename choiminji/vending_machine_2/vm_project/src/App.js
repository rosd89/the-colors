import React, { Component } from 'react';
import VMForm from './components/VMForm';

class App extends Component {
  idx = 0;
  state = {
    itemList : []
  }
  _handleCreate = data => {
    const { itemList } = this.state;
    console.log(this,itemList, this.state);
    this.setState({
      itemList : itemList.concat({
        ...data,
        idx : this.idx++
      })
    })
    console.log(this.state.itemList)
  }
  render() {
    return (
      <div>
        <VMForm onCreate={this._handleCreate}/>
      </div>
    );
  }
}

export default App;
