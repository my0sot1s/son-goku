'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CreateEvent = require('./CreateEvent');

var _CreateEvent2 = _interopRequireDefault(_CreateEvent);

var _UpdateEvent = require('./UpdateEvent');

var _UpdateEvent2 = _interopRequireDefault(_UpdateEvent);

var _DeleteEvent = require('./DeleteEvent');

var _ReadEvent = require('./ReadEvent');

var _socket = require('../socket');

var _initialize = require('./../initialize');

var _initialize2 = _interopRequireDefault(_initialize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EVENT_NAME = _initialize2.default.get('eventName');
/**
 * Run init
 * @param {Object} _io
 * @param {String} host
 */
var deploy = function deploy($io, host) {
  var io = $io.of(host);
  io.on(EVENT_NAME.connection, function (client) {
    _socket.listOnline.list[client.id] = client.id;
    _socket.listOnline.count++;
    console.log('user ' + client.id + ' connect count now == ' + _socket.listOnline.count);
    (0, _ReadEvent.listenerRequest)(client, EVENT_NAME.data, EVENT_NAME.message);
    (0, _ReadEvent.listenerFindData)(client, EVENT_NAME.find);
    (0, _CreateEvent2.default)(client, EVENT_NAME.create, EVENT_NAME.afterCreate);
    (0, _UpdateEvent2.default)(client, EVENT_NAME.update, EVENT_NAME.afterUpdate);
    (0, _DeleteEvent.deleteEvent)(client, EVENT_NAME.delete, EVENT_NAME.afterDelete);

    /** ----------------active when some people diconnect------------ */
    client.on(EVENT_NAME.disconnect, function () {
      delete _socket.listOnline.list[client.id];
      _socket.listOnline.count--;
      console.log(client.id + ' has left count = ' + _socket.listOnline.count);
    });
  });
};

exports.default = deploy;