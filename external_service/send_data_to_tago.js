const axios = require('axios');
const co    = require('co');

// GLOBAL VARIABLES SETTINGS FROM AXIOS
axios.defaults.baseURL                         = 'https://api.tago.io';
axios.defaults.headers.common['Authorization'] = 'ec418c0e-899a-4503-99e6-ef844072d2e7';
axios.defaults.headers.post['Content-Type']    = 'application/json';

module.exports = function sent_data() {
co(function* () {
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
