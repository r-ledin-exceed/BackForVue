const express = require('express');
const authController = require('../controllers/authController');
const playerController = require('../controllers/playerController');
const botAddController = require('../controllers/botAddController');

const validator = require('../middleware/validation');

const router = express.Router();

router.post('/registration',
  validator.addNewUser,
  authController.registration);
router.put('/changeNickname',
  validator.changeNickname,
  playerController.changeNickname);
router.get('/getInfo',
  playerController.getInfoAboutUser);
router.post('/roundFinished',
  playerController.updateStats);
router.post('/fillBots',
  botAddController.fillBots);
router.get('/leaderboard',
  playerController.getLeaderboard);

module.exports = router;
