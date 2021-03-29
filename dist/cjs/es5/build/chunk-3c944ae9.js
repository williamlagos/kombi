"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _this = this;
var tslib_1 = require("../polyfills/tslib.js");
var chunk_c46efb37_js_1 = require("./chunk-c46efb37.js");
var hostname = window && window.location && window.location.hostname, endpoint = "localhost" === hostname ? "http://localhost:3000" : "https://wasserboxer.herokuapp.com", showOrder = function (e) { return function (t, n) { return tslib_1.__awaiter(_this, void 0, void 0, function () { var n, r, s, i, a, c, o, d, u = this; return tslib_1.__generator(this, function (_) { switch (_.label) {
    case 0: return chunk_c46efb37_js_1.a.setDomain(endpoint), n = e.split(".")[1], r = n.replace(/-/g, "+").replace(/_/g, "/"), s = JSON.parse(window.atob(r))._id, [4, chunk_c46efb37_js_1.a.getReadyOrders({ xAccessToken: e })];
    case 1: return [4, _.sent().json()];
    case 2: return i = _.sent(), a = i.map(function (e) { return e.pictures; }).flat(), [4, chunk_c46efb37_js_1.a.getPictures({ xAccessToken: e, ids: a.flat() })];
    case 3: return [4, _.sent().json()];
    case 4: return c = _.sent(), o = i.map(function (t) { return tslib_1.__awaiter(u, void 0, void 0, function () { var n, r, i, a; return tslib_1.__generator(this, function (o) { switch (o.label) {
        case 0: return t.bids.length > 0 ? [4, chunk_c46efb37_js_1.a.getOrderBids({ xAccessToken: e, order: t._id })] : [3, 3];
        case 1: return [4, o.sent().json()];
        case 2: n = o.sent(), r = n.filter(function (e) { return s === e.user._id; }), t.placed = r.length > 0, o.label = 3;
        case 3:
            for (i = 0; i < c.length; i++)
                -1 !== (a = t.pictures.indexOf(c[i]._id)) && (t.pictures[a] = c[i]);
            return [2, t];
    } }); }); }), [4, Promise.all(o)];
    case 5: return d = _.sent(), [2, t({ type: chunk_c46efb37_js_1.b.SHOW_ORDER, orders: d })];
} }); }); }; }, showMyOrders = function (e) { return function (t, n) { return tslib_1.__awaiter(_this, void 0, void 0, function () { var n; return tslib_1.__generator(this, function (r) { switch (r.label) {
    case 0: return chunk_c46efb37_js_1.a.setDomain(endpoint), [4, chunk_c46efb37_js_1.a.getOrders({ xAccessToken: e })];
    case 1: return [4, r.sent().json()];
    case 2: return n = r.sent(), [2, t({ type: chunk_c46efb37_js_1.b.MERCHANT_ORDERS, orders: n })];
} }); }); }; }, selectOrder = function (e, t) { return function (n, r) { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (r) { switch (r.label) {
    case 0: return chunk_c46efb37_js_1.a.setDomain(endpoint), [4, chunk_c46efb37_js_1.a.acceptOrder({ xAccessToken: t, id: e })];
    case 1: return r.sent(), [2, n({ type: chunk_c46efb37_js_1.b.SELECT_ORDER })];
} }); }); }; }, placeOrder = function (e, t, n) { return function (r, s) { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (s) { switch (s.label) {
    case 0: return chunk_c46efb37_js_1.a.setDomain(endpoint), [4, chunk_c46efb37_js_1.a.placeBid({ xAccessToken: n, bid: e, order: t })];
    case 1: return [4, s.sent()];
    case 2: return s.sent(), [2, r({ type: chunk_c46efb37_js_1.b.PLACE_ORDER, orderId: t })];
} }); }); }; }, rateOrder = function (e, t, n) { return function (r, s) { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (s) { switch (s.label) {
    case 0: return chunk_c46efb37_js_1.a.setDomain(endpoint), [4, chunk_c46efb37_js_1.a.rateOrder({ xAccessToken: n, id: e, rate: t })];
    case 1: return s.sent(), [2, r({ type: chunk_c46efb37_js_1.b.RATE_ORDER })];
} }); }); }; }, startOrder = function (e, t) { return function (n, r) { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (r) { switch (r.label) {
    case 0: return chunk_c46efb37_js_1.a.setDomain(endpoint), [4, chunk_c46efb37_js_1.a.startOrder({ xAccessToken: t, id: e })];
    case 1: return r.sent(), [2, n({ type: chunk_c46efb37_js_1.b.START_ORDER })];
} }); }); }; }, finishOrder = function (e, t) { return function (n, r) { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (r) { switch (r.label) {
    case 0: return chunk_c46efb37_js_1.a.setDomain(endpoint), [4, chunk_c46efb37_js_1.a.finishOrder({ xAccessToken: t, id: e })];
    case 1: return r.sent(), [2, n({ type: chunk_c46efb37_js_1.b.FINISH_ORDER })];
} }); }); }; }, cancelOrder = function (e, t) { return function (n, r) { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (r) { switch (r.label) {
    case 0: return chunk_c46efb37_js_1.a.setDomain(endpoint), [4, chunk_c46efb37_js_1.a.cancelOrder({ xAccessToken: t, id: e })];
    case 1: return r.sent(), [2, n({ type: chunk_c46efb37_js_1.b.CANCEL_ORDER })];
} }); }); }; };
exports.e = showOrder;
exports.a = showMyOrders;
exports.f = selectOrder;
exports.h = placeOrder;
exports.c = rateOrder;
exports.g = startOrder;
exports.d = finishOrder;
exports.b = cancelOrder;
