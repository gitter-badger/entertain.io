import React, { Component } from 'react';

require('./style.scss');

export default function create(ArticleStore, Article, AddArticle) {

  class ArticleCollection extends Component {

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

    componentDidMount() {
      ArticleStore.on('change', this.articleListChanged.bind(this));
    }

    componentWillUnmount() {
      ArticleStore.removeListener('change', this.articleListChanged.bind(this));
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

  return ArticleCollection;
}
