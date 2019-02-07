/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Index generator config.
 */

const fs = require("fs");
const path = require("path");
// --------------------- Mars environment variables
const constants = require("../../.mars/constants");
const colors = require("../../.mars/colors");
const config = require("../../.mars/project");
const locales = require("../../.mars/locales/pt");

function configureIndexColors() {
    let indexPath = path.join(__dirname, "../../src", "index.html");
    let buildPath = path.join(__dirname, "../../www", "index.html");
    let index = fs.readFileSync(indexPath, { encoding: 'UTF-8' });
    index = index.replace(/darker_primary_color_placeholder/g, colors.darker_secondary_color);
    index = index.replace(/primary_color_placeholder/g, colors.secondary_color);
    index = index.replace(/name_placeholder/g, config.display_name);
    index = index.replace(/slogan_placeholder/g, locales.slogan);
    index = index.replace(/loading_placeholder/g, locales.loading);
    index = index.replace(/powered_by_placeholder/g, locales.powered_by);
    fs.writeFileSync(buildPath, index);
}

module.exports = {
    init: () => {
        configureIndexColors();
    }
};