'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listOnline = exports.socketBase = undefined;

var _socketBase = require('./socketBase');

var _socketBase2 = _interopRequireDefault(_socketBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var socketBase = exports.socketBase = function socketBase(io) {
  (0, _socketBase2.default)(io, '/wkr1');
  (0, _socketBase2.default)(io, '/wkr2');
};
var listOnline = exports.listOnline = {
  count: 0,
  list: {}
};