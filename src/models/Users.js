/**
 * Users
 */
export default class Users {
  /**
   *
   * @param {Object} json
   */
  constructor(json) {
    this._id = Number(json._id);//eslint-disable-line
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
  get jsondata() {
    return {
      _id: this._id,//eslint-disable-line
      uname: this.uname,
      pcode: this.pcode,
      oldpCode: this.oldpCode,
      dateCreated: this.dateCreated,
      role: this.role,
      actorChanged: this.actorChanged,
    };
  }
  /**
   *return id
   */
  get id() {
    return this._id;
  }
}
