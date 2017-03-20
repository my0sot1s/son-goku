/**
 * Products
 */
export default class Products {
  /**
   * 
   * @param {Object} json 
   */
  constructor(json) {
    this._id = Number(json._id);//eslint-disable-line
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
  get jsondata() {
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
      liked: this.liked,
    };
  }
  /**
   *return id
   */
  get id() {
    return this._id;
  }
}
