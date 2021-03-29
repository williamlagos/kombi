"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _this = this;
var tslib_1 = require("../polyfills/tslib.js");
var chunk_c46efb37_js_1 = require("./chunk-c46efb37.js");
var hostname = window && window.location && window.location.hostname, endpoint = "localhost" === hostname ? "http://localhost:3000" : "https://wasserboxer.herokuapp.com", registerOrder = function (e, t) { return function (r, n) { return tslib_1.__awaiter(_this, void 0, void 0, function () { var n, s; return tslib_1.__generator(this, function (i) { switch (i.label) {
    case 0: return n = e.files, chunk_c46efb37_js_1.a.setDomain(endpoint), [4, chunk_c46efb37_js_1.a.addPicture({ xAccessToken: t, files: n })];
    case 1: return [4, i.sent().json()];
    case 2: return s = i.sent(), e.pictures = s.map(function (e) { return e._id; }), [4, chunk_c46efb37_js_1.a.createOrder({ xAccessToken: t, order: e })];
    case 3: return i.sent(), [2, r({ type: chunk_c46efb37_js_1.b.REGISTER_ORDER })];
} }); }); }; }, showMyOrders = function (e) { return function (t, r) { return tslib_1.__awaiter(_this, void 0, void 0, function () { var r, n, s, i, a, c, o, d, u = this; return tslib_1.__generator(this, function (l) { switch (l.label) {
    case 0: return chunk_c46efb37_js_1.a.setDomain(endpoint), r = e.split(".")[1], n = r.replace(/-/g, "+").replace(/_/g, "/"), s = JSON.parse(window.atob(n))._id, [4, chunk_c46efb37_js_1.a.getOrders({ xAccessToken: e })];
    case 1: return [4, l.sent().json()];
    case 2: return i = l.sent(), a = i.map(function (e) { return e.pictures; }).flat(), [4, chunk_c46efb37_js_1.a.getPictures({ xAccessToken: e, ids: a.flat() })];
    case 3: return [4, l.sent().json()];
    case 4: return c = l.sent(), o = i.map(function (t) { return tslib_1.__awaiter(u, void 0, void 0, function () { var r, n, i, a; return tslib_1.__generator(this, function (o) { switch (o.label) {
        case 0: return t.bids.length > 0 ? [4, chunk_c46efb37_js_1.a.getOrderBids({ xAccessToken: e, order: t._id })] : [3, 3];
        case 1: return [4, o.sent().json()];
        case 2: r = o.sent(), n = r.filter(function (e) { return s === e.user._id; }), t.placed = n.length > 0, o.label = 3;
        case 3:
            for (i = 0; i < c.length; i++)
                -1 !== (a = t.pictures.indexOf(c[i]._id)) && (t.pictures[a] = c[i]);
            return [2, t];
    } }); }); }), [4, Promise.all(o)];
    case 5: return d = l.sent(), [2, t({ type: chunk_c46efb37_js_1.b.MY_ORDERS, orders: d })];
} }); }); }; }, showOrderBids = function (e, t) { return function (r, n) { return tslib_1.__awaiter(_this, void 0, void 0, function () { var n; return tslib_1.__generator(this, function (s) { switch (s.label) {
    case 0: return chunk_c46efb37_js_1.a.setDomain(endpoint), [4, chunk_c46efb37_js_1.a.getOrderBids({ xAccessToken: e, order: t })];
    case 1: return [4, s.sent().json()];
    case 2: return n = s.sent(), [2, r({ type: chunk_c46efb37_js_1.b.ORDER_BIDS, bids: n })];
} }); }); }; }, selectMerchantForOrder = function (e, t, r) { return function (n, s) { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (s) { switch (s.label) {
    case 0: return chunk_c46efb37_js_1.a.setDomain(endpoint), [4, chunk_c46efb37_js_1.a.setOrderMerchant({ xAccessToken: r, id: t, merchant: e })];
    case 1: return s.sent(), [2, n({ type: chunk_c46efb37_js_1.b.ORDER_MERCHANT })];
} }); }); }; };
exports.a = registerOrder;
exports.b = showMyOrders;
exports.c = showOrderBids;
exports.d = selectMerchantForOrder;
