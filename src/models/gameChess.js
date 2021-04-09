const mongoose = require('mongoose');

const { Schema } = mongoose;

const GameChess = new Schema({

  gameId: { type: String, required: true },
  playerId: { type: String, required: true },
  // nickname: { type: String, required: true },
  lvl: { type: Number, default: 0 },
  balance: { type: Number, default: 0 },
  isOnline: { type: Boolean, default: false },
  // gameProfilePhotoUrl: { type: String, default: null },
  version: { type: String },

},
{ collection: 'gameChess' },
{ versionKey: false });

module.exports = mongoose.model('GameChess', GameChess);
