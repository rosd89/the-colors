import React, { Component } from 'react';
import VMForm from './components/VMForm';
import VMMachine from './components/VMMachine';

class App extends Component {
  idx = 0;
  state = {
    itemList : [
      {
        idx : 0,
        name : '코카콜라',
        price :'1300',
        count : 10,
        imgUrl : 'http://img.danawa.com/prod_img/500000/492/722/img/1722492_1.jpg?shrink=500:500&_v=20170323111716'
      },
      {
        idx : 1,
        name : '환타',
        price :'1200',
        count : 1,
        imgUrl : 'http://img.danawa.com/prod_img/500000/187/785/img/1785187_1.jpg?shrink=500:500&_v=20170323111716'
      }
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
        <VMForm onCreate={this._handleCreate} />
        <VMMachine data={this.state.itemList} />
      </div>
    );
  }
}

export default App;
