import React, { Component } from 'react';

//require('./style.scss');

import UserStore from '../../store/user-store';
import UserAction from '../../action/user-action';

export default class RegisterComponent extends Component {

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

  register() {
    event.preventDefault();
    const username = React.findDOMNode(this.refs.username).value;
    const password = React.findDOMNode(this.refs.password).value;

    UserAction.register(username, password);
  }

  render() {

    return (
      <section className="component--register">
        <form onSubmit={this.register.bind(this)}>

          <label forHtml='register-username'>Username</label>
          <input type='text 'id='register-username' ref='username' placeholder='username'/>

          <label forHtml='register-password'>Username</label>
          <input type='password' id='register-password' ref='password' placeholder='password'/>

          <input type='submit'/>
        </form>
      </section>
    );
  }
}
