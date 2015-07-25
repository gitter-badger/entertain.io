import {EventEmitter} from 'events';

export default function create(Dispatcher) {

  class ArticleStore extends EventEmitter {

    articles = [{
      title: 'Test Article',
      teaser: 'This is a test Article',
      url: 'http://test.com'
    }];

    dispatchToken = Dispatcher.register((payload) => {

      switch (payload.eventName) {

        case 'add-article':
          this.addArticle(payload.article);
          break;

      }

      return true;
    });

    addArticle(article) {
      this.articles.push(article);
      this.emit('change');
    }

  }

  return new ArticleStore();
}
