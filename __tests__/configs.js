import chai from 'chai';
import mocha from 'mocha';

import configs from './../configs';

const expect = chai.expect;
/**
 * test model
 */

describe(__filename + ' configs ', () => {
  /**--------test for Product--------------- */
  it('test dbGenUrl if', () => {
    const dbInfor = {};
    dbInfor.isLocal = true;
    dbInfor.url = `ds159328.mlab.com`;
    dbInfor.port = 324;
    dbInfor.dbName = 'asda';
    expect(configs.db.dbGenUrl(dbInfor)).to.eql('ds159328.mlab.com:324/asda');
  });
  it('test dbGenUrl else', () => {
    const dbInfor = {};
    dbInfor.isLocal = true;
    dbInfor.url = `ds159328.mlab.com`;
    dbInfor.port = 324;
    dbInfor.dbName = 'asda';
    expect(configs.db.dbGenUrl(dbInfor)).to.eql('ds159328.mlab.com:324/asda');
  });
});
