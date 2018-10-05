const express = require('express');
const colors = require('colors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const ip = require('ip');
const errorhandler = require('errorhandler');
const compression = require('compression');
const mars = require('./mars');
const log = require('./.bin/utils/logger').log;
const greenlock = require("greenlock-express");
const package = require("./package.json");

const app = express();
const env = require('./.env'); // Environment variables
let host = ip.address();
let port = process.env.PORT || '8200';
app.use(compression());
app.use(cors());
app.use(errorhandler());
app.use(multer({ dest: '.tmp' }).any());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger('dev'));
app.set('port', port);

mars.init(app);
mars.assets(app);

const onListening = () => {
    log((`♂ Mars Server: PWAs listening on http://${host}:${port}`).green.bold);
};

const dev_mode_on = !(env.server.ENV_TYPE == "prod");
if (dev_mode_on) {
    app.listen(port, onListening);
} else {
    // HTTPS Free Certificate
    const email = package.config.mars.accounts_email;
    const domain = "www." + (package.config.mars.website.replace("www.", ""));
    const greenlockConfig = {
        version: 'draft-11', // Let's Encrypt v2 is ACME draft 11
        server: 'https://acme-v02.api.letsencrypt.org/directory',  // Note: If at first you don't succeed, switch to staging to debug: https://acme-staging-v02.api.letsencrypt.org/directory
        configDir: './public/acme',  // Where the certs will be saved, MUST have write access
        email: email,  // You MUST use a valid email address
        approveDomains: [domain, domain.replace("www.", "")], // You MUST use valid domains
        agreeTos: true, // Agree to Let's Encrypt terms
        app: app, // Express app
        telemetry: true // Contribute telemetry data to the project
    };
    greenlock.create(greenlockConfig).listen(host, port, onListening);
}


module.exports = app;