/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Locales generator for client side.
 */

const fs = require("fs");
const path = require("path");
const watch = require("watch");
const handlebars = require("handlebars");

// --------------------- Mars environment variables
const constants = require("../../.mars/constants");
const colors = require("../../.mars/colors");
const project = require("../../.mars/project");

const interfacePath = path.resolve(__dirname, "../../src/typings/global/translations/index.d.ts");
const interfaceTemplatePath = path.resolve(__dirname + "/templates/locales/locales.interface.hbs");
const interfaceMarkup = fs.readFileSync(interfaceTemplatePath, { encoding: 'UTF-8' });
const localesInterface = handlebars.compile(interfaceMarkup);

const classPath = path.resolve(__dirname, "../../src/app/app.locales.ts");
const classTemplatePath = path.resolve(__dirname + "/templates/locales/locales.class.hbs");
const classMarkup = fs.readFileSync(classTemplatePath, { encoding: 'UTF-8' });
const localesClass = handlebars.compile(classMarkup);
const localesDir = path.join(__dirname, "../../.mars/locales");

function getPackage() {
    return package;
};

function getDefaultLanguage() {
    return project.default_language || default_language;
};

function getLocales(language) {
    let localesPath = path.join(localesDir, `${language}.js`);
    let locales = require(localesPath);
    delete require.cache[require.resolve(localesPath)];
    return locales;
}

function writeLocales() {
    let languages = [];
    let languageModule, language, locales;
    let localesList = fs.readdirSync(localesDir);
    localesList.forEach((localesFile) => {
        languageCode = localesFile.replace(".js", "");
        locales = getLocales(languageCode);
        language = { code: languageCode, locales: [] };
        for (var key in locales) { language.locales.push({ key: key, value: locales[key] }) };
        languages.push(language);
    });
    let result = localesClass({ languages: languages, defaultLanguage: getDefaultLanguage() });
    fs.writeFileSync(classPath, result);
};

function writeLocalesInterface() {
    let locales = getLocales(getDefaultLanguage());
    let localesArray = [];
    for (var key in locales) { localesArray.push({ key: key, type: "string" }) };
    let result = localesInterface({ locales: localesArray });
    fs.writeFileSync(interfacePath, result);
};

let isWatching = false;

module.exports = localesConfig = {
    init: async () => {
        localesConfig.exec();
        localesConfig.watch();
    },
    exec: async () => {
        await writeLocales();
        await writeLocalesInterface();
    },
    watch: async () => {
        if (!isWatching) {
            watch.createMonitor(localesDir, async (monitor) => {
                monitor.on("created", async (f, stat) => { });
                monitor.on("changed", async (f, curr, prev) => {
                    console.log("updating locale files...".yellow);
                    localesConfig.init();
                    console.log("locales updated successfully!".green);
                });
                monitor.on("removed", async (f, stat) => { monitor.stop(); });
                process.on("exit", () => { monitor.stop(); });
            });
            isWatching = true;
        }
    }
};

localesConfig.init();