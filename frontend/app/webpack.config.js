#!/usr/bin/env node
// --------------------- Node modules
const webpack = require("webpack");
const params = require("yargs").argv;
const colors = require("colors");
const request = require("request");
const fs = require("fs");
const path = require("path");
const shell = require("shelljs");

// --------------------- Ionic default configuration
let ionicConfig = require("./node_modules/@ionic/app-scripts/config/webpack.config.js");

// Mars configs
const log = require("../../.bin/utils/logger").log;
const plugins = require("./config/webpack/plugins.config");
const marsEnvironment = require("./config/webpack/env.config");
require("./config/webpack/locales.config").init();
require("./config/webpack/manifest.config").init();
require("./config/webpack/index.config").init();

// --------------------- Command line parameters
params.env_type = process.env.mars_env || params.mars_env || "DEV";
log(`initializing ${params.env_type.toLowerCase()} client environment...`.yellow);


const srcPath = (subdir) => { // Resolves
    return path.join(__dirname, "src", subdir);
};

let settings = {}
ionicConfig.local = Object.assign(ionicConfig.dev);

for (let environment in ionicConfig) {
    settings = ionicConfig[environment];

    marsEnvironment.init(settings.plugins, params);
    plugins.default(settings.plugins, params);

    // Configures path resolution for the application
    settings.resolve = settings.resolve || {};
    settings.resolve.alias = settings.resolve.alias || {};
    settings.resolve.alias = Object.assign(settings.resolve.alias, {
        "@app": srcPath("app"),
        "@services": srcPath("services"),
        "@backend": srcPath("backend"),
        "@pipes": srcPath("pipes"),
        "@pages": srcPath("pages"),
        "@directives": srcPath("directives"),
        "@components": srcPath("components"),
        "@assets": srcPath("assets")
    });

    let isProd = process.env.IONIC_ENV == "prod" || params.turbo;
    if (isProd) plugins.prod(settings.plugins, params);
};

log("♂ Client environment configured successfully!".green);
log((`♂ Rock on, you coders!`).green);