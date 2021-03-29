"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("../polyfills/tslib.js");
var clipper_core_js_1 = require("../clipper.core.js");
var chunk_c46efb37_js_1 = require("./chunk-c46efb37.js");
var chunk_b29ff8f0_js_1 = require("./chunk-b29ff8f0.js");
var chunk_fe10219c_js_1 = require("./chunk-fe10219c.js");
var chunk_e658e8b7_js_1 = require("./chunk-e658e8b7.js");
var chunk_c82b670d_js_1 = require("./chunk-c82b670d.js");
var chunk_3c944ae9_js_1 = require("./chunk-3c944ae9.js");
var chunk_b5dfde61_js_1 = require("./chunk-b5dfde61.js");
var chunk_3beb47a5_js_1 = require("./chunk-3beb47a5.js");
var root, Menu = function () { function e() { this.profile = {}, this.directions = {}, this.appPages = [{ title: "Frete", url: "create", icon: "cube", role: "CUSTOMER" }, { title: "Ofertas", url: "speakers", icon: "cash", role: "ALL" }, { title: "Agenda", url: "schedule", icon: "calendar", role: "ALL" }, { title: "Sobre", url: "about", icon: "information-circle", role: "MERCHANT" }]; } return e.prototype.componentWillLoad = function () { this.store.mapStateToProps(this, function (e) { var t = e.session; return { token: t.token, profile: t.profile, directions: t.directions }; }), this.store.mapDispatchToProps(this, { revokeToken: chunk_fe10219c_js_1.b, openProfile: chunk_fe10219c_js_1.c, open: chunk_fe10219c_js_1.d }), this.openProfile(this.token); }, e.prototype.checkLoginStatus = function () { return Boolean(this.token); }, e.prototype.parseJwt = function (e) { var t = e.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"); return JSON.parse(window.atob(t)); }, e.prototype.changeTab = function (e) { return tslib_1.__awaiter(this, void 0, void 0, function () { return tslib_1.__generator(this, function (t) { switch (t.label) {
    case 0: return this.open(e.toUpperCase(), "/" + e), [4, this.tabs.componentOnReady()];
    case 1: return [4, t.sent().select(e)];
    case 2: return t.sent(), [2];
} }); }); }, e.prototype.showPage = function (e, t) { return tslib_1.__awaiter(this, void 0, void 0, function () { var n; return tslib_1.__generator(this, function (r) { switch (r.label) {
    case 0: return e.preventDefault(), this.open(t.toUpperCase(), "/" + t), [4, (n = document.querySelector("ion-nav")).setRoot("page-tabs")];
    case 1: return r.sent(), [4, n.push("page-" + t)];
    case 2: return r.sent(), [2];
} }); }); }, e.prototype.displayRating = function (e) { return clipper_core_js_1.h("ion-buttons", { class: "static-stars" }, clipper_core_js_1.h("ion-button", { class: e >= 1 ? "marked" : "unmarked", id: "star-1" }), clipper_core_js_1.h("ion-button", { class: e >= 2 ? "marked" : "unmarked", id: "star-2" }), clipper_core_js_1.h("ion-button", { class: e >= 3 ? "marked" : "unmarked", id: "star-3" }), clipper_core_js_1.h("ion-button", { class: e >= 4 ? "marked" : "unmarked", id: "star-4" }), clipper_core_js_1.h("ion-button", { class: e >= 5 ? "marked" : "unmarked", id: "star-5" })); }, e.prototype.renderMenu = function () { var e = this, t = this.parseJwt(this.token)._role; return clipper_core_js_1.h("ion-menu", { contentId: "app", menuId: "first", type: "push" }, clipper_core_js_1.h("ion-header", null, clipper_core_js_1.h("ion-toolbar", null, clipper_core_js_1.h("ion-title", null, clipper_core_js_1.h("img", { src: "assets/img/applogo.svg", height: "42", alt: "Shipping" })))), clipper_core_js_1.h("ion-content", { forceOverscroll: !1 }, this.profile && [clipper_core_js_1.h("ion-item", null, clipper_core_js_1.h("ion-avatar", { slot: "start" }, clipper_core_js_1.h("img", { src: this.profile.hasOwnProperty("pictures") && this.profile.pictures.length > 0 ? this.profile.pictures[0] : "http://www.gravatar.com/avatar?d=mm&s=140", alt: "Imagem do perfil" })), clipper_core_js_1.h("ion-label", null, clipper_core_js_1.h("h5", null, this.profile.name), clipper_core_js_1.h("p", null, this.profile.email))), clipper_core_js_1.h("ion-item", null, this.displayRating(this.profile.hasOwnProperty("rating") ? this.profile.rating : 0))], clipper_core_js_1.h("ion-list", null, clipper_core_js_1.h("ion-list-header", null, "Navegar"), this.appPages.map(function (n) { return (n.role === t || "ALL" === n.role) && clipper_core_js_1.h("ion-menu-toggle", { autoHide: !1 }, clipper_core_js_1.h("ion-item", { lines: "full", href: "#", onClick: function () { return e.changeTab(n.url); } }, clipper_core_js_1.h("ion-icon", { slot: "start", name: n.icon }), clipper_core_js_1.h("ion-label", null, n.title))); })), clipper_core_js_1.h("ion-list", null, clipper_core_js_1.h("ion-list-header", null, "Conta"), clipper_core_js_1.h("ion-menu-toggle", { autoHide: !1 }, this.checkLoginStatus() ? clipper_core_js_1.h("ion-item", { href: "#", onClick: function (t) { return e.showPage(t, "account"); } }, clipper_core_js_1.h("ion-icon", { slot: "start", name: "person" }), clipper_core_js_1.h("ion-label", null, "Perfil")) : clipper_core_js_1.h("ion-item", { href: "#login" }, clipper_core_js_1.h("ion-icon", { slot: "start", name: "log-in" }), clipper_core_js_1.h("ion-label", null, "Entrar"))), clipper_core_js_1.h("ion-menu-toggle", { autoHide: !1 }, clipper_core_js_1.h("ion-item", { href: "#support", button: !0, onClick: function (t) { return e.showPage(t, "support"); } }, clipper_core_js_1.h("ion-icon", { slot: "start", name: "help" }), clipper_core_js_1.h("ion-label", null, "Ajuda"))), clipper_core_js_1.h("ion-menu-toggle", { autoHide: !1 }, this.checkLoginStatus() ? clipper_core_js_1.h("ion-item", { onClick: function () { return e.revokeToken(); }, button: !0 }, clipper_core_js_1.h("ion-icon", { slot: "start", name: "log-out" }), clipper_core_js_1.h("ion-label", null, "Sair")) : clipper_core_js_1.h("ion-item", { href: "#signup", button: !0 }, clipper_core_js_1.h("ion-icon", { slot: "start", name: "person-add" }), clipper_core_js_1.h("ion-label", null, "Registrar")))))); }, e.prototype.renderNav = function (e) { var t = this.parseJwt(this.token)._role; return console.log(e.slice(-1)[0].component), clipper_core_js_1.h("ion-nav", { id: "app", main: !0 }, "DRAWER" !== e.slice(-1)[0].component ? clipper_core_js_1.h("page-tabs", { role: t }) : clipper_core_js_1.h("page-tabs", { role: t, hasTabs: !1 })); }, e.prototype.render = function () { return clipper_core_js_1.h("ion-split-pane", { when: "lg" }, this.renderMenu(), this.renderNav(this.directions)); }, Object.defineProperty(e, "is", { get: function () { return "app-drawer"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "properties", { get: function () { return { directions: { state: !0 }, nav: { connect: "ion-nav" }, profile: { state: !0 }, store: { context: "store" }, tabs: { connect: "page-tabs" }, token: { state: !0 } }; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "style", { get: function () { return ".static-stars ion-button{background:grey;-webkit-clip-path:polygon(50% 0,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%);clip-path:polygon(50% 0,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%);height:2.25em!important;width:2.25em!important;cursor:none}.static-stars ion-button:hover{cursor:none}.static-stars ion-button.marked{background:#ff0}"; }, enumerable: !0, configurable: !0 }), e; }();
exports.AppDrawer = Menu;
function symbolObservablePonyfill(e) { var t, n = e.Symbol; return "function" == typeof n ? n.observable ? t = n.observable : (t = n("observable"), n.observable = t) : t = "@@observable", t; }
var result = symbolObservablePonyfill(root = "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof module ? module : Function("return this")()), randomString = function () { return Math.random().toString(36).substring(7).split("").join("."); }, ActionTypes = { INIT: "@@redux/INIT" + randomString(), REPLACE: "@@redux/REPLACE" + randomString(), PROBE_UNKNOWN_ACTION: function () { return "@@redux/PROBE_UNKNOWN_ACTION" + randomString(); } };
function isPlainObject(e) { if ("object" != typeof e || null === e)
    return !1; for (var t = e; null !== Object.getPrototypeOf(t);)
    t = Object.getPrototypeOf(t); return Object.getPrototypeOf(e) === t; }
function createStore(e, t, n) { var r; if ("function" == typeof t && "function" == typeof n || "function" == typeof n && "function" == typeof arguments[3])
    throw new Error("It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function."); if ("function" == typeof t && void 0 === n && (n = t, t = void 0), void 0 !== n) {
    if ("function" != typeof n)
        throw new Error("Expected the enhancer to be a function.");
    return n(createStore)(e, t);
} if ("function" != typeof e)
    throw new Error("Expected the reducer to be a function."); var o = e, i = t, a = [], s = a, c = !1; function u() { s === a && (s = a.slice()); } function l() { if (c)
    throw new Error("You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store."); return i; } function p(e) { if ("function" != typeof e)
    throw new Error("Expected the listener to be a function."); if (c)
    throw new Error("You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api-reference/store#subscribelistener for more details."); var t = !0; return u(), s.push(e), function () { if (t) {
    if (c)
        throw new Error("You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api-reference/store#subscribelistener for more details.");
    t = !1, u();
    var n = s.indexOf(e);
    s.splice(n, 1), a = null;
} }; } function d(e) { if (!isPlainObject(e))
    throw new Error("Actions must be plain objects. Use custom middleware for async actions."); if (void 0 === e.type)
    throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?'); if (c)
    throw new Error("Reducers may not dispatch actions."); try {
    c = !0, i = o(i, e);
}
finally {
    c = !1;
} for (var t = a = s, n = 0; n < t.length; n++)
    (0, t[n])(); return e; } return d({ type: ActionTypes.INIT }), (r = { dispatch: d, subscribe: p, getState: l, replaceReducer: function (e) { if ("function" != typeof e)
        throw new Error("Expected the nextReducer to be a function."); o = e, d({ type: ActionTypes.REPLACE }); } })[result] = function () { var e, t = p; return (e = { subscribe: function (e) { if ("object" != typeof e || null === e)
        throw new TypeError("Expected the observer to be an object."); function n() { e.next && e.next(l()); } return n(), { unsubscribe: t(n) }; } })[result] = function () { return this; }, e; }, r; }
function getUndefinedStateErrorMessage(e, t) { var n = t && t.type; return "Given " + (n && 'action "' + String(n) + '"' || "an action") + ', reducer "' + e + '" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.'; }
function assertReducerShape(e) { Object.keys(e).forEach(function (t) { var n = e[t]; if (void 0 === n(void 0, { type: ActionTypes.INIT }))
    throw new Error('Reducer "' + t + "\" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined."); if (void 0 === n(void 0, { type: ActionTypes.PROBE_UNKNOWN_ACTION() }))
    throw new Error('Reducer "' + t + "\" returned undefined when probed with a random type. Don't try to handle " + ActionTypes.INIT + ' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.'); }); }
function combineReducers(e) { for (var t = Object.keys(e), n = {}, r = 0; r < t.length; r++) {
    var o = t[r];
    "function" == typeof e[o] && (n[o] = e[o]);
} var i, a = Object.keys(n); try {
    assertReducerShape(n);
}
catch (e) {
    i = e;
} return function (e, t) { if (void 0 === e && (e = {}), i)
    throw i; for (var r = !1, o = {}, s = 0; s < a.length; s++) {
    var c = a[s], u = e[c], l = (0, n[c])(u, t);
    if (void 0 === l) {
        var p = getUndefinedStateErrorMessage(c, t);
        throw new Error(p);
    }
    o[c] = l, r = r || l !== u;
} return (r = r || a.length !== Object.keys(e).length) ? o : e; }; }
function bindActionCreator(e, t) { return function () { return t(e.apply(this, arguments)); }; }
function bindActionCreators(e, t) { if ("function" == typeof e)
    return bindActionCreator(e, t); if ("object" != typeof e || null === e)
    throw new Error("bindActionCreators expected an object or a function, instead received " + (null === e ? "null" : typeof e) + '. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?'); var n = {}; for (var r in e) {
    var o = e[r];
    "function" == typeof o && (n[r] = bindActionCreator(o, t));
} return n; }
function _defineProperty(e, t, n) { return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e; }
function ownKeys(e, t) { var n = Object.keys(e); return Object.getOwnPropertySymbols && n.push.apply(n, Object.getOwnPropertySymbols(e)), t && (n = n.filter(function (t) { return Object.getOwnPropertyDescriptor(e, t).enumerable; })), n; }
function _objectSpread2(e) { for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {};
    t % 2 ? ownKeys(n, !0).forEach(function (t) { _defineProperty(e, t, n[t]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ownKeys(n).forEach(function (t) { Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t)); });
} return e; }
function compose() { for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n]; return 0 === t.length ? function (e) { return e; } : 1 === t.length ? t[0] : t.reduce(function (e, t) { return function () { return e(t.apply(void 0, arguments)); }; }); }
function applyMiddleware() { for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n]; return function (e) { return function () { var n = e.apply(void 0, arguments), r = function () { throw new Error("Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch."); }, o = { getState: n.getState, dispatch: function () { return r.apply(void 0, arguments); } }, i = t.map(function (e) { return e(o); }); return _objectSpread2({}, n, { dispatch: r = compose.apply(void 0, i)(n.dispatch) }); }; }; }
var redux = Object.freeze({ __DO_NOT_USE__ActionTypes: ActionTypes, applyMiddleware: applyMiddleware, bindActionCreators: bindActionCreators, combineReducers: combineReducers, compose: compose, createStore: createStore });
function createThunkMiddleware(e) { return function (t) { var n = t.dispatch, r = t.getState; return function (t) { return function (o) { return "function" == typeof o ? o(n, r, e) : t(o); }; }; }; }
var thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;
var commonjsGlobal = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
function unwrapExports(e) { return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e; }
function createCommonjsModule(e, t) { return e(t = { exports: {} }, t.exports), t.exports; }
var reduxLogger = createCommonjsModule(function (e, t) { !function (e) { function t(e, t) { e.super_ = t, e.prototype = Object.create(t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }); } function n(e, t) { Object.defineProperty(this, "kind", { value: e, enumerable: !0 }), t && t.length && Object.defineProperty(this, "path", { value: t, enumerable: !0 }); } function r(e, t, n) { r.super_.call(this, "E", e), Object.defineProperty(this, "lhs", { value: t, enumerable: !0 }), Object.defineProperty(this, "rhs", { value: n, enumerable: !0 }); } function o(e, t) { o.super_.call(this, "N", e), Object.defineProperty(this, "rhs", { value: t, enumerable: !0 }); } function i(e, t) { i.super_.call(this, "D", e), Object.defineProperty(this, "lhs", { value: t, enumerable: !0 }); } function a(e, t, n) { a.super_.call(this, "A", e), Object.defineProperty(this, "index", { value: t, enumerable: !0 }), Object.defineProperty(this, "item", { value: n, enumerable: !0 }); } function s(e, t, n) { var r = e.slice((n || t) + 1 || e.length); return e.length = t < 0 ? e.length + t : t, e.push.apply(e, r), e; } function c(e) { var t = void 0 === e ? "undefined" : O(e); return "object" !== t ? t : e === Math ? "math" : null === e ? "null" : Array.isArray(e) ? "array" : "[object Date]" === Object.prototype.toString.call(e) ? "date" : "function" == typeof e.toString && /^\/.*\//.test(e.toString()) ? "regexp" : "object"; } function u(e, t, n, l, p, d, f) { f = f || []; var h = (p = p || []).slice(0); if (void 0 !== d) {
    if (l) {
        if ("function" == typeof l && l(h, d))
            return;
        if ("object" === (void 0 === l ? "undefined" : O(l))) {
            if (l.prefilter && l.prefilter(h, d))
                return;
            if (l.normalize) {
                var b = l.normalize(h, d, e, t);
                b && (e = b[0], t = b[1]);
            }
        }
    }
    h.push(d);
} "regexp" === c(e) && "regexp" === c(t) && (e = e.toString(), t = t.toString()); var g = void 0 === e ? "undefined" : O(e), m = void 0 === t ? "undefined" : O(t), y = "undefined" !== g || f && f[f.length - 1].lhs && f[f.length - 1].lhs.hasOwnProperty(d), v = "undefined" !== m || f && f[f.length - 1].rhs && f[f.length - 1].rhs.hasOwnProperty(d); if (!y && v)
    n(new o(h, t));
else if (!v && y)
    n(new i(h, e));
else if (c(e) !== c(t))
    n(new r(h, e, t));
else if ("date" === c(e) && e - t != 0)
    n(new r(h, e, t));
else if ("object" === g && null !== e && null !== t)
    if (f.filter(function (t) { return t.lhs === e; }).length)
        e !== t && n(new r(h, e, t));
    else {
        if (f.push({ lhs: e, rhs: t }), Array.isArray(e)) {
            var w;
            for (w = 0; w < e.length; w++)
                w >= t.length ? n(new a(h, w, new i(void 0, e[w]))) : u(e[w], t[w], n, l, h, w, f);
            for (; w < t.length;)
                n(new a(h, w, new o(void 0, t[w++])));
        }
        else {
            var S = Object.keys(e), E = Object.keys(t);
            S.forEach(function (r, o) { var i = E.indexOf(r); i >= 0 ? (u(e[r], t[r], n, l, h, r, f), E = s(E, i)) : u(e[r], void 0, n, l, h, r, f); }), E.forEach(function (e) { u(void 0, t[e], n, l, h, e, f); });
        }
        f.length = f.length - 1;
    }
else
    e !== t && ("number" === g && isNaN(e) && isNaN(t) || n(new r(h, e, t))); } function l(e, t, n, r) { return r = r || [], u(e, t, function (e) { e && r.push(e); }, n), r.length ? r : void 0; } function p(e, t, n) { if (e && t && n && n.kind) {
    for (var r = e, o = -1, i = n.path ? n.path.length - 1 : 0; ++o < i;)
        void 0 === r[n.path[o]] && (r[n.path[o]] = "number" == typeof n.path[o] ? [] : {}), r = r[n.path[o]];
    switch (n.kind) {
        case "A":
            !function e(t, n, r) { if (r.path && r.path.length) {
                var o, i = t[n], a = r.path.length - 1;
                for (o = 0; o < a; o++)
                    i = i[r.path[o]];
                switch (r.kind) {
                    case "A":
                        e(i[r.path[o]], r.index, r.item);
                        break;
                    case "D":
                        delete i[r.path[o]];
                        break;
                    case "E":
                    case "N": i[r.path[o]] = r.rhs;
                }
            }
            else
                switch (r.kind) {
                    case "A":
                        e(t[n], r.index, r.item);
                        break;
                    case "D":
                        t = s(t, n);
                        break;
                    case "E":
                    case "N": t[n] = r.rhs;
                } return t; }(n.path ? r[n.path[o]] : r, n.index, n.item);
            break;
        case "D":
            delete r[n.path[o]];
            break;
        case "E":
        case "N": r[n.path[o]] = n.rhs;
    }
} } function d(e) { return "color: " + k[e].color + "; font-weight: bold"; } function f(e, t, n, r) { var o = l(e, t); try {
    r ? n.groupCollapsed("diff") : n.group("diff");
}
catch (e) {
    n.log("diff");
} o ? o.forEach(function (e) { var t = e.kind, r = function (e) { var t = e.path, n = e.lhs, r = e.rhs, o = e.index, i = e.item; switch (e.kind) {
    case "E": return [t.join("."), n, "→", r];
    case "N": return [t.join("."), r];
    case "D": return [t.join(".")];
    case "A": return [t.join(".") + "[" + o + "]", i];
    default: return [];
} }(e); n.log.apply(n, ["%c " + k[t].text, d(t)].concat(S(r))); }) : n.log("—— no diff ——"); try {
    n.groupEnd();
}
catch (e) {
    n.log("—— diff end —— ");
} } function h(e, t, n, r) { switch (void 0 === e ? "undefined" : O(e)) {
    case "object": return "function" == typeof e[r] ? e[r].apply(e, S(n)) : e[r];
    case "function": return e(t);
    default: return e;
} } function b() { var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = Object.assign({}, T, e), n = t.stateTransformer, r = t.errorTransformer, o = t.predicate, i = t.logErrors, a = t.diffPredicate; if (void 0 === t.logger)
    return function () { return function (e) { return function (t) { return e(t); }; }; }; if (e.getState && e.dispatch)
    return console.error("[redux-logger] redux-logger not installed. Make sure to pass logger instance as middleware:\n// Logger with default options\nimport { logger } from 'redux-logger'\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n// Or you can create your own logger with custom options http://bit.ly/redux-logger-options\nimport createLogger from 'redux-logger'\nconst logger = createLogger({\n  // ...options\n});\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n"), function () { return function (e) { return function (t) { return e(t); }; }; }; var s = []; return function (e) { var c = e.getState; return function (e) { return function (u) { if ("function" == typeof o && !o(c, u))
    return e(u); var l = {}; s.push(l), l.started = w.now(), l.startedTime = new Date, l.prevState = n(c()), l.action = u; var p = void 0; if (i)
    try {
        p = e(u);
    }
    catch (e) {
        l.error = r(e);
    }
else
    p = e(u); l.took = w.now() - l.started, l.nextState = n(c()); var d = t.diff && "function" == typeof a ? a(c, u) : t.diff; if (function (e, t) { var n = t.logger, r = t.actionTransformer, o = t.titleFormatter, i = void 0 === o ? function (e) { var t = e.timestamp, n = e.duration; return function (e, r, o) { var i = ["action"]; return i.push("%c" + String(e.type)), t && i.push("%c@ " + r), n && i.push("%c(in " + o.toFixed(2) + " ms)"), i.join(" "); }; }(t) : o, a = t.collapsed, s = t.colors, c = t.level, u = t.diff, l = void 0 === t.titleFormatter; e.forEach(function (o, p) { var d = o.startedTime, b = o.action, g = o.prevState, m = o.error, y = o.took, w = o.nextState, O = e[p + 1]; O && (w = O.prevState, y = O.started - o.started); var S = r(b), E = "function" == typeof a ? a(function () { return w; }, b, o) : a, k = v(d), T = s.title ? "color: " + s.title(S) + ";" : "", _ = ["color: gray; font-weight: lighter;"]; _.push(T), t.timestamp && _.push("color: gray; font-weight: lighter;"), t.duration && _.push("color: gray; font-weight: lighter;"); var j = i(S, k, y); try {
    E ? s.title && l ? n.groupCollapsed.apply(n, ["%c " + j].concat(_)) : n.groupCollapsed(j) : s.title && l ? n.group.apply(n, ["%c " + j].concat(_)) : n.group(j);
}
catch (e) {
    n.log(j);
} var P = h(c, S, [g], "prevState"), x = h(c, S, [S], "action"), C = h(c, S, [m, g], "error"), A = h(c, S, [w], "nextState"); if (P)
    if (s.prevState) {
        var R = "color: " + s.prevState(g) + "; font-weight: bold";
        n[P]("%c prev state", R, g);
    }
    else
        n[P]("prev state", g); if (x)
    if (s.action) {
        var D = "color: " + s.action(S) + "; font-weight: bold";
        n[x]("%c action    ", D, S);
    }
    else
        n[x]("action    ", S); if (m && C)
    if (s.error) {
        var I = "color: " + s.error(m, g) + "; font-weight: bold;";
        n[C]("%c error     ", I, m);
    }
    else
        n[C]("error     ", m); if (A)
    if (s.nextState) {
        var N = "color: " + s.nextState(w) + "; font-weight: bold";
        n[A]("%c next state", N, w);
    }
    else
        n[A]("next state", w); u && f(g, w, n, E); try {
    n.groupEnd();
}
catch (e) {
    n.log("—— log end ——");
} }); }(s, Object.assign({}, t, { diff: d })), s.length = 0, l.error)
    throw l.error; return p; }; }; }; } var g, m, y = function (e, t) { return function (e, t) { return new Array(t + 1).join("0"); }(0, t - e.toString().length) + e; }, v = function (e) { return y(e.getHours(), 2) + ":" + y(e.getMinutes(), 2) + ":" + y(e.getSeconds(), 2) + "." + y(e.getMilliseconds(), 3); }, w = "undefined" != typeof performance && null !== performance && "function" == typeof performance.now ? performance : Date, O = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) { return typeof e; } : function (e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e; }, S = function (e) { if (Array.isArray(e)) {
    for (var t = 0, n = Array(e.length); t < e.length; t++)
        n[t] = e[t];
    return n;
} return Array.from(e); }, E = []; g = "object" === (void 0 === commonjsGlobal ? "undefined" : O(commonjsGlobal)) && commonjsGlobal ? commonjsGlobal : "undefined" != typeof window ? window : {}, (m = g.DeepDiff) && E.push(function () { void 0 !== m && g.DeepDiff === l && (g.DeepDiff = m, m = void 0); }), t(r, n), t(o, n), t(i, n), t(a, n), Object.defineProperties(l, { diff: { value: l, enumerable: !0 }, observableDiff: { value: u, enumerable: !0 }, applyDiff: { value: function (e, t, n) { e && t && u(e, t, function (r) { n && !n(e, t, r) || p(e, t, r); }); }, enumerable: !0 }, applyChange: { value: p, enumerable: !0 }, revertChange: { value: function (e, t, n) { if (e && t && n && n.kind) {
            var r, o, i = e;
            for (o = n.path.length - 1, r = 0; r < o; r++)
                void 0 === i[n.path[r]] && (i[n.path[r]] = {}), i = i[n.path[r]];
            switch (n.kind) {
                case "A":
                    !function e(t, n, r) { if (r.path && r.path.length) {
                        var o, i = t[n], a = r.path.length - 1;
                        for (o = 0; o < a; o++)
                            i = i[r.path[o]];
                        switch (r.kind) {
                            case "A":
                                e(i[r.path[o]], r.index, r.item);
                                break;
                            case "D":
                            case "E":
                                i[r.path[o]] = r.lhs;
                                break;
                            case "N": delete i[r.path[o]];
                        }
                    }
                    else
                        switch (r.kind) {
                            case "A":
                                e(t[n], r.index, r.item);
                                break;
                            case "D":
                            case "E":
                                t[n] = r.lhs;
                                break;
                            case "N": t = s(t, n);
                        } return t; }(i[n.path[r]], n.index, n.item);
                    break;
                case "D":
                case "E":
                    i[n.path[r]] = n.lhs;
                    break;
                case "N": delete i[n.path[r]];
            }
        } }, enumerable: !0 }, isConflict: { value: function () { return void 0 !== m; }, enumerable: !0 }, noConflict: { value: function () { return E && (E.forEach(function (e) { e(); }), E = null), l; }, enumerable: !0 } }); var k = { E: { color: "#2196F3", text: "CHANGED:" }, N: { color: "#4CAF50", text: "ADDED:" }, D: { color: "#F44336", text: "DELETED:" }, A: { color: "#2196F3", text: "ARRAY:" } }, T = { level: "log", logger: console, logErrors: !0, collapsed: void 0, predicate: void 0, duration: !1, timestamp: !0, stateTransformer: function (e) { return e; }, actionTransformer: function (e) { return e; }, errorTransformer: function (e) { return e; }, colors: { title: function () { return "inherit"; }, prevState: function () { return "#9E9E9E"; }, action: function () { return "#03A9F4"; }, nextState: function () { return "#4CAF50"; }, error: function () { return "#F20404"; } }, diff: !1, diffPredicate: void 0, transformer: void 0 }, _ = function () { var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = e.dispatch, n = e.getState; return "function" == typeof t || "function" == typeof n ? b()({ dispatch: t, getState: n }) : void console.error("\n[redux-logger v3] BREAKING CHANGE\n[redux-logger v3] Since 3.0.0 redux-logger exports by default logger with default settings.\n[redux-logger v3] Change\n[redux-logger v3] import createLogger from 'redux-logger'\n[redux-logger v3] to\n[redux-logger v3] import { createLogger } from 'redux-logger'\n"); }; e.defaults = T, e.createLogger = b, e.logger = _, e.default = _, Object.defineProperty(e, "__esModule", { value: !0 }); }(t); }), logger = unwrapExports(reduxLogger), prepareState = function () { var e = { token: "", explained: 0, introduced: 0, registered: !0, directions: [{ component: "LOGIN", url: "/login" }] }, t = chunk_fe10219c_js_1.e.getItem("token"); return Object.assign({}, e, { token: t || e.token, explained: +chunk_fe10219c_js_1.e.getItem("explained") || +e.explained, introduced: +chunk_fe10219c_js_1.e.getItem("introduced") || +e.introduced, directions: t && e.directions.concat([{ component: "DRAWER", url: "/" }]) || e.directions }); }, session = function (e, t) { switch (void 0 === e && (e = prepareState()), t.type) {
    case chunk_c46efb37_js_1.b.SKIP_INTRO: return Object.assign({}, e, { introduced: t.introduced });
    case chunk_c46efb37_js_1.b.SKIP_TOUR: return Object.assign({}, e, { explained: t.explained });
    case chunk_c46efb37_js_1.b.SET_TOKEN: return Object.assign({}, e, { token: t.token, directions: e.directions.concat([t.directions]) });
    case chunk_c46efb37_js_1.b.REVOKE_TOKEN: return Object.assign({}, e, { token: t.token, directions: [t.directions] });
    case chunk_c46efb37_js_1.b.OPEN_REGISTER: return Object.assign({}, e, { registered: t.registered, directions: e.directions.concat([t.directions]) });
    case chunk_c46efb37_js_1.b.CLOSE_REGISTER: return Object.assign({}, e, { registered: t.registered, directions: [t.directions] });
    case chunk_c46efb37_js_1.b.OPEN: return Object.assign({}, e, { directions: t.directions ? e.directions.concat([t.directions]) : e.directions.slice() });
    case chunk_c46efb37_js_1.b.CLOSE: return Object.assign({}, e, { directions: e.directions.slice(0, -1) });
    case chunk_c46efb37_js_1.b.OPEN_PROFILE: return Object.assign({}, e, { profile: t.profile });
} return e; }, prepareState$1 = function () { return Object.assign({}, { orders: [], bids: [] }); }, customer = function (e, t) { switch (void 0 === e && (e = prepareState$1()), t.type) {
    case chunk_c46efb37_js_1.b.REGISTER_ORDER: return Object.assign({}, e);
    case chunk_c46efb37_js_1.b.MY_ORDERS: return Object.assign({}, e, { orders: t.orders });
    case chunk_c46efb37_js_1.b.ORDER_BIDS: return Object.assign({}, e, { bids: t.bids });
    case chunk_c46efb37_js_1.b.ORDER_MERCHANT: return Object.assign({}, e);
} return e; }, prepareState$2 = function () { return Object.assign({}, { orders: [] }); }, merchant = function (e, t) { switch (void 0 === e && (e = prepareState$2()), t.type) {
    case chunk_c46efb37_js_1.b.SELECT_ORDER:
    case chunk_c46efb37_js_1.b.CANCEL_ORDER:
    case chunk_c46efb37_js_1.b.START_ORDER: return Object.assign({}, e);
    case chunk_c46efb37_js_1.b.SHOW_ORDER: return Object.assign({}, e, { orders: t.orders });
    case chunk_c46efb37_js_1.b.PLACE_ORDER: return Object.assign({}, e, { orderId: t.orderId });
    case chunk_c46efb37_js_1.b.MERCHANT_ORDERS: return Object.assign({}, e, { orders: t.orders });
} return e; }, rootReducer = combineReducers({ session: session, customer: customer, merchant: merchant }), reduxDevtoolsExtension = createCommonjsModule(function (e, t) { var n = redux.compose; t.__esModule = !0, t.composeWithDevTools = "undefined" != typeof window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : function () { if (0 !== arguments.length)
    return "object" == typeof arguments[0] ? n : n.apply(null, arguments); }, t.devToolsEnhancer = "undefined" != typeof window && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__ : function () { return function (e) { return e; }; }; });
unwrapExports(reduxDevtoolsExtension);
var reduxDevtoolsExtension_1 = reduxDevtoolsExtension.composeWithDevTools, reduxDevtoolsExtension_2 = reduxDevtoolsExtension.devToolsEnhancer, configureStore = function (e) { return createStore(rootReducer, e, reduxDevtoolsExtension_1(applyMiddleware(logger, thunk))); }, App = function () { function e() { this._store = configureStore({}); } return e.prototype.startTimer = function () { var e = this, t = this._store.getState(); this._store.subscribe(function () { t = e._store.getState(); }), setInterval(function () { var n = t.session.token; "" !== n && e.pendingActions(t).forEach(function (t) { return tslib_1.__awaiter(e, void 0, void 0, function () { var e, r; return tslib_1.__generator(this, function (o) { switch (o.label) {
    case 0: return r = (e = this._store).dispatch, [4, t(n)];
    case 1: return [2, r.apply(e, [o.sent()])];
} }); }); }); }, 5e3); }, e.parseJwt = function (e) { var t = e.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"); return JSON.parse(window.atob(t)); }, e.prototype.updateMapDrawer = function (e, t, n) { var r = []; return "CUSTOMER" === e ? t.orders.length >= 0 && r.push(chunk_b29ff8f0_js_1.b) : "MERCHANT" === e && n.orders.length >= 0 && r.push(chunk_3c944ae9_js_1.a), r; }, e.prototype.pendingActions = function (t) { var n = t.customer, r = t.merchant, o = t.session, i = o.directions, a = e.parseJwt(o.token)._role; return "DRAWER" === i.slice(-1)[0].component ? this.updateMapDrawer(a, n, r) : []; }, e; }(), SplashScreen = chunk_b5dfde61_js_1.a.SplashScreen, AppRoot = function () { function e() { } return e.prototype.componentWillLoad = function () { return tslib_1.__awaiter(this, void 0, void 0, function () { return tslib_1.__generator(this, function (e) { return this.app = new App, this.app.startTimer(), this.store.setStore(this.app._store), this.store.mapStateToProps(this, function (e) { var t = e.session; return { token: t.token, explained: t.explained }; }), this.store.mapDispatchToProps(this, { toggleTour: chunk_fe10219c_js_1.f }), [2]; }); }); }, e.prototype.componentDidLoad = function () { return tslib_1.__awaiter(this, void 0, void 0, function () { return tslib_1.__generator(this, function (e) { switch (e.label) {
    case 0: this.checkLoginStatus(), e.label = 1;
    case 1: return e.trys.push([1, 3, , 4]), [4, SplashScreen.hide()];
    case 2: return e.sent(), [3, 4];
    case 3: return e.sent(), [2];
    case 4: return [2];
} }); }); }, e.prototype.checkLoginStatus = function () { return Boolean(this.token); }, e.prototype.checkExplainedStatus = function () { return Boolean(this.explained); }, e.prototype.render = function () { var e = this; return clipper_core_js_1.h("ion-app", null, this.checkLoginStatus() ? this.checkExplainedStatus() ? clipper_core_js_1.h("app-drawer", null) : clipper_core_js_1.h("generic-carousel", null, clipper_core_js_1.h("ion-slide", { slot: "slide1" }, clipper_core_js_1.h("div", { class: "slide-image-container" }, clipper_core_js_1.h("img", { src: "assets/img/tour_1_clipper.svg", class: "slide-image" })), clipper_core_js_1.h("h2", { class: "slide-title" }, "Bem-vindo ao ", clipper_core_js_1.h("b", null, "Shipping")), clipper_core_js_1.h("p", null, "O ", clipper_core_js_1.h("b", null, "Shipping"), " é um aplicativo de serviços de mudança e fretagem, simples, prático e rápido. Esta é uma versão para testes - poderá ter alguns problemas e pedimos sua compreensão. Pressione em continuar."), clipper_core_js_1.h("ion-button", { fill: "clear", href: "#", onClick: function () { return e.toggleTour(!0); } }, "Continuar", clipper_core_js_1.h("ion-icon", { slot: "end", name: "arrow-forward" })))) : clipper_core_js_1.h("app-entrance", null)); }, Object.defineProperty(e, "is", { get: function () { return "app-root"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "properties", { get: function () { return { explained: { state: !0 }, store: { context: "store" }, token: { state: !0 } }; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "style", { get: function () { return ""; }, enumerable: !0, configurable: !0 }), e; }(), PageTabs = function () { function e() { this.hasTabs = !0; } return e.prototype.componentWillLoad = function () { this.store.mapStateToProps(this, function (e) { return { directions: e.session.directions }; }), this.store.mapDispatchToProps(this, { open: chunk_fe10219c_js_1.d }); }, e.prototype.componentDidLoad = function () { return tslib_1.__awaiter(this, void 0, void 0, function () { var e; return tslib_1.__generator(this, function (t) { switch (t.label) {
    case 0: return [4, this.menuCtrl.componentOnReady()];
    case 1: return e = t.sent(), [4, this.tabCtrl.componentOnReady()];
    case 2: return t.sent().select("tab-drawer"), document.querySelector("ion-tabs").select("tab-drawer"), e.enable(!0), [2];
} }); }); }, e.prototype.select = function (e) { return tslib_1.__awaiter(this, void 0, void 0, function () { return tslib_1.__generator(this, function (t) { switch (t.label) {
    case 0: return [4, this.tabCtrl.componentOnReady()];
    case 1: return t.sent().select("tab-" + e), [2];
} }); }); }, e.prototype.toggleOpen = function (e) { this.open(e.toUpperCase(), "/" + e); }, e.prototype.render = function () { var e = this; return [clipper_core_js_1.h("ion-tabs", null, clipper_core_js_1.h("slot", null), [clipper_core_js_1.h("ion-tab", { tab: "tab-drawer", component: "app-map" }), clipper_core_js_1.h("ion-tab", { tab: "tab-schedule", component: "page-schedule" }), clipper_core_js_1.h("ion-tab", { tab: "tab-create", component: "page-create" }), clipper_core_js_1.h("ion-tab", { tab: "tab-speakers", component: "page-order-list" }), clipper_core_js_1.h("ion-tab", { tab: "tab-about", component: "page-about" })], clipper_core_js_1.h("ion-tab-bar", { slot: "bottom" }, "CUSTOMER" === this.role && [clipper_core_js_1.h("ion-tab-button", { tab: "tab-create", onClick: function () { return e.toggleOpen("create"); } }, clipper_core_js_1.h("ion-icon", { name: "cube" }), clipper_core_js_1.h("ion-label", null, "Criar")), clipper_core_js_1.h("ion-tab-button", { tab: "tab-speakers", onClick: function () { return e.toggleOpen("speakers"); } }, clipper_core_js_1.h("ion-icon", { name: "cash" }), clipper_core_js_1.h("ion-label", null, "Ofertas")), clipper_core_js_1.h("ion-tab-button", { tab: "tab-schedule", onClick: function () { return e.toggleOpen("schedule"); } }, clipper_core_js_1.h("ion-icon", { name: "calendar" }), clipper_core_js_1.h("ion-label", null, "Fretes"))], "MERCHANT" === this.role && [clipper_core_js_1.h("ion-tab-button", { tab: "tab-speakers", onClick: function () { return e.toggleOpen("speakers"); } }, clipper_core_js_1.h("ion-icon", { name: "cash" }), clipper_core_js_1.h("ion-label", null, "Ofertar")), clipper_core_js_1.h("ion-tab-button", { tab: "tab-schedule", onClick: function () { return e.toggleOpen("schedule"); } }, clipper_core_js_1.h("ion-icon", { name: "calendar" }), clipper_core_js_1.h("ion-label", null, "Fretes")), clipper_core_js_1.h("ion-tab-button", { tab: "tab-about", onClick: function () { return e.toggleOpen("about"); } }, clipper_core_js_1.h("ion-icon", { name: "information-circle" }), clipper_core_js_1.h("ion-label", null, "Sobre"))]))]; }, Object.defineProperty(e, "is", { get: function () { return "page-tabs"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "properties", { get: function () { return { directions: { state: !0 }, hasTabs: { type: Boolean, attr: "has-tabs" }, menuCtrl: { connect: "ion-menu-controller" }, role: { type: "Any", attr: "role" }, select: { method: !0 }, store: { context: "store" }, tabCtrl: { connect: "ion-tabs" } }; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "style", { get: function () { return ""; }, enumerable: !0, configurable: !0 }), e; }(), App$1 = function () { function e() { } return e.prototype.componentDidLoad = function () { var e = this; chunk_e658e8b7_js_1.d(function () { var t = e.win, n = e.config, r = e.queue; n.getBoolean("_testing") || importTapClick(t, n), importInputShims(t, n), importStatusTap(t, n, r), importHardwareBackButton(t, n), importFocusVisible(t); }); }, e.prototype.hostData = function () { var e; return { class: (e = {}, e["" + this.mode] = !0, e["ion-page"] = !0, e["force-statusbar-padding"] = this.config.getBoolean("_forceStatusbarPadding"), e) }; }, Object.defineProperty(e, "is", { get: function () { return "ion-app"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "properties", { get: function () { return { config: { context: "config" }, el: { elementRef: !0 }, queue: { context: "queue" }, win: { context: "window" } }; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "style", { get: function () { return "html.plt-mobile ion-app{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}ion-app.force-statusbar-padding{--ion-safe-area-top:20px}"; }, enumerable: !0, configurable: !0 }), e; }();
exports.AppRoot = AppRoot;
exports.PageTabs = PageTabs;
exports.IonApp = App$1;
function importHardwareBackButton(e, t) { t.getBoolean("hardwareBackButton", chunk_3beb47a5_js_1.a(e, "hybrid")) && Promise.resolve().then(function () { return require("./chunk-a6c44155.js"); }).then(function (t) { return t.startHardwareBackButton(e); }); }
function importStatusTap(e, t, n) { t.getBoolean("statusTap", chunk_3beb47a5_js_1.a(e, "hybrid")) && Promise.resolve().then(function () { return require("./chunk-582d8c19.js"); }).then(function (t) { return t.startStatusTap(e, n); }); }
function importFocusVisible(e) { Promise.resolve().then(function () { return require("./chunk-6fb8e8d5.js"); }).then(function (t) { return t.startFocusVisible(e.document); }); }
function importTapClick(e, t) { Promise.resolve().then(function () { return require("./chunk-e5b9ec6b.js"); }).then(function (n) { return n.startTapClick(e.document, t); }); }
function importInputShims(e, t) { t.getBoolean("inputShims", needInputShims(e)) && Promise.resolve().then(function () { return require("./chunk-c23fa9d7.js"); }).then(function (n) { return n.startInputShims(e.document, t); }); }
function needInputShims(e) { return chunk_3beb47a5_js_1.a(e, "ios") && chunk_3beb47a5_js_1.a(e, "mobile"); }
var Avatar = function () { function e() { } return e.prototype.hostData = function () { var e; return { class: (e = {}, e["" + this.mode] = !0, e) }; }, e.prototype.render = function () { return clipper_core_js_1.h("slot", null); }, Object.defineProperty(e, "is", { get: function () { return "ion-avatar"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "encapsulation", { get: function () { return "shadow"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "style", { get: function () { return ":host{border-radius:var(--border-radius);display:block}::slotted(img),::slotted(ion-img){border-radius:var(--border-radius);width:100%;height:100%;-o-object-fit:cover;object-fit:cover;overflow:hidden}:host{--border-radius:50%;width:48px;height:48px}"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "styleMode", { get: function () { return "ios"; }, enumerable: !0, configurable: !0 }), e; }(), SPLIT_PANE_MAIN = "split-pane-main", SPLIT_PANE_SIDE = "split-pane-side", QUERY = { xs: "(min-width: 0px)", sm: "(min-width: 576px)", md: "(min-width: 768px)", lg: "(min-width: 992px)", xl: "(min-width: 1200px)", never: "" }, SplitPane = function () { function e() { this.visible = !1, this.disabled = !1, this.when = QUERY.lg; } return e.prototype.visibleChanged = function (e) { var t = { visible: e, isPane: this.isPane.bind(this) }; this.ionSplitPaneVisible.emit(t); }, e.prototype.componentDidLoad = function () { this.styleChildren(), this.updateState(); }, e.prototype.componentDidUnload = function () { this.rmL && (this.rmL(), this.rmL = void 0); }, e.prototype.updateState = function () { var e = this; if (!this.isServer)
    if (this.rmL && (this.rmL(), this.rmL = void 0), this.disabled)
        this.visible = !1;
    else {
        var t = this.when;
        if ("boolean" != typeof t) {
            var n = QUERY[t] || t;
            if (0 !== n.length) {
                if (this.win.matchMedia) {
                    var r = function (t) { e.visible = t.matches; }, o = this.win.matchMedia(n);
                    o.addListener(r), this.rmL = function () { return o.removeListener(r); }, this.visible = o.matches;
                }
            }
            else
                this.visible = !1;
        }
        else
            this.visible = t;
    } }, e.prototype.isPane = function (e) { return !!this.visible && e.parentElement === this.el && e.classList.contains(SPLIT_PANE_SIDE); }, e.prototype.styleChildren = function () { if (!this.isServer) {
    for (var e = this.contentId, t = this.el.children, n = this.el.childElementCount, r = !1, o = 0; o < n; o++) {
        var i = t[o], a = void 0 !== e ? i.id === e : i.hasAttribute("main");
        if (a) {
            if (r)
                return void console.warn("split pane cannot have more than one main node");
            r = !0;
        }
        setPaneClass(i, a);
    }
    r || console.warn("split pane does not have a specified main node");
} }, e.prototype.hostData = function () { var e; return { class: (e = {}, e["" + this.mode] = !0, e["split-pane-" + this.mode] = !0, e["split-pane-visible"] = this.visible, e) }; }, Object.defineProperty(e, "is", { get: function () { return "ion-split-pane"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "properties", { get: function () { return { contentId: { type: String, attr: "content-id" }, disabled: { type: Boolean, attr: "disabled", watchCallbacks: ["updateState"] }, el: { elementRef: !0 }, isServer: { context: "isServer" }, visible: { state: !0, watchCallbacks: ["visibleChanged"] }, when: { type: "Any", attr: "when", watchCallbacks: ["updateState"] }, win: { context: "window" } }; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "events", { get: function () { return [{ name: "ionSplitPaneVisible", method: "ionSplitPaneVisible", bubbles: !0, cancelable: !0, composed: !0 }]; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "style", { get: function () { return "ion-split-pane{left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:absolute;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:nowrap;flex-wrap:nowrap;contain:strict}.split-pane-visible>.split-pane-main,.split-pane-visible>.split-pane-side{left:0;right:0;top:0;bottom:0;position:relative;-ms-flex:1;flex:1;-webkit-box-shadow:none!important;box-shadow:none!important;z-index:0}.split-pane-visible>.split-pane-side:not(ion-menu),.split-pane-visible>ion-menu.split-pane-side.menu-enabled{display:-ms-flexbox;display:flex;-ms-flex-negative:0;flex-shrink:0}.split-pane-side:not(ion-menu){display:none}.split-pane-visible>.split-pane-side{-ms-flex-order:-1;order:-1}.split-pane-visible>.split-pane-side[side=end]{-ms-flex-order:1;order:1}.split-pane-ios{--border:0.55px solid var(--ion-item-border-color,var(--ion-border-color,var(--ion-color-step-150,#c8c7cc)))}.split-pane-ios.split-pane-visible>.split-pane-side{min-width:270px;max-width:28%;border-right:var(--border);border-left:0}.split-pane-ios.split-pane-visible>.split-pane-side[side=end]{min-width:270px;max-width:28%;border-right:0;border-left:var(--border)}"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "styleMode", { get: function () { return "ios"; }, enumerable: !0, configurable: !0 }), e; }();
exports.IonAvatar = Avatar;
exports.IonSplitPane = SplitPane;
function setPaneClass(e, t) { var n, r; t ? (n = SPLIT_PANE_MAIN, r = SPLIT_PANE_SIDE) : (n = SPLIT_PANE_SIDE, r = SPLIT_PANE_MAIN); var o = e.classList; o.add(n), o.remove(r); }
var TabBar = function () { function e() { this.keyboardVisible = !1, this.translucent = !1; } return e.prototype.selectedTabChanged = function () { this.ionTabBarChanged.emit({ tab: this.selectedTab }); }, e.prototype.onKeyboardWillHide = function () { var e = this; setTimeout(function () { return e.keyboardVisible = !1; }, 50); }, e.prototype.onKeyboardWillShow = function () { "top" !== this.el.getAttribute("slot") && (this.keyboardVisible = !0); }, e.prototype.componentWillLoad = function () { this.selectedTabChanged(); }, e.prototype.hostData = function () { var e, t = this.translucent, n = this.keyboardVisible; return { role: "tablist", "aria-hidden": n ? "true" : null, class: Object.assign({}, chunk_c82b670d_js_1.c(this.color), (e = {}, e["" + this.mode] = !0, e["tab-bar-translucent"] = t, e["tab-bar-hidden"] = n, e)) }; }, e.prototype.render = function () { return clipper_core_js_1.h("slot", null); }, Object.defineProperty(e, "is", { get: function () { return "ion-tab-bar"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "encapsulation", { get: function () { return "shadow"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "properties", { get: function () { return { color: { type: String, attr: "color" }, doc: { context: "document" }, el: { elementRef: !0 }, keyboardVisible: { state: !0 }, mode: { type: String, attr: "mode" }, queue: { context: "queue" }, selectedTab: { type: String, attr: "selected-tab", watchCallbacks: ["selectedTabChanged"] }, translucent: { type: Boolean, attr: "translucent" } }; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "events", { get: function () { return [{ name: "ionTabBarChanged", method: "ionTabBarChanged", bubbles: !0, cancelable: !0, composed: !0 }]; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "listeners", { get: function () { return [{ name: "window:keyboardWillHide", method: "onKeyboardWillHide" }, { name: "window:keyboardWillShow", method: "onKeyboardWillShow" }]; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "style", { get: function () { return ":host{padding-left:var(--ion-safe-area-left);padding-right:var(--ion-safe-area-right);display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:auto;padding-bottom:var(--ion-safe-area-bottom,0);border-top:var(--border);background:var(--background);color:var(--color);text-align:center;contain:strict;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:10;-webkit-box-sizing:content-box!important;box-sizing:content-box!important}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--ion-safe-area-left);padding-inline-start:var(--ion-safe-area-left);-webkit-padding-end:var(--ion-safe-area-right);padding-inline-end:var(--ion-safe-area-right)}}:host(.ion-color),:host(.ion-color) ::slotted(ion-tab-button){background:var(--ion-color-base);color:rgba(var(--ion-color-contrast-rgb),.7)}:host(.ion-color) ::slotted(ion-tab-button){--background-focused:var(--ion-color-shade);--color-selected:var(--ion-color-contrast)}:host(.ion-color) ::slotted(.tab-selected){color:var(--ion-color-contrast)}:host([slot=top]){padding-bottom:0;border-top:0;border-bottom:var(--border)}:host(.tab-bar-hidden){display:none!important}:host{--background:var(--ion-tab-bar-background,var(--ion-background-color,#fff));--background-focused:var(--ion-tab-bar-background-focused,#e0e0e0);--border:0.55px solid var(--ion-tab-bar-border-color,var(--ion-border-color,var(--ion-color-step-150,rgba(0,0,0,0.2))));--color:var(--ion-tab-bar-color,var(--ion-color-step-450,#8c8c8c));--color-selected:var(--ion-tab-bar-color-activated,var(--ion-color-primary,#3880ff));height:50px}:host(.tab-bar-translucent){--background:rgba(var(--ion-background-color-rgb,255,255,255),0.8);-webkit-backdrop-filter:saturate(210%) blur(20px);backdrop-filter:saturate(210%) blur(20px)}:host(.ion-color.tab-bar-translucent){background:rgba(var(--ion-color-base-rgb),.8)}:host(.tab-bar-translucent) ::slotted(ion-tab-button){background:transparent}"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "styleMode", { get: function () { return "ios"; }, enumerable: !0, configurable: !0 }), e; }(), TabButton = function () { function e() { this.selected = !1, this.disabled = !1; } return e.prototype.onTabBarChanged = function (e) { this.selected = this.tab === e.detail.tab; }, e.prototype.onClick = function (e) { void 0 !== this.tab && (this.disabled || this.ionTabButtonClick.emit({ tab: this.tab, href: this.href, selected: this.selected }), e.preventDefault()); }, e.prototype.componentWillLoad = function () { void 0 === this.layout && (this.layout = this.config.get("tabButtonLayout", "icon-top")); }, Object.defineProperty(e.prototype, "hasLabel", { get: function () { return !!this.el.querySelector("ion-label"); }, enumerable: !0, configurable: !0 }), Object.defineProperty(e.prototype, "hasIcon", { get: function () { return !!this.el.querySelector("ion-icon"); }, enumerable: !0, configurable: !0 }), e.prototype.hostData = function () { var e, t = this, n = t.disabled, r = t.hasIcon, o = t.hasLabel, i = t.layout, a = t.selected, s = t.tab; return { role: "tab", "aria-selected": a ? "true" : null, id: void 0 !== s ? "tab-button-" + s : null, class: (e = {}, e["" + this.mode] = !0, e["tab-selected"] = a, e["tab-disabled"] = n, e["tab-has-label"] = o, e["tab-has-icon"] = r, e["tab-has-label-only"] = o && !r, e["tab-has-icon-only"] = r && !o, e["tab-layout-" + i] = !0, e["ion-activatable"] = !0, e) }; }, e.prototype.render = function () { var e = this.mode; return clipper_core_js_1.h("a", { href: this.href }, clipper_core_js_1.h("slot", null), "md" === e && clipper_core_js_1.h("ion-ripple-effect", { type: "unbounded" })); }, Object.defineProperty(e, "is", { get: function () { return "ion-tab-button"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "encapsulation", { get: function () { return "shadow"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "properties", { get: function () { return { config: { context: "config" }, disabled: { type: Boolean, attr: "disabled" }, doc: { context: "document" }, el: { elementRef: !0 }, href: { type: String, attr: "href" }, layout: { type: String, attr: "layout", mutable: !0 }, mode: { type: String, attr: "mode" }, queue: { context: "queue" }, selected: { type: Boolean, attr: "selected", mutable: !0 }, tab: { type: String, attr: "tab" } }; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "events", { get: function () { return [{ name: "ionTabButtonClick", method: "ionTabButtonClick", bubbles: !0, cancelable: !0, composed: !0 }]; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "listeners", { get: function () { return [{ name: "parent:ionTabBarChanged", method: "onTabBarChanged" }, { name: "click", method: "onClick" }]; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "style", { get: function () { return ":host{--ripple-color:var(--color-selected);-ms-flex:1;flex:1;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;background:var(--background);color:var(--color)}:host,a{height:100%}a{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:var(--padding-start);padding-right:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;display:-ms-flexbox;display:flex;position:relative;-ms-flex-direction:inherit;flex-direction:inherit;-ms-flex-align:inherit;align-items:inherit;-ms-flex-pack:inherit;justify-content:inherit;width:100%;border:0;outline:none;background:transparent;text-decoration:none;cursor:pointer;overflow:hidden;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-user-drag:none}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){a{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end)}}a:focus-visible{background:var(--background-focused)}\@media (any-hover:hover){a:hover{color:var(--color-selected)}}:host(.tab-selected){color:var(--color-selected)}:host(.tab-hidden){display:none!important}:host(.tab-disabled){pointer-events:none;opacity:.4}::slotted(ion-icon),::slotted(ion-label){display:block;-ms-flex-item-align:center;align-self:center;max-width:100%;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;-webkit-box-sizing:border-box;box-sizing:border-box}::slotted(ion-label){-ms-flex-order:0;order:0}::slotted(ion-icon){-ms-flex-order:-1;order:-1;height:1em}:host(.tab-has-label-only) ::slotted(ion-label){white-space:normal}::slotted(ion-badge){-webkit-box-sizing:border-box;box-sizing:border-box;position:absolute;z-index:1}:host(.tab-layout-icon-start){-ms-flex-direction:row;flex-direction:row}:host(.tab-layout-icon-end){-ms-flex-direction:row-reverse;flex-direction:row-reverse}:host(.tab-layout-icon-bottom){-ms-flex-direction:column-reverse;flex-direction:column-reverse}:host(.tab-layout-icon-hide) ::slotted(ion-icon),:host(.tab-layout-label-hide) ::slotted(ion-label){display:none}ion-ripple-effect{color:var(--ripple-color)}:host{--padding-top:0;--padding-end:2px;--padding-bottom:0;--padding-start:2px;max-width:240px;font-size:10px}:host(.tab-has-label-only) ::slotted(ion-label){margin-left:0;margin-right:0;margin-top:2px;margin-bottom:2px;font-size:12px;font-size:14px;line-height:1.1}::slotted(ion-badge){padding-left:6px;padding-right:6px;padding-top:1px;padding-bottom:1px;left:calc(50% + 6px);top:4px;height:auto;font-size:12px;line-height:16px}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){::slotted(ion-badge){padding-left:unset;padding-right:unset;-webkit-padding-start:6px;padding-inline-start:6px;-webkit-padding-end:6px;padding-inline-end:6px}}:host-context([dir=rtl]) ::slotted(ion-badge){right:calc(50% + 6px)}::slotted(ion-icon){margin-top:4px;font-size:30px}::slotted(ion-icon:before){vertical-align:top}::slotted(ion-label){margin-top:0;margin-bottom:1px;min-height:11px}:host(.tab-layout-icon-end) ::slotted(ion-label),:host(.tab-layout-icon-hide) ::slotted(ion-label),:host(.tab-layout-icon-start) ::slotted(ion-label){margin-top:2px;margin-bottom:2px;font-size:14px;line-height:1.1}:host(.tab-layout-icon-end) ::slotted(ion-icon),:host(.tab-layout-icon-start) ::slotted(ion-icon){min-width:24px;height:26px;margin-top:2px;margin-bottom:1px;font-size:24px}:host(.tab-layout-icon-bottom) ::slotted(ion-badge){left:calc(50% + 12px)}:host([dir=rtl].tab-layout-icon-bottom) ::slotted(ion-badge){right:calc(50% + 12px)}:host(.tab-layout-icon-bottom) ::slotted(ion-icon){margin-top:0;margin-bottom:1px}:host(.tab-layout-icon-bottom) ::slotted(ion-label){margin-top:4px}:host(.tab-layout-icon-end) ::slotted(ion-badge),:host(.tab-layout-icon-start) ::slotted(ion-badge){left:calc(50% + 35px);top:10px}:host([dir=rtl].tab-layout-icon-end) ::slotted(ion-badge),:host([dir=rtl].tab-layout-icon-start) ::slotted(ion-badge){right:calc(50% + 35px)}:host(.tab-has-label-only) ::slotted(ion-badge),:host(.tab-layout-icon-hide) ::slotted(ion-badge){left:calc(50% + 30px);top:10px}:host([dir=rtl].tab-has-label-only) ::slotted(ion-badge),:host([dir=rtl].tab-layout-icon-hide) ::slotted(ion-badge){right:calc(50% + 30px)}:host(.tab-has-icon-only) ::slotted(ion-badge),:host(.tab-layout-label-hide) ::slotted(ion-badge){top:10px}:host(.tab-layout-label-hide) ::slotted(ion-icon){margin-left:0;margin-right:0;margin-top:0;margin-bottom:0}"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "styleMode", { get: function () { return "ios"; }, enumerable: !0, configurable: !0 }), e; }();
exports.IonTabBar = TabBar;
exports.IonTabButton = TabButton;
