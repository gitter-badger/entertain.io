import Debug from 'debug';
var debug = Debug('app:user-action');

import Dispatcher from '../dispatcher';
import ConnectionService from '../service/connection';


class UserAction {

  login(username, password) {
    ConnectionService.login(username, password, (err, user) => {
      debug("ConnectionService.login", err, user);
      if (!err) {
        Dispatcher.dispatch({
          eventName: 'user', user
        });
      } else {
        Dispatcher.dispatch({
          eventName: 'login-failed', err
        });
      }
    })
  }

  logout() {
    ConnectionService.logout((err) => {
      Dispatcher.dispatch({
        eventName: 'logged-out'
      });
    });
  }

  // get current user from session
  currentUser() {
    ConnectionService.currentUser((err, user) => {
      if (!err) {
        Dispatcher.dispatch({
          eventName: 'user', user
        });
      }
    });
  }

  // bootstrap
  constructor() {
    this.currentUser();
  }
}

export default new UserAction();