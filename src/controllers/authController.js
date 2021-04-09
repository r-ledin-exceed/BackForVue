const jwt = require('jsonwebtoken');
const geoip = require('geoip-lite');
const mongoose = require('mongoose');
const uuid = require('uuid');
const { user } = require('../models');

const User = mongoose.model('user');

// Sign up
exports.registration = async (req, res) => {
  const {
    deviceId, clientIp, nickname, gameId,
  } = req.body;

  try {
    // const userToken = `${uuid.v4()}domino`;
    const playerId = uuid.v4();
    const userTokenJWT = jwt.sign({ playerId, gameId, deviceId }, 'shhhhh', { algorithm: 'HS256' });
    const decoded = jwt.verify(userTokenJWT, 'shhhhh');
    const geoloc = geoip.lookup(clientIp);
    // const gameId = decoded.substring(decoded.length - 6);
    // Checking is already exist in that game?
    const checkExistingDevice = await User.findOne({ deviceId });
    if (checkExistingDevice) {
      return res.status(400).send({
        response: 'error',
        message: 'user already exist',
      });
    }

    const newUser = new User({
      deviceId,
      geoloc,
      userTokenJWT,
      clientApps: [{ gameId, playerId, nickname }],
    });

    await newUser.save();
    return res.status(200).send({
      data: {
        userTokenJWT,
      },
    });
  } catch (err) {
    return res.status(500).send({ response: 'error', code: 0, message: 'bad serve' });
  }
};
