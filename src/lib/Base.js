import { config } from '../../globals';
import mongoClient from 'mongodb';
import storages from './../storages';
import { modelBase } from '../models';
import Redis from './RedisClass';
import nconf from './../initialize';
const errCode = nconf.get('errCode');

const MongoClient = mongoClient.MongoClient;

/**
 * BaseProcess class
 */
export default class BaseProcess {
  /**
   * Base Process with database
   * @param {String} chose 
   */
  constructor(chose) {
    this.collectionName = null;
    this._db = {};// eslint-disable-line
    this.url = config.dbGenUrl(nconf.get('db'));
    this.collectionName = this.checkCollection(chose);
    this.redis = new Redis(
      nconf.get('redis:port'),
      nconf.get('redis:host')
    );
  }
  /**
   * Check name in collection
   * @param {String} name 
   */
  checkCollection(name) {
    if (modelBase.indexOf(name.toString()) === -1) {
      return null;
    } else {
      return name;
    }
  }
  /**
   * Open connection to Mongodb
   * @param {String} collectionName
   */
  open(collectionName) {
    return new Promise((resolve, reject) => { // Use connect method to connect to the Server
      try {
        MongoClient.connect(this.url, (err, db) => {
          if (err || !this.collectionName || typeof this.collectionName !== 'string') {
            console.log(errCode.errConnection);
            reject(err || errCode.errCollectionName);
          } else {
            resolve(db.collection(collectionName));
          }
        });
      } catch (error) {
        // throw new Error(errCode.errBase);
        reject(null);
      }

    });
  }
  /**
   * Close Connection
   * @param {Object} _db
   */
  close(_db) {
    try {
      if (_db) {
        _db.close();
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error(errCode.errBase);
    }
  }
  /**
   *get Collection
   */
  get getCollection() {
    return this.collectionName;
  }
  /**
   * {String} collection
   */
  set setCollection(collection) {
    this.collectionName = collection;
  }
  /**
   * disconnect Server redis
   */
  quit() {
    this.redis.quit();
  }
  /**
   * Clear
   */
  clear() {
    return this.redis.clear();
  }
}
