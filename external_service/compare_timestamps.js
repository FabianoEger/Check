const Device  = require('tago/device');
const co      = require('co');
const ms      = require('ms');
const axios   = require('axios');
const PouchDB = require('pouchdb');
const TOKEN   = process.env.DEVICE_TOKEN_TO_SUBTRACT_TIMESTAMP;

PouchDB.plugin(require('pouchdb-find'));
axios.defaults.baseURL                      = 'https://hooks.slack.com/services';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

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

function reportToSlack(msg) {
  const data = {
    text: msg,
    username: 'tago-check',
    icon_emoji: ':warning:',
  };
  return  axios.post('/T03163BD3/B608Y7CJZ/BDEk0pQFvjnvRXEzFh8tbTNu', JSON.stringify(data));
}

co(function* () {
  const my_db          = new PouchDB('my_db');
  const my_device      = new Device(TOKEN);
  const timestamp_tago = yield my_device.find({ variable: 'tago_checked', query: 'last_item', detail: true });
  const all_docs       = yield my_db.allDocs({ include_docs: true, attachments: true });

  const last_timestamp_tago   = tranformToObj(timestamp_tago);
  const last_timestamp_db     = all_docs.rows.slice().pop();
  const subtract_timestamp    = last_timestamp_tago.value - Number(last_timestamp_db.id);
  const send_reports_to_slack = ms(subtract_timestamp, { long: true });

  if (subtract_timestamp > 400000 && subtract_timestamp < 999999) {
    const send = yield reportToSlack(`@here : Tago analysis took ${send_reports_to_slack} to run.`);
    console.log(send.data);
  } else if (subtract_timestamp > 1000000) {
    const send = yield reportToSlack(`@channel : Tago analysis took ${send_reports_to_slack} to run. Please, check this now.`);
    console.log(send.data);
  } else {
    console.log(`Took ${send_reports_to_slack} to run`);
  }
}).catch(console.log);


