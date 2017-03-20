import chai from 'chai';
import mocha from 'mocha';
import BaseProcess,
{ IBaseProcess } from './../../src/process/Base';
import storages from './../../src/storages';
// import { modelBase } from './../../src/models';
const ibase = new IBaseProcess();
const base = new BaseProcess(1);


const expect = chai.expect;
const assert = chai.assert;

/**
 * test IBase
 */
describe(__filename + ' IBase', () => {
  it('test set Collection Name', () => {
    expect(ibase.setCollection = 'Collection').to.be.property;
  });
  it('test get Collection Name', () => {
    ibase.setCollection = '123';
    expect(ibase.getCollection).to.be.equal('123', 'This not a 123');
  });
});
/**
 * Test Base
 */
describe(__filename + ' Base', () => {
  it('test open connection', () => {
    base.open('Products').then(obj => {
      expect(obj).to.be.a('object', 'Not Object');
    }).catch(err => {
      expect(err).to.be.a('string', 'Not String');
    });
  });
  it('test close connection if', () => {
    const db = {
      close: () => null,
    };
    assert.isTrue(base.close(db), 'Not True');
  });
  it('test close connection else', () => {
    const db = undefined;
    assert.isFalse(base.close(db), 'Not false');
  });
  it('test resetMem with undefined', () => {
    BaseProcess.resetMem();
    expect(storages.Products.cache).to.deep.equal({}, 'Object not {}');
    expect(storages.Products.maxKey).to.deep.equal(0, 'Not =0');
  });
  it('test resetMem with {}', () => {
    const obj = { 1: 'Products' };
    BaseProcess.resetMem(obj);
    expect(storages.Products.cache).to.deep.equal({}, 'Object not {}');
    expect(storages.Products.maxKey).to.deep.equal(0, 'Not =0');
  });
});