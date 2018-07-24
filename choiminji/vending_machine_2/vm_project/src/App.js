import React, { Component } from 'react';
import VMForm from './components/VMForm';
import ItemList from './components/ItemList';
import PaymentArea from './components/PaymentArea';
import ItemExit from './components/ItemExit';
import './components/VMMachine.css';

class App extends Component {
  idx = 0;
  state = {
    itemList : [
      {
        idx: 0,
        name : 'Coke',
        price :'1300',
        count : 10,
        imgUrl : 'http://img.danawa.com/prod_img/500000/492/722/img/1722492_1.jpg?shrink=500:500&_v=20170323111716'
      },
      {
        idx: 1,
        name : 'Fanta',
        price :'1200',
        count : 1,
        imgUrl : 'http://img.danawa.com/prod_img/500000/187/785/img/1785187_1.jpg?shrink=500:500&_v=20170323111716'
      },
      {
        idx: 2,
        name : 'Cider',
        price :'1200',
        count : 0,
        imgUrl : 'http://img.danawa.com/prod_img/500000/349/250/img/1250349_1.jpg?shrink=500:500&_v=20170420120423'
      }
    ],
    cash : 0,
    selection : null
  }

  _handleRegist = data => {
    const { itemList } = this.state;
    const inValid = itemList.some(v => v.name === data.name);

    if (inValid) {
      alert("같은 이름 제품 존재합니다. 제품 정보를 수정합니다");
      this._handleUpdate(data);
    } else {
      this._handleCreate(data);
    }
  }

  _handleCreate = data => {
    this.setState( ({itemList}) => (
      { itemList: itemList.concat({...data, idx:this.idx++})}
    ));
  }

  _handleUpdate = data => {
    const { itemList } = this.state;
    this.setState({
      itemList : itemList.map( itemInfo => {
        if (itemInfo.name === data.name) Object.assign(itemInfo, data);
        return itemInfo
      })
    });
  }

  _handleAddCash = input => {
    const { cash } = this.state;
    this.setState({
      cash : cash + input
    })
  }


  render() {
    return (
      <div className='wrap'>
        <VMForm onCreate={this._handleRegist} />

        <div className='vm'>
          <ItemList data={this.state.itemList} />
          <PaymentArea onAddCash={this._handleAddCash} cash={this.state.cash}/>
          <ItemExit />
        </div>
      </div>
    );
  }
}

export default App;
