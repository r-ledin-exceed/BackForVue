/* eslint-disable guard-for-in */
// const geoip = require('geoip-lite');
// const uuid = require('uuid');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { SECRET } = require('../../config');
const { chooseModel } = require('../helpers/giveModelDependOnGameId');

const ClientsApps = mongoose.model('ClientsApps');
const User = mongoose.model('User');

const checkToken = (res, userTokenJWT) => {
  try {
    return jwt.verify(userTokenJWT, SECRET);
  } catch (err) {
    return res.status(400).send({ response: 'error', message: 'Incorrect JWC-Token' });
  }
};

const changeNickname = async (req, res) => {
  const {
    data,
  } = req.body;
  const { usertokenjwt: userTokenJWT } = req.headers;

  try {
    const decoded = checkToken(res, userTokenJWT);

    const currentAccount = await ClientsApps.findOne({ userTokenJWT });
    if (!currentAccount && currentAccount.userId.toString() !== data.userId) {
      return res.status(400).send({ response: 'error', message: 'Cannot find that userId' });
    }

    const { gameId, deviceId } = decoded;
    const gameModel = await chooseModel(gameId);

    const currentUser = await gameModel.findOne({ userId: data.userId });
    const currentGlobalUser = await User.findOne({ deviceId });

    // eslint-disable-next-line no-restricted-syntax
    for (const key in data) {
      if (key !== 'userId') {
        currentUser[key] = data[key];
      }
    }

    currentGlobalUser.updated = moment.utc();

    await currentUser.save();
    await currentGlobalUser.save();

    return res.status(200).send({
      data: {
        message: 'ok',
      },
    });
  } catch (err) {
    return res.status(500).send({ response: 'error', message: err.message });
  }
};

const getInfoAboutUser = async (req, res) => {
  const {
    userId,
  } = req.query;
  try {
    const currentUser = await ClientsApps.find({ userId }, { userTokenJWT: 0 })
      .populate('userId')
      .populate('gameInfoCards')
      .populate('gameInfoChess')
      .populate('gameInfoDomino')
      .lean()
      .exec();

    const userInfo = currentUser[0].userId;
    currentUser.unshift(userInfo);
    for (let i = 1; i < currentUser.length; i += 1) {
      currentUser[i].userId = userId;
    }

    currentUser.forEach((element) => {
      // eslint-disable-next-line no-restricted-syntax
      for (let key in element) {
        if (element[key] === null) {
          element[key] = undefined;
        }
      }
    });

    // .populate('userId').exec();
    return res.status(200).send({ currentUser });
  } catch (err) {
    return res.status(500).send({ response: 'error', message: err.message });
  }
};

module.exports = {
  changeNickname,
  getInfoAboutUser,
};
