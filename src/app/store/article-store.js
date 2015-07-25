import Dispatcher from '../dispatcher';
import EventEmitter from 'wolfy87-eventemitter';

class ArticleStore extends EventEmitter {

  addArticle(article) {
    this.articles.push(article);
    this.emit('change');
  }

  constructor() {
    super();

    this.articles = [{
      title : 'Test Article',
      teaser : 'This is a test Article',
      url : 'http://test.com'
    }];

    Dispatcher.register((payload) => {

      console.log("dispatcher called", payload);

      switch( payload.eventName ) {

        case 'new-article':
          this.addArticle(payload.article);
          break;

      }

      return true;
    });
  }

}

export default new ArticleStore();
