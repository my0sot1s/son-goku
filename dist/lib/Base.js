'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _globals = require('../../globals');

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

var _storages = require('./../storages');

var _storages2 = _interopRequireDefault(_storages);

var _models = require('../models');

var _RedisClass = require('./RedisClass');

var _RedisClass2 = _interopRequireDefault(_RedisClass);

var _initialize = require('./../initialize');

var _initialize2 = _interopRequireDefault(_initialize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var errCode = _initialize2.default.get('errCode');

var MongoClient = _mongodb2.default.MongoClient;

/**
 * BaseProcess class
 */

var BaseProcess = function () {
  /**
   * Base Process with database
   * @param {String} chose 
   */
  function BaseProcess(chose) {
    _classCallCheck(this, BaseProcess);

    this.collectionName = null;
    this._db = {}; // eslint-disable-line
    this.url = _globals.config.dbGenUrl(_initialize2.default.get('db'));
    this.collectionName = this.checkCollection(chose);
    this.redis = new _RedisClass2.default(_initialize2.default.get('redis:port'), _initialize2.default.get('redis:host'));
  }
  /**
   * Check name in collection
   * @param {String} name 
   */


  _createClass(BaseProcess, [{
    key: 'checkCollection',
    value: function checkCollection(name) {
      if (_models.modelBase.indexOf(name.toString()) === -1) {
        return null;
      } else {
        return name;
      }
    }
    /**
     * Open connection to Mongodb
     * @param {String} collectionName
     */

  }, {
    key: 'open',
    value: function open(collectionName) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        // Use connect method to connect to the Server
        try {
          MongoClient.connect(_this.url, function (err, db) {
            if (err || !_this.collectionName || typeof _this.collectionName !== 'string') {
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

  }, {
    key: 'close',
    value: function close(_db) {
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

  }, {
    key: 'quit',

    /**
     * disconnect Server redis
     */
    value: function quit() {
      this.redis.quit();
    }
    /**
     * Clear
     */

  }, {
    key: 'clear',
    value: function clear() {
      return this.redis.clear();
    }
  }, {
    key: 'getCollection',
    get: function get() {
      return this.collectionName;
    }
    /**
     * {String} collection
     */

  }, {
    key: 'setCollection',
    set: function set(collection) {
      this.collectionName = collection;
    }
  }]);

  return BaseProcess;
}();

exports.default = BaseProcess;