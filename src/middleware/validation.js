const Validator = require('../helpers/validator');

const test = async (body, res, next, rule) => {
  await Validator(body, rule, {}, (err, status) => {
    if (!status) {
      res.status(400)
        .send({
          response: 'some kind of error',
          data: err.errors,
        });
    } else {
      next();
    }
  });
};

const addNewUser = async (req, res, next) => {
  const validationRule = {
    deviceId: 'required',
    // gameId: 'required',
  };
  test(req.body, res, next, validationRule);
};

module.exports = {
  addNewUser,
};
