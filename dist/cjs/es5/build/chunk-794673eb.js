"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("../polyfills/tslib.js");
var lastId = 0;
function createOverlay(e, t) { var n = e.ownerDocument; connectListeners(n), Object.assign(e, t), e.classList.add("overlay-hidden"); var i = lastId++; return e.overlayIndex = i, e.hasAttribute("id") || (e.id = "ion-overlay-" + i), getAppRoot(n).appendChild(e), e.componentOnReady(); }
exports.d = createOverlay;
function connectListeners(e) { 0 === lastId && (lastId = 1, e.addEventListener("focusin", function (t) { var n = getOverlay(e); if (n && n.backdropDismiss && !isDescendant(n, t.target)) {
    var i = n.querySelector("input,button");
    i && i.focus();
} }), e.addEventListener("ionBackButton", function (t) { var n = getOverlay(e); n && n.backdropDismiss && t.detail.register(100, function () { return n.dismiss(void 0, BACKDROP); }); }), e.addEventListener("keyup", function (t) { if ("Escape" === t.key) {
    var n = getOverlay(e);
    n && n.backdropDismiss && n.dismiss(void 0, BACKDROP);
} })); }
function dismissOverlay(e, t, n, i, r) { var a = getOverlay(e, i, r); return a ? a.dismiss(t, n) : Promise.reject("overlay does not exist"); }
exports.e = dismissOverlay;
function getOverlays(e, t) { var n = Array.from(getAppRoot(e).children).filter(function (e) { return e.overlayIndex > 0; }); return void 0 === t ? n : (t = t.toUpperCase(), n.filter(function (e) { return e.tagName === t; })); }
function getOverlay(e, t, n) { var i = getOverlays(e, t); return void 0 === n ? i[i.length - 1] : i.find(function (e) { return e.id === n; }); }
exports.f = getOverlay;
function present(e, t, n, i, r) { return tslib_1.__awaiter(this, void 0, void 0, function () { var a; return tslib_1.__generator(this, function (o) { switch (o.label) {
    case 0: return e.presented ? [2] : (e.presented = !0, e.willPresent.emit(), a = e.enterAnimation ? e.enterAnimation : e.config.get(t, "ios" === e.mode ? n : i), [4, overlayAnimation(e, a, e.el, r)]);
    case 1: return o.sent() && e.didPresent.emit(), [2];
} }); }); }
exports.a = present;
function dismiss(e, t, n, i, r, a, o) { return tslib_1.__awaiter(this, void 0, void 0, function () { var s, c; return tslib_1.__generator(this, function (d) { switch (d.label) {
    case 0:
        if (!e.presented)
            return [2, !1];
        e.presented = !1, d.label = 1;
    case 1: return d.trys.push([1, 3, , 4]), e.willDismiss.emit({ data: t, role: n }), s = e.leaveAnimation ? e.leaveAnimation : e.config.get(i, "ios" === e.mode ? r : a), [4, overlayAnimation(e, s, e.el, o)];
    case 2: return d.sent(), e.didDismiss.emit({ data: t, role: n }), [3, 4];
    case 3: return c = d.sent(), console.error(c), [3, 4];
    case 4: return e.el.remove(), [2, !0];
} }); }); }
exports.b = dismiss;
function getAppRoot(e) { return e.querySelector("ion-app") || e.body; }
function overlayAnimation(e, t, n, i) { return tslib_1.__awaiter(this, void 0, void 0, function () { var r, a, o, s; return tslib_1.__generator(this, function (c) { switch (c.label) {
    case 0: return e.animation ? (e.animation.destroy(), e.animation = void 0, [2, !1]) : (n.classList.remove("overlay-hidden"), r = n.shadowRoot || e.el, o = e, [4, Promise.resolve().then(function () { return require("./chunk-d84dff50.js"); }).then(function (e) { return e.create(t, r, i); })]);
    case 1: return a = o.animation = c.sent(), e.animation = a, e.animated && e.config.getBoolean("animated", !0) || a.duration(0), e.keyboardClose && a.beforeAddWrite(function () { var e = n.ownerDocument.activeElement; e && e.matches("input, ion-input, ion-textarea") && e.blur(); }), [4, a.playAsync()];
    case 2: return c.sent(), s = a.hasCompleted, a.destroy(), e.animation = void 0, [2, s];
} }); }); }
function eventMethod(e, t) { var n, i = new Promise(function (e) { return n = e; }); return onceEvent(e, t, function (e) { n(e.detail); }), i; }
exports.c = eventMethod;
function onceEvent(e, t, n) { var i = function (r) { e.removeEventListener(t, i), n(r); }; e.addEventListener(t, i); }
function isCancel(e) { return "cancel" === e || e === BACKDROP; }
exports.h = isCancel;
function isDescendant(e, t) { for (; t;) {
    if (t === e)
        return !0;
    t = t.parentElement;
} return !1; }
var BACKDROP = "backdrop";
exports.g = BACKDROP;
