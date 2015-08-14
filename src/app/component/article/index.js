import React, { Component } from 'react';
import moment from 'moment';
import UserStore from '../../store/user-store';
import ArticleAction from '../../action/article-action';
import { Link } from 'react-router';
import classNames from 'classnames';

require('./style.scss');

export default class Article extends Component {

  upvote(event) {
    ArticleAction.upvote(this.props, this.props.idx, UserStore.user);
  }

  render() {
    const twitter = this.props.shareCount && this.props.shareCount.Twitter
      ? this.props.shareCount.Twitter : '-';
    const facebook = this.props.shareCount && this.props.shareCount.Facebook && this.props.shareCount.Facebook.total_count
      ? this.props.shareCount.Facebook.total_count : '-';
    const google = this.props.shareCount && this.props.shareCount.GooglePlusOne
      ? this.props.shareCount.GooglePlusOne : '-';

    let alreadyUpvoted = UserStore.user.articles.filter(x => x === this.props._id).length > 0;
    let upvotePossible = UserStore.loggedIn && alreadyUpvoted;


    const contentStyle = {
      backgroundImage: `url(${this.props.image})`
    };

    return (
      <article className="component--article">
        <div className='meta'>
          <div className='points'>
            <button className={classNames('vote', {'already-voted' : alreadyUpvoted})} disabled={upvotePossible} onClick={this.upvote.bind(this)}></button>
            <span className='counter'>{this.props.upvotes}</span>
            <button className='vote down'></button>
          </div>
        </div>
        <div className='main'>
          <div className='info'>
            <div className='avatar'>
              <img src='https://cdn-images-1.medium.com/fit/c/72/72/0*CUkJSOwJ_wnHcDct.png' />
            </div>
            <div>
              <Link className='username' to={`/@${this.props.owner}`}>{this.props.owner}</Link>
              <span className='posted'>{moment(this.props.date).fromNow()}</span>
            </div>
          </div>
          <div className='text'>Is this real life or just a fanta-sea?</div>
          <a className='content' style={contentStyle} href={this.props.url} target="_blank">
            <div className='body'>
              <h3 className="headline">{this.props.title}</h3>
              <p className="desc">{this.props.desc}</p>
            </div>
          </a>
        </div>
      </article>
    );
  }
}
