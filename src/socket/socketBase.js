import createEvent from './CreateEvent';
import updateEvent from './UpdateEvent';
import { deleteEvent, resetEvent } from './DeleteEvent';
import { listenerRequest, listenerFindData } from './ReadEvent';

import { listOnline } from '../socket';
import nconf from './../initialize';

const EVENT_NAME = nconf.get('eventName');
/**
 * Run init
 * @param {Object} _io
 * @param {String} host
 */
const deploy = ($io, host) => {
  const io = $io.of(host);
  io.on(EVENT_NAME.connection, client => {
    listOnline.list[client.id] = client.id;
    listOnline.count++;
    console.log(`user ${client.id} connect count now == ${listOnline.count}`);
    listenerRequest(client,
      EVENT_NAME.data,
      EVENT_NAME.message);
    listenerFindData(client,
      EVENT_NAME.find);
    createEvent(client,
      EVENT_NAME.create,
      EVENT_NAME.afterCreate);
    updateEvent(client,
      EVENT_NAME.update,
      EVENT_NAME.afterUpdate);
    deleteEvent(client,
      EVENT_NAME.delete,
      EVENT_NAME.afterDelete);

    /** ----------------active when some people diconnect------------ */
    client.on(EVENT_NAME.disconnect, () => {
      delete listOnline.list[client.id];
      listOnline.count--;
      console.log(`${client.id} has left count = ${listOnline.count}`);
    });
  });
};

export default deploy;
