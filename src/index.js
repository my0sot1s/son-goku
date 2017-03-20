import nconf from './initialize';

import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import http from 'http';
import socketIO from 'socket.io';

import fs from 'fs';
import { config } from '../globals';

import * as jsSocket from './socket';
import path from 'path';
import Router from './restBase';

const app = express();
const accessLogStream = fs.createWriteStream(config.logFile, { flags: 'a' });
app.set('views', path.join(__dirname, '/views'));// eslint-disable-line
app.set('view engine', 'ejs');

app.use(bodyParser.json());// for parsing application/json */
app.use(bodyParser.urlencoded({ extended: true }));// for parsing application/x-www-form-urlencoded*/
app.use(morgan('combined', { stream: accessLogStream })); // create log and append to logger file*/
app.use(morgan('dev'));// display it and only dev*/
app.use('/public', express.static(path.join(__dirname, '/views/public')));// eslint-disable-line
app.use('/son-goku', Router);

app.get('/socketPage', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/public/socketpage.html'));// eslint-disable-line
});

app.use('/', (req, res) => {
  res.render('index');
});

const server = http.createServer(app);
const io = socketIO(server);

server.listen(process.env.PORT || nconf.get('api:port'),
  () => {
    console.log(`----Server API getway at port :${nconf.get('api:port')} and domain: ${nconf.get('api:host')}....`);
    console.log(`----Database run at ${config.dbGenUrl(nconf.get('db'))}`);
  });

jsSocket.socketBase(io);

export default app;
