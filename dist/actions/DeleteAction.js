'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Base = require('./../lib/Base');

var _Base2 = _interopRequireDefault(_Base);

var _storages = require('./../storages');

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
 * deleted class
 */

var DeleteAction = function (_BaseProcess) {
  _inherits(DeleteAction, _BaseProcess);

  function DeleteAction() {
    _classCallCheck(this, DeleteAction);

    return _possibleConstructorReturn(this, (DeleteAction.__proto__ || Object.getPrototypeOf(DeleteAction)).apply(this, arguments));
  }

  _createClass(DeleteAction, [{
    key: 'delete',


    /**
     * Delete data Process
     * @param {Number} _id 
     */
    value: function _delete(_id) {
      var _this2 = this;

      return new _promise2.default(function (resolve, reject) {
        if (!_this2.collectionName) {
          reject(null);
        }
        _this2.open(_this2.collectionName).then(function (done) {
          done.remove({ _id: _id }, function (call) {
            console.log(call);
            if (_storages2.default[_this2.collectionName].isCached) {
              _this2.redis.del(_this2.collectionName, _id.toString(), REDIS_TYPE.H).then(function (r) {
                console.log(r);
                resolve(_id);
              }).catch(function (e) {
                console.log(e);
                reject(null);
              });
            } else {
              resolve({ _id: _id });
            }
          });
        }).catch(function (err) {
          console.log(ERROR_CODE.errProcessDelete, err);
          reject(null);
        });
      });
    }
  }]);

  return DeleteAction;
}(_Base2.default);

exports.default = DeleteAction;