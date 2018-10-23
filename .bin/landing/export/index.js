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

const rootPath = path.resolve(__dirname, "../../../");
const landingRoot = path.join(rootPath, "frontend", "landing");

const buildPath = path.join(landingRoot, "dist");
const staticPath = path.join(rootPath, "backend", "server", "public", "landing");

const build = async () => {
    await exec(`npm run build:prod`, { cwd:  landingRoot});
    console.log((`♂ Mars Landing Page: Copying files to static folder...`.yellow));
    await fs.copy(buildPath, staticPath);
    console.log((`♂ Mars Landing Page: Files copied successfully!`.green.bold));
    process.exit();
};

build();

