import Debug from 'debug';
import Dispatcher from '../dispatcher';
import ConnectionService from '../service/connection';
const debug = Debug('app:article-action');

class MainAction {

  bodyClick(e) {
    Dispatcher.dispatch({
      eventName: 'body-click',
      domEvent: e
    });
  }

}

export default new MainAction();
