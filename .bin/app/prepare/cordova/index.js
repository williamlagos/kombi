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
const params = require("yargs").argv;
const colors = require("colors");
const log = require("../../utils/logger").log;
const rootPath = path.resolve(__dirname, "../../../");
const subpackage = params.package || process.env.npm_config_package || process.env.mars_package || "customer";
const marsPath = path.join(rootPath, ".mars");
const project = require(path.join(marsPath, "project"));
const rootPackage = project.app_package;
const applicationBundle = rootPackage + "." + subpackage;
const applicationName = project.display_name;
const cordovaConfigPath = path.join(rootPath, "config.xml");

let generateNextVersion = (currentVersion) => {
    var major, minor, patch;
    var versionArray = currentVersion.split('.');
    major = parseInt(versionArray[0]);
    minor = parseInt(versionArray[1]);
    patch = parseInt(versionArray[2]) + 1;
    version = major + '.' + minor + '.' + patch;
    return version;
};

const versionAttribute = 'version=';
const bundleAttribute = 'id=';

let generateResources = async () => {
    const subpackageIconPath = path.join(marsPath, "assets", subpackage, "icon.png");
    const cordovaIconCopyPath = path.join(rootPath, "resources", "icon.png");
    await fs.copy(subpackageIconPath, cordovaIconCopyPath);

    const subpackageSplashscreenPath = path.join(marsPath, "assets", "splash.png");
    const cordovaSplashscreenCopyPath = path.join(rootPath, "resources", "splash.png");
    await fs.copy(subpackageSplashscreenPath, cordovaSplashscreenCopyPath);

    await exec("npx ionic resources");
};


let config = async () => {
    let cordovaConfig = await fs.readFileSync(cordovaConfigPath, { encoding: "UTF-8" });
    let versionRegex = /version=\"(.*?)\"/gi;
    let bundleRegex = /id=\"(.*?)\"/gi;
    let currentBundle = cordovaConfig.match(bundleRegex)[0].replace(bundleAttribute, "");
    cordovaConfig = cordovaConfig.replace(currentBundle, `"${applicationBundle}"`);
    await fs.writeFileSync(cordovaConfigPath, cordovaConfig, { encoding: "UTF-8" });
    let currentVersion = cordovaConfig.match(versionRegex)[0].replace(versionAttribute, "").replace(/"/g, "");
    let nextVersion = generateNextVersion(currentVersion);
    await exec(`npx cordova-update-config --appname ${applicationName} --appversion ${nextVersion}`);
    await generateResources();
};

config();

module.exports = {};