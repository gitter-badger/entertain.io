import {EventEmitter} from 'events';

export default function create(Dispatcher) {

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

  return new UserStore();
}
