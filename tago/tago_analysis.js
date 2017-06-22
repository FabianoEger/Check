const axios    = require('axios');
const co       = require('co');
const Analysis = require('tago/analysis'); 

// GLOBAL VARIABLES SETTINGS FROM AXIOS
axios.defaults.baseURL                         = 'https://tago-check-fabianoeger.c9users.io/';
axios.defaults.headers.post['Content-Type']    = 'application/json';

function sent_data_to_service(context, scope) {
co(function* () {
    //send data to scope too
    const data = {
        variable: 'tago_check',
        value: new Date().getTime(),
    };
    const req = yield axios.post('/data', data);
    console.log(req.data);

}).catch((error) => {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
    console.log(error.config);
  }).catch(console.log);
}

module.exports = new Analysis(sent_data_to_service, 'token here');
