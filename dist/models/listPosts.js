"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * listPosts
 */
var listPosts = function () {
  /**
   *
   * @param {Object} json
   */
  function listPosts(json) {
    _classCallCheck(this, listPosts);

    this._id = Number(json._id);
    this.titile = json.titile;
    this.author = json.author;
    this.views = json.views;
    this.shares = json.shares;
    this.begin = json.begin;
    this.dateCreate = json.dateCreate || new Date();
    this.banner = json.banner || [];
  }
  /**
   *format json
   */


  _createClass(listPosts, [{
    key: "jsondata",
    get: function get() {
      return {
        _id: this._id,
        titile: this.titile,
        author: this.author,
        views: this.views,
        shares: this.shares,
        begin: this.begin,
        dateCreate: this.dateCreate,
        banner: this.banner
      };
    }
    /**
     *return id
     */

  }, {
    key: "id",
    get: function get() {
      return this._id;
    }
  }]);

  return listPosts;
}();

exports.default = listPosts;