const path = require("path");
const ENV = process.env.NODE_ENV;

try {
  var env_config = require(path.join(__dirname, `${ENV}.js`));
} catch (e) {
  console.error(`Invalid environment: "${ENV}"!`);
  console.error(`Usage: NODE_ENV=<ENV> node app.js`);
  process.exit(1);
}

const def_config = require(path.join(__dirname, "default.js"));
module.exports = { ...def_config, ...env_config };
