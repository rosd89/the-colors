import React, { Component } from 'react';
import VMForm from './components/VMForm';
import ItemList from './components/ItemList';
import PaymentArea from './components/PaymentArea';
import ItemExitArea from './components/ItemExitArea';
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
    cashBtn : [ 100, 500, 1000, 5000, 10000, 50000 ],
    cash : 0,
    selectedItem : null
  }

  _handleRegist = data => {
    const { itemList } = this.state;
    const inValid = itemList.some(v => v.name === data.name);

    if (inValid) {
      alert("같은 이름 제품 존재합니다. 제품 정보 수정 & 재고 추가합니다");
      this._handleUpdate(data);
    } else {
      this._handleCreate(data);
    }
  }

  _handleDecrease = info => {
    const newCount = { count : +info.count - 1 };
    const editInfo = Object.assign(info, newCount);
    this._handleUpdate(editInfo);
    // 고민 1 : 이렇게 되면 item 선택 시, _handleSelectItem에서 한번, _handleUpdate에서 한번 총 2번 랜더링 되는데,,, 훔
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

  _handleResetCash = _ => {
    const { cash } = this.state;
    if ( cash === 0 ) return;
  
    alert(`return ${cash}`);
    this.setState({ cash : 0 });
  }

  _handleSelectItem = info => {
    this.setState({
      selectedItem : info.idx,
      cash : +this.state.cash - info.price
    }, _ => {
      this._handleDecrease(info);
    })
  }

  _handleResetSelect = _ => {
    const listItem = document.querySelectorAll('.item__valid');
    
    if ( listItem.length > 0 ) {
      listItem.forEach( v => {
        v.classList.remove('item__selected');
      })
    }

    this.setState({
      selectedItem : null
    }, _ => {
      setTimeout(this._handleResetCash, 1000);
    })
  }
  
  render() {
    return (
      <div className='wrap'>
        <VMForm onCreate={this._handleRegist} />

        <div className='vm'>
          <ItemList 
            data={this.state.itemList} 
            cash={this.state.cash} 
            onSelect={this._handleSelectItem} 
          />
          <PaymentArea 
            cash={this.state.cash} 
            cashBtn={this.state.cashBtn} 
            onAddCash={this._handleAddCash} 
            onResetCash={this._handleResetCash} 
          />
          <ItemExitArea
            data={this.state.itemList}
            cash={this.state.cash} 
            selectedItem={this.state.selectedItem}
            onRemoveSelect = {this._handleResetSelect}
          />
        </div>
      </div>
    );
  }
}

export default App;


/*

App.js
_handleDecrease : 이렇게 되면 item 선택 시, _handleSelectItem에서 한번, _handleUpdate에서 한번 총 2번 랜더링 되는데,,, 훔

*/