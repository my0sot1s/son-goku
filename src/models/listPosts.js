/**
 * listPosts
 */
export default class listPosts {
  /**
   *
   * @param {Object} json
   */
  constructor(json) {
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
  get jsondata() {
    return {
      _id: this._id,
      titile: this.titile,
      author: this.author,
      views: this.views,
      shares: this.shares,
      begin: this.begin,
      dateCreate: this.dateCreate,
      banner: this.banner,
    };
  }
  /**
   *return id
   */
  get id() {
    return this._id;
  }
}
