// require('../models/index');
const express = require('express');

const userRouter = require('./userRouter');

const router = express.Router();

router.use('/', userRouter);

router.get('/', ({ res }) => res.send('API is OK!'));

module.exports = router;
