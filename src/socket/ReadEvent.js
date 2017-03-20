import { ReadAction } from './../actions';

/**
 * listen when client request
 * @param {Object} client 
 * @param {Object} event 
 */
export function listenerRequest(client, ...event) {

  client.on(event[0], message => {
    console.log(`user connected! ${message.user}`);
    message.data.map(val => {
      const r = new ReadAction(val);
      r.read().then(docs => {
        var obj = {}; obj[val] = docs;
        client.emit(event[1], obj);
      }).catch(error => {
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
export function listenerFindData(client, event) {
  client.on(event, message => {
    const f = new ReadAction(message.collection);
    f.getById(message.body).then(doc => {
      if (doc) {
        client.emit(event, JSON.stringify({ key: message.collection, doc, }));
      }
    }).catch(error => {
      console.log(error);
    });
    f.quit();
  });
}

