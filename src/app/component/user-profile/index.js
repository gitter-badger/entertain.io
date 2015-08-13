import React, { Component, addons } from 'react/addons';

require('./style.scss');

export default class UserProfile extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log(this)
    return (
      <div className='component--user-profile'>
        <h1>My Profile: {this.props.params.username}</h1>  
      </div>
    );
  }
}
