#!/usr/bin/env node

/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

const fs = require("fs-extra");
const path = require("path");
const handlebars = require("handlebars");

// --------------------- Mars environment variables
const app = (process.env.npm_config_app || params.app || "customer");
const rootPath = path.resolve(__dirname, "../../../../");
const appRoot = path.join(rootPath, "frontend", app);
const projectPath = path.join(rootPath, ".mars", "project");
const localesRootPath = path.join(rootPath, ".mars", "locales");
const localesCopyPath = path.join(appRoot, ".mars", "locales");
const project = require(projectPath);

const interfaceTemplatePath = path.join(rootPath, ".bin", "app", "templates", "locales", "locales.interface.hbs");
const classTemplatePath = path.join(rootPath, ".bin", "app", "templates", "locales", "locales.class.hbs");

const interfacePath = path.join(appRoot, "src", "typings", "global", "translations", "index.d.ts");
const classPath = path.join(appRoot, "src", "app", "app.locales.ts");

const interfaceMarkup = fs.readFileSync(interfaceTemplatePath, { encoding: 'UTF-8' });
const localesInterface = handlebars.compile(interfaceMarkup);
const classMarkup = fs.readFileSync(classTemplatePath, { encoding: 'UTF-8' });
const localesClass = handlebars.compile(classMarkup);

function getDefaultLanguage() {
    return project.default_language || default_language;
};

function getLocales(language) {
    let localesPath = path.join(localesRootPath, `${language}.js`);
    let locales = require(localesPath);
    delete require.cache[require.resolve(localesPath)];
    return locales;
}

function writeLocales() {
    let languages = [];
    let languageModule, language, locales;
    let localesList = fs.readdirSync(localesRootPath);
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

let init = async () => {
    console.log((`♂ Mars Universal App: Generating locales...`.yellow));
    await fs.copy(localesRootPath, localesCopyPath);
    await writeLocales();
    await writeLocalesInterface();
    console.log((`♂ Mars Universal App: Locales generated successfully!`.yellow));
};

module.exports = { init: init };