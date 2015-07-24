import React, { Component } from 'react';
import Article from '../../component/article';

import ArticleStore from '../../store/article-store';

require('./style.scss');


export default class extends Component {

  constructor(props) {
    super(props);
    this.state = {articles : ArticleStore.articles};
  }

  articleListChanged() {
     this.setState({articles : ArticleStore.articles });
  }

  componentDidMount() {
    ArticleStore.on('change', this.articleListChanged);
  }

  componentWillUnmount() {
    ArticleStore.off('change', this.articleListChanged);
  }

  render() {
    console.log("this.state", this.state);
    
    return (
      <section className="structure--article-container">
        {this.state.articles.map((article) =>
          <Article {...article}/>
        )}
      </section>
    );
  }
}
