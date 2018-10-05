/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Webpack plugins config.
 */

const webpack = require("webpack");
const CompressionPlugin = require("compression-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    default: (plugins, params) => { },
    prod: (plugins, params) => {
        // Keep all chunks inside one bundle (makes the app load all at once)
        plugins.push(new webpack.optimize.MinChunkSizePlugin({
            minChunkSize: 99999999999999
        }));

        /* plugins.push(new UglifyJsPlugin({ // Uglify JS files
            sourceMap: true,
            uglifyOptions: {
                exclude: [/\.min\.js$/gi], // skip pre-minified libs
                mangle: true,
                compress: true,
                output: {
                    beautify: false,
                    comments: false,
                    webkit: true
                }
            }
        })); */

        /*    plugins.push(new ClosureCompilerPlugin({
               compiler: {
                   language_in: 'ECMASCRIPT6',
                   language_out: 'ECMASCRIPT5',
                   compilation_level: 'ADVANCED'
               },
               concurrency: 3,
           })); */

        /* plugins.push(new ExtractTextPlugin('[name].css'));
        plugins.push(new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.min\.css$/,
            cssProcessorOptions: { discardComments: { removeAll: true } }
        })); */

        if (params["stats-json"]) {
            plugins.push(new BundleAnalyzerPlugin({
                generateStatsFile: true,
                analyzerMode: "disabled"
            }));
        }

        if (params.target == "cordova") { // For cordova environments 

        } else { // For common web environments 
            plugins.push(new CompressionPlugin({ // Compresses assets as gzip
                asset: "[path].gz[query]",
                algorithm: "gzip",
                test: /\.js$|\.css$|\.html$/,
                threshold: 10240,
                minRatio: 0.9
            }));
        }
        return plugins;
    }
}