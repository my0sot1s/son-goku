import chai from 'chai';
import mocha from 'mocha';

import Images from './../../src/models/Images';
const expect = chai.expect;
/**
 * test model
 */

describe(__filename + ' Images', () => {
  /**--------test for Product--------------- */
  const json = {
    _id: '1',
    productId: '2',
    links: ['afd'],
  };
  const image = new Images(json);
  it('test get json data', () => {
    expect(image.jsondata._id).to.be.equal(1);
    expect(image.jsondata.productId).to.be.equal(2);
    expect(image.jsondata.links).to.eql(['afd']);
  });
  it('test get id', () => {
    expect(image.id).to.be.equal(1);
  });
});
