/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Environment configuration.
 */
let params = require("yargs").argv;
let master_key = require("./master_key");
let env_type = process.env.mars_env || params.mars_env || "dev";
let env = require(`./env.${env_type.toLowerCase()}.js`);

module.exports = Object.assign(env.server, env.client, { master_key: master_key });