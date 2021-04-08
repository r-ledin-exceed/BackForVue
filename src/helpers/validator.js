const Validator = require('validatorjs');
const Models = require('../models');

const emailRegex = /^([A-Za-z0-9_\-.])+\\@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;

Validator.register('email', (value) => emailRegex.test(value),
  'Email must be valid');

/**
 * Checks if incoming value already exist for unique and non-unique fields in the database
 * e.g email: required|email|exists:User,email
 */
Validator.registerAsync('exist', (value, attribute, req, passes) => {
  if (!attribute) throw new Error('Specify Requirements i.e fieldName: exist:table,column');
  // split table and column
  const attArr = attribute.split(',');
  if (attArr.length !== 2) throw new Error(`Invalid format for validation rule on ${attribute}`);
  // assign array index 0 and 1 to table and column respectively
  const { 0: table, 1: column } = attArr;
  // define custom error message
  const msg = `${column} exists`;
  // check if incoming value already exists in the database
  Models[table].valueExists({ [column]: value })
    .then((result) => {
      if (result) {
        passes(false, msg); // return false if value exists
        return;
      }
      passes();
    });
});

const validator = (body, rules, customMessages, callback) => {
  const validation = new Validator(body, rules, customMessages);
  validation.passes(() => callback(null, true));
  validation.fails(() => callback(validation.errors, false));
};

module.exports = validator;
