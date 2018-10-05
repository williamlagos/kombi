#!/usr/bin/env node

/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

const path = require("path");
const fs = require("fs-extra");
const params = require("yargs").argv;
const watch = require("watch");
const colors = require("colors");
const log = require("../utils/logger").log;

const application = params.app || process.env.npm_config_app || "backend/server";
const applicationPath = path.resolve(__dirname, `../../${application}`); // Application Server path
const marsPath = path.resolve(__dirname, `../../.mars`);
const marsCopyPath = path.join(applicationPath, ".mars");

let isWatching = false;
const copy = () => {
    fs.copy(marsPath, marsCopyPath).then(() => {
        log(`Resources copied successfully!`.green.bold);
    }).catch((e) => {
        log(`There was an error copying the resources: `.red);
        console.log(e);
    });
};

const livereload = () => {
    if (!isWatching) {
        watch.createMonitor(marsPath, (monitor) => {
            copy();
            monitor.on("created", (f, stat) => { });
            monitor.on("changed", (f, curr, prev) => {
                log("updating mars files...".yellow);
                log("mars files updated successfully!".green);
                copy();
            });
            monitor.on("removed", (f, stat) => { monitor.stop(); });
            process.on("exit", () => { monitor.stop(); });
        });
        isWatching = true;
    };
};
livereload();