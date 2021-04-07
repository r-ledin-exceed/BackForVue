const User = require('../models/model');

exports.test = (req, res) => {
  res.send('Greetings from the Test controller!');
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!(email) || !(password)) {
    return res.status(400).send({
      response: 'error',
      message: 'fill all inputs',
    });
  }

  const currentUser = await User.findOne({ email });

  if (!currentUser) {
    return res.status(400).send({
      response: 'error',
      message: 'user does not exist',
    });
  }

  return res.status(200).send({
    response: 'ok',
    data: currentUser,
  });
};

exports.registration = async (req, res) => {
  const { email, password } = req.body;

  if (!(email) || !(password)) {
    return res.status(400).send({
      response: 'error',
      message: 'fill all inputs',
    });
  }

  const checkEmail = await User.findOne({ email });

  if (checkEmail) {
    return res.status(400).send({
      response: 'error',
      message: 'user already exist',
    });
  }

  const user = new User({
    email,
    password,
  });

  await user.save((err) => {
    if (err) {
      throw new Error('Unknown problem');
    }
  });
  return res.status(200).send('user saved');
};
