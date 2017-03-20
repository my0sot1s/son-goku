import chai from 'chai';
import mocha from 'mocha';
import chaiAsPromised from 'chai-as-promised';
/**------------------------------------------------- */
import Read from './../../src/process/read';
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

describe(__filename + ' read', () => {
  it('test with read resolve', () => {
    const read = new Read(1);
    return expect(read.read()).to.eventually.an('object');
  });
  it('test with read resolve with cache have cache', () => {
    const read = new Read(2);
    return expect(read.read()).to.eventually.equal('object');
  });
  it('test with read resolve with cache', () => {
    const read = new Read(3);
    return expect(read.read()).to.eventually.an('object');
  });
  it('test with read reject', () => {
    const read = new Read(-1);
    return expect(read.read()).to.eventually.equal(null);
  });
  it('test with read reject', () => {
    const read = new Read(1);
    return expect(read.read()).to.eventually.equal(null);
  });
});
