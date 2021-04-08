const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const validator = require('../middleware/validation');
const checkRegisterForm = require('../helpers/checkRegisterForm');

const router = express.Router();

router.get('/test', authController.test);
router.post('/login', validator.loginUser,
  checkRegisterForm,
  authController.login);
router.post('/registration', authController.registration);

router.post('/:id/addMarker', userController.addMarker);
router.put('/:id/:marker/updMarker', userController.updMarker);
router.delete('/:id/:marker/removeMarker', userController.removeMarker);
router.get('/:id/allMarkers', userController.allMarkers);

module.exports = router;
