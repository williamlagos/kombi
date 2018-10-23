/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Webpack plugins config.
 */

const webpack = require("webpack");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const isCordova = (process.env.npm_config_target == "cordova") || (process.env.target == "cordova");

module.exports = {
    default: (plugins, params) => { },
    prod: (plugins, params) => {

        plugins.push(new ExtractTextPlugin('[name].css'));
        plugins.push(new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.min\.css$/,
            cssProcessorOptions: { discardComments: { removeAll: true } }
        }));

        if (params["stats-json"]) {
            plugins.push(new BundleAnalyzerPlugin({
                generateStatsFile: true,
                analyzerMode: "disabled"
            }));
        };

        // Keep all chunks inside one b   undle (makes the app load all at once)
        plugins.push(new webpack.optimize.MinChunkSizePlugin({
            minChunkSize: 9999999999999
        }));

        return plugins;
    }
}