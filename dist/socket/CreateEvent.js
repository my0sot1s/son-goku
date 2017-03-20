'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actions = require('./../actions');

/**
 * Them data
 * @param {Object} client 
 * @param {Object} event 
 */
function CreatEvent(client) {
  for (var _len = arguments.length, event = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    event[_key - 1] = arguments[_key];
  }

  client.on(event[0], function (message) {
    var c = new _actions.CreateAction(message.collection);
    c.create(JSON.stringify(message.body)).then(function (doc) {
      if (doc) {
        console.log('--after Create', doc);
        // client.emit(event[1], JSON.stringify({ key: message.collection, doc }));
        // client.broadcast.emit(event[1], JSON.stringify({ key: message.collection, doc }));
        client.emit(event[1], JSON.stringify({ key: message.collection, doc: doc._id }));
        client.broadcast.emit(event[1], JSON.stringify({ key: message.collection, doc: doc._id }));
      }
    }).catch(function (error) {
      console.log(error);
    });
    c.quit();
  });
}
exports.default = CreatEvent;