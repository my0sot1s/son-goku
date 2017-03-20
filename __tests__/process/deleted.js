import chai from 'chai';
import mocha from 'mocha';
import chaiAsPromised from 'chai-as-promised';
/** ------------------------------------------------- */
import Deleted from './../../src/process/deleted';
import storages from './../../src/storages';

chai.use(chaiAsPromised);
const expect = chai.expect;

const _id = 1;
storages.Users = {
  cache: {
    ss: {
      id: 1,
    },
  },
  maxKey: 1,
};
describe(__filename + ' deleted', () => {
  it('test with deleted resolve', () => {
    const deleted = new Deleted(1);
    return expect(deleted.delete(_id)).to.eventually.an('object');
  });
  it('test with deleted resolve with cache', () => {
    const deleted = new Deleted(2);
    return expect(deleted.delete(_id)).to.eventually.an('object');
  });
  it('test with deleted resolve with cache have cache', () => {
    const deleted = new Deleted(3);
    return expect(deleted.delete(_id)).to.eventually.equal('object');
  });
  it('test with deleted reject', () => {
    const deleted = new Deleted(-1);
    return expect(deleted.delete(_id)).to.eventually.equal(null);
  });
  it('test with deleted reject', () => {
    const deleted = new Deleted(1);
    return expect(deleted.deleted(_id)).to.eventually.equal(null);
  });

});
