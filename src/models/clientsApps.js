const mongoose = require('mongoose');

const { Schema } = mongoose;

const ClientsApps = new Schema({
  clientsApps: [{
    userId: { type: Schema.ObjectId, ref: 'user' },
    gameId: { type: String, required: true },
    playerId: { type: String, required: true },
    // nickname: { type: String, required: true },
    lvl: { type: Number, default: 0 },
    balance: { type: Number, default: 0 },
    isOnline: { type: Boolean, default: false },
    // gameProfilePhotoUrl: { type: String, default: null },
    version: { type: String },
  }],
  userId: { type: Schema.ObjectId, ref: 'user' },
},
{ collection: 'clientsApps' },
{ versionKey: false });

module.exports = mongoose.model('ClientsApps', ClientsApps);
