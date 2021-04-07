const express = require('express');
const controller = require('../controllers/authController');

const router = express.Router();

// a simple test url to check that all of our files are communicating correctly.
router.get('/test', controller.test);
router.post('/registration', controller.registration);
router.post('/login', controller.login);

module.exports = router;
