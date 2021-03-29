"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("../polyfills/tslib.js");
var LIFECYCLE_WILL_ENTER = "ionViewWillEnter", LIFECYCLE_DID_ENTER = "ionViewDidEnter", LIFECYCLE_WILL_LEAVE = "ionViewWillLeave", LIFECYCLE_DID_LEAVE = "ionViewDidLeave", LIFECYCLE_WILL_UNLOAD = "ionViewWillUnload", iosTransitionAnimation = function () { return Promise.resolve().then(function () { return require("./chunk-7b9a8269.js"); }); }, mdTransitionAnimation = function () { return Promise.resolve().then(function () { return require("./chunk-ce800c00.js"); }); };
exports.d = LIFECYCLE_WILL_LEAVE;
exports.e = LIFECYCLE_DID_LEAVE;
exports.c = LIFECYCLE_WILL_UNLOAD;
function transition(e) { return new Promise(function (n, i) { e.queue.write(function () { beforeTransition(e), runTransition(e).then(function (i) { i.animation && i.animation.destroy(), afterTransition(e), n(i); }, function (n) { afterTransition(e), i(n); }); }); }); }
exports.f = transition;
function beforeTransition(e) { var n = e.enteringEl, i = e.leavingEl; setZIndex(n, i, e.direction), e.showGoBack ? n.classList.add("can-go-back") : n.classList.remove("can-go-back"), setPageHidden(n, !1), i && setPageHidden(i, !1); }
function runTransition(e) { return tslib_1.__awaiter(this, void 0, void 0, function () { var n; return tslib_1.__generator(this, function (i) { switch (i.label) {
    case 0: return [4, getAnimationBuilder(e)];
    case 1: return [2, (n = i.sent()) ? animation(n, e) : noAnimation(e)];
} }); }); }
function afterTransition(e) { var n = e.leavingEl; e.enteringEl.classList.remove("ion-page-invisible"), void 0 !== n && n.classList.remove("ion-page-invisible"); }
function getAnimationBuilder(e) { return tslib_1.__awaiter(this, void 0, void 0, function () { var n; return tslib_1.__generator(this, function (i) { switch (i.label) {
    case 0: return e.leavingEl && e.animated && 0 !== e.duration ? e.animationBuilder ? [2, e.animationBuilder] : "ios" !== e.mode ? [3, 2] : [4, iosTransitionAnimation()] : [2, void 0];
    case 1: return n = i.sent().iosTransitionAnimation, [3, 4];
    case 2: return [4, mdTransitionAnimation()];
    case 3: n = i.sent().mdTransitionAnimation, i.label = 4;
    case 4: return [2, n];
} }); }); }
function animation(e, n) { return tslib_1.__awaiter(this, void 0, void 0, function () { var i; return tslib_1.__generator(this, function (t) { switch (t.label) {
    case 0: return [4, waitForReady(n, !0)];
    case 1: return t.sent(), [4, Promise.resolve().then(function () { return require("./chunk-d84dff50.js"); }).then(function (i) { return i.create(e, n.baseEl, n); })];
    case 2: return i = t.sent(), fireWillEvents(n.enteringEl, n.leavingEl), [4, playTransition(i, n)];
    case 3: return t.sent(), n.progressCallback && n.progressCallback(void 0), i.hasCompleted && fireDidEvents(n.enteringEl, n.leavingEl), [2, { hasCompleted: i.hasCompleted, animation: i }];
} }); }); }
function noAnimation(e) { return tslib_1.__awaiter(this, void 0, void 0, function () { var n, i; return tslib_1.__generator(this, function (t) { switch (t.label) {
    case 0: return n = e.enteringEl, i = e.leavingEl, [4, waitForReady(e, !1)];
    case 1: return t.sent(), fireWillEvents(n, i), fireDidEvents(n, i), [2, { hasCompleted: !0 }];
} }); }); }
function waitForReady(e, n) { return tslib_1.__awaiter(this, void 0, void 0, function () { var i; return tslib_1.__generator(this, function (t) { switch (t.label) {
    case 0: return i = (void 0 !== e.deepWait ? e.deepWait : n) ? [deepReady(e.enteringEl), deepReady(e.leavingEl)] : [shallowReady(e.enteringEl), shallowReady(e.leavingEl)], [4, Promise.all(i)];
    case 1: return t.sent(), [4, notifyViewReady(e.viewIsReady, e.enteringEl)];
    case 2: return t.sent(), [2];
} }); }); }
function notifyViewReady(e, n) { return tslib_1.__awaiter(this, void 0, void 0, function () { return tslib_1.__generator(this, function (i) { switch (i.label) {
    case 0: return e ? [4, e(n)] : [3, 2];
    case 1: i.sent(), i.label = 2;
    case 2: return [2];
} }); }); }
function playTransition(e, n) { var i = n.progressCallback, t = new Promise(function (n) { return e.onFinish(n); }); return i ? (e.progressStart(), i(e)) : e.play(), t; }
function fireWillEvents(e, n) { lifecycle(n, LIFECYCLE_WILL_LEAVE), lifecycle(e, LIFECYCLE_WILL_ENTER); }
function fireDidEvents(e, n) { lifecycle(e, LIFECYCLE_DID_ENTER), lifecycle(n, LIFECYCLE_DID_LEAVE); }
function lifecycle(e, n) { if (e) {
    var i = new CustomEvent(n, { bubbles: !1, cancelable: !1 });
    e.dispatchEvent(i);
} }
exports.b = lifecycle;
function shallowReady(e) { return e && e.componentOnReady ? e.componentOnReady() : Promise.resolve(); }
function deepReady(e) { return tslib_1.__awaiter(this, void 0, void 0, function () { var n; return tslib_1.__generator(this, function (i) { switch (i.label) {
    case 0: return (n = e) ? null == n.componentOnReady ? [3, 2] : [4, n.componentOnReady()] : [3, 4];
    case 1:
        if (null != i.sent())
            return [2];
        i.label = 2;
    case 2: return [4, Promise.all(Array.from(n.children).map(deepReady))];
    case 3: i.sent(), i.label = 4;
    case 4: return [2];
} }); }); }
exports.h = deepReady;
function setPageHidden(e, n) { n ? (e.setAttribute("aria-hidden", "true"), e.classList.add("ion-page-hidden")) : (e.hidden = !1, e.removeAttribute("aria-hidden"), e.classList.remove("ion-page-hidden")); }
exports.g = setPageHidden;
function setZIndex(e, n, i) { void 0 !== e && (e.style.zIndex = "back" === i ? "99" : "101"), void 0 !== n && (n.style.zIndex = "100"); }
function attachComponent(e, n, i, t, a) { return tslib_1.__awaiter(this, void 0, void 0, function () { var r; return tslib_1.__generator(this, function (o) { switch (o.label) {
    case 0:
        if (e)
            return [2, e.attachViewToDom(n, i, a, t)];
        if ("string" != typeof i && !(i instanceof HTMLElement))
            throw new Error("framework delegate is missing");
        return r = "string" == typeof i ? n.ownerDocument && n.ownerDocument.createElement(i) : i, t && t.forEach(function (e) { return r.classList.add(e); }), a && Object.assign(r, a), n.appendChild(r), r.componentOnReady ? [4, r.componentOnReady()] : [3, 2];
    case 1: o.sent(), o.label = 2;
    case 2: return [2, r];
} }); }); }
exports.a = attachComponent;
function detachComponent(e, n) { if (n) {
    if (e)
        return e.removeViewFromDom(n.parentElement, n);
    n.remove();
} return Promise.resolve(); }
exports.i = detachComponent;
