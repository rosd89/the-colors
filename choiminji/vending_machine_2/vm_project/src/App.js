import React, { Component } from 'react';
import VMForm from './components/VMForm';

class App extends Component {
  idx = 0;
  state = {
    itemList : [
      {name: "test", price:"123", count:"234", idx:0}
    ]
  }

  _handleCreate = data => {
    const { itemList } = this.state;

    this.setState({
      itemList : itemList.concat({
        ...data,
        idx : this.idx++
      })
    })

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
