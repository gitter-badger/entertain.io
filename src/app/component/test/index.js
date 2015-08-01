import React, { Component } from 'react';
import { Link } from 'react-router';

//require('./style.scss');

export default function create() {

  class Test extends Component {

    constructor(props) {
      super(props);

      this.state = {
        users : {
          root : {
            articles : [0],
            name : 'root'
          },
          jonathan : {
            articles : [1],
            name : 'jonathan'
          },
          matthias : {
            articles : [2],
            name : 'matthias'
          },
          //tim : {
          //  articles : [4]
          //},
          //hunt : {
          //  articles : [6]
          //}
        },
        articles : [{
          upvotes : ['root', 'jonathan', 'matthias'],
          id : 'A'
        },{
          upvotes : ['jonathan', 'root', 'matthias'],
          id : 'B'
        }, {
          upvotes : ['matthias'],
          id : 'C'
        }/*, {
          upvotes : ['jonathan','matthias']
        }, {
          upvotes : ['tim','jonathan']
        }, {
          upvotes : ['jonathan']
        }, {
          upvotes : ['hunt']
        }*/]
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

    userKarma(user, t) {
      let ret = user.articles.reduce((last, articleId) =>
          last + (articleId < t ? this.articleKarma(this.getArticle(articleId), articleId) : 0),
        1);
      console.log(`userKarma(${user.name}, ${t}) = ${ret}`);
      return ret;
    }

    articleKarma(article, t) {
      let ret =  article.upvotes.reduce((last, cur) => last + this.userKarma(this.getUser(cur), t), 0) / (1 + this.state.cntUser - article.upvotes.length );
      console.log(`articleKarma(${article.id}, ${t}) = ${ret}`);
      return ret;
    }

    rangArticle(article, tn, t0) {
      return this.articleKarma(article, tn) / (1 + tn - t0);
    }

    getArticleKarma(article) {
      return this.articleKarma(article, this.state.articles.length);
    }

    getArticleRang(article, articleId) {
      return this.rangArticle(article, this.state.articles.length, articleId)
    }

    render() {
      let users = Object.keys(this.state.users).map((userName) => {
         return (<li>{userName} Karma: {this.userKarma(this.getUser(userName), this.state.articles.length-1)}</li>)
      });

      let articles = this.state.articles.map((article, articleId) => {
         return (<li>Article : {articleId} Karma: {this.getArticleKarma(article)} Rang : {this.getArticleRang(article, articleId)}</li>);
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

  return Test;
}
