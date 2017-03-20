'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteEvent = deleteEvent;

var _actions = require('./../actions');

/**
 * active when some people delete
 * @param {Object} client 
 * @param {Object} event 
 */
function deleteEvent(client) {
  for (var _len = arguments.length, event = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    event[_key - 1] = arguments[_key];
  }

  client.on(event[0], function (message) {
    var d = new _actions.DeleteAction(message.collection);
    d.delete(message.body).then(function (doc) {
      if (doc) {
        client.emit(event[1], JSON.stringify({ key: message.collection, doc: doc }));
        client.broadcast.emit(event[1], JSON.stringify({ key: message.collection, doc: doc }));
      }
    }).catch(function (error) {
      console.log(error);
    });
    d.quit();
  });
}