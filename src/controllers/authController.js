const geoip = require('geoip-lite');
const uuid = require('uuid');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
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

    // Checking is already exist in that game?
    const currentUser = await User.findOne({ deviceId });
    if (currentUser) {
      switch (gameId) {
        case 'domino':
          return 'gameDomino';
        case 'cards':
          return 'gameCards';
        case 'chess':
          return 'gameChess';
        default:
          return res.status(400).send({
            response: 'error',
            message: 'unknown game',
          });
      }
    }

    const playerId = uuid.v4();
    const userTokenJWT = jwt.sign({ playerId, gameId, deviceId }, 'shhhhh', { algorithm: 'HS256' });
    const geoloc = geoip.lookup(clientIp);

    const newUser = new User({
      deviceId,
      geoloc,
    });
    await newUser.save();

    if (gameId === 'domino') {
      const newPlayer = new GameDomino({
        gameId, playerId, nickname, userTokenJWT,
      });
      await newPlayer.save('gameDomino');
    }
    if (gameId === 'chess') {
      const newPlayer = new GameChess({
        gameId, playerId, nickname, userTokenJWT,
      });
      await newPlayer.save('GameChess');
    }
    if (gameId === 'cards') {
      const newPlayer = new GameCards({
        gameId, playerId, nickname, userTokenJWT,
      });
      await newPlayer.save('GameCards');
    }

    const newClientApps = new ClientsApps({
      gameId, playerId,
      // userId     // nado navesit'
    });
    await newClientApps.save();

    return res.status(200).send({
      data: {
        userTokenJWT,
      },
    });
  } catch (err) {
    return res.status(500).send({ response: 'error', code: 0, message: 'bad serve' });
  }
};
