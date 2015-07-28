import socketIO from 'socket.io';

export default function create(Server, PageMetadata) {

  // Temporary mem db..
  var articles = [{
    _id : 0,
    date : new Date(),
    title: 'The Most Important Movie of 2015 Is a VR Cartoon About a Hedgehog',
    desc: "Oculus Story Studio's new project is more than a cute animated short--it's a test case for narrative techniques that could change the way we watch movies.",
    url: 'http://www.wired.com/2015/07/oculus-story-studio-making-henry/',
    image: 'http://www.wired.com/wp-content/uploads/2015/07/henry_magic_lighting-1-1200x630-e1438042478968.jpg'
  }];

  class CommunicationServer {

    io = socketIO(Server.server, {path: '/ws'});

    constructor() {
      this.io.on('connection', (socket) => {

        socket.on('page-metadata', PageMetadata);
        socket.on('latest-articles', (callback) => {

          callback(null, articles);
        });
        socket.on('add-article', (article, callback) => {
          article._id = articles.length;
          article.date = new Date();
          articles.push(article);

          callback(null, article);
        });

      });
    }
  }

  return new CommunicationServer();
}