import React, { Component } from 'react';
import moment from 'moment';
import UserStore from '../../store/user-store';
import ArticleAction from '../../action/article-action';

require('./style.scss');

export default class Article extends Component {

  upvote(event) {
    ArticleAction.upvote(this.props, this.props.idx, UserStore.user);
  }
  
  render() {
    let twitter = this.props.shareCount && this.props.shareCount.Twitter
      ? this.props.shareCount.Twitter : '-';
    let facebook = this.props.shareCount && this.props.shareCount.Facebook && this.props.shareCount.Facebook.total_count
      ? this.props.shareCount.Facebook.total_count : '-';
    let google = this.props.shareCount && this.props.shareCount.GooglePlusOne
      ? this.props.shareCount.GooglePlusOne : '-';

    let upvotePossible = UserStore.loggedIn && UserStore.user.username === this.props.owner;
    upvotePossible = true;

    return (
      <article className="article">
        <div className="meta">
          <div className="meta-subscription-logo">
            <a href={''} target="_blank">
              <img src={''} />
            </a>
            <div className="TODO">
              {upvotePossible ? (<button onClick={this.upvote.bind(this)}>upvote</button>) : ''}
              Upvotes: {this.props.upvotes}

              Twitter: {twitter},
              Facebook: {facebook},
              Google+: {google}
            </div>
          </div>
          <div className="meta-data">
            <div className="author">
              <span className="author-by">By</span>
              <span className="author-name">{this.props.owner}</span>
            </div>
            <div className="publish-date">
              <span>{moment(this.props.date).format('h:mm:ss a')}</span>
            </div>
          </div>
        </div>

        <div className="media">
          <a href={this.props.url} target="_blank">
            { this.props.image ? <img src={this.props.image} /> : '' }
          </a>
        </div>

        <div className="article-body">
          <a className="headline" href={this.props.url} target="_blank">{this.props.title}</a>
          <p className="description">{this.props.desc}</p>
        </div>

        <div className="info-bar">
          <div className="actions">
            <span className="star">0</span>
            <span className="comment">0</span>
          </div>
          <div className="read-more">
            <a className="text" href={this.props.url} target="_blank">More</a>
          </div>
        </div>
      </article>
    );
  }

}

