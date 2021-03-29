"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("../polyfills/tslib.js");
var clipper_core_js_1 = require("../clipper.core.js");
require("./chunk-c46efb37.js");
var chunk_fe10219c_js_1 = require("./chunk-fe10219c.js");
var chunk_e658e8b7_js_1 = require("./chunk-e658e8b7.js");
var chunk_0844be35_js_1 = require("./chunk-0844be35.js");
var PageAccount = function () { function t() { this.submitted = !1, this.username = { valid: !1, value: "" }, this.password = { valid: !1, value: "" }, this.data = {}; } return t.prototype.componentWillLoad = function () { this.store.mapStateToProps(this, function (t) { var e = t.session; return { token: e.token, profile: e.profile }; }), this.store.mapDispatchToProps(this, { updateProfile: chunk_fe10219c_js_1.o }); }, t.prototype.handleInput = function (t) { this.data[t.target.name] = t.target.value; }, t.prototype.handleRadio = function (t) { this.data[t.target.name] = [t.target.value]; }, t.prototype.handleFile = function (t) { this.data.files = [t[0]]; }, t.prototype.handleAddress = function (t) { this.data.address = { street: t.target.value }; }, t.prototype.handleUsername = function (t) { this.validateUsername(), this.username = Object.assign({}, this.username, { value: t.target.value }); }, t.prototype.handlePassword = function (t) { this.validatePassword(), this.password.value = t.target.value, this.password = Object.assign({}, this.password, { value: t.target.value }); }, t.prototype.validateUsername = function () { this.username = this.username.value && this.username.value.length > 0 ? Object.assign({}, this.username, { valid: !0 }) : Object.assign({}, this.username, { valid: !1 }); }, t.prototype.validatePassword = function () { if (this.password.value && this.password.value.length > 0)
    return this.password.valid = !0, void (this.password = Object.assign({}, this.password, { valid: !0 })); this.password = Object.assign({}, this.password, { valid: !1 }); }, t.prototype.unload = function (t) { t.preventDefault(), this.exit(); }, t.prototype.submit = function (t) { return tslib_1.__awaiter(this, void 0, void 0, function () { var e; return tslib_1.__generator(this, function (n) { switch (n.label) {
    case 0: return t.preventDefault(), e = Object.assign({}, this.data, { username: "" !== this.username.value ? this.username.value : this.profile.username }), [4, this.updateProfile(e, this.token)];
    case 1: return n.sent(), [4, this.toastCtrl.create({ message: "Perfil atualizado com sucesso.", duration: 3e3 })];
    case 2: return n.sent().present(), [2];
} }); }); }, t.prototype.render = function () { var t = this; return [clipper_core_js_1.h("ion-header", null, clipper_core_js_1.h("ion-toolbar", null, clipper_core_js_1.h("ion-buttons", { slot: "start" }, clipper_core_js_1.h("ion-menu-button", null), clipper_core_js_1.h("ion-back-button", null)), clipper_core_js_1.h("ion-title", null, "Conta"))), clipper_core_js_1.h("ion-content", null, clipper_core_js_1.h("ion-list", null, clipper_core_js_1.h("div", { "padding-top": !0, "text-center": !0 }, clipper_core_js_1.h("img", { src: this.profile.hasOwnProperty("pictures") && this.profile.pictures.length > 0 ? this.profile.pictures[0] : "http://www.gravatar.com/avatar?d=mm&s=140", style: { maxHeight: "120px" }, alt: "avatar" }), clipper_core_js_1.h("h2", null, this.profile.name, " (", this.profile.username, ")"), clipper_core_js_1.h("ion-list", null, clipper_core_js_1.h("ion-item", null, clipper_core_js_1.h("ion-label", { position: "stacked" }, "Atualize seu nome completo"), clipper_core_js_1.h("ion-input", { placeholder: this.profile.name, name: "name", onInput: function (e) { return t.handleInput(e); } })), clipper_core_js_1.h("ion-item", null, clipper_core_js_1.h("ion-label", { position: "stacked" }, "Atualize seu endereço"), clipper_core_js_1.h("ion-input", { placeholder: this.profile.address.street, name: "address", onInput: function (e) { return t.handleAddress(e); } })), clipper_core_js_1.h("ion-item", null, clipper_core_js_1.h("ion-label", { position: "stacked" }, "Atualize seu telefone para contato"), clipper_core_js_1.h("ion-input", { placeholder: this.profile.phone, name: "phone", onInput: function (e) { return t.handleInput(e); } })), clipper_core_js_1.h("ion-item", null, clipper_core_js_1.h("ion-label", { position: "stacked" }, "Substituir imagem"), clipper_core_js_1.h("image-uploader", { send: function (e) { return t.handleFile(e); }, id: "file" })), clipper_core_js_1.h("ion-item", null, clipper_core_js_1.h("ion-label", { position: "stacked" }, "Atualize seu e-mail para o login"), clipper_core_js_1.h("ion-input", { placeholder: this.profile.email, name: "email", onInput: function (e) { return t.handleInput(e); } })), clipper_core_js_1.h("ion-item", null, clipper_core_js_1.h("ion-label", { position: "stacked" }, "Atualize o nome de usuário"), clipper_core_js_1.h("ion-input", { placeholder: this.profile.username, name: "username", type: "text", value: this.username.value, onInput: function (e) { return t.handleUsername(e); }, required: !0 })), clipper_core_js_1.h("ion-text", { color: "danger" }, clipper_core_js_1.h("p", { hidden: this.username.valid || !1 === this.submitted, "padding-left": !0 }, "Nome do usuário é requerido")), clipper_core_js_1.h("ion-button", { style: { flex: "1" }, onClick: function (e) { return t.submit(e); }, color: "primary", expand: "block" }, "Atualizar")))))]; }, Object.defineProperty(t, "is", { get: function () { return "page-account"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(t, "properties", { get: function () { return { alertCtrl: { connect: "ion-alert-controller" }, data: { state: !0 }, exit: { type: "Any", attr: "exit" }, images: { type: "Any", attr: "images" }, nav: { connect: "ion-router" }, password: { state: !0 }, profile: { state: !0 }, store: { context: "store" }, submitted: { state: !0 }, toastCtrl: { connect: "ion-toast-controller" }, token: { state: !0 }, username: { state: !0 } }; }, enumerable: !0, configurable: !0 }), t; }(), Route = function () { function t() { this.url = ""; } return t.prototype.onUpdate = function (t) { this.ionRouteDataChanged.emit(t); }, t.prototype.onComponentProps = function (t, e) { if (t !== e) {
    var n = t ? Object.keys(t) : [], r = e ? Object.keys(e) : [];
    if (n.length === r.length)
        for (var o = 0, i = n; o < i.length; o++) {
            var a = i[o];
            if (t[a] !== e[a])
                return void this.onUpdate(t);
        }
    else
        this.onUpdate(t);
} }, t.prototype.componentDidLoad = function () { this.ionRouteDataChanged.emit(); }, t.prototype.componentDidUnload = function () { this.ionRouteDataChanged.emit(); }, Object.defineProperty(t, "is", { get: function () { return "ion-route"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(t, "properties", { get: function () { return { component: { type: String, attr: "component", watchCallbacks: ["onUpdate"] }, componentProps: { type: "Any", attr: "component-props", watchCallbacks: ["onComponentProps"] }, url: { type: String, attr: "url", watchCallbacks: ["onUpdate"] } }; }, enumerable: !0, configurable: !0 }), Object.defineProperty(t, "events", { get: function () { return [{ name: "ionRouteDataChanged", method: "ionRouteDataChanged", bubbles: !0, cancelable: !0, composed: !0 }]; }, enumerable: !0, configurable: !0 }), t; }(), RouteRedirect = function () { function t() { } return t.prototype.propDidChange = function () { this.ionRouteRedirectChanged.emit(); }, t.prototype.componentDidLoad = function () { this.ionRouteRedirectChanged.emit(); }, t.prototype.componentDidUnload = function () { this.ionRouteRedirectChanged.emit(); }, Object.defineProperty(t, "is", { get: function () { return "ion-route-redirect"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(t, "properties", { get: function () { return { from: { type: String, attr: "from", watchCallbacks: ["propDidChange"] }, to: { type: String, attr: "to", watchCallbacks: ["propDidChange"] } }; }, enumerable: !0, configurable: !0 }), Object.defineProperty(t, "events", { get: function () { return [{ name: "ionRouteRedirectChanged", method: "ionRouteRedirectChanged", bubbles: !0, cancelable: !0, composed: !0 }]; }, enumerable: !0, configurable: !0 }), t; }(), ROUTER_INTENT_NONE = "root", ROUTER_INTENT_FORWARD = "forward", ROUTER_INTENT_BACK = "back";
exports.PageAccount = PageAccount;
exports.IonRoute = Route;
exports.IonRouteRedirect = RouteRedirect;
function generatePath(t) { return "/" + t.filter(function (t) { return t.length > 0; }).join("/"); }
function chainToPath(t) { for (var e = [], n = 0, r = t; n < r.length; n++)
    for (var o = r[n], i = 0, a = o.path; i < a.length; i++) {
        var s = a[i];
        if (":" === s[0]) {
            var u = o.params && o.params[s.slice(1)];
            if (!u)
                return null;
            e.push(u);
        }
        else
            "" !== s && e.push(s);
    } return e; }
function writePath(t, e, n, r, o, i) { var a = generatePath(parsePath(e).concat(r)); n && (a = "#" + a), o === ROUTER_INTENT_FORWARD ? t.pushState(i, "", a) : t.replaceState(i, "", a); }
function removePrefix(t, e) { if (t.length > e.length)
    return null; if (t.length <= 1 && "" === t[0])
    return e; for (var n = 0; n < t.length; n++)
    if (t[n].length > 0 && t[n] !== e[n])
        return null; return e.length === t.length ? [""] : e.slice(t.length); }
function readPath(t, e, n) { var r = t.pathname; if (n) {
    var o = t.hash;
    r = "#" === o[0] ? o.slice(1) : "";
} return removePrefix(parsePath(e), parsePath(r)); }
function parsePath(t) { if (null == t)
    return [""]; var e = t.split("/").map(function (t) { return t.trim(); }).filter(function (t) { return t.length > 0; }); return 0 === e.length ? [""] : e; }
function printRoutes(t) { console.group("[ion-core] ROUTES[" + t.length + "]"); for (var e = function (t) { var e = []; t.forEach(function (t) { return e.push.apply(e, t.path); }); var n = t.map(function (t) { return t.id; }); generatePath(e), n.join(", "); }, n = 0, r = t; n < r.length; n++)
    e(r[n]); console.groupEnd(); }
function printRedirects(t) { console.group("[ion-core] REDIRECTS[" + t.length + "]"); for (var e = 0, n = t; e < n.length; e++) {
    var r = n[e];
    r.to && (generatePath(r.from), generatePath(r.to));
} console.groupEnd(); }
function writeNavState(t, e, n, r, o) { return void 0 === o && (o = !1), tslib_1.__awaiter(this, void 0, void 0, function () { var i, a, s, u; return tslib_1.__generator(this, function (l) { switch (l.label) {
    case 0: return l.trys.push([0, 6, , 7]), i = searchNavNode(t), r >= e.length || !i ? [2, o] : [4, i.componentOnReady()];
    case 1: return l.sent(), [4, i.setRouteId((a = e[r]).id, a.params, n)];
    case 2: return (s = l.sent()).changed && (n = ROUTER_INTENT_NONE, o = !0), [4, writeNavState(s.element, e, n, r + 1, o)];
    case 3: return o = l.sent(), s.markVisible ? [4, s.markVisible()] : [3, 5];
    case 4: l.sent(), l.label = 5;
    case 5: return [2, o];
    case 6: return u = l.sent(), console.error(u), [2, !1];
    case 7: return [2];
} }); }); }
function readNavState(t) { return tslib_1.__awaiter(this, void 0, void 0, function () { var e, n, r, o; return tslib_1.__generator(this, function (i) { switch (i.label) {
    case 0: e = [], r = t, i.label = 1;
    case 1: return (n = searchNavNode(r)) ? [4, n.getRouteId()] : [3, 3];
    case 2: return (o = i.sent()) ? (r = o.element, o.element = void 0, e.push(o), [3, 4]) : [3, 5];
    case 3: return [3, 5];
    case 4: return [3, 1];
    case 5: return [2, { ids: e, outlet: n }];
} }); }); }
function waitUntilNavNode(t) { return searchNavNode(t.document.body) ? Promise.resolve() : new Promise(function (e) { t.addEventListener("ionNavWillLoad", e, { once: !0 }); }); }
var QUERY = ":not([no-router]) ion-nav, :not([no-router]) ion-tabs, :not([no-router]) ion-router-outlet";
function searchNavNode(t) { if (t)
    return t.matches(QUERY) ? t : t.querySelector(QUERY) || void 0; }
function matchesRedirect(t, e) { var n = e.from; if (void 0 === e.to)
    return !1; if (n.length > t.length)
    return !1; for (var r = 0; r < n.length; r++) {
    var o = n[r];
    if ("*" === o)
        return !0;
    if (o !== t[r])
        return !1;
} return n.length === t.length; }
function routeRedirect(t, e) { return e.find(function (e) { return matchesRedirect(t, e); }); }
function matchesIDs(t, e) { for (var n = Math.min(t.length, e.length), r = 0; r < n && t[r].toLowerCase() === e[r].id; r++)
    ; return r; }
function matchesPath(t, e) { for (var n, r = new RouterSegments(t), o = !1, i = 0; i < e.length; i++) {
    var a = e[i].path;
    if ("" === a[0])
        o = !0;
    else {
        for (var s = 0, u = a; s < u.length; s++) {
            var l = u[s], c = r.next();
            if (":" === l[0]) {
                if ("" === c)
                    return null;
                ((n = n || [])[i] || (n[i] = {}))[l.slice(1)] = c;
            }
            else if (c !== l)
                return null;
        }
        o = !1;
    }
} return o && o !== ("" === r.next()) ? null : n ? e.map(function (t, e) { return { id: t.id, path: t.path, params: mergeParams(t.params, n[e]) }; }) : e; }
function mergeParams(t, e) { return !t && e ? e : t && !e ? t : t && e ? Object.assign({}, t, e) : void 0; }
function routerIDsToChain(t, e) { for (var n = null, r = 0, o = t.map(function (t) { return t.id; }), i = 0, a = e; i < a.length; i++) {
    var s = a[i], u = matchesIDs(o, s);
    u > r && (n = s, r = u);
} return n ? n.map(function (e, n) { return { id: e.id, path: e.path, params: mergeParams(e.params, t[n] && t[n].params) }; }) : null; }
function routerPathToChain(t, e) { for (var n = null, r = 0, o = 0, i = e; o < i.length; o++) {
    var a = matchesPath(t, i[o]);
    if (null !== a) {
        var s = computePriority(a);
        s > r && (r = s, n = a);
    }
} return n; }
function computePriority(t) { for (var e = 1, n = 1, r = 0, o = t; r < o.length; r++)
    for (var i = 0, a = o[r].path; i < a.length; i++) {
        var s = a[i];
        ":" === s[0] ? e += Math.pow(1, n) : "" !== s && (e += Math.pow(2, n)), n++;
    } return e; }
var RouterSegments = function () { function t(t) { this.path = t.slice(); } return t.prototype.next = function () { return this.path.length > 0 ? this.path.shift() : ""; }, t; }();
function readRedirects(t) { return Array.from(t.children).filter(function (t) { return "ION-ROUTE-REDIRECT" === t.tagName; }).map(function (t) { var e = readProp(t, "to"); return { from: parsePath(readProp(t, "from")), to: null == e ? void 0 : parsePath(e) }; }); }
function readRoutes(t) { return flattenRouterTree(readRouteNodes(t)); }
function readRouteNodes(t, e) { return void 0 === e && (e = t), Array.from(e.children).filter(function (t) { return "ION-ROUTE" === t.tagName && t.component; }).map(function (e) { var n = readProp(e, "component"); if (null == n)
    throw new Error("component missing in ion-route"); return { path: parsePath(readProp(e, "url")), id: n.toLowerCase(), params: e.componentProps, children: readRouteNodes(t, e) }; }); }
function readProp(t, e) { return e in t ? t[e] : t.hasAttribute(e) ? t.getAttribute(e) : null; }
function flattenRouterTree(t) { for (var e = [], n = 0, r = t; n < r.length; n++)
    flattenNode([], e, r[n]); return e; }
function flattenNode(t, e, n) { var r = t.slice(); if (r.push({ id: n.id, path: n.path, params: n.params }), 0 !== n.children.length)
    for (var o = 0, i = n.children; o < i.length; o++)
        flattenNode(r, e, i[o]);
else
    e.push(r); }
var Router = function () { function t() { this.previousPath = null, this.busy = !1, this.state = 0, this.lastState = 0, this.root = "/", this.useHash = !0; } return t.prototype.componentWillLoad = function () { return tslib_1.__awaiter(this, void 0, void 0, function () { return tslib_1.__generator(this, function (t) { switch (t.label) {
    case 0: return [4, waitUntilNavNode(this.win)];
    case 1: return t.sent(), [4, this.onRoutesChanged()];
    case 2: return t.sent(), [2];
} }); }); }, t.prototype.componentDidLoad = function () { this.win.addEventListener("ionRouteRedirectChanged", chunk_e658e8b7_js_1.j(this.onRedirectChanged.bind(this), 10)), this.win.addEventListener("ionRouteDataChanged", chunk_e658e8b7_js_1.j(this.onRoutesChanged.bind(this), 100)); }, t.prototype.onPopState = function () { var t = this.historyDirection(), e = this.getPath(); return this.writeNavStateRoot(e, t); }, t.prototype.onBackButton = function (t) { var e = this; t.detail.register(0, function () { return e.back(); }); }, t.prototype.push = function (t, e) { void 0 === e && (e = "forward"), t.startsWith(".") && (t = new URL(t, this.win.location.href).pathname); var n = parsePath(t); return this.setPath(n, e), this.writeNavStateRoot(n, e); }, t.prototype.back = function () { return this.win.history.back(), Promise.resolve(this.waitPromise); }, t.prototype.printDebug = function () { this.getPath(), printRoutes(readRoutes(this.el)), printRedirects(readRedirects(this.el)); }, t.prototype.navChanged = function (t) { return tslib_1.__awaiter(this, void 0, void 0, function () { var e, n, r, o, i, a; return tslib_1.__generator(this, function (s) { switch (s.label) {
    case 0: return this.busy ? (console.warn("[ion-router] router is busy, navChanged was cancelled"), [2, !1]) : [4, readNavState(this.win.document.body)];
    case 1: return e = s.sent(), n = e.ids, r = e.outlet, o = readRoutes(this.el), (i = routerIDsToChain(n, o)) ? (a = chainToPath(i)) ? (this.setPath(a, t), [4, this.safeWriteNavState(r, i, ROUTER_INTENT_NONE, a, null, n.length)]) : (console.warn("[ion-router] router could not match path because some required param is missing"), [2, !1]) : (console.warn("[ion-router] no matching URL for ", n.map(function (t) { return t.id; })), [2, !1]);
    case 2: return s.sent(), [2, !0];
} }); }); }, t.prototype.onRedirectChanged = function () { var t = this.getPath(); t && routeRedirect(t, readRedirects(this.el)) && this.writeNavStateRoot(t, ROUTER_INTENT_NONE); }, t.prototype.onRoutesChanged = function () { return this.writeNavStateRoot(this.getPath(), ROUTER_INTENT_NONE); }, t.prototype.historyDirection = function () { var t = this.win; null === t.history.state && (this.state++, t.history.replaceState(this.state, t.document.title, t.document.location && t.document.location.href)); var e = t.history.state, n = this.lastState; return this.lastState = e, e > n ? ROUTER_INTENT_FORWARD : e < n ? ROUTER_INTENT_BACK : ROUTER_INTENT_NONE; }, t.prototype.writeNavStateRoot = function (t, e) { return tslib_1.__awaiter(this, void 0, void 0, function () { var n, r, o, i, a; return tslib_1.__generator(this, function (s) { return t ? (n = readRedirects(this.el), r = routeRedirect(t, n), o = null, r && (this.setPath(r.to, e), o = r.from, t = r.to), i = readRoutes(this.el), (a = routerPathToChain(t, i)) ? [2, this.safeWriteNavState(this.win.document.body, a, e, t, o)] : (console.error("[ion-router] the path does not match any route"), [2, !1])) : (console.error("[ion-router] URL is not part of the routing set"), [2, !1]); }); }); }, t.prototype.safeWriteNavState = function (t, e, n, r, o, i) { return void 0 === i && (i = 0), tslib_1.__awaiter(this, void 0, void 0, function () { var a, s, u; return tslib_1.__generator(this, function (l) { switch (l.label) {
    case 0: return [4, this.lock()];
    case 1: a = l.sent(), s = !1, l.label = 2;
    case 2: return l.trys.push([2, 4, , 5]), [4, this.writeNavState(t, e, n, r, o, i)];
    case 3: return s = l.sent(), [3, 5];
    case 4: return u = l.sent(), console.error(u), [3, 5];
    case 5: return a(), [2, s];
} }); }); }, t.prototype.lock = function () { return tslib_1.__awaiter(this, void 0, void 0, function () { var t, e; return tslib_1.__generator(this, function (n) { switch (n.label) {
    case 0: return t = this.waitPromise, this.waitPromise = new Promise(function (t) { return e = t; }), void 0 === t ? [3, 2] : [4, t];
    case 1: n.sent(), n.label = 2;
    case 2: return [2, e];
} }); }); }, t.prototype.writeNavState = function (t, e, n, r, o, i) { return void 0 === i && (i = 0), tslib_1.__awaiter(this, void 0, void 0, function () { var a, s; return tslib_1.__generator(this, function (u) { switch (u.label) {
    case 0: return this.busy ? (console.warn("[ion-router] router is busy, transition was cancelled"), [2, !1]) : (this.busy = !0, (a = this.routeChangeEvent(r, o)) && this.ionRouteWillChange.emit(a), [4, writeNavState(t, e, n, i)]);
    case 1: return s = u.sent(), this.busy = !1, a && this.ionRouteDidChange.emit(a), [2, s];
} }); }); }, t.prototype.setPath = function (t, e) { this.state++, writePath(this.win.history, this.root, this.useHash, t, e, this.state); }, t.prototype.getPath = function () { return readPath(this.win.location, this.root, this.useHash); }, t.prototype.routeChangeEvent = function (t, e) { var n = this.previousPath, r = generatePath(t); return this.previousPath = r, r === n ? null : { from: n, redirectedFrom: e ? generatePath(e) : null, to: r }; }, Object.defineProperty(t, "is", { get: function () { return "ion-router"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(t, "properties", { get: function () { return { back: { method: !0 }, config: { context: "config" }, el: { elementRef: !0 }, navChanged: { method: !0 }, printDebug: { method: !0 }, push: { method: !0 }, queue: { context: "queue" }, root: { type: String, attr: "root" }, useHash: { type: Boolean, attr: "use-hash" }, win: { context: "window" } }; }, enumerable: !0, configurable: !0 }), Object.defineProperty(t, "events", { get: function () { return [{ name: "ionRouteWillChange", method: "ionRouteWillChange", bubbles: !0, cancelable: !0, composed: !0 }, { name: "ionRouteDidChange", method: "ionRouteDidChange", bubbles: !0, cancelable: !0, composed: !0 }]; }, enumerable: !0, configurable: !0 }), Object.defineProperty(t, "listeners", { get: function () { return [{ name: "window:popstate", method: "onPopState" }, { name: "document:ionBackButton", method: "onBackButton" }]; }, enumerable: !0, configurable: !0 }), t; }(), RouterOutlet = function () { function t() { this.animated = !0; } return t.prototype.swipeHandlerChanged = function () { this.gesture && this.gesture.setDisabled(void 0 === this.swipeHandler); }, t.prototype.componentWillLoad = function () { this.ionNavWillLoad.emit(); }, t.prototype.componentDidLoad = function () { return tslib_1.__awaiter(this, void 0, void 0, function () { var t, e = this; return tslib_1.__generator(this, function (n) { switch (n.label) {
    case 0: return t = this, [4, Promise.resolve().then(function () { return require("./chunk-9d14d64c.js"); })];
    case 1: return t.gesture = n.sent().createSwipeBackGesture(this.el, this.queue, function () { return !!e.swipeHandler && e.swipeHandler.canStart(); }, function () { return e.swipeHandler && e.swipeHandler.onStart(); }, function (t) { return e.ani && e.ani.progressStep(t); }, function (t, n, r) { e.ani && e.ani.progressEnd(t, n, r), e.swipeHandler && e.swipeHandler.onEnd(t); }), this.swipeHandlerChanged(), [2];
} }); }); }, t.prototype.componentDidUnload = function () { this.activeEl = this.activeComponent = void 0, this.gesture && (this.gesture.destroy(), this.gesture = void 0); }, t.prototype.commit = function (t, e, n) { return tslib_1.__awaiter(this, void 0, void 0, function () { var r, o, i; return tslib_1.__generator(this, function (a) { switch (a.label) {
    case 0: return [4, this.lock()];
    case 1: r = a.sent(), o = !1, a.label = 2;
    case 2: return a.trys.push([2, 4, , 5]), [4, this.transition(t, e, n)];
    case 3: return o = a.sent(), [3, 5];
    case 4: return i = a.sent(), console.error(i), [3, 5];
    case 5: return r(), [2, o];
} }); }); }, t.prototype.setRouteId = function (t, e, n) { return tslib_1.__awaiter(this, void 0, void 0, function () { return tslib_1.__generator(this, function (r) { switch (r.label) {
    case 0: return [4, this.setRoot(t, e, { duration: "root" === n ? 0 : void 0, direction: "back" === n ? "back" : "forward" })];
    case 1: return [2, { changed: r.sent(), element: this.activeEl }];
} }); }); }, t.prototype.getRouteId = function () { return tslib_1.__awaiter(this, void 0, void 0, function () { var t; return tslib_1.__generator(this, function (e) { return [2, (t = this.activeEl) ? { id: t.tagName, element: t } : void 0]; }); }); }, t.prototype.setRoot = function (t, e, n) { return tslib_1.__awaiter(this, void 0, void 0, function () { var r, o; return tslib_1.__generator(this, function (i) { switch (i.label) {
    case 0: return this.activeComponent === t ? [2, !1] : (r = this.activeEl, [4, chunk_0844be35_js_1.a(this.delegate, this.el, t, ["ion-page", "ion-page-invisible"], e)]);
    case 1: return o = i.sent(), this.activeComponent = t, this.activeEl = o, [4, this.commit(o, r, n)];
    case 2: return i.sent(), [4, chunk_0844be35_js_1.i(this.delegate, r)];
    case 3: return i.sent(), [2, !0];
} }); }); }, t.prototype.transition = function (t, e, n) { return void 0 === n && (n = {}), tslib_1.__awaiter(this, void 0, void 0, function () { var r, o, i, a, s, u, l, c = this; return tslib_1.__generator(this, function (h) { switch (h.label) {
    case 0: return e === t ? [2, !1] : (this.ionNavWillChange.emit(), o = (r = this).mode, i = r.queue, a = r.win, s = r.el, u = this.animated && this.config.getBoolean("animated", !0), l = this.animation || n.animationBuilder || this.config.get("navAnimation"), [4, chunk_0844be35_js_1.f(Object.assign({ mode: o, queue: i, animated: u, animationBuilder: l, window: a, enteringEl: t, leavingEl: e, baseEl: s, progressCallback: n.progressAnimation ? function (t) { return c.ani = t; } : void 0 }, n))]);
    case 1: return h.sent(), this.ionNavDidChange.emit(), [2, !0];
} }); }); }, t.prototype.lock = function () { return tslib_1.__awaiter(this, void 0, void 0, function () { var t, e; return tslib_1.__generator(this, function (n) { switch (n.label) {
    case 0: return t = this.waitPromise, this.waitPromise = new Promise(function (t) { return e = t; }), void 0 === t ? [3, 2] : [4, t];
    case 1: n.sent(), n.label = 2;
    case 2: return [2, e];
} }); }); }, t.prototype.render = function () { return clipper_core_js_1.h("slot", null); }, Object.defineProperty(t, "is", { get: function () { return "ion-router-outlet"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(t, "encapsulation", { get: function () { return "shadow"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(t, "properties", { get: function () { return { animated: { type: Boolean, attr: "animated" }, animation: { type: "Any", attr: "animation" }, commit: { method: !0 }, config: { context: "config" }, delegate: { type: "Any", attr: "delegate" }, el: { elementRef: !0 }, getRouteId: { method: !0 }, mode: { type: String, attr: "mode" }, queue: { context: "queue" }, setRouteId: { method: !0 }, swipeHandler: { type: "Any", attr: "swipe-handler", watchCallbacks: ["swipeHandlerChanged"] }, win: { context: "window" } }; }, enumerable: !0, configurable: !0 }), Object.defineProperty(t, "events", { get: function () { return [{ name: "ionNavWillLoad", method: "ionNavWillLoad", bubbles: !0, cancelable: !0, composed: !0 }, { name: "ionNavWillChange", method: "ionNavWillChange", bubbles: !1, cancelable: !0, composed: !0 }, { name: "ionNavDidChange", method: "ionNavDidChange", bubbles: !1, cancelable: !0, composed: !0 }]; }, enumerable: !0, configurable: !0 }), Object.defineProperty(t, "style", { get: function () { return ":host{left:0;right:0;top:0;bottom:0;position:absolute;contain:layout size style;overflow:hidden;z-index:0}"; }, enumerable: !0, configurable: !0 }), t; }();
exports.IonRouter = Router;
exports.IonRouterOutlet = RouterOutlet;
