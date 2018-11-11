#!/usr/bin/env node

/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

const fs = require("fs-extra");
const path = require("path");
const watch = require("watch");

const rootPath = path.resolve(__dirname, "../../../../");
const localesRoot = path.join(rootPath, ".mars", "locales");
const localesBuilder = require("./index");
let isBuilding = false;

const init = () => {
    fs.watch(localesRoot, {}, async (eventType, filename) => {
        if (!isBuilding) {
            isBuilding = true;
            await localesBuilder.init();
            isBuilding = false;
        }
    });
};

module.exports = {
    init: init
};
