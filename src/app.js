/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const redis = require('redis');
const config = require('../config');
const router = require('./routes');
// const socket = require('./services/socket');

const client = redis.createClient(6379, '127.0.0.1');
const app = express();
const ENV = process.env.NODE_ENV || config.env;

require('../config/mongoose')(app);

app.use(router);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// socket.on('connect', () => {
//   console.log('Socket connected -', socket.connected);
// });
client.on('connect', () => {
  console.log('Redis connected');
});
client.on('error', (error) => {
  console.error(error);
});

module.exports = app;
