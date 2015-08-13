import Debug from 'debug';
import Dispatcher from '../dispatcher';
import ConnectionService from '../service/connection';
const debug = Debug('app:user-action');

class UserAction {

  register(username, password) {
    ConnectionService.register(username, password, (err) => {
      debug("ConnectionService.register", err);
      if (!err) {
        Dispatcher.dispatch({
          eventName: 'register-success'
        });
      } else {
        Dispatcher.dispatch({
          eventName: 'register-failed', err
        });
      }
    });
  }

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

  currentUser() {
    ConnectionService.currentUser((err, user) => {
      if (!err) {
        Dispatcher.dispatch({
          eventName: 'user', user
        });
      }
    });
  }

  constructor() {
    this.currentUser();
  }
}

export default new UserAction();