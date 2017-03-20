import BaseProcess from './../lib/Base';
import storages from './../storages';
import nconf from './../initialize';
const ERROR_CODE = nconf.get('errCode');

import Promise from 'promise';
const REDIS_TYPE = nconf.get('RedisType');
/**
 * deleted class
 */
export default class DeleteAction extends BaseProcess {

  /**
   * Delete data Process
   * @param {Number} _id 
   */
  delete(_id) {
    return new Promise((resolve, reject) => {
      if (!this.collectionName) {
        reject(null);
      }
      this.open(this.collectionName)
        .then(done => {
          done.remove({ _id: _id }, call => {
            console.log(call);
            if (storages[this.collectionName].isCached) {
              this.redis.del(this.collectionName, _id.toString(), REDIS_TYPE.H)
                .then(r => {
                  console.log(r);
                  resolve(_id);
                }).catch(e => {
                  console.log(e);
                  reject(null);
                });
            } else {
              resolve({ _id: _id });
            }
          });
        })
        .catch(err => {
          console.log(ERROR_CODE.errProcessDelete, err);
          reject(null);
        });
    });
  }
}
