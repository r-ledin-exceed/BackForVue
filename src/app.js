/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const config = require('../config');
const router = require('./routes');

const app = express();
const ENV = process.env.NODE_ENV || config.env;

require('../config/mongoose')(app);

app.use(router);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

module.exports = app;
