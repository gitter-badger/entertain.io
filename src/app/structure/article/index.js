import React, { Component } from 'react';

require('./style.scss');

export default function create() {

  class Article extends Component {
    render() {
      return (
        <article className="structure--article">
          <h2>{this.props.title}</h2>
          <p>{this.props.teaser}</p>
          <a href={this.props.url}>{this.props.url}</a>
        </article>
      );
    }
  }

  return Article;
}
