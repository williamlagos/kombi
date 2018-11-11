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
const brotli = require('brotli');
const klawSync = require("klaw-sync");

const isCordova = (params.target == "cordova" || process.env.npm_config_target == "cordova") || (process.env.target == "cordova");

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

const buildDir = path.join(appRoot, "www", "build");
const mainBundlePath = path.join(buildDir, "main.js");
const vendorBundlePath = path.join(buildDir, "vendor.js");
const mainCssPath = path.join(buildDir, "main.css");

const untouchedFiles = [
    path.join(buildDir, "polyfills.js"),
    path.join(buildDir, "sw-toolbox.js"),
];

const getFileName = (filePath) => {
    return path.basename(filePath);
};

const optimizeJS = async (filePath) => {
    console.log((`♂ Mars Universal App: Optimizing ${getFileName(filePath)} file...`.yellow));
    await exec(`npx babel ${filePath} --out-file ${filePath} --presets=@babel/env --compact=true --quiet`);
    console.log((`♂ Mars Universal App: Uglyfying ${getFileName(filePath)} file...`.yellow));
    await exec(`npx uglifyjs ${filePath} -o ${filePath} --compress --mangle`);
    if (!isCordova) {
        await gzip(filePath);
        await brotle(filePath);
    }
};

const minifyCSS = async (filePath) => {
    await exec(`npx cleancss ${filePath} -o ${filePath} -02`, { silent: true });
    if (!isCordova) {
        await gzip(filePath);
        await brotle(filePath);
    }
};

const gzip = async (filePath) => {
    console.log((`♂ Mars Universal App: Gzipping ${getFileName(filePath)} file...`.yellow));
    await exec(`npx gzip ${filePath}`);
};

const brotle = async (filePath) => {
    console.log((`♂ Mars Universal App: Brotling ${getFileName(filePath)} file...`.yellow));
    let brotled = brotli.compress(fs.readFileSync(filePath));
    await fs.writeFileSync(filePath + ".br", brotled, { encode: "UTF-8" });
};

const optimizeJSFiles = async () => {
    let files = klawSync(buildDir)
        .map((file) => { if (file && file.path) return file.path; })
        .filter((file) => file && (file.indexOf(".js") > -1) && (untouchedFiles.indexOf(file) == -1));
    return Promise.all(files.map((file) => optimizeJS(file)));
};

const build = async () => {
    let isPWABuildFinished = false;
    console.log((`♂ Mars Universal App: Building ${app} app for ${envType} environment...`.yellow));
    const start = new Date();

    await fs.copy(environmentRootPath, environmentCopyPath);
    await fs.copy(masterKeyRootPath, masterKeyCopyPath);
    await fs.copy(marsRootPath, marsCopyPath);

    const buildExec = exec(`npx ionic-app-scripts build --ngo --optimizejs --turbo --aot --release --env=${envType} --generateSourceMap false`, { cwd: appRoot, async: true });

    buildExec.stdout.on('data', async (data) => {
        isPWABuildFinished = (data.indexOf("lint finished") > -1);
        if (isPWABuildFinished) {
            process.kill(buildExec.pid + 1, 'SIGINT');
            await optimizeJSFiles();
            await minifyCSS(mainCssPath);
            const end = new Date();
            const seconds = Math.abs((end.getTime() - start.getTime()) / 1000);
            console.log((`♂ Mars Universal App: build finished successfully in ${seconds}s!`.green));
            process.exit();
        }
    });
};

build();