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
const env = require("../../.env/index");
const project = require("../../.mars/project");
const remote = `https://git.heroku.com/${project.codename + "-" + (args.prod ? "prod-app" : "dev-app")}.git`;
const gitPath = path.resolve(__dirname, "../../.git");
const buildPath = path.resolve(__dirname, "../../www");
const pwaPath = path.resolve(__dirname, "../../pwa/public");

const build = async () => {
    let isPWABuildFinished = false;
    console.log((`♂ Mars Universal App: Building app...`.yellow));
    const child = exec("npm run build:prod", { async: true });
    child.stdout.on('data', async (data) => {
        isPWABuildFinished = (data.indexOf("lint finished") > -1);
        // Use this for commit based deploys
        if (isPWABuildFinished) {
            await fs.copy(buildPath, pwaPath);
            console.log((`♂ Mars Universal App: Generating commit...`.yellow));
            const commitMsg = "update(universal-app): Updates universal app.";
            await exec("git init");
            await exec("git add .");
            await exec(`git commit -m "${commitMsg}"`);
            await exec(`git push ${remote} master -f`);
            await fs.remove(gitPath);
            process.exit();
        }
    });
};

build();

