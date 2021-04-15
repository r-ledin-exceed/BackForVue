/* eslint-disable no-underscore-dangle */

const uuid = require('uuid');
const moment = require('moment');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { createNewClient } = require('../helpers/createNewClient');
const { SECRET } = require('../../config');

const ClientsApps = mongoose.model('ClientsApps');
const User = mongoose.model('User');
const GameChess = mongoose.model('GameChess');
// Sign up
exports.fillBots = async (req, res) => {
  const {
    // deviceId,
    // clientIp,
    // nickname,
    // gameId,
    // system,
    // systemVersion,
    gameId,
    botNumber,
  } = req.body;
  const data1 = [];
  const data2 = [];
  const data3 = [];
  try {
    for (let i = 0; i < botNumber; i++) {
      const playerId = uuid.v4() + Math.random() * 0.1;
      const deviceId = uuid.v4() + Math.random() * 20 + Math.random() * 0.1;
      const nickname = uuid.v4() + moment.utc();
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

      data1.push(newClient);
      data2.push(newUser);
      data3.push(newClientApps);
      console.log(data3.length);
      //   // Checking is already exist in that game?
      //   const currentUser = await User.findOne({ deviceId });
      //   if (currentUser) {
      //     const { userId } = currentUser;
      //     const clientsAppsFinder = await ClientsApps.find({ userId });
      //     const checkClient = clientsAppsFinder.findIndex((object) => object.gameId === gameId);
      //     const innerPlayer = {
      //       playerId,
      //       nickname,
      //       userTokenJWT,
      //       userId,
      //       gameId,
      //       system,
      //       systemVersion,
      //     };
      //     if (checkClient !== -1) {
      //       return res.status(400).send({
      //         data: {
      //           message: "You've have alredy registred in that game",
      //           userTokenJWT: clientsAppsFinder[checkClient].userTokenJWT,
      //           userId: clientsAppsFinder[checkClient].userId,
      //         },
      //       });
      //     }

      //     const newClient = await createNewClient(gameId, innerPlayer);
      //     await newClient.save();

      //     const newClientApps = new ClientsApps(innerPlayer);
      //     newClientApps.gameInfoCards = newClient._id;
      //     newClientApps.gameInfoChess = newClient._id;
      //     newClientApps.gameInfoDomino = newClient._id;
      //     await newClientApps.save();

      //     return res.status(200).send({
      //       data: {
      //         message: "You've have registred succesfully",
      //         userTokenJWT,
      //         userId,
      //       },
      //     });
      //   }

    //   return res.status(200).send({
    //     data: {
    //       userTokenJWT, userId: newUserId,
    //     },
    //   });
    }

    await User.insertMany(data2);
    await ClientsApps.insertMany(data3);
    await GameChess.insertMany(data1);
    return res.status(200).send({ message: 'well done' });
  } catch (err) {
    return res.status(500).send({ response: 'error', code: 0, message: err.message });
  }
};
