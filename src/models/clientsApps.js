const mongoose = require('mongoose');

const { Schema } = mongoose;

const ClientsApps = new Schema({
  userId: { type: Schema.ObjectId, ref: 'User' },
  gameInfoCards: { type: Schema.ObjectId, ref: 'GameCards' },
  gameInfoChess: { type: Schema.ObjectId, ref: 'GameChess' },
  gameInfoDomino: { type: Schema.ObjectId, ref: 'GameDomino' },
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
