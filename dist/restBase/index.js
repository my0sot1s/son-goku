'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actions = require('../actions');

var _initialize = require('./../initialize');

var _initialize2 = _interopRequireDefault(_initialize);

var _globals = require('../../globals');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ERROR_CODE = _initialize2.default.get('errCode'); // const config = require('../configurations/config');
// const express = require('express');
var router = _express2.default.Router();

router.all('*', _globals.config.httpMiddleWare.checkall, _globals.config.httpMiddleWare.middleware)
/**
 *@param id is a collection id
 */
// 1: 'Products',
.get('/reset', function (req, res) {
  var rs = null;
  try {
    rs = new _actions.ReadAction('Products');
    rs.reset().then(function (r) {
      res.status(200).send('ok');
    }).catch(function (err) {
      console.log(err);
      res.status(ERROR_CODE.errCode503).send('Can not reset !');
    });
  } catch (error) {
    res.status(ERROR_CODE.errCode403).end();
  } finally {
    rs.quit();
  }
}).get('/:collection', function (req, res) {
  var r = new _actions.ReadAction(req.params.collection);
  r.read().then(function (docs) {
    if (docs) {
      console.log('--Count Items:', Object.keys(docs).length);
      res.status(200).json(docs || 200);
    } else {
      res.status(ERROR_CODE.errCode403).end();
    }
    r.quit();
  }).catch(function (error) {
    console.log('+++ Error in http machine get ' + error);
    res.status(ERROR_CODE.errCode503).end(error);
    r.quit();
  });
}).get('/:collection/id/:_id', function (req, res) {
  var f = new _actions.ReadAction(req.params.collection);
  f.getById({ _id: Number(req.params._id) }).then(function (docs) {
    //eslint-disable-line
    if (docs) {
      res.status(200).json(docs || 200);
    } else {
      res.status(ERROR_CODE.errCode403).end();
    }
  }).catch(function (error) {
    console.log('+++ Error in http machine get ' + error);
    res.status(ERROR_CODE.errCode503).end(error);
  });
  f.quit();
}).post('/:collection', function (req, res) {
  var p = new _actions.CreateAction(req.params.collection);
  p.create(JSON.stringify(req.body)).then(function (docs) {
    //eslint-disable-line
    if (docs) {
      res.status(200).json(docs || 200);
    } else {
      res.status(ERROR_CODE.errCode403).end();
    }
  }).catch(function (error) {
    console.log('+++ Error in http machine post ' + error);
    res.status(ERROR_CODE.errCode503).end(error);
  });
  p.quit();
}).put('/:collection', function (req, res) {
  var u = new Update(req.params.collection);
  u.update(JSON.stringify(req.body)).then(function (docs) {
    //eslint-disable-line
    if (docs) {
      res.status(200).json(docs || 200);
    } else {
      res.status(ERROR_CODE.errCode403).end();
    }
  }).catch(function (error) {
    console.log('+++ Error in http machine get ' + error);
    res.status(ERROR_CODE.errCode503).end(error);
  });
  u.quit();
}).delete('/:collection', function (req, res) {
  var d = new Deleted(req.params.collection);
  d.delete(Number(req.body._id)).then(function (docs) {
    //eslint-disable-line
    if (docs) {
      res.status(200).json(docs || 200);
    } else {
      res.status(ERROR_CODE.errCode403).end();
    }
  }).catch(function (error) {
    console.log('+++ Error in http machine get ' + error);
    res.status(ERROR_CODE.errCode503).end(error);
  });
  d.quit();
});

exports.default = router;