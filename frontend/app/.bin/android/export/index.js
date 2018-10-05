#!/usr/bin/env node

/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

const shell = require("shelljs");
const exec = shell.exec;
const colors = require("colors");
const fs = require("fs-extra");
const path = require("path");
const args = require("yargs").argv;
const project = require("../../../.mars/project");
const buildPath = path.resolve(__dirname, "../../../www");
const androidPath = path.resolve(__dirname, "../../../pwa/public");

const build = async () => {
    let isPWABuildFinished = false;
    console.log((`♂ Mars Universal App: Building app...`.yellow));
    const child = exec("npm run build:prod", { async: true });
    child.stdout.on('data', async (data) => {
        isPWABuildFinished = (data.indexOf("lint finished") > -1);
        // Use this for commit based deploys
        if (isPWABuildFinished) {
            await fs.copy(buildPath, androidPath);
            console.log((`♂ Mars Universal App: Generating cordova build...`.yellow));
            await exec("npx cordova platform rm android");
            await exec("npx cordova platform add android");
            await exec("npx ionic cordova build android");
            process.exit();
        }
    });
};

build();