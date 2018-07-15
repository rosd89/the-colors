import React, { Component } from 'react';

class VMForm extends Component {
  state = {
    name : '',
    price :'',
    count : ''
  }
  _handleChange = e => {
    console.log(e.target.name);
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
      count : ''
    })
  }
  render() {
    return (
      <div>
        <form onSubmit={this._handleSubmit}>
          <label>음료명 
            <input name='name' onChange={this._handleChange} value={this.state.name} />
          </label>
          <label>가격 
            <input name='price' onChange={this._handleChange} value={this.state.price} />
          </label>
          <label>재고 
            <input name='count' onChange={this._handleChange} value={this.state.count} />
          </label>
          <button type='submit'>등록하기!</button>
        </form>
      </div>
    );
  }
}

export default VMForm;