/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Mars configuration main.
 */

const axios = require("axios");
const ip = require("ip");
const express = require("express");
const packageInfo = require("./package.json");

const wildcard = require('socketio-wildcard');

const path = require("path");
const fs = require("fs-extra");

const mongoose = require("mongoose");
const jsonSchema = require("mongoose-schema-jsonschema")(mongoose);

const swaggerSpecs = require("swagger-spec-express");
const swaggerUi = require("swagger-ui-express");
const faviconPath = path.join(__dirname, "public", "app", "assets", "icon", "favicon.ico");

const colors = require("colors");
const klawSync = require("klaw-sync");
const titlecase = require("titlecase");
const staticZip = require("express-static-gzip");

const env = require("./.env");
const utils = require("./api/utils/utils");
const log = require("./.bin/utils/logger").log;
const apiDir = path.join(__dirname, "api");

const Mars = module.exports = {
    init: function (app) {
        log(`♂ Mars Server: starting...`.yellow.bold);
        app.use(function (err, req, res, next) {
            res.status(500).send("This is Mars to Major Tom: Something's wrong!");
        });
    },

    database: async ()=> {
        try {
            log(`♂ Connecting to MongoDB: ${env.server.MONGODB}...`.yellow);
            mongoose.Promise = global.Promise;
            mongoose.set('useCreateIndex', true);
            await mongoose.connect(env.server.MONGODB, { useMongoClient: true });
            let db = mongoose.connection.db;
        } catch (error) {
            console.log(error);
            log(`♂ MongoDB connection failure: ${error}!`.red);
        }
    },
    
    socket: function (app, server) {
        app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            res.header("Access-Control-Allow-Headers", "Content-Type");
            res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
            next();
        });
        const io = require('socket.io').listen(server);
        io.use(wildcard());
        io.on('connection', function (socket) {
            console.log((`♂ Mars Server: An user connected.`).green);
            socket.on('*', (event) => {
                let name = event.data ? event.data[0] : "";
                let data = event.data ? (event.data[1] || {}) : {};
                let room = data.room;
                delete data.room;
                return room ? socket.to(room).emit(name, data) : socket.broadcast.emit(name, data);
            });
            socket.on('join', function (room) {
                socket.join(room);
            });
            socket.on('leave', function (room) {
                socket.leave(room);
            });
        });
    },

    routes: function (app) {
        let isWin = process.platform === "win32";
        let apis = klawSync(apiDir);
        let apiPath = "";
        let displayName = "";
        apis = apis.map((api) => { if (api) return api.path; });
        apis = apis.filter((api) => { return api && (api.indexOf("index.js") > -1) });
        apis.forEach((api) => {
            apiPath = isWin ? api.split("\\") : api.split("/");
            apiPath = apiPath[apiPath.length - 2];

            displayName = titlecase(apiPath.replace("-", " "));
            log(`♂ Initializing ${displayName} routes...`.yellow);

            app.use(`/api/${apiPath}`, require(`${api}`)); // Add to app routes
        });
    },

    static: async function (app) {
        app.use(express.static(path.join(__dirname, "public")));
        app.use(staticZip(path.join(__dirname, "public", "build"), { customCompressions: [{ encodingName: "gzip", fileExtension: "gz" }] }));

        try {
            let icon = fs.readFileSync(path.join(__dirname, "public", "assets", "images", "logo.png"));
            app.get("/icon.png", (req, res) => {
                res.header("Content-Type", "image/png");
                res.status(200).send(icon);
            });
        } catch (e) {
            /* console.log("Whoops! We were unable to locate the file : " + e); */
        }
    },

    swagger: async function swagger(app) {
        swaggerSpecs.initialise(app, { title: packageInfo.title, version: packageInfo.version });
        swaggerSpecs.compile();
        fs.writeFileSync(path.join(__dirname, "swagger.json"), JSON.stringify(swaggerSpecs.json()));
        app.use("/swagger.io", (req, res) => { return res.status(200).send(swaggerSpecs.json()) });
        app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(null, null, null, `.swagger-ui .topbar { background-color: ${env.primary_color} } .swagger-ui .wrapper { max-width: 800px; margin: auto; } `, faviconPath, `/swagger.io`, "API Docs"));
    },

    seeds: async function (app) {
        app.use("/plant", (req, res) => { // import data for test
            const seedsDir = path.join(__dirname, "seeds");
            let isFile;
            fs.readdirSync(seedsDir).forEach(function (seed) {
                isFile = seed && (seed.indexOf(".") > -1);
                if (isFile) require(path.join(seedsDir, seed))
            });
            return res.status(200).json("The seeds have been planted.");
        });
    },

    firebasePolyfill: async function (app) {
        app.locals.hasOwnProperty = function () { return false; };
        app._events.hasOwnProperty = function () { return false; };
    }
}