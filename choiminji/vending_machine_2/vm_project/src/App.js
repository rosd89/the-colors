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
    const inValid = itemList.some(v => v.name === data.name);
    if (inValid) {
      alert("같은 이름 제품 존재. 재고량만 증가시킵니다.")

    } else {
      this.setState(({itemList}) => ({ itemList: itemList.concat({...data, idx: this.idx++ })}));
    }
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
