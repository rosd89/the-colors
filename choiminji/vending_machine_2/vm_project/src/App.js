import React, { Component } from 'react';
import VMForm from './components/VMForm';
import VMMachine from './components/VMMachine';

class App extends Component {
  idx = 0;
  state = {
    itemList : [
      {
        idx : 0,
        name : 'Cola',
        price :'1300',
        count : 10,
        imgUrl : 'http://img.danawa.com/prod_img/500000/492/722/img/1722492_1.jpg?shrink=500:500&_v=20170323111716'
      },
      {
        idx : 1,
        name : 'Fanta',
        price :'1200',
        count : 1,
        imgUrl : 'http://img.danawa.com/prod_img/500000/187/785/img/1785187_1.jpg?shrink=500:500&_v=20170323111716'
      },
      {
        idx : 2,
        name : 'Cider',
        price :'1200',
        count : 0,
        imgUrl : 'http://img.danawa.com/prod_img/500000/349/250/img/1250349_1.jpg?shrink=500:500&_v=20170420120423'
      }
    ]
  }

  _handleCreate = data => {
    const { itemList } = this.state;
    const inValid = itemList.some(v => v.name === data.name);
    if (inValid) {
      alert("같은 이름 제품 존재합니다. 제품 정보를 수정합니다");
      
      this.setState({
        itemList : itemList.map(
          itemInfo => {
            if (itemInfo.name === data.name) {
              itemInfo.price = data.price;
              itemInfo.count = data.count;
              itemInfo.imgUrl = data.imgUrl;
            }
            return itemInfo
          }
        )
      })
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
