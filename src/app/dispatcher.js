import * as Flux from 'flux';

class Dispatcher {

  constructor() {
    this.appDispatcher = new Flux.Dispatcher();
  }

  getDispatcher() {
    return this.appDispatcher;
  }
}

export default new Dispatcher().getDispatcher();