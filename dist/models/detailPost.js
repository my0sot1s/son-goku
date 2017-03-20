'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * detailPost
 */
var detailPost = function () {
  /**
   * 
   * @param {Object} json
   */
  function detailPost(json) {
    _classCallCheck(this, detailPost);

    this._id = Number(json._id);
    this.banner = json.banner || [];
    this.content = json.content.split('\n');
    this.images = json.images || [];
  }
  /**
   * jsondata
   */


  _createClass(detailPost, [{
    key: 'jsondata',
    get: function get() {
      return {
        _id: this._id,
        banner: this.banner,
        content: this.content,
        images: this.images
      };
    }
    /**
     *return id
     */

  }, {
    key: 'id',
    get: function get() {
      return this._id;
    }
  }]);

  return detailPost;
}();

exports.default = detailPost;