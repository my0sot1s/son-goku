import { UpdateAction } from './../actions';
/**
 * active when some people update
 * @param {Object} client 
 * @param {Object} event 
 */
function UpdateEvent(client, ...event) {
  client.on(event[0], message => {
    const u = new UpdateAction(message.collection);
    u.update(JSON.stringify(message.body)).then(doc => {
      if (doc) {
        // client.emit(event[1], JSON.stringify({ key: message.collection, doc, }));
        // client.broadcast.emit(event[1], JSON.stringify({ key: message.collection, doc, }));
        client.emit(event[1], JSON.stringify({ key: message.collection, doc: doc._id, }));
        client.broadcast.emit(event[1], JSON.stringify({ key: message.collection, doc: doc._id, }));
      }
    }).catch(error => {
      console.log(error);
    });
    u.quit();
  });
}
export default UpdateEvent;
