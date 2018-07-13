import React, { Component } from 'react';

class VMForm extends Component {
  render() {
    return (
      <fragment>
        <form>
          <label>음료명 <input name='name'/></label>
          <label>가격 <input name='name'/></label>
          <label>재고 <input name='count'/></label>
        </form>
      </fragment>
    );
  }
}

export default VMForm;