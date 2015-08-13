import React, { Component, addons } from 'react/addons';
const ReactCSSTransitionGroup = addons.CSSTransitionGroup;

import ArticleStore from '~/src/app/store/article-store';
import ArticleAction from '~/src/app/action/article-action';
import Article from '~/src/app/component/article';

require('./style.scss');

export default class AddArticle extends Component {

  constructor(props) {
    super(props);

    this.state = this.getInitState();
  }

  getInitState() {
    return {
      title : '',
      desc : '',
      url : '',
      image : '',
      gotMetadata : false,
      tags : {
        popular: [],
        recommended: []
      },
      togglActiveAddArticle: false
    }
  }

  metadataUpdated(data) {
    this.setState({
      title : data.title,
      desc : data.desc,
      image : data.image,
      gotMetadata : true
    });
  }

  tagSuggestionUpdate(data) {
    console.log("tagSuggestionUpdate", data);
    this.setState({tags : data});
  }

  articleAdded() {
     this.setState(this.getInitState());
  }

  componentDidMount() {
    ArticleStore.on('metadata-update', this.metadataUpdated.bind(this));
    ArticleStore.on('tag-suggestions', this.tagSuggestionUpdate.bind(this));
    ArticleStore.on('article-added', this.articleAdded.bind(this));
  }

  componentWillUnmount() {
    ArticleStore.removeListener('metadata-update', this.metadataUpdated.bind(this));
    ArticleStore.removeListener('tag-suggestions', this.tagSuggestionUpdate.bind(this));
    ArticleStore.removeListener('article-added', this.articleAdded.bind(this));
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
    console.log('fetch something', this.state.url);
    event.preventDefault();
    ArticleAction.fetchMetadata(this.state.url);
  }

  togglActiveAddArticle() {
    this.setState({
      togglActiveAddArticle: !this.state.togglActiveAddArticle
    })
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

    const stuff = (
      <div>
        <span className='someSpan'>URL</span>

        <input className='article-url' type='text' placeholder='Submit a new link...' value={this.state.url} onChange={this.changeUrl.bind(this)} />
        <button onClick={this.togglActiveAddArticle.bind(this)}>Close</button>
        <input className='add-article' type='submit'/>
      </div>
    );

    const style = {};

    if(this.state.togglActiveAddArticle === true) {
      style.height = 100;
    }

    return (
      <article className='component--add-article'>
        <form key='add-article' ref="addArticleForm" style={style} onSubmit={this.fetchMetadata.bind(this)}>
          <input type='text' className='article-url' onFocus={this.togglActiveAddArticle.bind(this)} placeholder='Write something...' />

          <ReactCSSTransitionGroup component="div" transitionName="route-change">
            { this.state.togglActiveAddArticle ? stuff : '' }
          </ReactCSSTransitionGroup>


        </form>

        { this.state.gotMetadata ? articlePreview : '' }

      </article>
    );
  }
}
