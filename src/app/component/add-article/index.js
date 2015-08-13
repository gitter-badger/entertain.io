import React, { Component, addons } from 'react/addons';
const ReactCSSTransitionGroup = addons.CSSTransitionGroup;

import ArticleStore from '~/src/app/store/article-store';
import ArticleAction from '~/src/app/action/article-action';
import Article from '~/src/app/component/article';
import MainStore from '~/src/app/store/main-store';

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
      showAddArticle: false
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
    MainStore.on('body-clicked', this.bodyClick.bind(this))
  }

  componentWillUnmount() {
    ArticleStore.removeListener('metadata-update', this.metadataUpdated.bind(this));
    ArticleStore.removeListener('tag-suggestions', this.tagSuggestionUpdate.bind(this));
    ArticleStore.removeListener('article-added', this.articleAdded.bind(this));
    MainStore.removeListener('body-clicked', this.bodyClick.bind(this))
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

  showActiveAddArticle() {
    this.setState({
      showAddArticle: true
    })
  }

  bodyClick(e) {
    if(e.target.className.indexOf('component--article-collection') !== -1) {
      this.setState({
        showAddArticle: false
      });
    }
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
        <input className='add-article' type='submit'/>
      </div>
    );
        // { articlePreview }

    const style = {};

    if(this.state.showAddArticle === true) {
      style.height = 100;
    }

    return (
      <article className='component--add-article'>
        <form key='add-article' ref="addArticleForm" style={style} onSubmit={this.fetchMetadata.bind(this)}>
          <input type='text' className='article-url' onFocus={this.showActiveAddArticle.bind(this)} placeholder='Write something...' />

          <ReactCSSTransitionGroup component="div" transitionName="route-change">
            { this.state.showAddArticle ? stuff : '' }
          </ReactCSSTransitionGroup>
        </form>
      </article>
    );
  }
}
