import React, { Component } from 'react';

import ArticleStore from '../../store/article-store';
import Article from '../article';
import AddArticle from '../add-article'

require('./style.scss');


export default class ArticleCollection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      articles: ArticleStore.articles,
      showAddArticle: false
    };
  }

  articleListChanged() {
    this.setState({articles: ArticleStore.articles});
  }

  articleAdded() {
    this.setState({showAddArticle : false});
  }

  componentDidMount() {
    ArticleStore.on('change', this.articleListChanged.bind(this));
    ArticleStore.on('article-added', this.articleAdded.bind(this));
  }

  componentWillUnmount() {
    ArticleStore.removeListener('change', this.articleListChanged.bind(this));
    ArticleStore.removeListener('article-added', this.articleAdded.bind(this));
  }

  render() {

    return (
      <div>
        { this.state.showAddArticle ? <AddArticle /> : '' }
        <button onClick={this.togglAddArticle.bind(this)}>+</button>
        <section className="component--article-collection">
          {this.state.articles.map((article) =>
              <Article key={article._id} {...article}/>
          )}
        </section>
      </div>
    );
  }

  togglAddArticle() {

    this.setState({showAddArticle: !this.state.showAddArticle});
  }
}