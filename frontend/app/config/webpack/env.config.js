/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Environment configuration for client side.
 */

const webpack = require("webpack");

const log = require("../../.bin/utils/logger").log;
// --------------------- Mars environment variables
const constants = require("../../.mars/constants");
const colors = require("../../.mars/colors");
const env = require("../../.env");

const applicationPackage = (process.env.npm_config_package || process.env.mars_package || "customer").toLowerCase();
const client_env = Object.assign(env.client, { package: applicationPackage });

module.exports = {
    init: (plugins, params) => {
        plugins.push(new webpack.DefinePlugin({
            Mars: {
                constants: JSON.stringify(constants),
                env: JSON.stringify(client_env),
                colors: JSON.stringify(colors)
            }
        }));
        return plugins;
    }
}