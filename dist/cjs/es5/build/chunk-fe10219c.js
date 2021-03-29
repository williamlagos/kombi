"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _this = this;
var tslib_1 = require("../polyfills/tslib.js");
var chunk_c46efb37_js_1 = require("./chunk-c46efb37.js");
var Storage = localStorage || window.localStorage;
exports.e = Storage;
function set(e, t) { return new Promise(function (n, r) { try {
    Storage && localStorage.setItem(e, JSON.stringify(t)), n();
}
catch (e) {
    r("Couldnt store object " + e);
} }); }
exports.l = set;
function remove(e) { return new Promise(function (t, n) { try {
    Storage && localStorage.removeItem(e), t();
}
catch (e) {
    n("Couldnt remove object " + e);
} }); }
exports.m = remove;
function get(e) { return new Promise(function (t, n) { try {
    if (Storage) {
        var r = localStorage.getItem(e);
        t(JSON.parse(r));
    }
    t(void 0);
}
catch (e) {
    n("Couldnt get object: " + e);
} }); }
exports.n = get;
var hostname = window && window.location && window.location.hostname, endpoint = "localhost" === hostname ? "http://localhost:3000" : "https://wasserboxer.herokuapp.com", updateProfile = function (e, t) { return function (n, r) { return tslib_1.__awaiter(_this, void 0, void 0, function () { var r, o; return tslib_1.__generator(this, function (s) { switch (s.label) {
    case 0: return chunk_c46efb37_js_1.a.setDomain(endpoint), e.hasOwnProperty("files") ? [4, chunk_c46efb37_js_1.a.addPicture({ xAccessToken: t, files: e.files })] : [3, 4];
    case 1: return [4, s.sent().json()];
    case 2: return r = s.sent(), o = r.map(function (e) { return e._id; })[0], [4, chunk_c46efb37_js_1.a.updateUser({ xAccessToken: t, user: Object.assign({}, e, { pictures: [o] }) })];
    case 3: return s.sent(), [3, 6];
    case 4: return [4, chunk_c46efb37_js_1.a.updateUser({ xAccessToken: t, user: Object.assign({}, e) })];
    case 5: s.sent(), s.label = 6;
    case 6: return [2, n({ type: chunk_c46efb37_js_1.b.UPDATE_PROFILE })];
} }); }); }; }, openProfile = function (e) { return function (t, n) { return tslib_1.__awaiter(_this, void 0, void 0, function () { var n, r, o; return tslib_1.__generator(this, function (s) { switch (s.label) {
    case 0: return chunk_c46efb37_js_1.a.setDomain(endpoint), [4, chunk_c46efb37_js_1.a.getUserProfile({ xAccessToken: e })];
    case 1: return [4, s.sent().json()];
    case 2: return n = s.sent(), r = n, n.hasOwnProperty("pictures") && n.pictures.length > 0 ? [4, chunk_c46efb37_js_1.a.getPicture({ xAccessToken: e, id: n.pictures[0] })] : [3, 5];
    case 3: return [4, s.sent().json()];
    case 4: return o = [s.sent().externalRef], [3, 6];
    case 5: o = [], s.label = 6;
    case 6: return r.pictures = o, [2, t({ type: chunk_c46efb37_js_1.b.OPEN_PROFILE, profile: n })];
} }); }); }; }, setToken = function (e, t) { return function (n, r) { return tslib_1.__awaiter(_this, void 0, void 0, function () { var r; return tslib_1.__generator(this, function (o) { switch (o.label) {
    case 0: return chunk_c46efb37_js_1.a.setDomain(endpoint), [4, chunk_c46efb37_js_1.a.authenticateUser({ user: { email: e, password: t } })];
    case 1: return [4, o.sent().json()];
    case 2: return r = o.sent(), Storage.setItem("token", String(r.token)), [2, n({ directions: { component: "DRAWER", url: "/" }, type: chunk_c46efb37_js_1.b.SET_TOKEN, token: r.token })];
} }); }); }; }, revokeToken = function () { return function (e, t) { return Storage.removeItem("token"), e({ directions: { component: "LOGIN", url: "/login" }, type: chunk_c46efb37_js_1.b.REVOKE_TOKEN, token: "" }); }; }, toggleIntro = function (e) { return function (t, n) { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (n) { return Storage.setItem("introduced", String(+e)), [2, t({ type: chunk_c46efb37_js_1.b.SKIP_INTRO, introduced: +e })]; }); }); }; }, toggleTour = function (e) { return function (t, n) { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (n) { return Storage.setItem("explained", String(+e)), [2, t({ directions: { component: "DRAWER", url: "/" }, type: chunk_c46efb37_js_1.b.SKIP_TOUR, explained: +e })]; }); }); }; }, openRegister = function () { return function (e, t) { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (t) { return [2, e({ directions: { component: "REGISTER", url: "/register" }, type: chunk_c46efb37_js_1.b.OPEN_REGISTER, registered: !1 })]; }); }); }; }, closeRegister = function () { return function (e, t) { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (t) { return [2, e({ directions: { component: "LOGIN", url: "/login" }, type: chunk_c46efb37_js_1.b.CLOSE_REGISTER, registered: !0 })]; }); }); }; }, register = function (e) { return function (t, n) { return tslib_1.__awaiter(_this, void 0, void 0, function () { var n, r, o, s; return tslib_1.__generator(this, function (i) { switch (i.label) {
    case 0: return n = e.files, console.log(e.files), chunk_c46efb37_js_1.a.setDomain(endpoint), [4, chunk_c46efb37_js_1.a.createUser({ user: e })];
    case 1: return [4, i.sent().json()];
    case 2: return r = i.sent(), [4, chunk_c46efb37_js_1.a.addPicture({ xAccessToken: r.token, files: n })];
    case 3: return [4, i.sent().json()];
    case 4: return o = i.sent(), s = o.map(function (e) { return e._id; })[0], [4, chunk_c46efb37_js_1.a.updateUser({ xAccessToken: r.token, user: { pictures: [s] } })];
    case 5: return i.sent(), [2, t({ type: chunk_c46efb37_js_1.b.CLOSE_REGISTER, registered: !0 })];
} }); }); }; }, open = function (e, t) { return function (n, r) { return tslib_1.__awaiter(_this, void 0, void 0, function () { var o; return tslib_1.__generator(this, function (s) { return o = r().session.directions.slice(-1)[0].component, [2, n({ type: chunk_c46efb37_js_1.b.OPEN, directions: o === e ? null : { component: e, url: t } })]; }); }); }; }, close = function () { return function (e, t) { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (t) { return [2, e({ type: chunk_c46efb37_js_1.b.CLOSE, directions: {} })]; }); }); }; };
exports.o = updateProfile;
exports.c = openProfile;
exports.g = setToken;
exports.b = revokeToken;
exports.h = toggleIntro;
exports.f = toggleTour;
exports.i = openRegister;
exports.j = closeRegister;
exports.k = register;
exports.d = open;
exports.a = close;
