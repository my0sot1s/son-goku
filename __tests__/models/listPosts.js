import chai from 'chai';
import mocha from 'mocha';

import listPosts from './../../src/models/listPosts';

const expect = chai.expect;
/**
 * test model
 */

describe(__filename + ' listPosts', () => {
  /**--------test for Product--------------- */
  const json = {
    _id: '1',
    titile: 'asdasd',
    author: '12',
  };
  const list = new listPosts(json);
  it('test get json data', () => {
    expect(list.jsondata._id).to.be.equal(1);
    expect(list.jsondata.titile).to.be.equal('asdasd');
    expect(list.jsondata.author).to.be.equal('12');
  });
  it('test get id', () => {
    expect(list.id).to.be.equal(1);
  });
});
