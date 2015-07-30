import React, { Component } from 'react';

require('./style.scss');

export default function create(ArticleStore, Article, AddArticle) {

  class ArticleCollection extends Component {

    constructor(props) {
      super(props);
      this.state = {articles: ArticleStore.articles};
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
          <AddArticle/>
          <section className="component--article-collection">
            {this.state.articles.map((article) =>
                <Article key={article._id} {...article}/>
            )}
          </section>
        </div>
      );
    }
  }

  return ArticleCollection;
}
