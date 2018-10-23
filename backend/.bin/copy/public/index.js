const path = require("path");
const fs = require("fs-extra");
const log = require("../utils/logger").log;
const colors = require("colors");

let execute = () => {
    log("Mars Server Builder: copying public folder...".yellow);
    const srcPublic = path.resolve(__dirname, "../../src/public");
    const distPublic = path.resolve(__dirname, "../../dist/public");
    fs.emptyDir(distPublic).then(() => {
        fs.copy(srcPublic, distPublic).then(() => {
            log("Mars Server Builder: finished copying public folder.".yellow);
        });
    });
};

execute();