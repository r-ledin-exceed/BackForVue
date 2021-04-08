const env = process.env.NODE_ENV || 'development';

const config = require(`./env/${env.toLowerCase()}`);

module.exports = config;
