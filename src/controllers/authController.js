/* eslint-disable no-underscore-dangle */
const geoip = require('geoip-lite');
const uuid = require('uuid');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { createNewClient } = require('../helpers/createNewClient');
const { SECRET } = require('../../config');

const ClientsApps = mongoose.model('ClientsApps');
const User = mongoose.model('User');

// Sign up
exports.registration = async (req, res) => {
  const {
    deviceId, clientIp, nickname, gameId, system, systemVersion,
  } = req.body;

  try {
    const playerId = uuid.v4();
    const userTokenJWT = jwt.sign({ playerId, gameId, deviceId }, SECRET, { algorithm: 'HS256' });
    const geoloc = geoip.lookup(clientIp);

    // const decoded = jwt.verify(userTokenJWT, SECRET);
    // console.log(decoded)
    // Checking is already exist in that game?
    const currentUser = await User.findOne({ deviceId });
    if (currentUser) {
      const { userId } = currentUser;
      const clientsAppsFinder = await ClientsApps.find({ userId });
      const checkClient = clientsAppsFinder.findIndex((object) => object.gameId === gameId);
      const innerPlayer = {
        playerId,
        nickname,
        userTokenJWT,
        userId,
        gameId,
        system,
        systemVersion,
        gameInfoCards: userId,
        gameInfoChess: userId,
        gameInfoDomino: userId,
      };
      if (checkClient !== -1) {
        return res.status(400).send({
          data: {
            message: "You've have alredy registred in that game",
            userTokenJWT: clientsAppsFinder[checkClient].userTokenJWT,
            userId: clientsAppsFinder[checkClient].userId,
          },
        });
      }
      const newClient = await createNewClient(gameId, innerPlayer);
      await newClient.save();
      const newClientApps = new ClientsApps(innerPlayer);
      await newClientApps.save();
      return res.status(200).send({
        data: {
          message: "You've have registred succesfully",
          userTokenJWT,
          userId,
        },
      });
    }

    const newUser = new User({
      deviceId,
      geoloc,
    });
    const newUserId = newUser._id.toString();

    newUser.userId = newUserId;

    const innerInfoNewGame = {
      gameId,
      playerId,
      nickname,
      userId: newUserId,
      gameInfoCards: newUserId,
      gameInfoChess: newUserId,
      gameInfoDomino: newUserId,
    };

    const newClient = await createNewClient(gameId, innerInfoNewGame);
    await newClient.save();

    const newClientApps = new ClientsApps({
      gameId,
      playerId,
      userId: newUserId,
      userTokenJWT,
      system,
      systemVersion,
      gameInfoCards: newUserId,
      gameInfoChess: newUserId,
      gameInfoDomino: newUserId,
    });

    await newUser.save();
    await newClientApps.save();

    return res.status(200).send({
      data: {
        userTokenJWT, userId: newUserId,
      },
    });
  } catch (err) {
    return res.status(500).send({ response: 'error', code: 0, message: err.message });
  }
};
