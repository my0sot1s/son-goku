import { CreateAction } from './../actions';

/**
 * Them data
 * @param {Object} client 
 * @param {Object} event 
 */
function CreatEvent(client, ...event) {
  client.on(event[0], message => {
    const c = new CreateAction(message.collection);
    c.create(JSON.stringify(message.body)).then(doc => {
      if (doc) {
        console.log('--after Create', doc);
        // client.emit(event[1], JSON.stringify({ key: message.collection, doc }));
        // client.broadcast.emit(event[1], JSON.stringify({ key: message.collection, doc }));
        client.emit(event[1], JSON.stringify({ key: message.collection, doc: doc._id }));
        client.broadcast.emit(event[1], JSON.stringify({ key: message.collection, doc: doc._id }));
      }
    }).catch(error => {
      console.log(error);
    });
    c.quit();
  });
}
export default CreatEvent;
