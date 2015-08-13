import {EventEmitter} from 'events';
import Dispatcher from '~/src/app/dispatcher';

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
  });

  addArticle(article) {
    this.articles.unshift(article);
    this.emit('article-added');
    this.emit('change');
  }

  constructor() {
    super();

    window.articleStore = this; // debugging
  }
}

export default new ArticleStore();
