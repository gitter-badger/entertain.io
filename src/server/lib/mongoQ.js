import {MongoClient} from 'mongodb';
import * as when from 'when';
import * as nodeFn from 'when/node';

const MongoClientQ = nodeFn.liftAll(MongoClient);

export default class MongoQ {
  _db = null;

  constructor(...args) {
    this._conQ = MongoClientQ.connect(...args)
      .then((db) => {
        this._db = db;
        return db;
      });
  }

  db() {
    if (this._db) return when.resolve(this._db);
    else return this._conQ;
  }
  
}


/*
// started with `$ node <FILENAME>`
if (require.main === module) {
  let mongo = new MongoQ('mongodb://127.0.0.1:27017/mongoQ');
  mongo.db().then((db) => {
    db.collection('col').save({a:2});
    
    db.collection('col').findOne().then((d) => {
      console.log("d", d);
    });

    db.collection('col').find().toArray().then((d) => {
      console.log("arr", d);
    })
  })
  .done();
}
*/