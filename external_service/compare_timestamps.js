const Device  = require('tago/Device');
const co      = require('co');
const moment  = require('moment');
const PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));

co(function* () {
    const my_db = new PouchDB('my_db');
    const my_device = new Device('11de2803-eb5b-4c9c-8a50-bc630e1993ac');

    const timestamp_tago = yield my_device.find({ variable: 'tago_checked', query: 'last_item', detail: true });
    const all_docs       = yield my_db.allDocs({ include_docs: true, attachments: true});
    
    const last_timestamp_tago = tranformToObj(timestamp_tago);
    const last_timestamp_db   = all_docs.rows.slice().pop();
    
    const subtract_timestamp  = last_timestamp_db.doc.value.value - last_timestamp_tago.value;

    const send_reports_to_slack = subtract_timestamp > 60000 ? 
        `${moment(subtract_timestamp).minutes()} minutes` : `${moment(subtract_timestamp).seconds()} seconds`;
    console.log(send_reports_to_slack);
    // TODO send reports to slack
    // > 5 min or 10 min
    
}).catch(console.log);

function tranformToObj(arr) {
    const obj = {};
    arr.forEach((element) => {
        obj.variable = element.variable;
        obj.value = element.value;
        obj.time = element.time;
        obj.bucket = element.bucket;
        obj.origin = element.origin;
        obj.id = element.id;
    });
    return obj;
}