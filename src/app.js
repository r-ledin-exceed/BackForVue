/* eslint-disable no-console */
const mongoose = require('mongoose');
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes');

const app = express();
// const ENV = process.env.NODE_ENV || config.env;
const port = 8080;
app.listen(port, () => {
  console.log(`Server is up and running on port number ${port}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const devDbUrl = 'mongodb://localhost:27017/';
const mongoDB = process.env.MONGODB_URI || devDbUrl;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('DB connected');
});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(router);

module.exports = app;
