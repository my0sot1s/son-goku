'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listenerRequest = listenerRequest;
exports.listenerFindData = listenerFindData;

var _actions = require('./../actions');

/**
 * listen when client request
 * @param {Object} client 
 * @param {Object} event 
 */
function listenerRequest(client) {
  for (var _len = arguments.length, event = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    event[_key - 1] = arguments[_key];
  }

  client.on(event[0], function (message) {
    console.log('user connected! ' + message.user);
    message.data.map(function (val) {
      var r = new _actions.ReadAction(val);
      r.read().then(function (docs) {
        var obj = {};obj[val] = docs;
        client.emit(event[1], obj);
      }).catch(function (error) {
        console.log(error);
      });
      r.quit();
    });
  });
  // client.on(event[0], message => {
  //   console.log(`user connected! ${message.user}`);
  //   const len = message.length;
  //   for (var i = 0; i < len; i++) {
  //     const r = new ReadAction(Number(val));
  //     r.read().then(docs => { })
  //       .catch(error => {
  //         console.log(error);
  //       });
  //     r.quit();
  //   }
  //   console.log('---Some one want data---');
  //   client.emit(event[1], { doc: 1 });
  // });
}
/**
 * listen when client find
 * @param {Object} client 
 * @param {String} event 
 */
function listenerFindData(client, event) {
  client.on(event, function (message) {
    var f = new _actions.ReadAction(message.collection);
    f.getById(message.body).then(function (doc) {
      if (doc) {
        client.emit(event, JSON.stringify({ key: message.collection, doc: doc }));
      }
    }).catch(function (error) {
      console.log(error);
    });
    f.quit();
  });
}