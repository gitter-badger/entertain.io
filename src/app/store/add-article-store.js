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
        image: '',
        text: '',
        tags : []
      },
      gotMetadata : false,
      showAdvancedForm: false
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
        this.state.loading = true;
        this.emit('change');
        break;

      case 'change-text':
        this.state.article.text = payload.text;
        this.emit('change');
        break;

      case 'metadata-update':
        this.state.loading = false;

        if (!payload.data) {
          this.emit('change');
          break;
        }

        this.state.article.title = payload.data.title;
        this.state.article.desc = payload.data.desc;
        this.state.article.image = payload.data.image;

        this.state.gotMetadata = true;
        this.emit('change');
        break;

      case 'tag-suggestions':
        this.state.article.tags = payload.data.popular.concat(payload.data.recommended);
        this.emit('change');
        break;

      case 'body-click':
        if(payload.domEvent.target.className.indexOf('component--article-collection') !== -1 || payload.domEvent.target.className.length === 0) {
          if(this.state.showAdvancedForm && !this.state.article.url) {
            this.state.showAdvancedForm = false;
            this.emit('change');
          }
        }
        break;

      case 'show-advanced-form':
        this.state.showAdvancedForm = true;
        this.emit('change');
        break;

      case 'update-tags' :
        this.state.article.tags = payload.tags;
        this.emit('change');
        break;
    }
  });

  constructor() {
    super();
    window.addArticleStore = this;
  }
}

export default new AddArticleStore();
