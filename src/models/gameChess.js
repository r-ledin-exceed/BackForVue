const mongoose = require('mongoose');

const { Schema } = mongoose;

const GameChess = new Schema({
  userId: { type: Schema.ObjectId },
  playerId: { type: String },
  nickname: { type: String },
  lvl: { type: Number, default: 0 },
  balance: { type: Number, default: 0 },
  isOnline: { type: Boolean, default: false },
  gameProfilePhotoUrl: { type: String, default: null },
},
{ collection: 'gameChess' },
{ versionKey: false });

module.exports = mongoose.model('GameChess', GameChess);

// gameId: { type: String, required: true },
