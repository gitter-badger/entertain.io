import Debug from 'debug';
import Dispatcher from '../dispatcher';
import ConnectionService from '../service/connection';
const debug = Debug('app:user-action');

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
