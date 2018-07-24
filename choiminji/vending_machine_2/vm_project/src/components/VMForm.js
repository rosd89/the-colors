import React, { Component } from 'react';
import './VMForm.css';

class VMForm extends Component {
  state = {
    name : '',
    price :'',
    count : '',
    imgUrl : ''
  }
  _handleChange = e => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }
  _handleSubmit = e => {
    e.preventDefault();

    this.props.onCreate(this.state);
    
    this.setState({
      name : '',
      price : '',
      count : '',
      imgUrl : ''
    })
  }

  render() {
    return (
      <div>
        <form className='form form--modifier' onSubmit={this._handleSubmit}>
          <label className='form--label' htmlFor='name'>음료명</label>
          <input 
            className='form--input' 
            name='name' 
            id='name'
            onChange={this._handleChange} 
            value={this.state.name} 
          />
          
          <label className='form--label' htmlFor='imgUrl'>이미지</label>
          <input 
            className='form--input' 
            name='imgUrl' 
            id='imgUrl'
            onChange={this._handleChange} 
            value={this.state.imgUrl} 
          />
          
          <label className='form--label' htmlFor='price'>가격</label>
          <input 
            className='form--input' 
            name='price' 
            id='price' 
            onChange={this._handleChange} 
            value={this.state.price} 
          />
          
          <label className='form--label' htmlFor='count'>재고</label>
          <input 
            className='form--input' 
            name='count' 
            id='count'
            onChange={this._handleChange} 
            value={this.state.count} 
          />
          
          <button className='form--submit' type='submit'>등록하기!</button>
        </form>
      </div>
    );
  }
}

export default VMForm;