'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Base = require('./../lib/Base');

var _Base2 = _interopRequireDefault(_Base);

var _storages = require('../storages');

var _storages2 = _interopRequireDefault(_storages);

var _initialize = require('./../initialize');

var _initialize2 = _interopRequireDefault(_initialize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ERROR_CODE = _initialize2.default.get('errCode');
var REDIS_TYPE = _initialize2.default.get('RedisType');
/**
 * create class
 */

var CreateAction = function (_BaseProcess) {
  _inherits(CreateAction, _BaseProcess);

  function CreateAction() {
    _classCallCheck(this, CreateAction);

    return _possibleConstructorReturn(this, (CreateAction.__proto__ || Object.getPrototypeOf(CreateAction)).apply(this, arguments));
  }

  _createClass(CreateAction, [{
    key: 'create',

    /**
     * Create data
     * @param {String} str 
     */
    value: function create(str) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        console.log('--data', str);
        var json = JSON.parse(str);
        if (!_this2.collectionName) {
          console.log(ERROR_CODE.errProcessCreat, 'if_1');
          reject(null);
        } else if (str._id === null || str.uname === null || json === {} || !json) {
          console.log(ERROR_CODE.errProcessCreat, 'if_2');
          reject(null);
        } else {
          console.log(_storages2.default[_this2.collectionName].maxKey);

          var data = (0, _storages.dynamicClass)(_this2.collectionName, json);

          data._id = _storages2.default[_this2.collectionName].maxKey + 1;

          _storages2.default[_this2.collectionName].maxKey++;

          console.log('--Max key ' + _this2.collectionName + ' now:', _storages2.default[_this2.collectionName].maxKey);

          _this2.open(_this2.collectionName).then(function (done) {
            done.insert(data.jsondata, function (call) {
              if (_storages2.default[_this2.collectionName].isCached) {
                _this2.redis.setter(_this2.collectionName, data._id, JSON.stringify(data.jsondata), REDIS_TYPE.H).then(function (r) {
                  resolve(data.jsondata);
                }).catch(function (e) {
                  reject(null);
                });
              } else {
                console.log('--ko ghi--');
                resolve(data);
              }
            });
          }).catch(function (err) {
            console.log(ERROR_CODE.errProcessCreat, err);
            reject(null);
          });
        }
      });
    }
  }]);

  return CreateAction;
}(_Base2.default);

exports.default = CreateAction;