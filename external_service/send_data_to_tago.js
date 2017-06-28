const Device  = require('tago/device');
const co      = require('co');
const PouchDB = require('pouchdb');
const TOKEN   = process.env.DEVICE_TOKEN;
co(function* () {
  if (!TOKEN) console.log('Run file set-env-vars.bat and configure the enviroment variables');
  const my_db     = new PouchDB('my_db');
  const my_device = new Device(TOKEN);
  const data = {
    variable: 'tago_check',
    value: new Date().getTime(),
  };
  yield my_device.insert(data).then(console.log);
  const insert_timestamp_in_my_db = yield my_db.put({
    _id: data.value.toString(),
    created_at: new Date(data.value),
  });

  yield my_db.get(insert_timestamp_in_my_db.id).then(console.log);
}).catch(console.log);
