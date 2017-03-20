import chai from 'chai';
import mocha from 'mocha';
import chaiAsPromised from 'chai-as-promised';
/**------------------------------------------------- */
import Find from './../../src/process/find';
import storages from './../../src/storages';

chai.use(chaiAsPromised);
const expect = chai.expect;

const json = { _id: 1 };
describe(__filename + ' find', () => {
  it('test with find resolve', () => {
    const find = new Find(1);
    return expect(find.find(JSON.stringify(json)))
      .to.eventually.an('object');
  });
  it('test with find reject', () => {
    const find = new Find(-1);
    return expect(find.find(JSON.stringify(json)))
      .to.eventually.equal(null);
  });
  it('test with find reject', () => {
    const find = new Find(1);
    return expect(find.find()).to.eventually.equal(null);
  });

});
