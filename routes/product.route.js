const express = require('express');
const router = express.Router();
const product_controller = require('../controllers/product.controller');

// a simple test url to check that all of our files are communicating correctly.
router.get('/test', product_controller.test);
router.get('/:id', product_controller.product_login);
router.post('/register', product_controller.product_register);

module.exports = router;
