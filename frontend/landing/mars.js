/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Mars configuration main.
 */

const axios = require("axios");
const express = require("express");
const path = require("path");
const faviconPath = path.join(__dirname, "public", "app", "assets", "icon", "favicon.ico");
const colors = require("colors");
const env = require("./.env");
const log = require("./.bin/utils/logger").log;

const MarsLandingPage = module.exports = {
    init: function (app) {
        log(`♂ Mars Server: starting...`.yellow.bold);
    },

    assets: async function (app) {
        let landing = path.join(__dirname, "dist", "index.html");
        app.get("/", (req, res) => {
            res.sendFile(landing);
        });
        app.use(express.static(path.join(__dirname, "dist")));
    }
}