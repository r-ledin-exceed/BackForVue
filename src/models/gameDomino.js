const mongoose = require('mongoose');

const { Schema } = mongoose;

const GameDomino = new Schema({
  userId: { type: Schema.ObjectId, ref: 'users' },
  playerId: { type: String, required: true },
  nickname: { type: String, required: true },
  lvl: { type: Number, default: 0 },
  balance: { type: Number, default: 0 },
  isOnline: { type: Boolean, default: false },
  gameProfilePhotoUrl: { type: String, default: null },
},
{ collection: 'gameDomino' },
{ versionKey: false });

module.exports = mongoose.model('GameDomino', GameDomino);

// gameId: { type: String, required: true },
