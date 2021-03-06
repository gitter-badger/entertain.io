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
        this.articles.unshift(payload.article);
        this.emit('change');
        break;

      case 'upvote-article':
        this.articles[payload.articleIdx].upvotes += 1;
        this.emit('change');
        break;

      case 'remove-article':
        this.articles = this.articles.filter((article) => article._id !== payload.articleId);
        this.emit('change');
        break;
    }
  });

  constructor() {
    super();

    window.articleStore = this; // debugging
  }
}

export default new ArticleStore();
