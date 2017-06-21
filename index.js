const axios = require('axios');
const co = require('co');
axios.defaults.baseURL = 'https://api.tago.io';
axios.defaults.headers.common['Authorization'] = '3f276097-c197-4e74-be5a-dbcf3948fefa';
axios.defaults.headers.post['Content-Type'] = 'application/json';
co(function* () {
    const req = yield axios.get('/data', { method: 'get' });
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
  });
