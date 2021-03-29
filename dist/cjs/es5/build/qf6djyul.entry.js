"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("../polyfills/tslib.js");
var clipper_core_js_1 = require("../clipper.core.js");
var chunk_c82b670d_js_1 = require("./chunk-c82b670d.js");
var chunk_794673eb_js_1 = require("./chunk-794673eb.js");
var chunk_0844be35_js_1 = require("./chunk-0844be35.js");
function iosEnterAnimation(e, t, o) { var n = "top", r = "left", i = t.querySelector(".popover-content"), s = i.getBoundingClientRect(), a = s.width, l = s.height, p = t.ownerDocument.defaultView.innerWidth, d = t.ownerDocument.defaultView.innerHeight, c = o && o.target && o.target.getBoundingClientRect(), m = null != c && "top" in c ? c.top : d / 2 - l / 2, u = null != c && "left" in c ? c.left : p / 2, f = c && c.width || 0, v = c && c.height || 0, h = t.querySelector(".popover-arrow"), y = h.getBoundingClientRect(), b = y.width, D = y.height; null == c && (h.style.display = "none"); var P = { top: m + v, left: u + f / 2 - b / 2 }, g = { top: m + v + (D - 1), left: u + f / 2 - a / 2 }, O = !1, w = !1; g.left < POPOVER_IOS_BODY_PADDING + 25 ? (O = !0, g.left = POPOVER_IOS_BODY_PADDING) : a + POPOVER_IOS_BODY_PADDING + g.left + 25 > p && (w = !0, g.left = p - a - POPOVER_IOS_BODY_PADDING, r = "right"), m + v + l > d && m - l > 0 ? (P.top = m - (D + 1), g.top = m - l - (D - 1), t.className = t.className + " popover-bottom", n = "bottom") : m + v + l > d && (i.style.bottom = POPOVER_IOS_BODY_PADDING + "%"), h.style.top = P.top + "px", h.style.left = P.left + "px", i.style.top = g.top + "px", i.style.left = g.left + "px", O && (i.style.left = "calc(" + g.left + "px + var(--ion-safe-area-left, 0px))"), w && (i.style.left = "calc(" + g.left + "px - var(--ion-safe-area-right, 0px))"), i.style.transformOrigin = n + " " + r; var _ = new e, E = new e; E.addElement(t.querySelector("ion-backdrop")), E.fromTo("opacity", .01, .08); var A = new e; return A.addElement(t.querySelector(".popover-wrapper")), A.fromTo("opacity", .01, 1), Promise.resolve(_.addElement(t).easing("ease").duration(100).add(E).add(A)); }
var POPOVER_IOS_BODY_PADDING = 5;
function iosLeaveAnimation(e, t) { var o = new e, n = new e; n.addElement(t.querySelector("ion-backdrop")); var r = new e; return r.addElement(t.querySelector(".popover-wrapper")), r.fromTo("opacity", .99, 0), n.fromTo("opacity", .08, 0), Promise.resolve(o.addElement(t).easing("ease").duration(500).add(n).add(r)); }
function mdEnterAnimation(e, t, o) { var n = t.ownerDocument, r = "rtl" === n.dir, i = "top", s = r ? "right" : "left", a = t.querySelector(".popover-content"), l = a.getBoundingClientRect(), p = l.width, d = l.height, c = n.defaultView.innerWidth, m = n.defaultView.innerHeight, u = o && o.target && o.target.getBoundingClientRect(), f = null != u && "bottom" in u ? u.bottom : m / 2 - d / 2, v = u && u.height || 0, h = { top: f, left: null != u && "left" in u ? r ? u.left - p + u.width : u.left : c / 2 - p / 2 }; h.left < POPOVER_MD_BODY_PADDING ? (h.left = POPOVER_MD_BODY_PADDING, s = "left") : p + POPOVER_MD_BODY_PADDING + h.left > c && (h.left = c - p - POPOVER_MD_BODY_PADDING, s = "right"), f + v + d > m && f - d > 0 ? (h.top = f - d - v, t.className = t.className + " popover-bottom", i = "bottom") : f + v + d > m && (a.style.bottom = POPOVER_MD_BODY_PADDING + "px"), a.style.top = h.top + "px", a.style.left = h.left + "px", a.style.transformOrigin = i + " " + s; var y = new e, b = new e; b.addElement(t.querySelector("ion-backdrop")), b.fromTo("opacity", .01, .32); var D = new e; D.addElement(t.querySelector(".popover-wrapper")), D.fromTo("opacity", .01, 1); var P = new e; P.addElement(t.querySelector(".popover-content")), P.fromTo("scale", .001, 1); var g = new e; return g.addElement(t.querySelector(".popover-viewport")), g.fromTo("opacity", .01, 1), Promise.resolve(y.addElement(t).easing("cubic-bezier(0.36,0.66,0.04,1)").duration(300).add(b).add(D).add(P).add(g)); }
var POPOVER_MD_BODY_PADDING = 12;
function mdLeaveAnimation(e, t) { var o = new e, n = new e; n.addElement(t.querySelector("ion-backdrop")); var r = new e; return r.addElement(t.querySelector(".popover-wrapper")), r.fromTo("opacity", .99, 0), n.fromTo("opacity", .32, 0), Promise.resolve(o.addElement(t).easing("ease").duration(500).add(n).add(r)); }
var Popover = function () { function e() { this.presented = !1, this.keyboardClose = !0, this.backdropDismiss = !0, this.showBackdrop = !0, this.translucent = !1, this.animated = !0; } return e.prototype.onDismiss = function (e) { e.stopPropagation(), e.preventDefault(), this.dismiss(); }, e.prototype.onBackdropTap = function () { this.dismiss(void 0, chunk_794673eb_js_1.g); }, e.prototype.lifecycle = function (e) { var t = this.usersElement, o = LIFECYCLE_MAP[e.type]; if (t && o) {
    var n = new CustomEvent(o, { bubbles: !1, cancelable: !1, detail: e.detail });
    t.dispatchEvent(n);
} }, e.prototype.present = function () { return tslib_1.__awaiter(this, void 0, void 0, function () { var e, t, o; return tslib_1.__generator(this, function (n) { switch (n.label) {
    case 0:
        if (this.presented)
            return [2];
        if (!(e = this.el.querySelector(".popover-content")))
            throw new Error("container is undefined");
        return t = Object.assign({}, this.componentProps, { popover: this.el }), o = this, [4, chunk_0844be35_js_1.a(this.delegate, e, this.component, ["popover-viewport", this.el["s-sc"]], t)];
    case 1: return o.usersElement = n.sent(), [4, chunk_0844be35_js_1.h(this.usersElement)];
    case 2: return n.sent(), [2, chunk_794673eb_js_1.a(this, "popoverEnter", iosEnterAnimation, mdEnterAnimation, this.event)];
} }); }); }, e.prototype.dismiss = function (e, t) { return tslib_1.__awaiter(this, void 0, void 0, function () { var o; return tslib_1.__generator(this, function (n) { switch (n.label) {
    case 0: return [4, chunk_794673eb_js_1.b(this, e, t, "popoverLeave", iosLeaveAnimation, mdLeaveAnimation, this.event)];
    case 1: return (o = n.sent()) ? [4, chunk_0844be35_js_1.i(this.delegate, this.usersElement)] : [3, 3];
    case 2: n.sent(), n.label = 3;
    case 3: return [2, o];
} }); }); }, e.prototype.onDidDismiss = function () { return chunk_794673eb_js_1.c(this.el, "ionPopoverDidDismiss"); }, e.prototype.onWillDismiss = function () { return chunk_794673eb_js_1.c(this.el, "ionPopoverWillDismiss"); }, e.prototype.hostData = function () { var e; return { "aria-modal": "true", "no-router": !0, style: { zIndex: 2e4 + this.overlayIndex }, class: Object.assign({}, chunk_c82b670d_js_1.b(this.cssClass), (e = {}, e["" + this.mode] = !0, e["popover-translucent"] = this.translucent, e)) }; }, e.prototype.render = function () { return [clipper_core_js_1.h("ion-backdrop", { tappable: this.backdropDismiss, visible: this.showBackdrop }), clipper_core_js_1.h("div", { class: "popover-wrapper" }, clipper_core_js_1.h("div", { class: "popover-arrow" }), clipper_core_js_1.h("div", { class: "popover-content" }))]; }, Object.defineProperty(e, "is", { get: function () { return "ion-popover"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "encapsulation", { get: function () { return "scoped"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "properties", { get: function () { return { animated: { type: Boolean, attr: "animated" }, backdropDismiss: { type: Boolean, attr: "backdrop-dismiss" }, component: { type: String, attr: "component" }, componentProps: { type: "Any", attr: "component-props" }, config: { context: "config" }, cssClass: { type: String, attr: "css-class" }, delegate: { type: "Any", attr: "delegate" }, dismiss: { method: !0 }, el: { elementRef: !0 }, enterAnimation: { type: "Any", attr: "enter-animation" }, event: { type: "Any", attr: "event" }, keyboardClose: { type: Boolean, attr: "keyboard-close" }, leaveAnimation: { type: "Any", attr: "leave-animation" }, mode: { type: String, attr: "mode" }, onDidDismiss: { method: !0 }, onWillDismiss: { method: !0 }, overlayIndex: { type: Number, attr: "overlay-index" }, present: { method: !0 }, showBackdrop: { type: Boolean, attr: "show-backdrop" }, translucent: { type: Boolean, attr: "translucent" } }; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "events", { get: function () { return [{ name: "ionPopoverDidPresent", method: "didPresent", bubbles: !0, cancelable: !0, composed: !0 }, { name: "ionPopoverWillPresent", method: "willPresent", bubbles: !0, cancelable: !0, composed: !0 }, { name: "ionPopoverWillDismiss", method: "willDismiss", bubbles: !0, cancelable: !0, composed: !0 }, { name: "ionPopoverDidDismiss", method: "didDismiss", bubbles: !0, cancelable: !0, composed: !0 }]; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "listeners", { get: function () { return [{ name: "ionDismiss", method: "onDismiss" }, { name: "ionBackdropTap", method: "onBackdropTap" }, { name: "ionPopoverDidPresent", method: "lifecycle" }, { name: "ionPopoverWillPresent", method: "lifecycle" }, { name: "ionPopoverWillDismiss", method: "lifecycle" }, { name: "ionPopoverDidDismiss", method: "lifecycle" }]; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "style", { get: function () { return ".sc-ion-popover-ios-h{--background:var(--ion-background-color,#fff);--min-width:0;--min-height:0;--max-width:auto;--height:auto;left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:fixed;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;color:var(--ion-text-color,#000);z-index:1000}.overlay-hidden.sc-ion-popover-ios-h{display:none}.popover-wrapper.sc-ion-popover-ios{opacity:0;z-index:10}.popover-content.sc-ion-popover-ios{display:-ms-flexbox;display:flex;position:absolute;-ms-flex-direction:column;flex-direction:column;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);background:var(--background);-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow);overflow:auto;z-index:10}.popover-viewport.sc-ion-popover-ios{--ion-safe-area-top:0px;--ion-safe-area-right:0px;--ion-safe-area-bottom:0px;--ion-safe-area-left:0px}.sc-ion-popover-ios-h{--width:200px;--max-height:90%;--box-shadow:none}.popover-content.sc-ion-popover-ios{border-radius:10px}.popover-arrow.sc-ion-popover-ios{display:block;position:absolute;width:20px;height:10px;overflow:hidden}.popover-arrow.sc-ion-popover-ios:after{left:3px;top:3px;border-radius:3px;position:absolute;width:14px;height:14px;-webkit-transform:rotate(45deg);transform:rotate(45deg);background:var(--background);content:\"\";z-index:10}[dir=rtl].sc-ion-popover-ios-h   .popover-arrow.sc-ion-popover-ios:after, [dir=rtl]   .sc-ion-popover-ios-h   .popover-arrow.sc-ion-popover-ios:after{right:3px}.popover-bottom.sc-ion-popover-ios-h   .popover-arrow.sc-ion-popover-ios{top:auto;bottom:-10px}.popover-bottom.sc-ion-popover-ios-h   .popover-arrow.sc-ion-popover-ios:after{top:-6px}.popover-translucent.sc-ion-popover-ios-h   .popover-arrow.sc-ion-popover-ios:after, .popover-translucent.sc-ion-popover-ios-h   .popover-content.sc-ion-popover-ios{background:rgba(var(--ion-background-color-rgb,255,255,255),.8);-webkit-backdrop-filter:saturate(180%) blur(20px);backdrop-filter:saturate(180%) blur(20px)}"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "styleMode", { get: function () { return "ios"; }, enumerable: !0, configurable: !0 }), e; }(), LIFECYCLE_MAP = { ionPopoverDidPresent: "ionViewDidEnter", ionPopoverWillPresent: "ionViewWillEnter", ionPopoverWillDismiss: "ionViewWillLeave", ionPopoverDidDismiss: "ionViewDidLeave" };
exports.IonPopover = Popover;
