/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Mars configuration main.
 */

const register = require('module-alias/register');
const axios = require("axios");
const express = require("express");
const fs = require("fs-extra");
const path = require("path");
const klawSync = require("klaw-sync");
const titlecase = require("titlecase");
const staticZip = require("express-static-gzip");
const colors = require("colors");
const applicationDir = path.join(__dirname, "public");
const log = require("../.bin/utils/logger").log;

const MarsServer = module.exports = {
    init: function (app) { log(`♂ Mars Server: Starting PWAs...`.yellow.bold); },
    assets: async function (app) {
        app.use(express.static(applicationDir));
        app.use(staticZip(path.join(applicationDir, "build"), { customCompressions: [{ encodingName: "gzip", fileExtension: "gz" }] }));
    }
}