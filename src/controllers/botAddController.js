/* eslint-disable no-await-in-loop */
/* eslint-disable no-underscore-dangle */

const uuid = require('uuid');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { createNewClient } = require('../helpers/createNewClient');
const { SECRET } = require('../../config');

const ClientsApps = mongoose.model('ClientsApps');
const User = mongoose.model('User');
const GameChess = mongoose.model('GameChess');
const StatsChess = mongoose.model('StatsChess');
// Sign up
exports.fillBots = async (req, res) => {
  const {
    gameId,
    botNumber,
  } = req.body;
  let data1 = [];
  let data2 = [];
  let data3 = [];
  let data4 = [];
  try {
    for (let i = 0; i < botNumber; i += 1) {
      const playerId = uuid.v4();
      const deviceId = uuid.v4();
      const nickname = uuid.v4();
      const userTokenJWT = jwt.sign({ playerId, gameId, deviceId }, SECRET, { algorithm: 'HS256' });
      const newUser = new User({
        deviceId,
      });
      const newUserId = newUser._id.toString();
      newUser.userId = newUserId;
      const innerInfoNewGame = {
        gameId,
        playerId: 2,
        nickname,
        userId: newUserId,
      };
      const newClient = createNewClient(gameId, innerInfoNewGame);
      const newClientApps = new ClientsApps({
        gameId,
        playerId,
        userId: newUserId,
        userTokenJWT,
        gameInfoCards: newClient._id,
        gameInfoChess: newClient._id,
        gameInfoDomino: newClient._id,
      });
      const min = 0;
      const max = 1000;
      let score = min + Math.random() * (max - min);
      score = Math.round(score);
      const newStats = new StatsChess({
        userId: newUserId,
        score,
      });
      data1.push(newClient);
      data2.push(newUser);
      data3.push(newClientApps);
      data4.push(newStats);
      console.count();
      if (data1.length > 30000) {
        await GameChess.insertMany(data1);
        await User.insertMany(data2);
        await ClientsApps.insertMany(data3);
        await StatsChess.insertMany(data4);
        data1 = [];
        data2 = [];
        data3 = [];
        data4 = [];
      }
    }
    data4 = data4.sort((a, b) => {
      if (a.score > b.score) {
        return -1;
      }
      if (a.score < b.score) {
        return 1;
      }
      return 0;
    });

    return res.status(200).send({ message: 'well done' });
  } catch (err) {
    return res.status(500).send({ response: 'error', code: 0, message: err.message });
  }
};
