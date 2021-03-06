import React, { Component } from 'react';
import moment from 'moment';
import UserStore from '../../store/user-store';
import ArticleAction from '../../action/article-action';
import { Link } from 'react-router';
import classNames from 'classnames';
import inViewport from 'in-viewport';

require('./style.scss');

export default class Article extends Component {

  upvote(event) {
    console.log(event);
    ArticleAction.upvote(this.props, this.props.idx, UserStore.user, (err) => {
      if(err === 'auth missing!') {
        alert('You have to login to vote articles')
      }
    });
  }

  removeArticle() {
    if(confirm('Do you want to delete this article?')) {
      ArticleAction.remove(this.props._id);
    }
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  componentDidMount() {
    let content = React.findDOMNode(this.refs.content);

    inViewport(content, (el) => {
      el.className +=" inview";
    });

  }

  render() {
    const twitter = this.props.shareCount && this.props.shareCount.Twitter
      ? this.props.shareCount.Twitter : '-';
    const facebook = this.props.shareCount && this.props.shareCount.Facebook && this.props.shareCount.Facebook.total_count
      ? this.props.shareCount.Facebook.total_count : '-';
    const google = this.props.shareCount && this.props.shareCount.GooglePlusOne
      ? this.props.shareCount.GooglePlusOne : '-';

    const upvotePossible = UserStore.loggedIn && UserStore.user.articles.filter(x => x === this.props._id).length > 0;
    const deletePossible = UserStore.loggedIn && this.props.owner === UserStore.user.username;

    const contentStyle = {
      backgroundImage: `url(${this.props.image})`
    };

    const avatarStyle = {
      // Default
      // backgroundImage: `url('../../static/images/user.svg')`
    }

    return (
      <article className="component--article">
        <div className='meta'>
          <div className='extra'>
            { deletePossible ? <button onClick={this.removeArticle.bind(this)} className='remove'></button> : '' }
          </div>
          <div className='points'>
            <button className={classNames('vote', {'already-voted' : upvotePossible})} disabled={upvotePossible} onClick={this.upvote.bind(this)}></button>
            <span className='counter'>{this.props.upvotes}</span>
            <button className='vote down'></button>
          </div>
        </div>
        <div className='main'>
          <div className='info'>
            <div className='avatar'>
              <div className='image' style={ avatarStyle }></div>
            </div>
            <div>
              <Link className='username' to={`/@${this.props.owner}`}>{this.props.owner}</Link>
              <span className='posted'>{moment(this.props.date).fromNow()}</span>
            </div>
          </div>
          <div className='text'>{this.props.text}</div>
          <a className='content' style={contentStyle} href={this.props.url} ref="content" target="_blank">
            <div className='body'>
              <h3 className="headline">{this.props.title}</h3>
              <p className="desc">{this.props.desc}</p>
            </div>
          </a>
          <div className='tags'>
            <span className='text'>Tags:</span>
            {this.props.tags.map((tag, index) => <Link className='tag' to={`/tag/${tag}`}>{tag}</Link>)}
          </div>
        </div>
      </article>
    );
  }
}
