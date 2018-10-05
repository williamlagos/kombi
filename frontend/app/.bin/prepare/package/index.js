#!/usr/bin/env node

/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

const path = require("path");
const fs = require("fs-extra");
const params = require("yargs").argv;
const colors = require("colors");
const log = require("../../utils/logger").log;

const applicationPackage = (params.package || process.env.npm_config_package || process.env.mars_package || "customer").toLowerCase();

const tsConfigPath = "../../../tsconfig.json";
const tsConfig = require(tsConfigPath);
const tsConfigCopyPath = path.resolve(__dirname, tsConfigPath);
const packagesPath = path.resolve(__dirname, "../../../src/packages");


const configure = async () => {
    fs.readdir(packagesPath, (err, packages) => { // Reads packages folder
        const updatedConfig = JSON.stringify(tsConfig, null, 4); // Formats the tsconfig.json data for readability
        fs.writeFile(tsConfigCopyPath, updatedConfig).then((foo) => { // Writes the updates tsconfig.json file
            log(`♂ Mars Universal App: Starting ${applicationPackage} application...`.green); // Continues the build process
        }).catch((err) => {
            console.log(err);
        });
    });
}

configure();