const mongoose = require('mongoose');

const { Schema } = mongoose;

const ClientsApps = new Schema({

  userId: { type: String, ref: 'user' },
  gameId: { type: String, required: true },
  playerId: { type: String, required: true },
  // nickname: { type: String, required: true },
  lvl: { type: Number, default: 0 },
  balance: { type: Number, default: 0 },
  // isOnline: { type: Boolean, default: false },
  // gameProfilePhotoUrl: { type: String, default: null },
  version: { type: String },
  userTokenJWT: { type: String },
},
{ collection: 'clientsApps' },
{ versionKey: false });

module.exports = mongoose.model('ClientsApps', ClientsApps);
