'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Base = require('./../lib/Base');

var _Base2 = _interopRequireDefault(_Base);

var _promise = require('promise');

var _promise2 = _interopRequireDefault(_promise);

var _storages = require('../storages');

var _storages2 = _interopRequireDefault(_storages);

var _initialize = require('./../initialize');

var _initialize2 = _interopRequireDefault(_initialize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var errCode = _initialize2.default.get('errCode');
var Type = _initialize2.default.get('RedisType');

/**
 * update
 */

var UpdateAction = function (_BaseProcess) {
  _inherits(UpdateAction, _BaseProcess);

  function UpdateAction() {
    _classCallCheck(this, UpdateAction);

    return _possibleConstructorReturn(this, (UpdateAction.__proto__ || Object.getPrototypeOf(UpdateAction)).apply(this, arguments));
  }

  _createClass(UpdateAction, [{
    key: 'update',

    /**
     * Update data to db or redis
     * @param {String} str
     */
    value: function update(str) {
      var _this2 = this;

      return new _promise2.default(function (resolve, reject) {
        if (!_this2.collectionName) {
          reject(null);
        }
        var json = JSON.parse(str);
        if (json._id <= 0 || json._id > _storages2.default[_this2.collectionName].maxKey) {
          reject(null);
        }
        var data = (0, _storages.dynamicClass)(_this2.collectionName, json);

        _this2.open(_this2.collectionName).then(function (done) {
          done.update({ _id: Number(json._id) }, data.jsondata, function (call) {
            // eslint-disable-line
            if (_storages2.default[_this2.collectionName].isCached) {
              _this2.redis.setter(_this2.collectionName, json._id.toString(), JSON.stringify(data.jsondata), Type.H).then(function (r) {
                console.log(r);
                resolve(data.jsondata);
              }).catch(function (e) {
                console.log(e);
                reject(null);
              });
            } else {
              resolve(data);
            }
          });
        }).catch(function (err) {
          console.log(errCode.errProcessUpdate, err);
          reject(null);
        });
      });
    }
  }]);

  return UpdateAction;
}(_Base2.default);

exports.default = UpdateAction;