import {EventEmitter} from 'events';

export default function create(Dispatcher) {

  class ArticleStore extends EventEmitter {

    articles = [];

    dispatchToken = Dispatcher.register((payload) => {

      switch (payload.eventName) {
        case 'latest-articles':
          this.articles = payload.articles;
          this.emit('change');
          break;

        case 'add-article':
          this.addArticle(payload.article);
          break;

        case 'metadata-update':
          this.emit('metadata-update', payload.data);
          break;

        case 'tag-suggestions':
          this.emit('tag-suggestions', payload.data);
          break;
      }

      return true;
    });

    addArticle(article) {
      this.articles.push(article);
      this.emit('change');
    }

    constructor() {
      super();

      window.articleStore = this; // debugging
    }


  }

  return new ArticleStore();
}
