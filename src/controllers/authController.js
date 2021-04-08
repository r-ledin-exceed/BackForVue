const mongoose = require('mongoose');
const uuid = require('uuid');

const User = mongoose.model('users');

// test
exports.test = (req, res) => {
  res.send('Greetings from the Test controller!');
};

// Log in through e-mail
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const currentUser = await User.findOne({ email });

    // Checking existing
    if (!currentUser) {
      return res.status(400).send({
        response: 'error',
        message: 'user does not exist',
      });
    }

    // Checking pass?? hashed
    const checkingPassword = currentUser.checkPassword(password);
    if (!checkingPassword) {
      return res.status(400).send({ response: 'error', message: 'incorrect password' });
    }

    // Token + save
    const userToken = uuid.v4();
    currentUser.userToken = userToken;
    await currentUser.save();

    return res.status(200).send({ data: { currentUser } });
  } catch (err) {
    return res.status(500).send({ response: 'error', message: 'unknown error' });
  }
};

// Sign up
exports.registration = async (req, res) => {
  const { email, password } = req.body;
  const userToken = uuid.v4();

  // Checking is already exist?
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
