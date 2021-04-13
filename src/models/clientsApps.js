const mongoose = require('mongoose');

const { Schema } = mongoose;

const ClientsApps = new Schema({
  userId: { type: String, ref: 'user' },
  gameId: { type: String, required: true },
  playerId: { type: String, required: true },
  version: { type: String },
  userTokenJWT: { type: String },
  system: { type: String },
  systemVersion: { type: String },
},
{ collection: 'clientsApps' },
{ versionKey: false });

module.exports = mongoose.model('ClientsApps', ClientsApps);

// isOnline: { type: Boolean, default: false },
// gameProfilePhotoUrl: { type: String, default: null },
// nickname: { type: String, required: true },
