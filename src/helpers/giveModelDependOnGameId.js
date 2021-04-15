const mongoose = require('mongoose');

const GameDomino = mongoose.model('GameDomino');
const GameChess = mongoose.model('GameChess');
const GameCards = mongoose.model('GameCards');
const StatsDomino = mongoose.model('StatsDomino');
const StatsChess = mongoose.model('StatsChess');
const StatsCards = mongoose.model('StatsCards');

const chooseModel = async (gameId) => {
  switch (gameId) {
    case 'domino':
      return GameDomino;
    case 'cards':
      return GameCards;
    case 'chess':
      return GameChess;
    default:
      break;
  }
  return false;
};

const ChooseScoreModel = async (gameId) => {
  switch (gameId) {
    case 'domino':
      return StatsDomino;
    case 'cards':
      return StatsChess;
    case 'chess':
      return StatsCards;
    default:
      break;
  }
  return false;
};

module.exports = {
  chooseModel,
  ChooseScoreModel,
};
