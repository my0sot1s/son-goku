import chai from 'chai';
import mocha from 'mocha';
import chaiHttp from 'chai-http';
import chaiAsPromised from 'chai-as-promised';

import route from './../../src/rest/restBase';

chai.use(chaiHttp);
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Test router getway api', () => {
  it('Test /GET', () => {
    chai.request(route)
      .get('/1');
    chai.request(route).get('/1/id/1');
  });
  it('Test /POST ', () => {
    chai.request(route).post('/reset')
      .send({ _id: 1 })
      .then(res => {
        expect(res).to.have.status(200);
      })
      .catch(err => {
        throw err;
      });
    chai.request(route).post('/1')
      .send({ _id: 1 })
      .then(res => {
        expect(res).to.have.status(200);
      })
      .catch(err => {
        throw err;
      });
  });
  it('Test /PUT ', () => {
    chai.request(route).put('/1').send({ _id: 1 })
      .then(res => {
        expect(res).to.have.status(200);
      })
      .catch(err => {
        throw err;
      });
  });
  it('Test /DELETE', () => {
    chai.request(route).delete('/1').send({ _id: 1 })
      .then(res => {
        expect(res).to.have.status(200);
      })
      .catch(err => {
        throw err;
      });
  });
});

