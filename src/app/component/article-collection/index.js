import React, { Component } from 'react';

require('./style.scss');

export default function create(ArticleStore, Article) {

  class ArticleCollection extends Component {

    constructor(props) {
      super(props);
      this.state = {articles: ArticleStore.articles};
    }

    articleListChanged() {
      this.setState({articles: ArticleStore.articles});
    }

    componentDidMount() {
      ArticleStore.on('change', this.articleListChanged);
    }

    componentWillUnmount() {
      ArticleStore.removeListener('change', this.articleListChanged);
    }

    render() {

      return (
        <section className="component--article-collection">
          {this.state.articles.map((article) =>
              <Article {...article}/>
          )}
        </section>
      );
    }
  }

  return ArticleCollection;
}
