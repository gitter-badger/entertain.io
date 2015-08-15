import React, { Component, addons } from 'react/addons';

require('./style.scss');

export default class Indicator extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="indicator">
        <div className='loader'></div>
        <span className='text'></span>
      </div>
    );
  }
}
