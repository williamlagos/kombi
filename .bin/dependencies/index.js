#!/usr/bin/env node

/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

const shell = require("shelljs");
const exec = shell.exec;

let install = () => {
    exec("cd backend/server && yarn install --color always");
    exec("cd backend/socket && yarn install --color always");
    exec("cd frontend/app && yarn install --color always");
    exec("cd frontend/landing && yarn install --color always");
    console.log((`♂ Mars Dependecies Manager: Project dependencies installed successfully!`.green));
};

install();