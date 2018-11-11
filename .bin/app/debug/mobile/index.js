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
const app = (process.env.npm_config_app || params.app || "customer");
const rootPath = path.resolve(__dirname, "../../../../");
const appRoot = path.join(rootPath, "frontend", app);
const isRelease = (process.env.npm_config_release || params.release);
const cordovaParams = isRelease ? "--release" : "";
const platform = params.ios? "ios" : "android";

console.log((`♂ Mars Universal App: Building ${app} application for ${platform} platform on ${isRelease ? "release" : "debug"} mode...`.yellow));
const build = async () => {
    let isPWABuildFinished = false;
    const child = exec(`node .bin/app/build/prod --app=${app} --target=cordova`, { async: true });
    child.stdout.on('data', async (data) => {
        isPWABuildFinished = (data.indexOf("finished successfully") > -1);
        if (isPWABuildFinished) {
            child.kill();
            console.log((`♂ Mars Universal App: Generating installers...`.yellow));
            await exec(`cordova platform add ${platform}`, { cwd: appRoot });
            await exec(`cordova run ${platform} ${cordovaParams}`, { cwd: appRoot });
            console.log((`♂ Mars Universal App: Installers generated successfully!`.yellow));
            process.exit();
        }
    });
};

build();