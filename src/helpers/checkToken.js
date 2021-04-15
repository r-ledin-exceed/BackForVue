const jwt = require('jsonwebtoken');
const { SECRET } = require('../../config');

const checkToken = (res, userTokenJWT) => {
  try {
    return jwt.verify(userTokenJWT, SECRET);
  } catch (err) {
    return res.status(400).send({ response: 'error', message: 'Incorrect JWC-Token' });
  }
};

module.exports = {
  checkToken,
};
