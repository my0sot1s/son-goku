/**
 * detailPost
 */
export default class detailPost {
  /**
   * 
   * @param {Object} json
   */
  constructor(json) {
    this._id = Number(json._id);
    this.banner = json.banner || [];
    this.content = json.content.split('\n');
    this.images = json.images || [];
  }
  /**
   * jsondata
   */
  get jsondata() {
    return {
      _id: this._id,
      banner: this.banner,
      content: this.content,
      images: this.images,
    };
  }
  /**
   *return id
   */
  get id() {
    return this._id;
  }
}
