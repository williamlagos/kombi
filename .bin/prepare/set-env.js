#!/usr/bin/env node

/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

const path = require("path");
const fs = require("fs-extra");
const params = require("yargs").argv;
const colors = require("colors");
const log = require("../utils/logger").log;

const application = params.app || process.env.npm_config_app || process.env.mars_app ||"backend/server";
const environment = (params.env || process.env.npm_config_env || process.env.mars_env ||"dev").toLowerCase();

const applicationPath = path.resolve(__dirname, `../../${application}`); // Application Server path
const environmentPath = path.resolve(__dirname, `../../.env/env.${environment}.js`);
const environmentCopyPath = path.join(applicationPath, ".env", "index.js");

const masterKeyPath = path.resolve(__dirname, `../../.env/master_key.js`);
const masterKeyCopyPath = path.join(applicationPath, ".env", "master_key.js");

const keysPath = path.resolve(__dirname, `../../.env/keys`);
const keysCopyPath = path.join(applicationPath, ".env", "keys");

module.exports = () => {
    try {
        fs.copySync(environmentPath, environmentCopyPath);
        fs.copySync(masterKeyPath, masterKeyCopyPath);
        fs.copySync(keysPath, keysCopyPath);
        log(`Environment configured successfully!`.green.bold);
    } catch (e) {
        log(`There was an error configuring the environment variables for the application: `.red);
        log(e);
    }
};