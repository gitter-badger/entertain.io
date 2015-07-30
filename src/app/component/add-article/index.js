import React, { Component } from 'react';
import { Link, RouteHandler } from 'react-router';

require('./style.scss');

export default function create(ArticleStore, ArticleAction) {

  class AddArticle extends Component {

    constructor(props) {
      super(props);

      this.state = {
        title : '',
        desc : '',
        url : '',
        image : ''
      };
    }

    metadataUpdated(data) {
      this.setState({
        title : data.title,
        desc : data.desc,
        image : data.image
      });
    }

    componentDidMount() {
      ArticleStore.on('metadata-update', this.metadataUpdated.bind(this));
    }

    componentWillUnmount() {
      ArticleStore.removeListener('metadata-update', this.metadataUpdated.bind(this));
    }

    changeTitle(event) {
      this.setState({title : event.target.value});
    }

    changeDesc(event) {
      this.setState({desc : event.target.value});
    }

    changeUrl(event) {
      this.setState({url : event.target.value});
    }

    add(event) {
      event.preventDefault();

      ArticleAction.addArticle(this.state);
    }

    fetchMetadata(event) {
      ArticleAction.fetchMetadata(this.state.url);
    }

    render() {
      return (
        <article className="component--add-article">
          <h1>Add Article</h1>
          <Link to="/">CLOSE</Link>
          <form>

            <div className="input-field">
              <label htmlFor="title">Title</label>
              <input type="text" id="title" value={this.state.title} onChange={this.changeTitle.bind(this)}/>
            </div>

            <div className="input-field">
              <label htmlFor="desc">Description</label>
              <input type="text" id="desc" value={this.state.desc} onChange={this.changeDesc.bind(this)}/>
            </div>

            <div className="input-field">
              <label htmlFor="url">URL</label>
              <input type="text" id="url" value={this.state.url} onChange={this.changeUrl.bind(this)} />
            </div>

            <img src={this.state.image}/>

            <input type="button" value="fetch page data" onClick={this.fetchMetadata.bind(this)}/>

            <input type="submit" onClick={this.add.bind(this)}/>
          </form>
        </article>
      );
    }

  }

  return AddArticle;
}
