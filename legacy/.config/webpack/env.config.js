/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Environment configuration for client side.
 */

const webpack = require("webpack");

// --------------------- Mars environment variables
const constants = require("../constants");
const colors = require("../colors");
const env = require("../env");

const applicationPackage = (process.env.npm_config_app || process.env.mars_app || "customer").toLowerCase();
const client_env = Object.assign(env.client, { app: applicationPackage });

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
