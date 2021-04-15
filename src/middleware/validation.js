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
    // nickname: 'required|min:3|max:12',
  };
  test(req.body, res, next, validationRule);
};

const changeNickname = async (req, res, next) => {
  const validationRule = {
    userId: 'required',
    nickname: 'required|min:3|max:12',
  };
  test(req.body.data, res, next, validationRule);
};

module.exports = {
  addNewUser,
  changeNickname,
};
