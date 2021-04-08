const mongoose = require('mongoose');
const crypto = require('crypto');
const formatPlugin = require('mongoose-model-format');
const md5 = require('../helpers/md5');

const SALT_PREFIX = '%@*989!';
// const moment = require("moment");

const { Schema } = mongoose;

const user = new Schema({

  email: { type: String, required: true },
  password: { type: String, required: true },

  items: [{
    name: { type: String },
    coords: [Number, Number],
    url: { type: String },
  }],

},
{ versionKey: false });

user.plugin(formatPlugin);

user.methods.encryptPassword = (password) => crypto.createHmac('sha1', this.salt).update(password).digest('hex');

user.virtual('password')
  .set((password) => {
    if (!password) {
      this.salt = null;
      this.planPassword = null;
      this.hashedPassword = null;
    } else {
      this.salt = md5(`${SALT_PREFIX}${Date.now() / 1000}`);
      this.planPassword = md5(`${password}${this.salt}`);
      this.hashedPassword = this.encryptPassword(password);
    }
  })
  .get(() => this.planPassword);

user.methods.checkPassword = (password) => this.encryptPassword(password) === this.hashedPassword;

// Export the model
module.exports = mongoose.model('user', user);
