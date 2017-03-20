'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.models = exports.modelBase = undefined;

var _Products = require('./Products');

var _Products2 = _interopRequireDefault(_Products);

var _Users = require('./Users');

var _Users2 = _interopRequireDefault(_Users);

var _Images = require('./Images');

var _Images2 = _interopRequireDefault(_Images);

var _listPosts = require('./listPosts');

var _listPosts2 = _interopRequireDefault(_listPosts);

var _detailPost = require('./detailPost');

var _detailPost2 = _interopRequireDefault(_detailPost);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var modelBase = exports.modelBase = ['Products', 'Users', 'Images', 'listPosts', 'detailPost'];
var models = exports.models = {
  Products: _Products2.default,
  Users: _Users2.default,
  Images: _Images2.default,
  listPosts: _listPosts2.default,
  detailPost: _detailPost2.default };