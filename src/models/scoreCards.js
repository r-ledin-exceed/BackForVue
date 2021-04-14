const mongoose = require('mongoose');

const { Schema } = mongoose;

const ScoreCards = new Schema({
  winPoints: { type: Number, default: 0 },
  winPointsAllTime: { type: Number },
  userId: { type: Schema.ObjectId, ref: 'ClientsApps' },
  clientIp: { type: String },
  userTokenJWT: { type: String },
},

{ versionKey: false });

module.exports = mongoose.model('ScoreCards', ScoreCards);

// created: {
//     type: Date,
//     default: moment.utc(),
//   },
//   updated: {
//     type: Date,
//     default: moment.utc(),
//   },
