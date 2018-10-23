#!/usr/bin/env node

/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

const shell = require("shelljs");
const exec = shell.exec;
const path = require("path");
const fs = require("fs-extra");
const colors = require("colors");
const params = require("yargs").argv;
const rootPath = path.resolve(__dirname, "../../../");
const serverRoot = path.join(rootPath, "backend");
const marsRootPath = path.join(rootPath, ".mars");

const project = require(path.join(marsRootPath, "project.js"));
const deployEnvironment = params.env || process.env.npm_config_env || process.env.env || "dev";
const remote = `https://git.heroku.com/${project.codename}-${deployEnvironment}.git`;
const gitPath = path.join(serverRoot, ".git");

const build = async () => {
    console.log((`♂ Mars Server: Building server for ${deployEnvironment} environment...`.yellow));
    // Use this for commit based deploys
    console.log((`♂ Mars Socket: Generating commit...`.yellow));
    const commitMsg = "update(server): Atualização do servidor de aplicação.";
    await exec("git init", { cwd: serverRoot });
    await exec("git add .", { cwd: serverRoot });
    await exec(`git commit -m "${commitMsg}"`, { cwd: serverRoot });
    await exec(`git push ${remote} master -f`, { cwd: serverRoot });
    await fs.remove(gitPath);
    console.log((`♂ Mars Server: build deployed successfully!`.green));
    process.exit();
};

build();