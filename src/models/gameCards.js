const mongoose = require('mongoose');

const { Schema } = mongoose;

const GameCards = new Schema({
  userId: { type: String, ref: 'user' },
  playerId: { type: String, required: true },
  nickname: { type: String, required: true },
  lvl: { type: Number, default: 0 },
  balance: { type: Number, default: 0 },
  isOnline: { type: Boolean, default: false },
  gameProfilePhotoUrl: { type: String, default: null },
},
{ collection: 'gameCards' },
{ versionKey: false });

module.exports = mongoose.model('GameCards', GameCards);

// gameId: { type: String, required: true },
