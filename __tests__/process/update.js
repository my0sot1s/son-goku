import chai from 'chai';
import mocha from 'mocha';
import chaiAsPromised from 'chai-as-promised';
/**------------------------------------------------- */
import Update from './../../src/process/update';
import storages from './../../src/storages';

chai.use(chaiAsPromised);
const expect = chai.expect;
storages.Users = {
  cache: {
    ss: {
      id: 1,
    },
  },
  maxKey: 1,
};
const json = { _id: 1, uname: 'asda' };
const json2 = { _id: -1, uname: 'asda' };

describe(__filename + ' update', () => {
  it('test with update resolve', () => {
    const update = new Update(1);
    return expect(update.update(JSON.stringify(json)))
      .to.eventually.an('object');
  });
  it('test with update resolve cached', () => {
    const update = new Update(2);
    return expect(update.update(JSON.stringify(json)))
      .to.eventually.an('object');
  });
  it('test with update reject null', () => {
    const update = new Update(1);
    return expect(update.update(JSON.stringify(json2)))
      .to.eventually.equal(null);
  });
  it('test with update reject', () => {
    const update = new Update(-1);
    return expect(update.update(JSON.stringify(json))).to.eventually.equal(null);
  });
  it('test with update reject', () => {
    const update = new Update(1);
    return expect(update.update()).to.eventually.equal(null);
  });

});
