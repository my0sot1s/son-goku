import chai from 'chai';
import mocha from 'mocha';

import { dynamicClass } from './../../src/models';
import Products from './../../src/models/Products';
const expect = chai.expect;
/**
 * test model
 */

describe(__filename + ' index', () => {
  /**--------test for index--------------- */
  it('Test index', () => {
    expect(dynamicClass('Products', 1)).to.eql(new Products(1));
  });
});