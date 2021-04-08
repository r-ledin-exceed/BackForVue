const mongoose = require('mongoose');
const config = require('./index');

const devDbUrl = 'mongodb://localhost:27017/';
const mongoDB = process.env.MONGODB_URI || devDbUrl;
const ENV = process.env.NODE_ENV;

module.exports = async function (app) {
  mongoose.Promise = global.Promise;
  if (ENV === 'local') {
    mongoose.connect(mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
      .then((res) => console.log('DB Connected!'))
      .catch((err) => console.log('Error!', err.message));

    this.checkConnection(mongoDB);
    if (app) {
      app.set('mongoose', mongoose);
    }
  }
};
