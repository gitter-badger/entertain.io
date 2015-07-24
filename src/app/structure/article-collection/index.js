import React, { Component } from 'react';
import Article from '../../component/article';
require('./style.scss');

export default class extends Component {
  render() {
    return (
      <section className="structure--article-container">
        <Article />
      </section>
    );
  }
}
