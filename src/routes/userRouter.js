const express = require('express');
const authController = require('../controllers/authController');
const playerController = require('../controllers/playerController');

const validator = require('../middleware/validation');

const router = express.Router();

router.post('/registration',
  validator.addNewUser,
  authController.registration);

router.put('/changeNickname',
  validator.changeNickname,
  playerController.changeNickname);

router.put('/changePhoto',
  // validator.changeNickname,
  playerController.changePhotoUrl);

module.exports = router;
