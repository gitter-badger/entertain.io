import MongoQ from '../lib/mongoQ'

export default function create() {

  const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/entertain';

  class Storage {

    mongo = new MongoQ(MONGO_URI);

    latestArticles(callback) {
      this.mongo.db()
        .then((db) => {
          return db.collection('articles').find().sort({date : -1}).toArray()
        })
        .then((articles) => {
          callback(null, articles);
        })
        .catch((err) => {
          callback(err);
        })
    }

    addArticle(article, username, callback) {
      article.date = new Date();
      article.owner = username;

      this.mongo.db()
        .then((db) => {
          return db.collection('articles').insertOne(article);
        })
        .then((insertMsg) => {
          article._id = insertMsg.insertedId;
          callback(null, article);
        })
        .catch((err) => {
          callback(err);
        })
    }

    getUser(username, callback) {
      this.mongo.db()
        .then(db => db.collection('users').findOne({username}))
        .then(user => {
          if (!user) callback('user not found!');
          else callback(null, user)
        })
        .catch(err => callback(err));

    }

    saveUser(user, callback) {
      this.mongo.db()
        .then(db => db.collection('users').save(user))
        .then(user => callback(null, user))
        .catch(err => callback(err));
    }
  }

  return new Storage();
}
