const mongoose = require('mongoose');
const moment = require('moment');

const { Schema } = mongoose;

const User = new Schema({
  userId: { type: Schema.ObjectId, required: false },
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

// User.methods.getGeoloc = (clientIP) => {
//   clientIP.getJSON('http://www.geoplugin.net/json.gp?jsoncallback=?', (data) => {
//     this.geolog = JSON.stringify(data, null, 2);
//   });
// };

module.exports = mongoose.model('user', User);
