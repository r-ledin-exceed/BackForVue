const mongoose = require('mongoose');
const moment = require('moment');

const { Schema } = mongoose;

const StatsCards = new Schema({
  winRounds: { type: Number, default: 0 },
  allRounds: { type: Number, default: 0 },
  score: { type: Number, default: 0 },
  userId: { type: Schema.ObjectId },
  duration: { type: Number, default: 0 },
  created: {
    type: Date,
    default: moment.utc(),
  },
  updated: {
    type: Date,
    default: moment.utc(),
  },

  // roundPoints: { type: Number, default: 0 },
  // pointsAllTime: { type: Number },
  // clientIp: { type: String },
  // userTokenJWT: { type: String },
},
{ collection: 'gameStatsCards' },
{ versionKey: false });

module.exports = mongoose.model('StatsCards', StatsCards);

// created: {
//     type: Date,
//     default: moment.utc(),
//   },
//   updated: {
//     type: Date,
//     default: moment.utc(),
//   },
