import chai from 'chai';
import mocha from 'mocha';
import chaiAsPromised from 'chai-as-promised';
/** ------------------------------------------------- */
import Create from './../../src/process/create';
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

describe(__filename + ' create', () => {
  it('test with create resolve', () => {
    const create = new Create(1);
    return expect(create.create(JSON.stringify(json))).to.eventually.an('object');
  });
  it('test with create resolve with cache', () => {
    const create = new Create(2);
    return expect(create.create(JSON.stringify(json))).to.eventually.an('object');
  });
  it('test with create resolve with cache', () => {
    const create = new Create(2);
    return expect(create.create(JSON.stringify(json2))).to.eventually.an('object');
  });
  it('test with create resolve with cache have cache', () => {
    const create = new Create(3);
    return expect(create.create(JSON.stringify(json))).to.eventually.equal('object');
  });
  it('test with create reject', () => {
    const create = new Create(-1);
    return expect(create.create(JSON.stringify(json))).to.eventually.equal(null);
  });
  it('test with create reject', () => {
    const create = new Create(1);
    return expect(create.create()).to.eventually.equal(null);
  });

});
