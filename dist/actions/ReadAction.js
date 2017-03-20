'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Base = require('./../lib/Base');

var _Base2 = _interopRequireDefault(_Base);

var _RedisClass = require('./../lib/RedisClass');

var _RedisClass2 = _interopRequireDefault(_RedisClass);

var _storages = require('../storages');

var _storages2 = _interopRequireDefault(_storages);

var _initialize = require('./../initialize');

var _initialize2 = _interopRequireDefault(_initialize);

var _promise = require('promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ERROR_CODE = _initialize2.default.get('errCode');
var REDIS_TYPE = _initialize2.default.get('RedisType');

/**
 * read class
 */

var ReadAction = function (_BaseProcess) {
  _inherits(ReadAction, _BaseProcess);

  function ReadAction() {
    _classCallCheck(this, ReadAction);

    return _possibleConstructorReturn(this, (ReadAction.__proto__ || Object.getPrototypeOf(ReadAction)).apply(this, arguments));
  }

  _createClass(ReadAction, [{
    key: 'read',

    /**
     * Read data from database
     * @param {any} read constructor
     */
    value: function read() {
      var _this2 = this;

      return new _promise2.default(function (resolve, reject) {
        if (!_this2.collectionName) {
          console.log(ERROR_CODE.errProcessRead);
          reject(null);
        } else {
          var RESPONSE = {};
          _this2.redis.getall(_this2.collectionName).then(function (first) {
            if (!first) {
              _this2.open(_this2.collectionName).then(function (done) {
                done.find({}).toArray(function (err, docs) {
                  if (err) {
                    reject(ERROR_CODE.errProcessRead);
                  } else {
                    if (!_storages2.default[_this2.collectionName].isCached) {
                      for (var _ii in docs) {
                        RESPONSE[docs[_ii]._id] = docs[_ii];
                        // if (storages[this.collectionName].maxKey === 0) {
                        if (_storages2.default[_this2.collectionName].maxKey < docs[_ii]._id) {
                          _storages2.default[_this2.collectionName].maxKey = docs[_ii]._id;
                          // }
                        }
                        resolve(RESPONSE);
                      }
                    } else {
                      console.log('---Not Cached---');
                      for (var _ii2 in docs) {
                        _this2.redis.setter(_this2.collectionName, docs[_ii2]._id, JSON.stringify(docs[_ii2]), REDIS_TYPE.H);
                        RESPONSE[docs[_ii2]._id] = docs[_ii2];
                        if (_storages2.default[_this2.collectionName].maxKey < docs[_ii2]._id) {
                          _storages2.default[_this2.collectionName].maxKey = docs[_ii2]._id;
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
                if (_storages2.default[_this2.collectionName].maxKey < first[ii]._id) {
                  _storages2.default[_this2.collectionName].maxKey = first[ii]._id;
                }
              }
              console.log('---Cached---');
              resolve(first);
            }
          }).catch(function (err) {
            console.log(err);
          });
        }
      });
    }
    /**
    * Find Data with db
    * @param {Object} dataFind
    */

  }, {
    key: 'getById',
    value: function getById(dataFind) {
      var _this3 = this;

      return new _promise2.default(function (resolve, reject) {
        console.log(dataFind);
        if (!_this3.collectionName) {
          reject(null);
        }
        _this3.open(_this3.collectionName).then(function (done) {
          done.find(dataFind).toArray(function (err, docs) {
            if (err) {
              reject(null);
            } else {
              resolve(docs);
            }
          });
        }).catch(function (err) {
          console.log(ERROR_CODE.errProcessFind, err);
          reject(null);
        });
      });
    }
    /**
     * Reset all in memory
     * @param {any} any params
     */

  }, {
    key: 'reset',
    value: function reset() {
      var _this4 = this;

      return new _promise2.default(function (resolve, reject) {
        if (!_this4.collectionName) {
          reject(null);
        } else {
          _this4.redis.clear().then(function (r) {
            resolve(r);
          }).catch(function (e) {
            console.log(e);
            reject(null);
          });
        }
      });
    }
  }]);

  return ReadAction;
}(_Base2.default);

exports.default = ReadAction;