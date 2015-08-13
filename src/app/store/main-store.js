import {EventEmitter} from 'events';
import Dispatcher from '~/src/app/dispatcher';

class MainStore extends EventEmitter {
  dispatchToken = Dispatcher.register((payload) => {
    switch (payload.eventName) {
      case 'body-click':
        this.emit('body-clicked', payload.domEvent);
        break;
    }
  });
}

export default new MainStore();
