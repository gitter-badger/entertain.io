import React, { Component } from 'react';
import Article from '../../component/article';

import ArticleStore from '../../store/article-store';

require('./style.scss');


export default class extends Component {
  render() {
    return (
      <section className="structure--article-container">
        {ArticleStore.articles.map((article) =>
          <Article {...article}/>
        )}
      </section>
    );
  }
}
