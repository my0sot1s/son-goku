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
  try {
    new _actions.ReadAction('Products').reset().then(function (r) {
      res.status(200).send('ok');
    }).catch(function (err) {
      console.log(err);
      res.status(ERROR_CODE.errCode503).send('Can not reset !');
    });
  } catch (error) {
    res.status(ERROR_CODE.errCode403).end();
  }
}).get('/:collection', function (req, res) {
  new _actions.ReadAction(req.params.collection).read().then(function (docs) {
    if (docs) {
      console.log('--Count Items:', Object.keys(docs).length);
      res.status(200).json(docs || 200);
    } else {
      res.status(ERROR_CODE.errCode403).end();
    }
  }).catch(function (error) {
    console.log('+++ Error in http machine get ' + error);
    res.status(ERROR_CODE.errCode503).end(error);
  });
}).get('/:collection/id/:_id', function (req, res) {
  new _actions.ReadAction(req.params.collection).getById({ _id: Number(req.params._id) }).then(function (docs) {
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
}).post('/:collection', function (req, res) {
  new _actions.CreateAction(req.params.collection).create(JSON.stringify(req.body)).then(function (docs) {
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
}).put('/:collection', function (req, res) {
  new _actions.UpdateAction(req.params.collection).update(JSON.stringify(req.body)).then(function (docs) {
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
}).delete('/:collection', function (req, res) {
  new _actions.DeleteAction(req.params.collection).delete(Number(req.body._id)).then(function (docs) {
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
});

exports.default = router;