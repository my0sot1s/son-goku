import BaseProcess from './../lib/Base';
import Redis from './../lib/RedisClass';
import storages from '../storages';
import nconf from './../initialize';
import Promise from 'promise';

const ERROR_CODE = nconf.get('errCode');
const REDIS_TYPE = nconf.get('RedisType');

/**
 * read class
 */
export default class ReadAction extends BaseProcess {
  /**
   * Read data from database
   * @param {any} read constructor
   */
  read() {
    return new Promise((resolve, reject) => {
      if (!this.collectionName) {
        console.log(ERROR_CODE.errProcessRead);
        reject(null);
      } else {
        const RESPONSE = {};
        this.redis.getall(this.collectionName).then(first => {
          if (!first) {
            this.open(this.collectionName)
              .then(done => {
                done.find({}).toArray((err, docs) => {
                  if (err) {
                    reject(ERROR_CODE.errProcessRead);
                  } else {
                    if (!storages[this.collectionName].isCached) {
                      for (const ii in docs) {
                        RESPONSE[docs[ii]._id] = docs[ii];
                        // if (storages[this.collectionName].maxKey === 0) {
                        if (storages[this.collectionName].maxKey < docs[ii]._id) {
                          storages[this.collectionName].maxKey = docs[ii]._id;
                          // }
                        }
                        resolve(RESPONSE);
                      }
                    } else {
                      console.log('---Not Cached---');
                      for (const ii in docs) {
                        this.redis.setter(
                          this.collectionName, docs[ii]._id, JSON.stringify(docs[ii]), REDIS_TYPE.H);
                        RESPONSE[docs[ii]._id] = docs[ii];
                        if (storages[this.collectionName].maxKey < docs[ii]._id) {
                          storages[this.collectionName].maxKey = docs[ii]._id;
                        }
                      }
                      resolve(RESPONSE);
                    }
                  }
                });
              });
          } else {
            for (var ii in first) {
              first[ii] = JSON.parse(first[ii]);
              if (storages[this.collectionName].maxKey < first[ii]._id) {
                storages[this.collectionName].maxKey = first[ii]._id;
              }
            }
            console.log('---Cached---');
            resolve(first);
          }
        }).catch(err => {
          console.log(err);
        });
      }
    });
  }
  /**
 * Find Data with db
 * @param {Object} dataFind
 */
  getById(dataFind) {
    return new Promise((resolve, reject) => {
      console.log(dataFind);
      if (!this.collectionName) {
        reject(null);
      }
      this.open(this.collectionName)
        .then(done => {
          done.find(dataFind).toArray((err, docs) => {
            if (err) {
              reject(null);
            } else {
              resolve(docs);
            }
          });
        }).catch(err => {
          console.log(ERROR_CODE.errProcessFind, err);
          reject(null);
        });
    });
  }
  /**
   * Reset all in memory
   * @param {any} any params
   */
  reset() {
    return new Promise((resolve, reject) => {
      if (!this.collectionName) {
        reject(null);
      } else {
        this.redis.clear()
          .then(r => {
            resolve(r);
          }).catch(e => {
            console.log(e);
            reject(null);
          });
      }
    });
  }
}

