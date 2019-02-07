#!/usr/bin/env node

/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

const colors = require("colors");
const fs = require("fs-extra");
const path = require("path");
const params = require("yargs").argv;

const app = (process.env.npm_config_app || params.app || "app");
const envType = (process.env.npm_config_env || params.env || "dev");

const rootPath = path.resolve(__dirname, "../../../../");
const appRoot = path.join(rootPath, app);

const environmentRootPath = path.join(rootPath, ".env", `env.${envType}.js`);
const environmentCopyPath = path.join(appRoot, ".env", "index.js");

const masterKeyRootPath = path.join(rootPath, ".env", "master_key.js");
const masterKeyCopyPath = path.join(appRoot, ".env", "master_key.js");

const marsRootPath = path.join(rootPath, ".mars");
const marsCopyPath = path.join(appRoot, ".mars");

module.exports = {
    init: async () => {
        console.log((`kombi: Starting ${app} app for ${envType} environment...`.yellow));
        await fs.copy(environmentRootPath, environmentCopyPath);
        await fs.copy(masterKeyRootPath, masterKeyCopyPath);
        await fs.copy(marsRootPath, marsCopyPath);
    }
};