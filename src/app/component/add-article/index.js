import React, { Component } from 'react';

require('./style.scss');

export default function create(Dispatcher, ArticleStore) {

  class AddArticle extends Component {

    changeTitle(event) {
      this.setState({title : event.target.value});
    }

    changeTeaser(event) {
      this.setState({teaser : event.target.value});
    }

    changeUrl(event) {
      this.setState({url : event.target.value});
    }

    add(event) {
      event.preventDefault();
      console.log("submit", this.state);

      Dispatcher.dispatch({
        eventName: 'new-article',
        article: this.state
      });
    }

    render() {
      return (
        <article className="component--add-article">
          <h1>Add Article</h1>
          <form>

            <div className="input-field">
              <label for="title">Title</label>
              <input type="text" id="title" onChange={this.changeTitle.bind(this)}/>
            </div>

            <div className="input-field">
              <label for="teaser">Teaser</label>
              <input type="text" id="teaser" onChange={this.changeTeaser.bind(this)}/>
            </div>

            <div className="input-field">
              <label for="url">URL</label>
              <input type="text" id="url" onChange={this.changeUrl.bind(this)} />
            </div>

            <input type="submit" onClick={this.add.bind(this)}/>
          </form>
        </article>
      );
    }

  }

  return AddArticle;
}
