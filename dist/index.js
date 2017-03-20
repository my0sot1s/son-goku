'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _initialize = require('./initialize');

var _initialize2 = _interopRequireDefault(_initialize);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _globals = require('../globals');

var _socket3 = require('./socket');

var jsSocket = _interopRequireWildcard(_socket3);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _restBase = require('./restBase');

var _restBase2 = _interopRequireDefault(_restBase);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var accessLogStream = _fs2.default.createWriteStream(_globals.config.logFile, { flags: 'a' });
app.set('views', _path2.default.join(__dirname, '/views')); // eslint-disable-line
app.set('view engine', 'ejs');

app.use(_bodyParser2.default.json()); // for parsing application/json */
app.use(_bodyParser2.default.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded*/
app.use((0, _morgan2.default)('combined', { stream: accessLogStream })); // create log and append to logger file*/
app.use((0, _morgan2.default)('dev')); // display it and only dev*/
app.use('/public', _express2.default.static(_path2.default.join(__dirname, '/views/public'))); // eslint-disable-line
app.use('/son-goku', _restBase2.default);

app.get('/socketPage', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, '/views/public/socketpage.html')); // eslint-disable-line
});

app.use('/', function (req, res) {
  res.render('index');
});

var server = _http2.default.createServer(app);
var io = (0, _socket2.default)(server);

server.listen(process.env.PORT || _initialize2.default.get('api:port'), function () {
  console.log('----Server API getway at port :' + _initialize2.default.get('api:port') + ' and domain: ' + _initialize2.default.get('api:host') + '....');
  console.log('----Database run at ' + _globals.config.dbGenUrl(_initialize2.default.get('db')));
});

jsSocket.socketBase(io);

exports.default = app;