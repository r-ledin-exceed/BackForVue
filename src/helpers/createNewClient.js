const mongoose = require('mongoose');

const GameDomino = mongoose.model('GameDomino');
const GameChess = mongoose.model('GameChess');
const GameCards = mongoose.model('GameCards');

const createNewClient = async (gameId, innerPlayer) => {
  switch (gameId) {
    case 'domino':
      return new GameDomino(innerPlayer);
    case 'cards':
      return new GameCards(innerPlayer);
    case 'chess':
      return new GameChess(innerPlayer);
    default:
      break;
  }
  return false;
};

module.exports = {
  createNewClient,
};
