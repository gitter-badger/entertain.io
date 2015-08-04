import MongoQ from '../lib/mongoQ'

export default function create() {

  const MONGO_URI = 'mongodb://127.0.0.1:27017/entertain';

  class Storage {

    mongo = new MongoQ(MONGO_URI);

    latestArticles(callback) {
      this.mongo.db()
        .then((db) => {
          return db.collection('articles').find().toArray()
        })
        .then((articles) => {
          callback(null, articles);
        })
        .catch((err) => {
          callback(err);
        })
    }

    addArticle(user, article, callback) {
      this.mongo.db()
        .then((db) => {
          article.date = new Date();
          article.user = user;
          return db.collection('articles').insertOne(article);
        })
        .then((insertMsg) => {
          callback(null, insertMsg);
        })
        .catch((err) => {
          callback(err);
        })
    }
  }

  return new Storage();
}
