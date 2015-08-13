import {EventEmitter} from 'events';
import Dispatcher from '~/src/app/dispatcher';

class AddArticleStore extends EventEmitter {

  state = this.getInitState();

  getInitState() {
    return {
      article : {
        title: '',
        desc: '',
        url: '',
        image: ''
      },
      gotMetadata : false,
      tags : {
        popular: [],
        recommended: []
      },
      showAddArticle: false
    }
  }

  dispatchToken = Dispatcher.register((payload) => {
    switch (payload.eventName) {
      case 'change-title':
        this.state.article.title = payload.title;
        this.emit('change');
        break;

      case 'change-desc':
        this.state.article.desc = payload.desc;
        this.emit('change');
        break;

      case 'change-url':
        this.state.article.url = payload.url;
        this.emit('change');
        break;

      case 'metadata-update':
        this.state.article = {
          title : payload.title,
          desc : payload.desc,
          image : payload.image
        };
        this.state.gotMetadata = true;
        this.emit('change');
        break;

      case 'tag-suggestions':
        this.state.tags = payload.data;
        this.emit('change');
        break;
    }
  });

}

export default new AddArticleStore();
