#!/usr/bin/env node

/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

const exec = require("child_process").exec;

if (process.env.MARS_SERVER_TYPE == "SOCKET") {
    exec("cd ../backend/socket && npm start");
} else if (process.env.MARS_SERVER_TYPE == "LANDING") {
    exec("cd ../frontend/landing && npm start");
} else {
    exec("cd backend/server && npm start", (data) => {
        console.log(data);
    });
}