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
  let validationRule = {
    deviceToken: 'required',
    name: 'required',
    registeredFrom: 'required',
  };
  if (req.body.registeredFrom !== 'apple') {
    validationRule = {
      ...validationRule,
      email: 'required|email',
    };
  }
  test(req.body, res, next, null, validationRule);
};

const loginUser = async (req, res, next) => {
  const { registeredFrom } = req.body;
  let validationRule = {
    registeredFrom: 'required',
    timeZone: 'required',
  };
  if (registeredFrom === 'self') {
    validationRule = {
      ...validationRule,
      password: 'required',
    };
  }
  test(req.body, res, next, null, validationRule);
};

module.exports = {
  addNewUser,
  loginUser,
};
