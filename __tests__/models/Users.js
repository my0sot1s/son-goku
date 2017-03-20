import chai from 'chai';
import mocha from 'mocha';

import Users from './../../src/models/Users';
const expect = chai.expect;
/**
 * test model
 */

describe(__filename + ' Users', () => {
  /**--------test for Product--------------- */
  const json = {
    _id: '1',
    uname: 'asdasd',
    pcode: '12',
  };
  const users = new Users(json);
  it('test get json data', () => {
    expect(users.jsondata._id).to.be.equal(1);
    expect(users.jsondata.uname).to.be.equal('asdasd');
    expect(users.jsondata.pcode).to.be.equal('12');
  });
  it('test get id', () => {
    expect(users.id).to.be.equal(1);
  });
});