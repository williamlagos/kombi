/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

const colors = require("colors");
const favicons = require("favicons");
const fs = require("fs-extra");
const path = require("path");
const app = (process.env.npm_config_app || params.app || "customer");
const rootPath = path.resolve(__dirname, "../../../");
const projectRoot = path.join(rootPath, app);
const picture = path.join(projectRoot, "resources", "icon.png"); // Source image(s). `string`, `buffer` or array of `string` 
const output = path.join(projectRoot, "src", "assets", "icon"); // Source image(s). `string`, `buffer` or array of `string` 
const configuration = {
    preferOnline: false,            // Use offline generation, if online generation has failed. `boolean` 
    icons: {
        favicons: true,                // Create regular favicons. `boolean` 
        android: false,              // Create Android homescreen icon. `boolean` or `{ offset, background, shadow }` 
        appleIcon: false,            // Create Apple touch icons. `boolean` or `{ offset, background }` 
        appleStartup: false,         // Create Apple startup images. `boolean` or `{ offset, background }` 
        // coast: { offset: 25 },      // Create Opera Coast icon with offset 25%. `boolean` or `{ offset, background }` 
        firefox: false,              // Create Firefox OS icons. `boolean` or `{ offset, background }` 
        windows: false,              // Create Windows 8 tile icons. `boolean` or `{ background }` 
        yandex: false                // Create Yandex browser icon. `boolean` or `{ background }` 
    }
};

favicons(picture, configuration, (error, response) => {
    if (error) return console.log(error);
    if (response.images && response.images.map) {
        Promise.all(response.images.map(async (icon) => {
            console.log(icon.name);
            await fs.writeFileSync(path.join(output, icon.name), icon.contents);
        }));
    }
    console.log((`♂ Mars API generator: API client generated successfully!`.green));
});