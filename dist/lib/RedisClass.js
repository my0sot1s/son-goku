'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _redis = require('redis');

var _redis2 = _interopRequireDefault(_redis);

var _initialize = require('./../initialize');

var _initialize2 = _interopRequireDefault(_initialize);

var _promise = require('promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Type = _initialize2.default.get('RedisType');
/**
 * Class create connect to redis server
 */

var Storage = function () {
  /**
   * Contructor of class
   * @param {Number} port
   * @param {String} host
   * @param {Object} options
   */
  function Storage(port, host, options) {
    _classCallCheck(this, Storage);

    this.port = Number(port);
    this.host = host;
    this.options = null;
    this.options = options && options !== {} ? options : null;
    // !this.host
    //   ? nconf.get('errConnRedis')
    //   : nconf.get('redisConnSuccess');
    this.createClient();
    this.client.on('connect', function () {
      console.log('Connected Redis server');
    });
    this.client.on('error', function (err) {
      console.log('Error in Redis class connect', err);
    });
  }
  /**
   * Create Client connnect
   */


  _createClass(Storage, [{
    key: 'createClient',
    value: function createClient() {
      this.client = _redis2.default.createClient(this.port, this.host, this.options);
    }
    /**
     * Get data to push to redis
     * @param {String} key
     * @param {String} field
     * @param {String} value
     * @param {Number} type
     */

  }, {
    key: 'setter',
    value: function setter(key, field, value, type) {
      var _this = this;

      return new _promise2.default(function (resolve, reject) {
        if (!key) {
          reject('key not string');
        } else {
          if (!_this.client.connected) {
            _this.createClient();
          }
          switch (type) {
            case Type.N:
              _this.client.set(key.toString(), value.toString(), function (err, rep) {
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
              _this.client.hset(key.toString(), field.toString(), value.toString(), function (err, rep) {
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

  }, {
    key: 'len',
    value: function len(key) {
      var _this2 = this;

      return new _promise2.default(function (resolve, reject) {
        if (!key) {
          console.log('key not string');
          reject(null);
        } else {
          if (!_this2.client.connected) {
            _this2.createClient();
          }
          _this2.client.hlen(key.toString(), function (err, rep) {
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

  }, {
    key: 'getter',
    value: function getter(key, field, type) {
      var _this3 = this;

      return new _promise2.default(function (resolve, reject) {
        if (!key || key === null) {
          reject('key not string');
        } else {
          if (!_this3.client.connected) {
            _this3.createClient();
          }
          switch (type) {
            case Type.N:
              _this3.client.get(key.toString(), function (err, rep) {
                if (err) {
                  reject('reject request get', err);
                } else {
                  resolve(rep);
                }
              });
              break;
            case Type.H:
              _this3.client.hget(key.toString(), field.toString(), function (err, rep) {
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

  }, {
    key: 'getall',
    value: function getall(key) {
      var _this4 = this;

      return new _promise2.default(function (resolve, reject) {
        if (!_this4.client.connected) {
          _this4.createClient();
        }
        if (!key || key === null) {
          reject('key not string');
        } else {
          if (!_this4.client.connected) {
            _this4.createClient();
          }
          _this4.client.hgetall(key, function (err, rep) {
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

  }, {
    key: 'del',
    value: function del(key, field, type) {
      var _this5 = this;

      return new _promise2.default(function (resolve, reject) {
        if (!_this5.client.connected) {
          _this5.createClient();
        }
        if (!key || key === null) {
          reject('key not string');
        } else {
          if (!_this5.client.connected) {
            _this5.createClient();
          }
          switch (type) {
            case Type.N:
              _this5.client.del(key, function (err, rep) {
                if (err) {
                  reject('reject request delete', err);
                } else {
                  resolve(rep);
                }
              });
              break;
            case Type.H:
              _this5.client.hdel(key, field, function (err, rep) {
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

  }, {
    key: 'clear',
    value: function clear() {
      var _this6 = this;

      return new _promise2.default(function (resolve, reject) {
        if (!_this6.client.connected) {
          _this6.createClient();
        }
        _this6.client.flushall(function (err, success) {
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

  }, {
    key: 'quit',
    value: function quit() {
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

  }, {
    key: 'getClient',
    get: function get() {
      return this.client;
    }
  }]);

  return Storage;
}();

exports.default = Storage;