const env = process.env.NODE_ENV || "development";

const config = require(`./env/${env.toLowerCase()}`);
const SECRET_KEY =  'SuperSecretKeyVerySecretVerySuper'

module.exports = { config, SECRET_KEY }