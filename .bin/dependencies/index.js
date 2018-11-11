#!/usr/bin/env node

/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

const path = require("path");
const fs = require("fs-extra");
const shell = require("shelljs");
const exec = shell.exec;
const rootPath = path.resolve(__dirname, "../../");
const frontendDir = path.join(rootPath, "frontend");

let install = () => {
    shell.ls(frontendDir).map((application) => {
        console.log(`Installing ${application} dependencies...`);
        exec(`cd frontend/${application} && npm install --color always`);
    });
    exec("cd backend && npm install --color always");
    console.log((`♂ Mars Dependecies Manager: Project dependencies installed successfully!`.green));
};

install();