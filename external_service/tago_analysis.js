const co       = require('co');
const Analysis = require('tago/analysis');
const Device   = require('tago/device');
const Utils    = require('tago/utils');


function checkAnalysisAndAction(context, scope) {
  co(function* () {
    const env_var = Utils.env_to_obj(context.environment);
    const my_device = new Device(env_var.device_token);
    if (!env_var.device_token) return context.log('Missing device_token environment variable');
    const data_reiceved = scope.find(item => item.variable === 'tago_check');

    if (data_reiceved) yield my_device.insert({ variable: 'tago_checked', value: new Date().getTime() }).then(context.log);
  }).catch(context.log);
}

module.exports = new Analysis(checkAnalysisAndAction, 'd6ae71da-9caf-4a4a-b492-b71724c28f80');
