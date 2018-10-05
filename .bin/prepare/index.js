const setEnvironment = require("./set-env");
const fork = require('child_process').fork;
const path = require("path");
const copyScript = path.resolve(__dirname, "./copy");

const exec = () => {
    setEnvironment(); // Sets proper environment for the selected application
    fork(copyScript);// Copies mars configuration files to the selected application
    process.exit();
};

exec();