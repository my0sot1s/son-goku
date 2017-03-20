import redis from 'redis';
import nconf from './../initialize';
import Promise from 'promise';
const Type = nconf.get('RedisType');
/**
 * Class create connect to redis server
 */
class Storage {
  /**
   * Contructor of class
   * @param {Number} port
   * @param {String} host
   * @param {Object} options
   */
  constructor(port, host, options) {
    this.port = Number(port);
    this.host = host;
    this.options = null;
    this.options = options && options !== {}
      ? options
      : null;
    // !this.host
    //   ? nconf.get('errConnRedis')
    //   : nconf.get('redisConnSuccess');
    this.createClient();
    this.client.on('connect', () => {
      console.log('Connected Redis server');
    });
    this.client.on('error', err => {
      console.log('Error in Redis class connect', err);
    });
  }
  /**
   * Create Client connnect
   */
  createClient() {
    this.client = redis.createClient(
      this.port,
      this.host,
      this.options
    );
  }
  /**
   * Get data to push to redis
   * @param {String} key
   * @param {String} field
   * @param {String} value
   * @param {Number} type
   */
  setter(key, field, value, type) {
    return new Promise((resolve, reject) => {
      if (!key) {
        reject('key not string');
      } else {
        if (!this.client.connected) {
          this.createClient();
        }
        switch (type) {
          case Type.N:
            this.client.set(key.toString(), value.toString(),
              (err, rep) => {
                if (err) {
                  console.log(err);
                  reject('reject request get', err);
                } else {
                  resolve(rep);
                }
              });
            break;
          case Type.H:
            console.log(key.toString(), field.toString(), value.toString());
            this.client.hset(key.toString(), field.toString(), value.toString(),
              (err, rep) => {
                if (err) {
                  console.log(err);
                  reject('reject request get', err);
                } else {
                  resolve(rep);
                }
              });
            break;
          default:
            console.log('++ Type not H or N ++');
            break;
        }
      }
    });
  }
  /**
   * Cal length of key
   * @param {String} key 
   */
  len(key) {
    return new Promise((resolve, reject) => {
      if (!key) {
        console.log('key not string');
        reject(null);
      } else {
        if (!this.client.connected) {
          this.createClient();
        }
        this.client.hlen(key.toString(),
          (err, rep) => {
            if (err) {
              reject('reject request get len', err);
            } else {
              resolve(rep);
            }
          });
      }

    });
  }
  /**
   * Get data from redis with field and key
   * @param {String} key
   * @param {String} field
   * @param {Number} type
   */
  getter(key, field, type) {
    return new Promise((resolve, reject) => {
      if (!key || key === null) {
        reject('key not string');
      } else {
        if (!this.client.connected) {
          this.createClient();
        }
        switch (type) {
          case Type.N:
            this.client.get(key.toString(), (err, rep) => {
              if (err) {
                reject('reject request get', err);
              } else {
                resolve(rep);
              }
            });
            break;
          case Type.H:
            this.client.hget(key.toString(), field.toString(),
              (err, rep) => {
                if (err) {
                  reject('reject request get', err);
                } else {
                  resolve(rep);
                }
              });
            break;
          default:
            console.log('++ Type not H or N ++');
            break;
        }
      }
    });
  }
  /**
   * Get all data with key
   * @param {String} key
   */
  getall(key) {
    return new Promise((resolve, reject) => {
      if (!this.client.connected) {
        this.createClient();
      }
      if (!key || key === null) {
        reject('key not string');
      } else {
        if (!this.client.connected) {
          this.createClient();
        }
        this.client.hgetall(key, (err, rep) => {
          if (err) {
            reject('reject request get', err);
          } else {
            resolve(rep);
          }
        });
      }
    });
  }
  /**
   * Delete data with key and field
   * @param {String} key
   * @param {Number} type
   * @param {String} field
   */
  del(key, field, type) {
    return new Promise((resolve, reject) => {
      if (!this.client.connected) {
        this.createClient();
      }
      if (!key || key === null) {
        reject('key not string');
      } else {
        if (!this.client.connected) {
          this.createClient();
        }
        switch (type) {
          case Type.N:
            this.client.del(key, (err, rep) => {
              if (err) {
                reject('reject request delete', err);
              } else {
                resolve(rep);
              }
            });
            break;
          case Type.H:
            this.client.hdel(key, field, (err, rep) => {
              if (err) {
                reject('reject request del', err);
              } else {
                resolve(rep);
              }
            });
            break;
          default:
            console.log('++ Type not H or N ++');
            break;
        }
      }
    });
  }
  /**
   * clear all db
   */
  clear() {
    return new Promise((resolve, reject) => {
      if (!this.client.connected) {
        this.createClient();
      }
      this.client.flushall((err, success) => {
        if (err) {
          reject(err);
        } else {
          resolve(success);
        }
      });
    });
  }
  /**
   * disconnect
   */
  quit() {
    try {
      if (this.client.connected) {
        this.client.quit();
      }
      console.log('--Disconnect redis--');
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * getclient
   */
  get getClient() {
    return this.client;
  }
}

export default Storage;
