const express = require("express");
const http = require("http");
const path = require("path");
const colors = require("colors");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const passport = require("passport");
const ip = require("ip");
const socket = require("./api/utils/socket.utils")();
const errorhandler = require("errorhandler");
const mongoose = require("mongoose");
const compression = require("compression");
const mars = require("./mars");
const utils = require("./utils");
const log = require("./.bin/utils/logger").log;
const greenlock = require("greenlock-express");
const project = require("./.mars/project");

const app = express();
const env = require("./.env");
let host = ip.address();
let port = process.env.PORT || "3000";
mongoose.Promise = require("bluebird");
app.use(compression());
app.use(cors());
app.use(errorhandler());
app.use(multer({ dest: ".tmp" }).any());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(logger("dev"));
app.set("port", port);

mars.init(app);
mars.assets(app);
mars.routes(app);

const onListening = () => {
    mars.database();
    log((`♂ Mars Server: API listening on http://${host}:${port}`).green.bold);
};

const dev_mode_on = !(env.ENV_TYPE == "prod");
if (dev_mode_on) {
    mars.seeds(app);
    mars.swagger(app);
    try {
        app.listen(port, onListening);
    } catch (e) {
        console.log();
    }
} else {
    // HTTPS Free Certificate
    const email = project.accounts_email;
    const domain = "www." + (project.website.replace("www.", ""));
    const greenlockConfig = {
        version: "draft-11", // Let"s Encrypt v2 is ACME draft 11
        server: "https://acme-v02.api.letsencrypt.org/directory",  // Note: If at first you don"t succeed, switch to staging to debug: https://acme-staging-v02.api.letsencrypt.org/directory
        configDir: "./public/acme",  // Where the certs will be saved, MUST have write access
        email: email,  // You MUST use a valid email address
        approveDomains: [domain, domain.replace("www.", "")], // You MUST use valid domains
        agreeTos: true, // Agree to Let"s Encrypt terms
        app: app, // Express app
        telemetry: true // Contribute telemetry data to the project
    };
    greenlock.create(greenlockConfig).listen(host, port, onListening);
}

module.exports = app;