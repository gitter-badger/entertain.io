import {EventEmitter} from 'events';

import Dispatcher from '../dispatcher';

class UserStore extends EventEmitter {

  user = {};
  loggedIn = false;
  errorMsg = "";

  dispatchToken = Dispatcher.register((payload) => {

    switch (payload.eventName) {
      case 'user':
        this.loggedIn = true;
        this.user = payload.user;
        this.errorMsg = "";
        this.emit('change');
        break;

      case 'logged-out':
        this.loggedIn = false;
        this.user = {};
        this.emit('change');
        break;

      case 'login-failed':
        this.errorMsg = payload.err;
        this.loggedIn = false;
        this.user = {};
        this.emit('change');
        break;
    }

    return true;
  });

  constructor() {
    super();
    window.userStore = this; // debugging
  }

}

export default new UserStore();
