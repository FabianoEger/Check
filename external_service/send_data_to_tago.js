const axios = require('axios');
const co    = require('co');

// GLOBAL VARIABLES SETTINGS FROM AXIOS
axios.defaults.baseURL                         = 'https://api.tago.io';
axios.defaults.headers.common['Authorization'] = '3f276097-c197-4e74-be5a-dbcf3948fefa';
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
