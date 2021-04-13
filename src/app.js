/* eslint-disable no-console */
const mongoose = require('mongoose');
const express = require('express');
const router = require('./routes');
// require('dotenv').config();

const app = express();
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
