import React, { Component } from 'react';
import { Link } from 'react-router';

//require('./style.scss');

export default class Test extends Component {

  constructor(props) {
    super(props);

    this.state = {
      users : {
        root : {
          articles : [0]
        },
        jonathan : {
          articles : [1]
        },
        matthias : {
          articles : [2]
        },
        tim : {
          articles : [4]
        },
        hunt : {
          articles : [6]
        }
      },
      articles : [{
        upvotes : ['root', 'jonathan', 'matthias'],
        id : 'A'
      },{
        upvotes : ['jonathan', 'root', 'matthias', 'tim', 'hunt'],
        id : 'B'
      }, {
        upvotes : ['matthias'],
        id : 'C'
      }, {
        upvotes : []
      }, {
        upvotes : []
      }, {
        upvotes : ['hunt']
      }, {
        upvotes : []
      }]
    };

    this.state.cntUser = Object.keys(this.state.users).length;
    this.state.cntUpvotes = this.state.articles.reduce((l, article) => l + article.upvotes.length, 0);
  }

  getUser(userName) {
    return this.state.users[userName];
  }

  getArticle(articleId) {
    return this.state.articles[articleId];
  }

  userKarma(user) {
    return user.articles.reduce((last, articleId) =>
        last + this.articleKarma(this.getArticle(articleId)),
      1);
  }

  articleKarma(article) {
    return article.upvotes.length;
  }

  rangArticle(article, tn, t0) {
    return this.articleKarma(article) / (tn - t0);
  }

  getArticleRang(article, articleId) {
    return this.rangArticle(article, this.state.articles.length, articleId)
  }

  render() {
    let users = Object.keys(this.state.users).map((userName) => {
       return (<li>{userName} Karma: {this.userKarma(this.getUser(userName), this.state.articles.length-1)}</li>)
    });

    let articles = this.state.articles.map((article, articleId) => {
       return (<li>Article : {articleId} Karma: {this.articleKarma(article)} Rang : {this.getArticleRang(article, articleId)}</li>);
    });

    let sortedArticles = this.state.articles.map((article, articleId) => {
      return {
        article : article,
        articleId,
        rang : this.getArticleRang(article, articleId)
      }
    }).sort((a, b) => b.rang - a.rang)
      .map((a) => (<li>{a.articleId}</li>));

    return (
      <article className="component--test">
        <h1>Upvote testing</h1>
        <p>
          <ul>{users}</ul>
          <ul>{articles}</ul>
          <ul>{sortedArticles}</ul>
        </p>
      </article>
    );
  }

}