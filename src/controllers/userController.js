/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
// const uuid = require('uuid');

const User = mongoose.model('users');

exports.addMarker = async (req, res) => {
  const { coords, name } = req.body.items;
  const { id } = req.params;
  const currentUser = await User.findById(id);
  const check = Array.isArray(coords);

  if (!(coords) || !(name)) {
    return res.status(400).send({
      response: 'error',
      message: 'fill all inputs',
    });
  }

  if (!check || (coords.length !== 2)) {
    return res.status(400).send({
      response: 'error',
      message: 'enter correct coords',
    });
  }

  currentUser.items.push({ coords, name });
  await currentUser.save();

  return res.status(200).send({
    response: 'ok',
    items: { coords, name },
  });
};

exports.updMarker = async (req, res) => {
  const { coords, name } = req.body.items;
  const { marker, id } = req.params;
  const currentUser = await User.findById(id);
  const check = Array.isArray(coords);
  const indexMarker = currentUser.items
    .findIndex((item) => item._id.toString() === marker);

  if (!(coords) || !(name)) {
    return res.status(400).send({
      response: 'error',
      message: 'fill all inputs',
    });
  }

  if (!check && (coords.length !== 2)) {
    return res.status(400).send({
      response: 'error',
      message: 'enter correct coords',
    });
  }

  currentUser.items[indexMarker].coords = coords;
  currentUser.items[indexMarker].name = name;

  await currentUser.save();

  return res.status(200).send({
    response: 'ok',
    items: { coords, name },
  });
};

exports.removeMarker = async (req, res) => {
  const { marker, id } = req.params;
  const currentUser = await User.findById(id);
  const indexMarker = currentUser.items
    .findIndex((item) => item._id.toString() === marker);

  currentUser.items.splice(indexMarker, 1);

  await currentUser.save();

  return res.status(200).send({
    response: 'deleted succesfully',
  });
};

exports.allMarkers = async (req, res) => {
  const { id } = req.params;
  const currentUser = await User.findById(id);

  return res.status(200).send({
    response: 'list of markers',
    list: currentUser.items,
  });
};
