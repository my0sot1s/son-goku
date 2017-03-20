'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Users
 */
var Users = function () {
  /**
   *
   * @param {Object} json
   */
  function Users(json) {
    _classCallCheck(this, Users);

    this._id = Number(json._id); //eslint-disable-line
    this.uname = json.uname || 'UNAME_EMPTY';
    this.pcode = json.pcode || 'PWORD_EMPTY';
    this.oldpCode = json.oldpCode || json.pcode;
    this.dateCreated = json.dateCreated || new Date();
    this.role = this.role;
    this.actorChanged = this.actorChanged || Number(json._id);
  }
  /**
   *format json
   */


  _createClass(Users, [{
    key: 'jsondata',
    get: function get() {
      return {
        _id: this._id, //eslint-disable-line
        uname: this.uname,
        pcode: this.pcode,
        oldpCode: this.oldpCode,
        dateCreated: this.dateCreated,
        role: this.role,
        actorChanged: this.actorChanged
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

  return Users;
}();

exports.default = Users;