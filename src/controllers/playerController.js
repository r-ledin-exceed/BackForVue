/* eslint-disable guard-for-in */
// const geoip = require('geoip-lite');
// const uuid = require('uuid');
const mongoose = require('mongoose');
const moment = require('moment');
const { chooseModel, ChooseScoreModel } = require('../helpers/giveModelDependOnGameId');
const { checkToken } = require('../helpers/checkToken');

const ClientsApps = mongoose.model('ClientsApps');
const User = mongoose.model('User');

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
  const {
    usertokenjwt: userTokenJWT,
  } = req.headers;

  try {
    const decoded = checkToken(res, userTokenJWT);

    const currentAccount = await ClientsApps.findOne({ userTokenJWT });
    if (!currentAccount && currentAccount.userId.toString() !== userId) {
      return res.status(400).send({ response: 'error', message: 'Cannot find that userId' });
    }

    const { gameId } = decoded;
    let populateCase;

    switch (gameId) {
      case 'domino':
        populateCase = 'gameInfoDomino';
        break;
      case 'cards':
        populateCase = 'gameInfoCards';
        break;
      case 'chess':
        populateCase = 'gameInfoChess';
        break;
      default:
        break;
    }

    const currentUser = await ClientsApps.find({ gameId }, { userTokenJWT: 0 })
      // .populate('userId')
      .populate(populateCase)
      .lean()
      .exec();

    // const userInfo = currentUser[0].userId;
    // currentUser.unshift(userInfo);
    // for (let i = 1; i < currentUser.length; i += 1) {
    //   currentUser[i].userId = userId;
    // }

    return res.status(200).send({ currentUser });
  } catch (err) {
    return res.status(500).send({ response: 'error', message: err.message });
  }
};

// updstats
const updateStats = async (req, res) => {
  const { data } = req.body;
  const { usertokenjwt: userTokenJWT } = req.headers;
  const { userId } = req.query;

  try {
    const decoded = checkToken(res, userTokenJWT);

    const currentAccount = await ClientsApps.findOne({ userTokenJWT });
    if (!currentAccount && currentAccount.userId.toString() !== userId.toString()) {
      return res.status(400).send({ response: 'error', message: 'Cannot find that userId' });
    }

    const { gameId } = decoded;
    const GameScoreModel = await ChooseScoreModel(gameId);

    const currentUserStats = await GameScoreModel.findOne({ userId });

    if (!currentUserStats) {
      const newUserScore = new GameScoreModel({
        winRounds: data.winRounds,
        allRounds: data.allRounds,
        userId: currentAccount.userId,
      });
      await newUserScore.save();
      return res.status(200).send({
        message: 'Your first game!',
      });
    }

    // let roundPoints;
    // if (data.win === true) {
    //   switch (data.gameType) {
    //     case 'first':
    //       roundPoints = firstTypeGameWinPoints;
    //       break;
    //     case 'second':
    //       roundPoints = secondTypeGameWinPoints;
    //       break;
    //     case 'third':
    //       roundPoints = thirdTypeGameWinPoints;
    //       break;
    //     default:
    //       break;
    //   }
    // } else {
    //   switch (data.gameType) {
    //     case 'first':
    //       roundPoints = firstTypeGameLosePoints;
    //       break;
    //     case 'second':
    //       roundPoints = secondTypeGameLosePoints;
    //       break;
    //     case 'third':
    //       roundPoints = thirdTypeGameLosePoints;
    //       break;
    //     default:
    //       break;
    //   }
    // }

    // currentGlobalUser.updated = moment.utc();
    // await currentGlobalUser.save();

    // currentUserScore.roundPoints = roundPoints;
    // currentUserScore.pointsAllTime += roundPoints;
    // await currentUserScore.save();

    // return res.status(200).send({
    //   message: 'ok',
    //   roundPoints,
    //   pointsAllTime: currentUserScore.pointsAllTime,
    // });
  } catch (err) {
    return res.status(500).send({
      response: 'error',
      message: err.message,
    });
  }
};

module.exports = {
  changeNickname,
  getInfoAboutUser,
  updateStats,
};
