const mongoose = require('mongoose');
const moment = require('moment');

const { Schema } = mongoose;

const StatsChess = new Schema({
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
},
{ collection: 'gameStatsChess' },
{ versionKey: false });

module.exports = mongoose.model('StatsChess', StatsChess);
