const express = require('express');
const authController = require('../controllers/authController');
// const userController = require('../controllers/userController');

const validator = require('../middleware/validation');

const router = express.Router();

router.post('/registration',
  validator.addNewUser,
  authController.registration);
// router.post('/changeNickname',
//   userController.changeNickname);

module.exports = router;
