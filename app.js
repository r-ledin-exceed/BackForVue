const express = require('express');
const bodyParser = require('body-parser');
const authRouter = require('./routes/authRouter'); // Imports routes for the products
const userRouter = require('./routes/userRouter'); // Imports routes for the products
const app = express();
const mongoose = require('mongoose');
// const MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));

app.use('/auth', authRouter);
app.use('/user', userRouter);
let port = 8080;
app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});


// Set up mongoose connection
let dev_db_url = 'mongodb://localhost:27017/';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("DB connected");
});

mongoose.Promise = global.Promise;
let db = mongoose.connection;  
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


