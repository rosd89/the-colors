import React, { Component } from 'react';
import VMForm from './components/VMForm';
import VMMachine from './components/VMMachine';

class App extends Component {
  idx = 0;
  state = {
    itemList : [
      
    ]
  }

  _handleCreate = data => {
    const { itemList } = this.state;

    const invalid = this._handlecheck();

    this.setState({
      itemList : itemList.concat({
        ...data,
        idx : this.idx++
      })
    })

  }

  _handleCheck = _ => {
    const submitName = this.state.name;
    const testList = this.state.itemList.concat();

    const isValid = testList.some(v => {
      if ( v.name === submitName) return true;
    })

    return isValid;
  }

  render() {
    return (
      <div className='wrap'>
        <VMForm onCreate={this._handleCreate} />
        <VMMachine data={this.state.itemList} />
      </div>
    );
  }
}

export default App;
