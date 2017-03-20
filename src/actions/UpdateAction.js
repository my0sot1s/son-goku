import BaseProcess from './../lib/Base';
import Promise from 'promise';
import storages, { dynamicClass } from '../storages';
import nconf from './../initialize';
const errCode = nconf.get('errCode');
const Type = nconf.get('RedisType');

/**
 * update
 */
export default class UpdateAction extends BaseProcess {
  /**
   * Update data to db or redis
   * @param {String} str
   */
  update(str) {
    return new Promise((resolve, reject) => {
      if (!this.collectionName) {
        reject(null);
      }
      var json = JSON.parse(str);
      if (json._id <= 0 || json._id > storages[this.collectionName].maxKey) {
        reject(null);
      }
      const data = dynamicClass(this.collectionName, json);

      this.open(this.collectionName)
        .then(done => {
          done.update({ _id: Number(json._id) }, data.jsondata, call => {// eslint-disable-line
            if (storages[this.collectionName].isCached) {
              this.redis.setter(this.collectionName, json._id.toString(), JSON.stringify(data.jsondata), Type.H)
                .then(r => {
                  console.log(r);
                  resolve(data.jsondata);
                }).catch(e => {
                  console.log(e);
                  reject(null);
                });
            } else {
              resolve(data);
            }
          });
        })
        .catch(err => {
          console.log(errCode.errProcessUpdate, err);
          reject(null);
        });
    });
  }
}
