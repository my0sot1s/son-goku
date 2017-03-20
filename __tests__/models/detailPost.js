import chai from 'chai';
import mocha from 'mocha';

import detailPost from './../../src/models/detailPost';

const expect = chai.expect;
/**
 * test model
 */

describe(__filename + ' detailPost', () => {
  /**--------test for Product--------------- */
  const json = {
    _id: '1',
    banner: [],
    content: 'hahshdasd\nhahhash',
  };
  const detail = new detailPost(json);
  it('test get json data', () => {
    expect(detail.jsondata._id).to.be.equal(1);
    expect(detail.jsondata.banner).to.eql([]);
    expect(detail.jsondata.content).to.eql(['hahshdasd', 'hahhash']);
  });
  it('test get id', () => {
    expect(detail.id).to.be.equal(1);
  });
});
