/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Production import module.
 */

const path = require("path");
const fs = require("fs-extra");
const productsPath = path.resolve(__dirname, "../../server/.tmp/products");
const productsDir = fs.readdirSync(productsPath);
const xlsxj = require("xlsx-to-json");
const titlecase = require("titlecase");

const productFiles = {
    "Acessórios.xlsx": { sheets: ["ARRANHADORES", "BEBEDOUROSCOMEDOUROS", "BRINQUEDOS", "CAIXASDETRANSPORTE", "CAMAS", "CASAS", "COLEIRASEGUIAS", "DIVERSOS", "HIGIENEBELEZA"] },
    "Rações e Petiscos.xlsx": { sheets: ["OUTROSPETS", "CAESADULTOS", "CAESFILHOTES", "CAESSENIOR", "GATOSADULTOS", "GATOSFILHOTES", "GATOSSENIOR", "PETISCOSBISCOITOSOSSINHOS"] },
    "Medicamentos.xlsx": { sheets: ["MEDDIVERSOS", "MEDANTIPULGASCARRAPATICIDASARNI", "MEDVERMIFUGOSVERMICIDA", "MEDOUTROS"] },
};

let formatted = {};
let formatProduct = (product) => {
    /* return product; */
    if (!product.DESCRICAO || !product.CATEGORIA) return;
    return {
        category: titlecase(`${product.CATEGORIA}`.toLowerCase()),
        subcategory: titlecase(`${product.SUBCATEGORIA}`.toLowerCase()),
        name: titlecase((`${product.DESCRICAO} ` + (product.APRESENTACAO ? `(${product.APRESENTACAO})` : "")).toLowerCase()),
        brand: product.INDUSTRIA ? titlecase(product.INDUSTRIA.toLowerCase()) : undefined,
        picture: product.IMAGEM,
        infos: product.INFOS,
        type: product.TIPO
    };
}

let execute = async () => {
    let products = [];
    let categories = [], category = {}, categoryIndex = -1, subcategoryIndex;
    await Promise.all(productsDir.map((file) => {
        if (file.indexOf("xlsx") == -1) return;
        return new Promise((resolve, reject) => {
            let filePath = path.join(productsPath, file);
            console.log(file);
            productFiles[file].sheets.map((sheet) => {
                console.log("Loading sheet " + sheet + "....");
                xlsxj({
                    input: filePath,
                    output: null,
                    sheet: sheet
                }, function (err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(result);
                        result.map((product) => {
                            product = formatProduct(product);
                            console.log(product);
                            if (product) {
                                products.push(product)
                                if (product.category) {
                                    categoryIndex = categories.indexOfObject('description', product.category);
                                    if (categoryIndex > -1) {
                                        category = categories[categoryIndex];
                                        subcategoryIndex = category.children.indexOfObject('description', product.subcategory);
                                        if (!(subcategoryIndex > -1)) category.children.push({ description: product.subcategory });
                                    } else {
                                        categories.push({ description: product.category, children: [] });
                                    }
                                }
                            };
                        });
                        resolve();
                    }
                });
            });
        });
    }));
    fs.writeFileSync(path.join(__dirname, "../../server/seeds/products", "categories.json"), JSON.stringify(categories, null, "\t"));
    fs.writeFileSync(path.join(__dirname, "../../server/seeds/products", "products.json"), JSON.stringify(products, null, "\t"));
};

execute();

Array.prototype.indexOfObject = function(property, value) {
    if (property.indexOf(".") > -1) console.log(property.split("."));
    for (var i = 0, len = this.length; i < len; i++) {
        if (this[i][property] === value) return i;
    }
    return -1;
}