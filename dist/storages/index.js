'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dynamicClass = undefined;

var _models = require('./../models');

var storageRegister = { // eslint-disable-line
  Products: {
    isCached: true,
    maxKey: 0
  },
  Users: {
    isCached: true,
    maxKey: 0
  },
  Images: {
    isCached: true,
    maxKey: 0
  },
  detailPost: {
    isCached: true,
    maxKey: 0
  },
  listPosts: {
    isCached: true,
    maxKey: 0
  }
};
var dynamicClass = exports.dynamicClass = function dynamicClass(name, args) {
  // eslint-disable-line
  return new _models.models[name](args); // eslint-disable-line
};
exports.default = storageRegister;