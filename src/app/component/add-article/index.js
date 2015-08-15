import React, { Component, addons } from 'react/addons';
const ReactCSSTransitionGroup = addons.CSSTransitionGroup;
import "babel-core/polyfill";

import AddArticleStore from '~/src/app/store/add-article-store';
import AddArticleAction from '~/src/app/action/add-article-action';
import Article from '~/src/app/component/article';
import ArticlePreview from '~/src/app/component/article-preview';
import Indicator from '~/src/app/component/indicator';

require('./style.scss');

export default class AddArticle extends Component {

  constructor(props) {
    super(props);
    this.state = AddArticleStore.state;
  }

  tagSuggestionUpdate(data) {
    this.setState({tags : data});
  }

  storeChanged() {
    this.setState(AddArticleStore.state);
  }

  componentDidMount() {
    AddArticleStore.on('change', this.storeChanged.bind(this));
  }

  componentWillUnmount() {
    AddArticleStore.removeListener('change', this.storeChanged.bind(this));
  }

  changeTitle(event) {
    AddArticleAction.changeTitle(event.target.value);
  }

  changeDesc(event) {
    AddArticleAction.changeDesc(event.target.value);
  }

  changeUrl(event) {
    AddArticleAction.changeUrl(event.target.value);
  }

  changeText(event) {
    AddArticleAction.changeText(event.target.value);
  }

  add(event) {
    event.preventDefault();
    AddArticleAction.addArticle();
  }

  fetchMetadata(event) {
    event.preventDefault();
    AddArticleAction.fetchMetadata(this.state.article.url);
  }

  showActiveAddArticle() {
    if(!this.state.showAdvancedForm) {
      //console.log('show');
      AddArticleAction.showAdvancedForm();
    }
  }

  render() {

    const articlePreview = (
      <div className='article-preview'>
        <div className='contents'>
          <div className='article-detail'>
            <label htmlFor='title'>Title</label>
            <input type='text' id='title' value={this.state.article.title} onChange={this.changeTitle.bind(this)}/>
          </div>

          <div className='article-detail'>
            <label htmlFor='desc'>Description</label>
            <textarea id='desc' onChange={this.changeDesc.bind(this)}>{this.state.article.desc}</textarea>
          </div>

          <div className='article-detail'>
            <label>Tags</label>
            <ul className='tags'>
              {this.state.article.tags.map((tag, id) =>
                (<li key={id}>{tag}</li>)
              )}
            </ul>
          </div>

          <button onClick={this.add.bind(this)}>Add Article</button>
        </div>

        <div className='preview'>
          <Article key='article' {...this.state}/>
        </div>
      </div>
    );

    const addFormStyle = {};
    const advancedForm = (
      <div className='advanced-form'>
        <div className='article-text-block'>
          <i className='write'></i>
          <input placeholder='Add some text' className='article-text' onChange={this.changeText.bind(this)}/>
        </div>

        <div className='article-tags-block'>
          <i className='tags'></i>
          <div className='article-tags'>
            {this.state.article.tags.map((tag, id) =>
                (<span className='tag' key={id}>{tag}<button className='close'></button></span>)
            )}
            <input type='text' placeholder='Add Tag'/>
          </div>
        </div>

        <button className='publish-article' onClick={this.add.bind(this)}>Publish Article</button>

      </div>
    );

        // <input className='publish-article' type='submit' value='Fetch'/>
        // <input className='publish-article' type='submit' value='Publish'/>
        // <ArticlePreview {...this.state}/>

    if(this.state.showAdvancedForm === true) {
      addFormStyle.height = 220;
    } else {
      addFormStyle.height = 50;
    }

    return (
      <article className='component--add-article'>
        <form className='add-article' key='add-article' ref="addArticleForm" style={addFormStyle} onSubmit={this.fetchMetadata.bind(this)}>
          <div className='article-url-block'>
            <i className='url'></i>
            <input placeholder='Post new link' className='article-url' type='url' onFocus={this.showActiveAddArticle.bind(this)} value={this.state.article.url} onChange={this.changeUrl.bind(this)}/>
            { this.state.loading ? <Indicator/> : '' }
          </div>
          <ReactCSSTransitionGroup component="div" transitionName="route-change">
            { this.state.showAdvancedForm ? advancedForm : '' }
          </ReactCSSTransitionGroup>
        </form>
      </article>
    );
  }
}
