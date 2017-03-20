'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Products
 */
var Products = function () {
  /**
   * 
   * @param {Object} json 
   */
  function Products(json) {
    _classCallCheck(this, Products);

    this._id = Number(json._id); //eslint-disable-line
    this.name = json.name;
    this.color = Number(json.color);
    this.size = Number(json.size);
    this.tag = json.tag || [];
    this.type = Number(json.type);
    this.desc = json.desc || 'Không có mô tả';
    this.price = Number(json.price) || 0.0;
    this.quatity = Number(json.quatity) || 0;
    this.dateImport = json.dateImport || new Date();
    this.loved = Number(json.loved) || 0;
    this.liked = Number(json.liked) || 0;
  }
  /**
   *format json
   */


  _createClass(Products, [{
    key: 'jsondata',
    get: function get() {
      return {
        _id: this._id, //eslint-disable-line
        name: this.name,
        color: this.color,
        size: this.size,
        tag: this.tag,
        type: this.type,
        desc: this.desc,
        price: this.price,
        quatity: this.quatity,
        dateImport: this.dateImport,
        loved: this.loved,
        liked: this.liked
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

  return Products;
}();

exports.default = Products;