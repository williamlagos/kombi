#!/usr/bin/env node

/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

const path = require("path");
const environment = require("./env");
const locales = require("./locales");
const theme = require("./theme");
const localesWatch = require("./locales/watch");

let init = async () => {
    await environment.init();
    await locales.init();
    theme.init();
    localesWatch.init();
};

init();