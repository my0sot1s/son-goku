import { DeleteAction } from './../actions';

/**
 * active when some people delete
 * @param {Object} client 
 * @param {Object} event 
 */
export function deleteEvent(client, ...event) {
  client.on(event[0], message => {
    const d = new DeleteAction(message.collection);
    d.delete(message.body).then(doc => {
      if (doc) {
        client.emit(event[1], JSON.stringify({ key: message.collection, doc, }));
        client.broadcast.emit(event[1], JSON.stringify({ key: message.collection, doc, }));
      }
    }).catch(error => {
      console.log(error);
    });
    d.quit();
  });
}

