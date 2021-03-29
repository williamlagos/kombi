"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("../polyfills/tslib.js");
function hostContext(t, r) { return null !== r.closest(t); }
exports.a = hostContext;
function createColorClasses(t) { var r; return "string" == typeof t && t.length > 0 ? ((r = { "ion-color": !0 })["ion-color-" + t] = !0, r) : void 0; }
exports.c = createColorClasses;
function getClassList(t) { return void 0 !== t ? (Array.isArray(t) ? t : t.split(" ")).filter(function (t) { return null != t; }).map(function (t) { return t.trim(); }).filter(function (t) { return "" !== t; }) : []; }
function getClassMap(t) { var r = {}; return getClassList(t).forEach(function (t) { return r[t] = !0; }), r; }
exports.b = getClassMap;
var SCHEME = /^[a-z][a-z0-9+\-.]*:/;
function openURL(t, r, n, e) { return tslib_1.__awaiter(this, void 0, void 0, function () { var o; return tslib_1.__generator(this, function (s) { switch (s.label) {
    case 0: return null == r || "#" === r[0] || SCHEME.test(r) ? [3, 2] : (o = t.document.querySelector("ion-router")) ? (null != n && n.preventDefault(), [4, o.componentOnReady()]) : [3, 2];
    case 1: return s.sent(), [2, o.push(r, e)];
    case 2: return [2, !1];
} }); }); }
exports.d = openURL;
