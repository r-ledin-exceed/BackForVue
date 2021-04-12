const geoip = require('geoip-lite');
const uuid = require('uuid');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
// const gameDomino = require('../models/gameDomino');
// const mongo = require('mongodb');

const GameDomino = mongoose.model('GameDomino');
const GameChess = mongoose.model('GameChess');
const GameCards = mongoose.model('GameCards');
const ClientsApps = mongoose.model('ClientsApps');
const User = mongoose.model('User');

// Sign up
exports.registration = async (req, res) => {
  const {
    deviceId, clientIp, nickname, gameId,
  } = req.body;

  try {
    // const decoded = jwt.verify(userTokenJWT, 'shhhhh');

    const playerId = uuid.v4();
    const userTokenJWT = jwt.sign({ playerId, gameId, deviceId }, 'shhhhh', { algorithm: 'HS256' });
    const geoloc = geoip.lookup(clientIp);

    // Checking is already exist in that game?
    const currentUser = await User.findOne({ deviceId });

    if (currentUser) {
      const { userId } = currentUser;
      const dominoUser = await GameDomino.findOne({ userId });
      const cardsUser = await GameCards.findOne({ userId });
      const chessUser = await GameChess.findOne({ userId });

      const newClientApps = new ClientsApps({
        gameId, playerId, userId,
      });
      let newPlayer;
      switch (gameId) {
        case 'domino':
          if (dominoUser) {
            res.status(400).send({
              response: 'error',
              message: 'you have already registred in domino',
              userTokenJWT: dominoUser.userTokenJWT,
              userId: dominoUser.userId,
            });
            return 'gameDomino';
          }
          newPlayer = new GameDomino({
            playerId, nickname, userTokenJWT, userId,
          });
          await newPlayer.save('gameDomino');
          await newClientApps.save();
          break;
        case 'cards':
          if (cardsUser) {
            res.status(400).send({
              response: 'error',
              message: 'you have already registred in cards',
              userTokenJWT: cardsUser.userTokenJWT,
              userId: cardsUser.userId,
            });
            return 'gameCards';
          }
          newPlayer = new GameCards({
            playerId, nickname, userTokenJWT, userId,
          });
          await newPlayer.save('gameCards');
          await newClientApps.save();
          break;
        case 'chess':
          if (chessUser) {
            res.status(400).send({
              response: 'error',
              message: 'you have already registred in chess',
              userTokenJWT: chessUser.userTokenJWT,
              userId: chessUser.userId,
            });
            return 'gameChess';
          }
          newPlayer = new GameChess({
            playerId, nickname, userTokenJWT, userId,
          });
          await newPlayer.save('gameChess');
          await newClientApps.save();
          break;
        default:
          return res.status(400).send({
            response: 'error',
            message: 'unknown game',
          });
      }
      return res.status(200).send({
        data: {
          userTokenJWT,
        },
      });
    }

    const newUser = new User({
      deviceId,
      geoloc,
    });
    const newUserId = newUser._id.toString();
    newUser.userId = newUserId;

    if (gameId === 'domino') {
      const newPlayerDomino = new GameDomino({
        gameId, playerId, nickname, userTokenJWT, userId: newUserId,
      });
      await newPlayerDomino.save('gameDomino');
    }
    if (gameId === 'chess') {
      const newPlayerChess = new GameChess({
        gameId, playerId, nickname, userTokenJWT, userId: newUserId,
      });
      await newPlayerChess.save('GameChess');
    }
    if (gameId === 'cards') {
      const newPlayerCards = new GameCards({
        gameId, playerId, nickname, userTokenJWT, userId: newUserId,
      });
      await newPlayerCards.save('GameCards');
    }

    const newClientApps = new ClientsApps({
      gameId, playerId, userId: newUserId,
    });

    await newClientApps.save();
    await newUser.save();

    return res.status(200).send({
      data: {
        userTokenJWT, userId: newUserId,
      },
    });
  } catch (err) {
    return res.status(500).send({ response: 'error', code: 0, message: 'bad serve' });
  }
};
