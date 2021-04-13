const mongoose = require('mongoose');
const moment = require('moment');

const { Schema } = mongoose;

const User = new Schema({
  deviceId: { type: String, required: true },
  userId: { type: String },
  userObjId: { type: Schema.ObjectId, ref: 'users' },
  clientIp: { type: String },
  geoloc: { type: Object },
  created: {
    type: Date,
    default: moment.utc(),
  },
  updated: {
    type: Date,
    default: moment.utc(),
  },

},

{ versionKey: false });

module.exports = mongoose.model('User', User);
