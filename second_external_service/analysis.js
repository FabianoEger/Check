const co       = require('co');
const Analysis = require('tago/analysis');
const Device   = require('tago/device');
const Utils    = require('tago/utils');


function sendData(context) {
  co(function* () {
    const env_var = Utils.env_to_obj(context.environment);
    const my_device = new Device(env_var.device_token);
    if (!env_var.device_token) return context.log('Missing device_token environment variable');
    yield my_device.insert({ variable: 'tago_checked', value: new Date().getTime() }).then(context.log);
  }).catch(context.log);
}

module.exports = new Analysis(sendData, '723ff845-3d75-4d23-8f7f-61b5a97657e3');
