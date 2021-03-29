"use strict";
// clipper: Custom Elements Define Library, ES Module/es5 Target
Object.defineProperty(exports, "__esModule", { value: true });
var clipper_core_js_1 = require("./clipper.core.js");
var clipper_components_js_1 = require("./clipper.components.js");
function defineCustomElements(win, opts) {
    return clipper_core_js_1.defineCustomElement(win, clipper_components_js_1.COMPONENTS, opts);
}
exports.defineCustomElements = defineCustomElements;
