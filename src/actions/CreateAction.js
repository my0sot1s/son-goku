import BaseProcess from './../lib/Base';
import storages, { dynamicClass } from '../storages';
import nconf from './../initialize';
const ERROR_CODE = nconf.get('errCode');
const REDIS_TYPE = nconf.get('RedisType');
/**
 * create class
 */
export default class CreateAction extends BaseProcess {
  /**
   * Create data
   * @param {String} str 
   */
  create(str) {
    return new Promise((resolve, reject) => {
      console.log('--data', str);
      var json = JSON.parse(str);
      if (!this.collectionName) {
        console.log(ERROR_CODE.errProcessCreat, 'if_1');
        reject(null);
      } else if (str._id === null || str.uname === null || json === {} || !json) {
        console.log(ERROR_CODE.errProcessCreat, 'if_2');
        reject(null);
      } else {
        console.log(storages[this.collectionName].maxKey);

        const data = dynamicClass(this.collectionName, json);

        data._id = storages[this.collectionName].maxKey + 1;

        storages[this.collectionName].maxKey++;

        console.log(`--Max key ${this.collectionName} now:`, storages[this.collectionName].maxKey);

        this.open(this.collectionName).then(done => {
          done.insert(data.jsondata, call => {
            if (storages[this.collectionName].isCached) {
              this.redis.setter(this.collectionName, data._id, JSON.stringify(data.jsondata), REDIS_TYPE.H)
                .then(r => {
                  resolve(data.jsondata);
                }).catch(e => {
                  reject(null);
                });
            } else {
              console.log('--ko ghi--');
              resolve(data);
            }
          });
        }).catch(err => {
          console.log(ERROR_CODE.errProcessCreat, err);
          reject(null);
        });
      }
    });

  }
}
