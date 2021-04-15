/* eslint-disable guard-for-in */
// const geoip = require('geoip-lite');
// const uuid = require('uuid');
const mongoose = require('mongoose');
const moment = require('moment');
const { chooseModel, ChooseScoreModel } = require('../helpers/giveModelDependOnGameId');
const { checkToken } = require('../helpers/checkToken');
const { scoreCounter } = require('../helpers/scoreCounter');

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
    let usedGameId;

    switch (gameId) {
      case 'domino':
        populateCase = 'gameInfoDomino';
        usedGameId = 'domino';
        break;
      case 'cards':
        populateCase = 'gameInfoCards';
        usedGameId = 'cards';
        break;
      case 'chess':
        populateCase = 'gameInfoChess';
        usedGameId = 'chess';
        break;
      default:
        break;
    }

    let currentUser = await ClientsApps.find({ userId }, { userTokenJWT: 0 })
      // .populate('userId')
      .populate(populateCase)
      .lean()
      .exec();

    currentUser = currentUser.filter((obj) => obj.gameId === usedGameId);

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
    if (data.winRounds > data.allRounds) {
      return res.status(400).send({ message: 'incorrect round stats' });
    }
    const currentAccount = await ClientsApps.findOne({ userTokenJWT });
    if (!currentAccount && currentAccount.userId.toString() !== userId.toString()) {
      return res.status(400).send({ response: 'error', message: 'Cannot find that userId' });
    }

    const { gameId } = decoded;
    const GameScoreModel = await ChooseScoreModel(gameId);
    const currentUserStats = await GameScoreModel.findOne({ userId });
    const newScore = scoreCounter(gameId, data.gameType, data.winRounds, data.allRounds, res);

    if (!currentUserStats) {
      const newUserScore = new GameScoreModel({
        winRounds: data.winRounds,
        allRounds: data.allRounds,
        score: newScore,
        userId: currentAccount.userId,
        duration: data.time,
        created: moment.utc(),
        updated: moment.utc(),
      });
      await newUserScore.save();
      return res.status(200).send({
        message: 'Your first game!',
        winRounds: `You win ${data.winRounds}`,
        allRounds: `You played ${data.allRounds}`,
        score: `Your score now ${newScore}`,
      });
    }
    currentUserStats.winRounds += data.winRounds;
    currentUserStats.allRounds += data.allRounds;
    currentUserStats.score += newScore;
    currentUserStats.duration += data.time;
    currentUserStats.updated = moment.utc();
    await currentUserStats.save();
    return res.status(200).send({
      message: 'new stats',
      winRounds: `You win ${currentUserStats.winRounds}`,
      allRounds: `You played ${currentUserStats.allRounds}`,
      score: `Your score now ${currentUserStats.score}`,
    });
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
