import React, { Component, addons } from 'react/addons';
const ReactCSSTransitionGroup = addons.CSSTransitionGroup;

require('./style.scss');

let dummyArticleUrl = 'http://techcrunch.com/2015/07/26/jack-dorseys-first-order-of-business-as-interim-ceo-twitter-support-to-the-stars/';

export default function create(ArticleStore, ArticleAction, Article) {

  class AddArticle extends Component {

    constructor(props) {
      super(props);

      this.state = {
        title : '',
        desc : '',
        url : dummyArticleUrl,
        image : '',
        tags : {
          popular: [],
          recommended: []
        }
      };
    }

    metadataUpdated(data) {
      this.setState({
        title : data.title,
        desc : data.desc,
        image : data.image
      });
    }

    tagSuggestionUpdate(data) {
      console.log("tagSuggestionUpdate", data);
      this.setState({tags : data});
    }

    componentDidMount() {
      ArticleStore.on('metadata-update', this.metadataUpdated.bind(this));
      ArticleStore.on('tag-suggestions', this.tagSuggestionUpdate.bind(this));
    }

    componentWillUnmount() {
      ArticleStore.removeListener('metadata-update', this.metadataUpdated.bind(this));
      ArticleStore.removeListener('tag-suggestions', this.tagSuggestionUpdate.bind(this));
    }

    changeTitle(event) {
      this.setState({title : event.target.value});
    }

    changeDesc(event) {
      this.setState({desc : event.target.value});
    }

    changeUrl(event) {
      this.setState({url : event.target.value});
    }

    add(event) {
      event.preventDefault();
      ArticleAction.addArticle(this.state);
    }

    fetchMetadata(event) {
      event.preventDefault();
      ArticleAction.fetchMetadata(this.state.url);
    }

    render() {

      const articlePreview = (
        <div className='article-preview'>
          <div className='contents'>
            <div className='article-detail'>
              <label htmlFor='title'>Title</label>
              <input type='text' id='title' value={this.state.title} onChange={this.changeTitle.bind(this)}/>
            </div>

            <div className='article-detail'>
              <label htmlFor='desc'>Description</label>
              <textarea id='desc' onChange={this.changeDesc.bind(this)}>{this.state.desc}</textarea>
            </div>

            <div className='article-detail'>
              <label>Tags</label>
              <ul className='tags'>
                {this.state.tags.popular.concat(this.state.tags.recommended).map((tag, id) => (<li key={id} className="popular">{tag}</li>))}
              </ul>
            </div>

            <button onClick={this.add.bind(this)}>Add Article</button>
          </div>

          <div className='preview'>
            <Article key='article' {...this.state}/>
          </div>
        </div>
      );

      return (
        <article className='component--add-article'>

          <ReactCSSTransitionGroup component='div' transitionName="add-article" transitionAppear={true}>
            <form key='add-article' onSubmit={this.fetchMetadata.bind(this)}>
              <input className='article-url' type='text' placeholder='Some article url' value={this.state.url} onChange={this.changeUrl.bind(this)} />
              <input className='add-article' type='submit'/>
            </form>
          </ReactCSSTransitionGroup>


          { this.state.title ? articlePreview : '' }

        </article>
      );
    }
  }

  return AddArticle;
}
