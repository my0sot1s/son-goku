import {
  ReadAction, UpdateAction, DeleteAction, CreateAction,
} from '../actions';
import nconf from './../initialize';
const ERROR_CODE = nconf.get('errCode');
import { config } from '../../globals';// const config = require('../configurations/config');
import express from 'express';// const express = require('express');
const router = express.Router();

router.all('*',
  config.httpMiddleWare.checkall,
  config.httpMiddleWare.middleware)
  /**
   *@param id is a collection id
   */
  // 1: 'Products',
  .get('/reset', (req, res) => {
    var rs = null;
    try {
      rs = new ReadAction('Products');
      rs.reset().then(r => {
        res.status(200).send('ok');
      }).catch(err => {
        console.log(err);
        res.status(ERROR_CODE.errCode503).send('Can not reset !');
      });
    } catch (error) {
      res.status(ERROR_CODE.errCode403).end();
    } finally {
      rs.quit();
    }

  })
  .get('/:collection', (req, res) => {
    const r = new ReadAction(req.params.collection);
    r.read().then(docs => {
      if (docs) {
        console.log('--Count Items:', Object.keys(docs).length);
        res.status(200).json(docs || 200);
      } else {
        res.status(ERROR_CODE.errCode403).end();
      }
      r.quit();
    }).catch(error => {
      console.log(`+++ Error in http machine get ${error}`);
      res.status(ERROR_CODE.errCode503).end(error);
      r.quit();
    });

  })
  .get('/:collection/id/:_id', (req, res) => {
    const f = new ReadAction(req.params.collection);
    f.getById({ _id: Number(req.params._id) })
      .then(docs => {//eslint-disable-line
        if (docs) {
          res.status(200).json(docs || 200);
        } else {
          res.status(ERROR_CODE.errCode403).end();
        }
      })
      .catch(error => {
        console.log(`+++ Error in http machine get ${error}`);
        res.status(ERROR_CODE.errCode503).end(error);
      });
    f.quit();
  })
  .post('/:collection', (req, res) => {
    const p = new CreateAction(req.params.collection);
    p.create(JSON.stringify(req.body))
      .then(docs => {//eslint-disable-line
        if (docs) {
          res.status(200).json(docs || 200);
        } else {
          res.status(ERROR_CODE.errCode403).end();
        }
      })
      .catch(error => {
        console.log(`+++ Error in http machine post ${error}`);
        res.status(ERROR_CODE.errCode503).end(error);
      });
    p.quit();
  })
  .put('/:collection', (req, res) => {
    const u = new Update(req.params.collection);
    u.update(JSON.stringify(req.body))
      .then(docs => {//eslint-disable-line
        if (docs) {
          res.status(200).json(docs || 200);
        } else {
          res.status(ERROR_CODE.errCode403).end();
        }
      })
      .catch(error => {
        console.log(`+++ Error in http machine get ${error}`);
        res.status(ERROR_CODE.errCode503).end(error);
      });
    u.quit();
  })
  .delete('/:collection', (req, res) => {
    const d = new Deleted(req.params.collection);
    d.delete(Number(req.body._id))
      .then(docs => {//eslint-disable-line
        if (docs) {
          res.status(200).json(docs || 200);
        } else {
          res.status(ERROR_CODE.errCode403).end();
        }
      })
      .catch(error => {
        console.log(`+++ Error in http machine get ${error}`);
        res.status(ERROR_CODE.errCode503).end(error);
      });
    d.quit();
  });

export default router;
