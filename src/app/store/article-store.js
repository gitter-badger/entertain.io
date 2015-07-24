import Dispatcher from '../dispatcher';
import EventEmitter from 'wolfy87-eventemitter';

class ArticleStore extends EventEmitter {

  articles = [{
    title : 'Test Article',
    teaser : 'This is a test Article',
    url : 'http://test.com'
  }];

  addArticle(article) {
    this.articles.push(article);
    this.emit('new-article', article);
  }

  constructor() {
    super();

    Dispatcher.register((payload) => {

      console.log("dispatcher called", payload);

      switch( payload.eventName ) {

        case 'new-article':
          this.addArticle(payload.article);
          break;

      }

      return true;
    });

    this.on('new-article', (a) => {
        console.log("i emitted a new article", a);
    });
  }

}

export default new ArticleStore();