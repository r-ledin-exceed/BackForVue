const mongoose = require('mongoose');
const moment = require('moment');

const { Schema } = mongoose;

const User = new Schema({
  userId: { type: Schema.ObjectId, ref: 'user' },
  deviceId: { type: String, required: true },
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
