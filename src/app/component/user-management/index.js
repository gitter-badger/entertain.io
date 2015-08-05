import React, { Component } from 'react';

require('./style.scss');

import UserStore from '../../store/user-store';
import UserAction from '../../action/user-action';

export default class UserManagementComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {user: UserStore};
  }

  userChanged() {
    this.setState({user: UserStore});
  }

  componentDidMount() {
    UserStore.on('change', this.userChanged.bind(this));
  }

  componentWillUnmount() {
    UserStore.removeListener('change', this.userChanged.bind(this));
  }

  login(event) {
    event.preventDefault();
    const username = React.findDOMNode(this.refs.username).value;
    const password = React.findDOMNode(this.refs.password).value;
    UserAction.login(username, password);

  }

  logout() {
    UserAction.logout();
  }

  render() {
    const login = (
      <div className='login'>
        <form onSubmit={this.login.bind(this)}>
          <input type='text' ref='username' placeholder='Username' />
          <input type='password' ref='password' placeholder='Password' />
          <input className='action-button' type='submit' value='login'/>
          <span className="error">{this.state.user.errorMsg}</span>
        </form>
      </div>
    );

    const loggedin = (
      <div className='loggedin'>
        <span>{this.state.user.user.username}</span>
        <button className='action-button' onClick={this.logout.bind(this)}>logout</button>
      </div>
    );

    return (
      <section className="component--user-management">
        {this.state.user.loggedIn ? loggedin : login}
      </section>
    );
  }
}
