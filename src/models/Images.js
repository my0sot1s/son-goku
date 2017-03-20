/**
 * Images
 */
export default class Images {
  /**
   * 
   * @param {Object} json
   */
  constructor(json) {
    this._id = Number(json._id);//eslint-disable-line
    this.productId = Number(json.productId);
    this.links = json.links || [];
  }
  /**
   * jsondata
   */
  get jsondata() {
    return {
      _id: this._id,//eslint-disable-line
      productId: this.productId,
      links: this.links,
    };
  }
  /**
   *return id
   */
  get id() {
    return this._id;
  }
}
