#!/usr/bin/env node

/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

process.env.PORT = "3400";

const swaggerGen = require("swagger-es6");
const fs = require("fs-extra");
const path = require("path");
const colors = require("colors");
console.log((`♂ Mars API generator: Running server in order to update swagger.json...`.yellow.bold)); // Finishes the build

const app = (process.env.npm_config_app || params.app || "app");

const rootPath = path.resolve(__dirname, "../../../../");
const appRoot = path.join(rootPath, app);
const serverRoot = path.join(rootPath, "backend");

const server = require(path.join(serverRoot, "app.js"));
const swagger = require(path.join(serverRoot, "swagger.json"));
const babel = require("@babel/core");

let opt = {
    swagger: swagger, // Swagger.json file
    moduleName: "api", // Exported module name
    className: "api" // Exported class name
};

const codeResult = swaggerGen(opt); // Generates the code
const moduleDir = path.join(appRoot, "src", "backend"); // Sets the output filename

async function generate() {
    let indexPath = path.join(moduleDir, "/index.js"); // Sets the module output where the exports will live
    let routesPath = path.join(moduleDir, "/routes.js"); // Sets the routes output where the actual logics will be stored
    let commonjs = await babel.transform(codeResult, { plugins: ["@babel/plugin-transform-modules-commonjs"] }).code; // Adapts the code with babel for compatibilty
    fs.ensureDirSync(moduleDir); // Creates the output dir
    fs.writeFileSync(routesPath, commonjs); // Writes the routes logics file
    fs.writeFileSync(indexPath, getIndexFile(routesPath)); // Writes the exports file
    fs.writeFileSync(indexPath.replace(".js", ".d.ts"), getDefinitionFile(routesPath)); // Writes the defition file for Typescript compatibility
    console.log((`♂ Mars API generator: API client generated successfully!`.green.bold)); // Finishes the build
    process.exit();
};

function getIndexFile(routesPath) {
    return `import * as Backend from "./routes";\n export { Backend };`; // Gets the index file content
};

function getDefinitionFile(routesPath) {
    let api = require(routesPath); // Gets the routes
    let dts = "export declare class Backend {"; // Declares the class
    for (var operation in api) { // For every route, declares a JS wrapper function
        if (operation && (operation.indexOf("URL") == -1) && (operation.indexOf("_") == -1)) dts += `  public static ${operation}(parameters?: any);\n`; // In case it is a valid route
    };
    dts += `}  `; // Closes class declaration
    return dts; // Returns definition file
};

generate();