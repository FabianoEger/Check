const Device  = require('tago/device');
const co      = require('co');
const ms      = require('ms');
const axios   = require('axios');
const TOKEN   = process.env.DEVICE_TOKEN_TO_SECOND_SERVICE;

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
  const data = { text: msg, username: 'tago-check', icon_emoji: ':warning:' };

  const axios_obj = {
    url: 'https://hooks.slack.com/services/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',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data,
  };

  return  axios(axios_obj);
}
function sendAlerts() {
  co(function* () {
    if (!TOKEN) return console.log('Run file set-env-vars.bat and configure the enviroment variables');
    const my_device      = new Device(TOKEN);
    const timestamp_tago = yield my_device.find({ variable: 'tago_checked', query: 'last_item', detail: true });

    const last_timestamp_tago   = tranformToObj(timestamp_tago);
    const timestamp_now         = new Date().getTime();
    const subtract_timestamp    = timestamp_now - last_timestamp_tago.value;
    const send_reports_to_slack = ms(subtract_timestamp, { long: true });

    if (subtract_timestamp > ms('4m') && subtract_timestamp <= ms('9m')) yield reportToSlack(`<!here|here>: Tago analysis took ${send_reports_to_slack} to run.`);
    else if (subtract_timestamp > ms('10m')) yield reportToSlack(`<!channel|channel> : Tago analysis took ${send_reports_to_slack} to run. Please, check this now.`);
    console.log(send_reports_to_slack);
  }).catch(console.log);
}
setInterval(sendAlerts, 10000);
