/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description App manifest.json generator.
 */


const fs = require("fs");
const path = require("path");
const log = require("../../.bin/utils/logger").log;
// --------------------- Mars environment variables
const constants = require("../../.mars/constants");
const colors = require("../../.mars/colors");
const config = require("../../.mars/project");
const locales = require("../../.mars/locales/pt");

function writeManifest() {
    log("updating manifest.json...".yellow);
    let manifest = {
        "name": config.display_name,
        "short_name": config.display_name,
        "start_url": "index.html",
        "display": "standalone",
        "icons": [{
            "src": "assets/imgs/logo.png",
            "sizes": "512x512",
            "type": "image/png"
        }],
        "background_color": colors.secondary_color,
        "theme_color": colors.primary_color
    };
    fs.writeFileSync(path.join(__dirname, "../../src", "manifest.json"), JSON.stringify(manifest, null, 4));
};


module.exports = {
    init: () => {
        writeManifest();
    }
};