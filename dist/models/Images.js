"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Images
 */
var Images = function () {
  /**
   * 
   * @param {Object} json
   */
  function Images(json) {
    _classCallCheck(this, Images);

    this._id = Number(json._id); //eslint-disable-line
    this.productId = Number(json.productId);
    this.links = json.links || [];
  }
  /**
   * jsondata
   */


  _createClass(Images, [{
    key: "jsondata",
    get: function get() {
      return {
        _id: this._id, //eslint-disable-line
        productId: this.productId,
        links: this.links
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

  return Images;
}();

exports.default = Images;