import {MongoClient, ObjectId} from 'mongodb';
import * as when from 'when';
import * as nodeFn from 'when/node';

const MongoClientQ = nodeFn.liftAll(MongoClient);

export default class MongoQ {
  _db = undefined;

  static ObjectId = ObjectId;

  constructor(...args) {
    this._conQ = MongoClientQ.connect(...args)
      .then((db) => {
        this._db = db;
        return db;
      });
  }

  db() {
    if (this._db) {
      return when.resolve(this._db);
    } else {
      return this._conQ;
    }
  }
}
