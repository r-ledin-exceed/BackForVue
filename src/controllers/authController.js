const geoip = require('geoip-lite');
const uuid = require('uuid');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = mongoose.model('user');

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
          break;
        case 'cards':
          break;
        case 'chess':
          break;
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
