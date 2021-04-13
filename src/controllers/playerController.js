// const geoip = require('geoip-lite');
// const uuid = require('uuid');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { SECRET } = require('/home/user/back_vue/config');
const moment = require('moment');
const { chooseModel } = require('../helpers/giveModelDependOnGameId');

// const ClientsApps = mongoose.model('ClientsApps');
const User = mongoose.model('User');

const changeNickname = async (req, res) => {
  const { nickname, version, userId } = req.body;
  const { usertokenjwt } = req.headers;

  try {
    const decoded = jwt.verify(usertokenjwt, SECRET);
    const { gameId } = decoded;
    const { deviceId } = decoded;

    const model = await chooseModel(gameId);

    const currentUser = await model.findOne({ userId });
    const currentGlobalUser = await User.findOne({ deviceId });

    if (currentUser.nickname !== nickname) {
      currentUser.nickname = nickname;
      currentGlobalUser.updated = moment.utc();
    } else {
      return res.status(400).send({
        data: {
          response: 'error',
          message: 'new nickname is same to old',
        },
      });
    }

    await currentUser.save();
    await currentGlobalUser.save();

    return res.status(200).send({
      data: {
        message: 'new nickname is',
        nickname,
      },
    });
  } catch (err) {
    return res.status(500).send({ response: 'error', code: 0, message: 'bad serve' });
  }
};

const changePhotoUrl = async (req, res) => {
  const { gameProfilePhotoUrl, version, userId } = req.body;
  const { usertokenjwt } = req.headers;

  try {
    const decoded = jwt.verify(usertokenjwt, SECRET);
    const { gameId } = decoded;
    const { deviceId } = decoded;

    const model = await chooseModel(gameId);

    const currentUser = await model.findOne({ userId });
    const currentGlobalUser = await User.findOne({ deviceId });

    if (currentUser.gameProfilePhotoUrl !== gameProfilePhotoUrl) {
      currentUser.gameProfilePhotoUrl = gameProfilePhotoUrl;
      currentGlobalUser.updated = moment.utc();
    } else {
      return res.status(400).send({
        data: {
          response: 'error',
          message: 'new photo is same to old',
        },
      });
    }

    await currentUser.save();
    await currentGlobalUser.save();

    return res.status(200).send({
      data: {
        message: 'new gameProfilePhotoUrl is',
        gameProfilePhotoUrl,
      },
    });
  } catch (err) {
    return res.status(500).send({ response: 'error', code: 0, message: 'bad serve' });
  }
};

module.exports = {
  changeNickname,
  changePhotoUrl,
};
