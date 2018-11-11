#!/usr/bin/env node

/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

const fs = require("fs-extra");
const path = require("path");
const app = (process.env.npm_config_app || params.app || "customer");
const rootPath = path.resolve(__dirname, "../../../../../");
const appRoot = path.join(rootPath, "frontend", app);

const appColorsPath = path.join(rootPath, ".mars", "colors.js");
const appColors = require(appColorsPath);
const scssVarsFile = path.join(appRoot, "src", "theme", "variables.scss");

const update = async () => {
    console.log((`♂ Mars Universal App: Updating colors...`.yellow));
    let variablesContent = await fs.readFileSync(scssVarsFile, { encoding: "UTF-8" });
    let colorVars = variablesContent.split("$")
        .map(line => line.split(";")[0])
        .map((line) => { return { label: (line.split(":")[0]), value: (line.split(":")[1]) } })
        .filter((property) => property && property.label && property.value && (property.value.indexOf("#") > -1));
    colorVars.forEach((color) => {
        let updatedValue = appColors[color.label + "_color"];
        if (updatedValue) variablesContent = variablesContent.replace(color.value, updatedValue);
    });
    await fs.writeFileSync(scssVarsFile, variablesContent);
    console.log((`♂ Mars Universal App: Colors updated successfully!`.yellow));
};

const init = () => {
    let isBuilding;
    fs.watch(appColorsPath, {}, async (eventType, filename) => {
        if (!isBuilding) {
            isBuilding = true;
            update();
            isBuilding = false;
        }
    });
};

update();

module.exports = {
    init: init
};