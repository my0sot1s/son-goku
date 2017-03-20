import chai from 'chai';
import mocha from 'mocha';

import Products from './../../src/models/Products';
import Users from './../../src/models/Users';
import listPosts from './../../src/models/listPosts';
import detailPost from './../../src/models/detailPost';
import Images from './../../src/models/Images';
const expect = chai.expect;
/**
 * test model
 */

describe(__filename + ' Products', () => {
  /**--------test for Product--------------- */
  const json = {
    _id: '1',
    name: 'asdasd',
    color: '12',
  };
  const products = new Products(json);
  it('test get json data', () => {
    expect(products.jsondata._id).to.be.equal(1);
    expect(products.jsondata.name).to.be.equal('asdasd');
    expect(products.jsondata.color).to.be.equal(12);
  });
  it('test get id', () => {
    expect(products.id).to.be.equal(1);
  });
});
