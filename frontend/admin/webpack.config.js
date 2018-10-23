#!/usr/bin/env node

try {
    // --------------------- Node modules
    const params = require("yargs").argv;
    const colors = require("colors");
    const path = require("path");

    // --------------------- Ionic default configuration
    let ionicConfig = require("./node_modules/@ionic/app-scripts/config/webpack.config.js");

    // Mars configs
    const plugins = require("./config/webpack/plugins.config");
    const marsEnvironment = require("./config/webpack/env.config");
    require("./config/webpack/locales.config").init();
    require("./config/webpack/manifest.config").init();
    require("./config/webpack/index.config").init();

    // --------------------- Command line parameters
    params.env_type = (process.env.npm_config_env || "dev").toLowerCase();

    const applicationPackage = (params.package || process.env.npm_config_package || process.env.mars_package || "customer").toLowerCase();
    const srcPath = (subdir) => { // Resolves src aliases
        return path.resolve(__dirname, "src", subdir);
    };

    let settings = {}
    ionicConfig.local = Object.assign(ionicConfig.dev);

    for (let environment in ionicConfig) {
        settings = ionicConfig[environment];

        marsEnvironment.init(settings.plugins, params);
        plugins.default(settings.plugins, params);

        // Configures path resolution for the application
        settings.resolve = settings.resolve || {};
        settings.resolve.alias = settings.resolve.alias || {};
        settings.resolve.alias = Object.assign(settings.resolve.alias, {
            "chart.js": "chart.js/dist/Chart.js",
            "@app": srcPath("./app"),
            "@packages": srcPath("./packages"),
            "@services": srcPath("./services"),
            "@backend": srcPath("./backend"),
            "@pipes": srcPath("./pipes"),
            "@pages": srcPath("./pages"),
            "@directives": srcPath("./directives"),
            "@components": srcPath("./components"),
            "@assets": srcPath("./assets")
        });

        let isProd = process.env.IONIC_ENV == "prod" || params.turbo;
        if (isProd) plugins.prod(settings.plugins, params);
        if (isProd) {
            settings.devtool = "none";
        }
    };
} catch (e) {
    console.log(e);
}