'use strict';
const express     = require('express');
const body_parser = require('body-parser');
const axios       = require('axios');
const co          = require('co');
const send_data   = require('./external_service/send_data_to_tago.js');

setInterval(send_data, 5000);

const app = express();
app.use(body_parser.json());

app.post('/data', (req, res) => {
const res_data = req.body;
  app.get('/', (req, res) => {
    res.send(`Tago check <br> Last data reiceved: ${JSON.stringify(res_data)}`);
  });
  console.log(req.body);
}); 


app.listen(8080);
console.log("Servidor on!");

