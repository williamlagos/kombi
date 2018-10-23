#!/usr/bin/env node

/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

const shell = require("shelljs");
const exec = shell.exec;
const colors = require("colors");
const fs = require("fs-extra");
const path = require("path");
const params = require("yargs").argv;
const spawn = require("child_process").spawn;

const isCordova = (process.env.npm_config_target == "cordova") || (process.env.target == "cordova");
const app = (process.env.npm_config_app || params.app || "customer");
const envType = (process.env.npm_config_env || params.env || "dev");

const rootPath = path.resolve(__dirname, "../../../../");
const appRoot = path.join(rootPath, "frontend", app);

const environmentRootPath = path.join(rootPath, ".env", `env.${envType}.js`);
const environmentCopyPath = path.join(appRoot, ".env", "index.js");

const masterKeyRootPath = path.join(rootPath, ".env", "master_key.js");
const masterKeyCopyPath = path.join(appRoot, ".env", "master_key.js");

const marsRootPath = path.join(rootPath, ".mars");
const marsCopyPath = path.join(appRoot, ".mars");

const mainBundlePath = path.join(appRoot, "www", "build", "main.js");
const vendorBundlePath = path.join(appRoot, "www", "build", "vendor.js");
const mainCssPath = path.join(appRoot, "www", "build", "main.css");

const build = async () => {
    let isPWABuildFinished = false;
    console.log((`♂ Mars Universal App: Building ${app} app for ${envType} environment...`.yellow));
    const start = new Date();

    await fs.copy(environmentRootPath, environmentCopyPath);
    await fs.copy(masterKeyRootPath, masterKeyCopyPath);
    await fs.copy(marsRootPath, marsCopyPath);

    const buildExec = exec(`node ./node_modules/@ionic/app-scripts/bin/ionic-app-scripts.js build --ngo --optimizejs --turbo --aot --release --env=${envType} --generateSourceMap false`, { async: true, cwd: appRoot });
    buildExec.stdout.on('data', async (data) => {
        isPWABuildFinished = (data.indexOf("lint finished") > -1);
        if (isPWABuildFinished) {
            buildExec.kill();
            await exec(`npx --quiet babel ${mainBundlePath} --out-file ${mainBundlePath} --presets=@babel/env --quiet`);
            await exec(`npx --quiet uglify-js ${mainBundlePath} -o ${mainBundlePath} --compress --mangle`);
            if (!isCordova) await exec(`npx --quiet gzip-cli ${mainBundlePath}`);

            await exec(`npx --quiet babel ${vendorBundlePath} --out-file ${vendorBundlePath} --presets=@babel/env --quiet`);
            await exec(`npx --quiet uglify-js ${vendorBundlePath} -o ${vendorBundlePath} --compress --mangle`);
            if (!isCordova) await exec(`npx --quiet gzip-cli ${vendorBundlePath}`);

            await exec(`npx --quiet cleancss ${mainCssPath} -o ${mainCssPath}`);

            const end = new Date();
            const seconds = Math.abs((end.getTime() - start.getTime()) / 1000);
            console.log((`♂ Mars Universal App: build finished successfully in ${seconds}s!`.green));
            process.exit();
        }
    });
};

build();