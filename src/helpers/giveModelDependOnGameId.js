const mongoose = require('mongoose');

const GameDomino = mongoose.model('GameDomino');
const GameChess = mongoose.model('GameChess');
const GameCards = mongoose.model('GameCards');

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

module.exports = {
  chooseModel,
};
