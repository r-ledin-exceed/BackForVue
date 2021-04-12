/* eslint-disable no-console */

const geoip = require('geoip-lite');
const uuid = require('uuid');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { createNewClient } = require('../helpers/createNewClient');

// const GameDomino = mongoose.model('GameDomino');
// const GameChess = mongoose.model('GameChess');
// const GameCards = mongoose.model('GameCards');
const ClientsApps = mongoose.model('ClientsApps');
const User = mongoose.model('User');

// Sign up
exports.registration = async (req, res) => {
  const {
    deviceId, clientIp, nickname, gameId,
  } = req.body;

  try {
    // const decoded = jwt.verify(userTokenJWT, 'shhhhh');

    const playerId = uuid.v4();
    const userTokenJWT = jwt.sign({ playerId, gameId, deviceId }, 'shhhhh', { algorithm: 'HS256' });
    const geoloc = geoip.lookup(clientIp);

    // Checking is already exist in that game?
    const currentUser = await User.findOne({ deviceId });
    console.log(currentUser);
    if (currentUser) {
      const { userId } = currentUser;
      const clientsAppsFinder = await ClientsApps.find({ userId });
      const checkClient = clientsAppsFinder.findIndex((object) => object.gameId === gameId);
      const innerPlayer = {
        playerId, nickname, userTokenJWT, userId, gameId,
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
    // let newPlayer;
    // let gameIdCase = '';

    // clientsAppsFinder.forEach((object) => {
    //   if (object.gameId === 'chess') {
    //     gameIdCase = `${gameIdCase} chess`;
    //   }
    //   if (object.gameId === 'cards') {
    //     gameIdCase = `${gameIdCase} cards`;
    //   }
    //   if (object.gameId === 'domino') {
    //     gameIdCase = `${gameIdCase} domino`;
    //   }
    // });

    // if (gameIdCase.indexOf(gameId) === -1) {
    //   const Result = await switchCase(gameId);

    //   const newPlayer = new Result({
    //     playerId, nickname, userTokenJWT, userId,
    //   });
    //   await newPlayer.save();
    //   await newClientApps.save();

    //   // res.status(400).send({
    //   //   data: {
    //   //     response: 'error',
    //   //     message: `you have already registred in ${gameId}`,
    //   //     userTokenJWT,
    //   //     userId,
    //   //   },
    //   // });
    // }
    // switch (gameId) {
    //   case 'domino':

    //     newPlayer = new Result();
    //     await newPlayer.save();
    //     await newClientApps.save();
    //     return res.status(200).send({
    //       data: {
    //         userTokenJWT,
    //         userId,
    //       },
    //     });
    //   case 'cards':
    //     if (gameIdCase.indexOf(gameId) !== -1) {
    //       res.status(400).send({
    //         data: {
    //           response: 'error',
    //           message: 'you have already registred in cards',
    //           userTokenJWT,
    //           userId,
    //         },
    //       });
    //       return 'gameCards';
    //     }
    //     newPlayer = new GameCards({
    //       playerId, nickname, userTokenJWT, userId,
    //     });
    //     await newPlayer.save('gameCards');
    //     await newClientApps.save();
    //     return res.status(200).send({
    //       data: {
    //         userTokenJWT,
    //         userId,
    //       },
    //     });
    //   case 'chess':
    //     if (gameIdCase.indexOf(gameId) !== -1) {
    //       res.status(400).send({
    //         data: {
    //           response: 'error',
    //           message: 'you have already registred in chess',
    //           userTokenJWT,
    //           userId,
    //         },
    //       });
    //       return 'gameChess';
    //     }
    //     newPlayer = new GameChess({
    //       playerId, nickname, userTokenJWT, userId,
    //     });
    //     await newPlayer.save('gameChess');
    //     await newClientApps.save();
    //     return res.status(200).send({
    //       data: {
    //         userTokenJWT,
    //         userId,
    //       },
    //     });
    //   default:
    //     return res.status(400).send({
    //       response: 'error',
    //       message: 'unknown game',
    //     });
    // }

    //* PERENSTI V VALIDATOR *//

    // if (gameId !== 'chess'
    // && gameId !== 'domino'
    // && gameId !== 'cards') {
    //   return res.status(400).send({
    //     response: 'error',
    //     message: 'unknow game',
    //   });
    // }

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
    };

    const newClient = await createNewClient(gameId, innerInfoNewGame);
    await newClient.save();
    // if (gameId === 'domino') {
    //   const newPlayerDomino = new GameDomino(innerInfoNewGame);
    //   await newPlayerDomino.save();
    // }
    // if (gameId === 'chess') {
    //   const newPlayerChess = new GameChess(innerInfoNewGame);
    //   await newPlayerChess.save();
    // }
    // if (gameId === 'cards') {
    //   const newPlayerCards = new GameCards(innerInfoNewGame);
    //   await newPlayerCards.save();
    // }

    const newClientApps = new ClientsApps({
      gameId, playerId, userId: newUserId, userTokenJWT,
    });

    await newClientApps.save();
    await newUser.save();

    return res.status(200).send({
      data: {
        userTokenJWT, userId: newUserId,
      },
    });
  } catch (err) {
    return res.status(500).send({ response: 'error', code: 0, message: 'bad serve' });
  }
};
