const { cardsPoints, chessPoints, dominoPoints } = require('../CONSTATS/CONST_GAMESCORE');

const scoreCounter = (gameId, gameType, winRounds, allRounds, res) => {
  let finalScore;
  if (gameId === 'cards') {
    switch (gameType) {
      case 'firstCards':
        finalScore = winRounds * cardsPoints.firstTypeWinPoints
        + (allRounds - winRounds) * cardsPoints.firstTypeLosePoints;
        break;
      case 'secondCards':
        finalScore = winRounds * cardsPoints.secondTypeWinPoints
        + (allRounds - winRounds) * cardsPoints.secondTypeLosePoints;
        break;
      case 'thirdCards':
        finalScore = winRounds * cardsPoints.thirdTypeWinPoints
            + (allRounds - winRounds) * cardsPoints.thirdTypeLosePoints;
        break;
      default:
        return res.status(400).send({ message: 'invalid GameType' });
    }
  } else if (gameId === 'chess') {
    switch (gameType) {
      case 'firstChess':
        finalScore = winRounds * chessPoints.firstTypeWinPoints
            + (allRounds - winRounds) * chessPoints.firstTypeLosePoints;
        break;
      case 'secondChess':
        finalScore = winRounds * chessPoints.secondTypeWinPoints
            + (allRounds - winRounds) * chessPoints.secondTypeLosePoints;
        break;
      case 'thirdChess':
        finalScore = winRounds * chessPoints.thirdTypeWinPoints
                + (allRounds - winRounds) * chessPoints.thirdTypeLosePoints;
        break;
      default:
        return res.status(400).send({ message: 'invalid GameType' });
    }
  } else if (gameId === 'domino') {
    switch (gameType) {
      case 'firstDomino':
        finalScore = winRounds * dominoPoints.firstTypeWinPoints
              + (allRounds - winRounds) * dominoPoints.firstTypeLosePoints;
        break;
      case 'secondDomino':
        finalScore = winRounds * dominoPoints.secondTypeWinPoints
              + (allRounds - winRounds) * dominoPoints.secondTypeLosePoints;
        break;
      case 'thirdDomino':
        finalScore = winRounds * dominoPoints.thirdTypeWinPoints
                  + (allRounds - winRounds) * dominoPoints.thirdTypeLosePoints;
        break;
      default:
        return res.status(400).send({ message: 'invalid GameType' });
    }
  }
  return finalScore;
};

module.exports = {
  scoreCounter,
};
