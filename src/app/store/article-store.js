import EventEmitter from 'wolfy87-eventemitter';

export default function create(Dispatcher) {

  class ArticleStore extends EventEmitter {

    articles = [{
      title: 'Test Article',
      teaser: 'This is a test Article',
      url: 'http://test.com'
    }];

    addArticle(article) {
      this.articles.push(article);
      this.emit('change');
    }

    constructor() {
      super();

      Dispatcher.register((payload) => {

        console.log("dispatcher called", payload);

        switch (payload.eventName) {

          case 'new-article':
            this.addArticle(payload.article);
            break;

        }

        return true;
      });
    }

  }

  return new ArticleStore();
}
