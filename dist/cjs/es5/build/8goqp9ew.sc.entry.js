"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("../polyfills/tslib.js");
function baseAnimation(t) { return Promise.resolve((new t).easing("cubic-bezier(0.0, 0.0, 0.2, 1)").easingReverse("cubic-bezier(0.4, 0.0, 0.6, 1)").duration(300)); }
var BOX_SHADOW_WIDTH = 8;
function menuOverlayAnimation(t, e, n) { var i, r, o = n.width + BOX_SHADOW_WIDTH; n.isEndSide ? (i = o + "px", r = "0px") : (i = -o + "px", r = "0px"); var s = (new t).addElement(n.menuInnerEl).fromTo("translateX", i, r), a = (new t).addElement(n.backdropEl).fromTo("opacity", .01, .32); return baseAnimation(t).then(function (t) { return t.add(s).add(a); }); }
function menuPushAnimation(t, e, n) { var i, r, o = n.width; n.isEndSide ? (i = -o + "px", r = o + "px") : (i = o + "px", r = -o + "px"); var s = (new t).addElement(n.menuInnerEl).fromTo("translateX", r, "0px"), a = (new t).addElement(n.contentEl).fromTo("translateX", "0px", i), u = (new t).addElement(n.backdropEl).fromTo("opacity", .01, .32); return baseAnimation(t).then(function (t) { return t.add(s).add(u).add(a); }); }
function menuRevealAnimation(t, e, n) { var i = n.width * (n.isEndSide ? -1 : 1) + "px", r = (new t).addElement(n.contentEl).fromTo("translateX", "0px", i); return baseAnimation(t).then(function (t) { return t.add(r); }); }
var MenuController = function () { function t() { this.menus = [], this.menuAnimations = new Map, this.registerAnimation("reveal", menuRevealAnimation), this.registerAnimation("push", menuPushAnimation), this.registerAnimation("overlay", menuOverlayAnimation); } return t.prototype.open = function (t) { return tslib_1.__awaiter(this, void 0, void 0, function () { var e; return tslib_1.__generator(this, function (n) { switch (n.label) {
    case 0: return [4, this.get(t)];
    case 1: return (e = n.sent()) ? [2, e.open()] : [2, !1];
} }); }); }, t.prototype.close = function (t) { return tslib_1.__awaiter(this, void 0, void 0, function () { var e; return tslib_1.__generator(this, function (n) { switch (n.label) {
    case 0: return [4, void 0 !== t ? this.get(t) : this.getOpen()];
    case 1: return void 0 !== (e = n.sent()) ? [2, e.close()] : [2, !1];
} }); }); }, t.prototype.toggle = function (t) { return tslib_1.__awaiter(this, void 0, void 0, function () { var e; return tslib_1.__generator(this, function (n) { switch (n.label) {
    case 0: return [4, this.get(t)];
    case 1: return (e = n.sent()) ? [2, e.toggle()] : [2, !1];
} }); }); }, t.prototype.enable = function (t, e) { return tslib_1.__awaiter(this, void 0, void 0, function () { var n; return tslib_1.__generator(this, function (i) { switch (i.label) {
    case 0: return [4, this.get(e)];
    case 1: return (n = i.sent()) && (n.disabled = !t), [2, n];
} }); }); }, t.prototype.swipeGesture = function (t, e) { return tslib_1.__awaiter(this, void 0, void 0, function () { var n; return tslib_1.__generator(this, function (i) { switch (i.label) {
    case 0: return [4, this.get(e)];
    case 1: return (n = i.sent()) && (n.swipeGesture = t), [2, n];
} }); }); }, t.prototype.isOpen = function (t) { return tslib_1.__awaiter(this, void 0, void 0, function () { var e; return tslib_1.__generator(this, function (n) { switch (n.label) {
    case 0: return null == t ? [3, 2] : [4, this.get(t)];
    case 1: return [2, void 0 !== (e = n.sent()) && e.isOpen()];
    case 2: return [4, this.getOpen()];
    case 3: return [2, void 0 !== (e = n.sent())];
} }); }); }, t.prototype.isEnabled = function (t) { return tslib_1.__awaiter(this, void 0, void 0, function () { var e; return tslib_1.__generator(this, function (n) { switch (n.label) {
    case 0: return [4, this.get(t)];
    case 1: return (e = n.sent()) ? [2, !e.disabled] : [2, !1];
} }); }); }, t.prototype.get = function (t) { return tslib_1.__awaiter(this, void 0, void 0, function () { var e, n; return tslib_1.__generator(this, function (i) { switch (i.label) {
    case 0: return [4, this.waitUntilReady()];
    case 1: return i.sent(), "start" === t || "end" === t ? (e = this.find(function (e) { return e.side === t && !e.disabled; })) ? [2, e] : [2, this.find(function (e) { return e.side === t; })] : null != t ? [2, this.find(function (e) { return e.menuId === t; })] : (n = this.find(function (t) { return !t.disabled; })) ? [2, n] : [2, this.menus.length > 0 ? this.menus[0].el : void 0];
} }); }); }, t.prototype.getOpen = function () { return tslib_1.__awaiter(this, void 0, void 0, function () { return tslib_1.__generator(this, function (t) { switch (t.label) {
    case 0: return [4, this.waitUntilReady()];
    case 1: return t.sent(), [2, this.getOpenSync()];
} }); }); }, t.prototype.getMenus = function () { return tslib_1.__awaiter(this, void 0, void 0, function () { return tslib_1.__generator(this, function (t) { switch (t.label) {
    case 0: return [4, this.waitUntilReady()];
    case 1: return t.sent(), [2, this.getMenusSync()];
} }); }); }, t.prototype.isAnimating = function () { return tslib_1.__awaiter(this, void 0, void 0, function () { return tslib_1.__generator(this, function (t) { switch (t.label) {
    case 0: return [4, this.waitUntilReady()];
    case 1: return t.sent(), [2, this.isAnimatingSync()];
} }); }); }, t.prototype.registerAnimation = function (t, e) { this.menuAnimations.set(t, e); }, t.prototype._getInstance = function () { return Promise.resolve(this); }, t.prototype._register = function (t) { var e = this.menus; e.indexOf(t) < 0 && (t.disabled || this._setActiveMenu(t), e.push(t)); }, t.prototype._unregister = function (t) { var e = this.menus.indexOf(t); e > -1 && this.menus.splice(e, 1); }, t.prototype._setActiveMenu = function (t) { var e = t.side; this.menus.filter(function (n) { return n.side === e && n !== t; }).forEach(function (t) { return t.disabled = !0; }); }, t.prototype._setOpen = function (t, e, n) { return tslib_1.__awaiter(this, void 0, void 0, function () { var i; return tslib_1.__generator(this, function (r) { switch (r.label) {
    case 0: return this.isAnimatingSync() ? [2, !1] : e ? [4, this.getOpen()] : [3, 3];
    case 1: return (i = r.sent()) && t.el !== i ? [4, i.setOpen(!1, !1)] : [3, 3];
    case 2: r.sent(), r.label = 3;
    case 3: return [2, t._setOpen(e, n)];
} }); }); }, t.prototype._createAnimation = function (t, e) { return tslib_1.__awaiter(this, void 0, void 0, function () { var n, i; return tslib_1.__generator(this, function (r) { switch (r.label) {
    case 0:
        if (!(n = this.menuAnimations.get(t)))
            throw new Error("animation not registered");
        return [4, Promise.resolve().then(function () { return require("./chunk-d84dff50.js"); }).then(function (t) { return t.create(n, null, e); })];
    case 1: return i = r.sent(), this.config.getBoolean("animated", !0) || i.duration(0), [2, i];
} }); }); }, t.prototype.getOpenSync = function () { return this.find(function (t) { return t._isOpen; }); }, t.prototype.getMenusSync = function () { return this.menus.map(function (t) { return t.el; }); }, t.prototype.isAnimatingSync = function () { return this.menus.some(function (t) { return t.isAnimating; }); }, t.prototype.find = function (t) { var e = this.menus.find(t); if (void 0 !== e)
    return e.el; }, t.prototype.waitUntilReady = function () { return Promise.all(Array.from(this.doc.querySelectorAll("ion-menu")).map(function (t) { return t.componentOnReady(); })); }, Object.defineProperty(t, "is", { get: function () { return "ion-menu-controller"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(t, "properties", { get: function () { return { _getInstance: { method: !0 }, close: { method: !0 }, config: { context: "config" }, doc: { context: "document" }, enable: { method: !0 }, get: { method: !0 }, getMenus: { method: !0 }, getOpen: { method: !0 }, isAnimating: { method: !0 }, isEnabled: { method: !0 }, isOpen: { method: !0 }, open: { method: !0 }, registerAnimation: { method: !0 }, swipeGesture: { method: !0 }, toggle: { method: !0 } }; }, enumerable: !0, configurable: !0 }), Object.defineProperty(t, "style", { get: function () { return ".menu-content{-webkit-transform:translateZ(0);transform:translateZ(0)}.menu-content-open{cursor:pointer;-ms-touch-action:manipulation;touch-action:manipulation;pointer-events:none}.ios .menu-content-reveal{-webkit-box-shadow:-8px 0 42px rgba(0,0,0,.08);box-shadow:-8px 0 42px rgba(0,0,0,.08)}[dir=rtl].ios .menu-content-reveal{-webkit-box-shadow:8px 0 42px rgba(0,0,0,.08);box-shadow:8px 0 42px rgba(0,0,0,.08)}.md .menu-content-push,.md .menu-content-reveal{-webkit-box-shadow:0 2px 22px 0 rgba(0,0,0,.09),4px 0 16px 0 rgba(0,0,0,.18);box-shadow:0 2px 22px 0 rgba(0,0,0,.09),4px 0 16px 0 rgba(0,0,0,.18)}"; }, enumerable: !0, configurable: !0 }), t; }();
exports.IonMenuController = MenuController;
