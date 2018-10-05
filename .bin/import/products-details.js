/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Production details import module.
 */

const path = require("path");
const fs = require("fs-extra");

const mammoth = require("mammoth");
const striptags = require("striptags");

const productsPath = path.resolve(__dirname, "../../server/.tmp/infos");
const productsDir = fs.readdirSync(productsPath);
let infos = {};


let execute = async () => {
    let lastItem = productsDir.length, currentItem = 0, isLastItem = false;
    /* await Promise.all(productsDir.map((file) => { */
    /* Filters unwanted files */
    /*  return new Promise(async (resolve, reject) => { */
    productsDir.map(async (file) => {
        try {
            let infoKey = file.split(".")[0];
            let infoPath = path.join(productsPath, file);
            let parsed = (await mammoth.extractRawText({ path: infoPath }));
            console.log(`Reading ${file}...`);
            infos[infoKey] = parsed ? (parsed.value).trim() : undefined;
        } catch (e) {
            console.log(e);
        } finally {
            currentItem += 1;
            isLastItem = currentItem == lastItem;
            if (isLastItem) {
                console.log("Finished");
                fs.writeFileSync(path.join(__dirname, "../../server/seeds/products", "infos.json"), JSON.stringify(infos, null, "\t"), { encoding: "UTF-8" });
            }
        }
    });
    /*  }); */
    /* })); */
};

execute();
