const express = require('express');
// const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const validator = require('../middleware/validation');

const router = express.Router();

router.get('/test', authController.test);

router.post('/login',
  validator.loginUser,
  authController.login);
router.post('/registration',
  validator.addNewUser,
  authController.registration);

// router.post('/:id/addMarker', userController.addMarker);
// router.put('/:id/:marker/updMarker', userController.updMarker);
// router.delete('/:id/:marker/removeMarker', userController.removeMarker);
// router.get('/:id/allMarkers', userController.allMarkers);

module.exports = router;
