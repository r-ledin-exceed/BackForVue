const mongoose = require('mongoose');
const moment = require('moment');

const { Schema } = mongoose;

const User = new Schema({
  userId: { type: Schema.ObjectId, ref: 'user' },
  deviceId: { type: String, required: true },
  clientIp: { type: String },
  userTokenJWT: { type: String },
  geoloc: { type: Object },
  created: {
    type: Date,
    default: moment.utc(),
  },
  updated: {
    type: Date,
    default: moment.utc(),
  },

  clientApps: [
    {
      gameId: { type: String, required: true },
      playerId: { type: String, required: true },
      nickname: { type: String, required: true },
      lvl: { type: Number, default: 0 },
      balance: { type: Number, default: 0 },
      isOnline: { type: Boolean, default: false },
      gameProfilePhotoUrl: { type: String, default: null },
      version: { type: String },
    },
  ],

},

{ versionKey: false });

module.exports = mongoose.model('user', User);
