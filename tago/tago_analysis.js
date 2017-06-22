const axios    = require('axios');
const co       = require('co');
const Analysis = require('tago/analysis'); 

// GLOBAL VARIABLES SETTINGS FROM AXIOS
axios.defaults.baseURL                         = 'https://tago-check-fabianoeger.c9users.io/';
axios.defaults.headers.post['Content-Type']    = 'application/json';

function sent_data_to_service(context, scope) {
co(function* () {
  const data_reiceved = scope.find((item) => item.variable === 'tago_check');
    //send data to scope too
    const data = [{
        variable: 'tago_checked',
        value: new Date().getTime(),
    }, {
      variable: data_reiceved.variable,
      value: data_reiceved.value
    }];
    const req = yield axios.post('/data', data);
    context.log(req.data);

}).catch((error) => {
    if (error.response) {
      context.log(error.response.data);
      context.log(error.response.status);
      context.log(error.response.headers);
    } else if (error.request) {
      context.log(error.request);
    } else {
      context.log('Error', error.message);
    }
    context.log(error.config);
  }).catch(context.log);
}

module.exports = new Analysis(sent_data_to_service, 'd6ae71da-9caf-4a4a-b492-b71724c28f80');
