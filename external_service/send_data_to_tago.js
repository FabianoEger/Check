const Device  = require('tago/Device');
const co      = require('co');
const PouchDB = require('pouchdb');

co(function* () {
  const my_db = new PouchDB('my_db');
  const my_device = new Device('ec418c0e-899a-4503-99e6-ef844072d2e7');

  yield my_device.insert({ variable: 'tago_check', value: new Date().getTime() }).then(console.log);

  const get_data_from_tago = yield my_device.find({variable: 'tago_check', query: 'last_item', detail: true});
  const data_to_insert =  { 
    id:       get_data_from_tago[0].id,
    variable: get_data_from_tago[0].variable,
    value:    get_data_from_tago[0].value,
    bucket:   get_data_from_tago[0].bucket,
    origin:   get_data_from_tago[0].origin,
    time:     get_data_from_tago[0].time,
  };
  const inserted_data = yield my_db.put({ 
    _id:   get_data_from_tago[0].id, 
    title: get_data_from_tago[0].variable, 
    value: data_to_insert
  });

  yield my_db.get(inserted_data.id).then(console.log);

}).catch(console.log);
