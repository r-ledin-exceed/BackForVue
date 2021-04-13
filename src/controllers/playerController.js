// const geoip = require('geoip-lite');
// const uuid = require('uuid');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { SECRET } = require('/home/user/back_vue/config');
const moment = require('moment');
const { chooseModel } = require('../helpers/giveModelDependOnGameId');

const ClientsApps = mongoose.model('ClientsApps');
const User = mongoose.model('User');

const changeNickname = async (req, res) => {
  const {
    data, nickname, version, userId, gameProfilePhotoUrl,
  } = req.body;
  const { usertokenjwt } = req.headers;

  try {
  
    try {
      const decoded = jwt.verify(usertokenjwt, SECRET);
    } catch (err) {
      return res.status(400).send({ response: 'error', message: 'Incorrect JWC-Token' });
    }

    try {
    const currentAccount = await ClientsApps.findOne({ userId });
    if (currentAccount.userTokenJWT !== usertokenjwt) {
      return res.status(400).send({ response: 'error', message: 'incorrect JWC to user id' });
    }
    } catch (err) {
    return res.status(400).send({ response: 'error', message: 'Cannot find that userId' });
    }

    const decoded = jwt.verify(usertokenjwt, SECRET);
    const { gameId, deviceId } = decoded;
    const gameModel = await chooseModel(gameId);

    const currentUser = await gameModel.findOne({ userId });
    const currentGlobalUser = await User.findOne({ deviceId });

    for (const key in data) {
      currentUser[key] = data[key];
      console.log(currentUser.key, data[key]);
      await currentUser.save();
    }

    currentUser.nickname = nickname;
    currentUser.gameProfilePhotoUrl = gameProfilePhotoUrl;
    currentGlobalUser.updated = moment.utc();

    await currentUser.save();
    await currentGlobalUser.save();

    return res.status(200).send({
      data: {
        message: 'new nickname and phURL are',
        nickname,
        gameProfilePhotoUrl,
      },
    });
  } catch (err) {
    return res.status(500).send({ response: 'error', message: 'bad serve' });
  }
};

module.exports = {
  changeNickname,
};
