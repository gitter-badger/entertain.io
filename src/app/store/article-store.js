import {EventEmitter} from 'events';

export default function create(Dispatcher) {

  class ArticleStore extends EventEmitter {

    articles = [{
      title: 'Test Article',
      desc: 'This is a test Article',
      url: 'http://test.com',
      image : ''
    }];

    dispatchToken = Dispatcher.register((payload) => {

      switch (payload.eventName) {

        case 'add-article':
          this.addArticle(payload.article);
          break;

        case 'metadata-update':
          this.emit('metadata-update', payload.data);
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
