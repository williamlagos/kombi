#!/usr/bin/env node

/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

const shell = require("shelljs");
const colors = require("colors");
const fs = require("fs-extra");
const path = require("path");
const params = require("yargs").argv;
const exec = shell.exec;
const app = (process.env.npm_config_app || params.app || "app");
const rootPath = path.resolve(__dirname, "../../../../");
const appRoot = path.join(rootPath, app);
const isProd = (process.env.npm_config_prod || params.prod);
const cordovaParams = isProd ? "--release" : "";

console.log((`kombi: Generating static files for ${app} application...`.yellow));
const build = async () => {
    let isPWABuildFinished = false;
    const child = exec(`node .bin/app/build/prod --app=${app}  --target=cordova`, { async: true });
    child.stdout.on('data', async (data) => {
        isPWABuildFinished = (data.indexOf("finished successfully") > -1);
        if (isPWABuildFinished) {
            child.kill();
            console.log((`kombi: Generating installers...`.yellow));
            await exec(`ionic cordova build ${cordovaParams}`, { cwd: appRoot });
            console.log((`kombi: Installers generated successfully!`.yellow));
            process.exit();
        }
    });
};

build();
