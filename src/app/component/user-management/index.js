import React, { Component } from 'react';

require('./style.scss');

export default function create(UserStore, UserAction) {

  class UserManagementComponent extends Component {

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
      let username = React.findDOMNode(this.refs.username).value;
      let password = React.findDOMNode(this.refs.password).value;
      UserAction.login(username, password);

    }

    logout() {
      UserAction.logout();
    }

    render() {
      let login = (
        <span>
          <form onSubmit={this.login.bind(this)}>
            <label htmlFor="username">Username</label>
            <input type='text' placeholder='username' id='username' ref='username'></input>
            <label htmlFor="password">Password</label>
            <input type='password' placeholder='password' id='password' ref='password'></input>

            <input type='submit' value='login'></input>
            <span className="error">{this.state.user.errorMsg}</span>
          </form>
        </span>
      );

      let loggedin = (
        <span>
          Hello {this.state.user.user.username}
          <button onClick={this.logout.bind(this)}>logout</button>
        </span>
      );

      return (
        <div>
          <section className="component--user-management">
            {this.state.user.loggedIn ? loggedin : login}
          </section>
        </div>
      );
    }
  }

  return UserManagementComponent;
}
