"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var clipper_core_js_1 = require("../clipper.core.js");
var chunk_c82b670d_js_1 = require("./chunk-c82b670d.js");
var SIZE_TO_MEDIA = { xs: "(min-width: 0px)", sm: "(min-width: 576px)", md: "(min-width: 768px)", lg: "(min-width: 992px)", xl: "(min-width: 1200px)" };
function matchBreakpoint(t, e) { return void 0 === e || "" === e || !!t.matchMedia && t.matchMedia(SIZE_TO_MEDIA[e]).matches; }
var win = window, SUPPORTS_VARS = !!(win.CSS && win.CSS.supports && win.CSS.supports("--a: 0")), BREAKPOINTS = ["", "xs", "sm", "md", "lg", "xl"], Col = function () { function t() { } return t.prototype.onResize = function () { this.el.forceUpdate(); }, t.prototype.getColumns = function (t) { for (var e, i = 0, n = BREAKPOINTS; i < n.length; i++) {
    var r = n[i], o = matchBreakpoint(this.win, r), l = this[t + r.charAt(0).toUpperCase() + r.slice(1)];
    o && void 0 !== l && (e = l);
} return e; }, t.prototype.calculateSize = function () { var t = this.getColumns("size"); if (t && "" !== t) {
    var e = "auto" === t ? "auto" : SUPPORTS_VARS ? "calc(calc(" + t + " / var(--ion-grid-columns, 12)) * 100%)" : t / 12 * 100 + "%";
    return { flex: "0 0 " + e, width: "" + e, "max-width": "" + e };
} }, t.prototype.calculatePosition = function (t, e) { var i, n = this.getColumns(t); if (n)
    return (i = {})[e] = SUPPORTS_VARS ? "calc(calc(" + n + " / var(--ion-grid-columns, 12)) * 100%)" : n > 0 && n < 12 ? n / 12 * 100 + "%" : "auto", i; }, t.prototype.calculateOffset = function (t) { return this.calculatePosition("offset", t ? "margin-right" : "margin-left"); }, t.prototype.calculatePull = function (t) { return this.calculatePosition("pull", t ? "left" : "right"); }, t.prototype.calculatePush = function (t) { return this.calculatePosition("push", t ? "right" : "left"); }, t.prototype.hostData = function () { var t, e = "rtl" === this.win.document.dir; return { class: (t = {}, t["" + this.mode] = !0, t), style: Object.assign({}, this.calculateOffset(e), this.calculatePull(e), this.calculatePush(e), this.calculateSize()) }; }, t.prototype.render = function () { return clipper_core_js_1.h("slot", null); }, Object.defineProperty(t, "is", { get: function () { return "ion-col"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(t, "encapsulation", { get: function () { return "shadow"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(t, "properties", { get: function () { return { el: { elementRef: !0 }, offset: { type: String, attr: "offset" }, offsetLg: { type: String, attr: "offset-lg" }, offsetMd: { type: String, attr: "offset-md" }, offsetSm: { type: String, attr: "offset-sm" }, offsetXl: { type: String, attr: "offset-xl" }, offsetXs: { type: String, attr: "offset-xs" }, pull: { type: String, attr: "pull" }, pullLg: { type: String, attr: "pull-lg" }, pullMd: { type: String, attr: "pull-md" }, pullSm: { type: String, attr: "pull-sm" }, pullXl: { type: String, attr: "pull-xl" }, pullXs: { type: String, attr: "pull-xs" }, push: { type: String, attr: "push" }, pushLg: { type: String, attr: "push-lg" }, pushMd: { type: String, attr: "push-md" }, pushSm: { type: String, attr: "push-sm" }, pushXl: { type: String, attr: "push-xl" }, pushXs: { type: String, attr: "push-xs" }, size: { type: String, attr: "size" }, sizeLg: { type: String, attr: "size-lg" }, sizeMd: { type: String, attr: "size-md" }, sizeSm: { type: String, attr: "size-sm" }, sizeXl: { type: String, attr: "size-xl" }, sizeXs: { type: String, attr: "size-xs" }, win: { context: "window" } }; }, enumerable: !0, configurable: !0 }), Object.defineProperty(t, "listeners", { get: function () { return [{ name: "window:resize", method: "onResize", passive: !0 }]; }, enumerable: !0, configurable: !0 }), Object.defineProperty(t, "style", { get: function () { return ":host{padding-left:var(--ion-grid-column-padding-xs,var(--ion-grid-column-padding,5px));padding-right:var(--ion-grid-column-padding-xs,var(--ion-grid-column-padding,5px));padding-top:var(--ion-grid-column-padding-xs,var(--ion-grid-column-padding,5px));padding-bottom:var(--ion-grid-column-padding-xs,var(--ion-grid-column-padding,5px));margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;-ms-flex-preferred-size:0;flex-basis:0;-ms-flex-positive:1;flex-grow:1;width:100%;max-width:100%;min-height:1px}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--ion-grid-column-padding-xs,var(--ion-grid-column-padding,5px));padding-inline-start:var(--ion-grid-column-padding-xs,var(--ion-grid-column-padding,5px));-webkit-padding-end:var(--ion-grid-column-padding-xs,var(--ion-grid-column-padding,5px));padding-inline-end:var(--ion-grid-column-padding-xs,var(--ion-grid-column-padding,5px))}}\@media (min-width:576px){:host{padding-left:var(--ion-grid-column-padding-sm,var(--ion-grid-column-padding,5px));padding-right:var(--ion-grid-column-padding-sm,var(--ion-grid-column-padding,5px));padding-top:var(--ion-grid-column-padding-sm,var(--ion-grid-column-padding,5px));padding-bottom:var(--ion-grid-column-padding-sm,var(--ion-grid-column-padding,5px))}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--ion-grid-column-padding-sm,var(--ion-grid-column-padding,5px));padding-inline-start:var(--ion-grid-column-padding-sm,var(--ion-grid-column-padding,5px));-webkit-padding-end:var(--ion-grid-column-padding-sm,var(--ion-grid-column-padding,5px));padding-inline-end:var(--ion-grid-column-padding-sm,var(--ion-grid-column-padding,5px))}}}\@media (min-width:768px){:host{padding-left:var(--ion-grid-column-padding-md,var(--ion-grid-column-padding,5px));padding-right:var(--ion-grid-column-padding-md,var(--ion-grid-column-padding,5px));padding-top:var(--ion-grid-column-padding-md,var(--ion-grid-column-padding,5px));padding-bottom:var(--ion-grid-column-padding-md,var(--ion-grid-column-padding,5px))}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--ion-grid-column-padding-md,var(--ion-grid-column-padding,5px));padding-inline-start:var(--ion-grid-column-padding-md,var(--ion-grid-column-padding,5px));-webkit-padding-end:var(--ion-grid-column-padding-md,var(--ion-grid-column-padding,5px));padding-inline-end:var(--ion-grid-column-padding-md,var(--ion-grid-column-padding,5px))}}}\@media (min-width:992px){:host{padding-left:var(--ion-grid-column-padding-lg,var(--ion-grid-column-padding,5px));padding-right:var(--ion-grid-column-padding-lg,var(--ion-grid-column-padding,5px));padding-top:var(--ion-grid-column-padding-lg,var(--ion-grid-column-padding,5px));padding-bottom:var(--ion-grid-column-padding-lg,var(--ion-grid-column-padding,5px))}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--ion-grid-column-padding-lg,var(--ion-grid-column-padding,5px));padding-inline-start:var(--ion-grid-column-padding-lg,var(--ion-grid-column-padding,5px));-webkit-padding-end:var(--ion-grid-column-padding-lg,var(--ion-grid-column-padding,5px));padding-inline-end:var(--ion-grid-column-padding-lg,var(--ion-grid-column-padding,5px))}}}\@media (min-width:1200px){:host{padding-left:var(--ion-grid-column-padding-xl,var(--ion-grid-column-padding,5px));padding-right:var(--ion-grid-column-padding-xl,var(--ion-grid-column-padding,5px));padding-top:var(--ion-grid-column-padding-xl,var(--ion-grid-column-padding,5px));padding-bottom:var(--ion-grid-column-padding-xl,var(--ion-grid-column-padding,5px))}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--ion-grid-column-padding-xl,var(--ion-grid-column-padding,5px));padding-inline-start:var(--ion-grid-column-padding-xl,var(--ion-grid-column-padding,5px));-webkit-padding-end:var(--ion-grid-column-padding-xl,var(--ion-grid-column-padding,5px));padding-inline-end:var(--ion-grid-column-padding-xl,var(--ion-grid-column-padding,5px))}}}"; }, enumerable: !0, configurable: !0 }), t; }(), Grid = function () { function t() { this.fixed = !1; } return t.prototype.hostData = function () { var t; return { class: (t = {}, t["" + this.mode] = !0, t["grid-fixed"] = this.fixed, t) }; }, t.prototype.render = function () { return clipper_core_js_1.h("slot", null); }, Object.defineProperty(t, "is", { get: function () { return "ion-grid"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(t, "encapsulation", { get: function () { return "shadow"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(t, "properties", { get: function () { return { fixed: { type: Boolean, attr: "fixed" } }; }, enumerable: !0, configurable: !0 }), Object.defineProperty(t, "style", { get: function () { return ":host{padding-left:var(--ion-grid-padding-xs,var(--ion-grid-padding,5px));padding-right:var(--ion-grid-padding-xs,var(--ion-grid-padding,5px));padding-top:var(--ion-grid-padding-xs,var(--ion-grid-padding,5px));padding-bottom:var(--ion-grid-padding-xs,var(--ion-grid-padding,5px));margin-left:auto;margin-right:auto;display:block;-ms-flex:1;flex:1}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--ion-grid-padding-xs,var(--ion-grid-padding,5px));padding-inline-start:var(--ion-grid-padding-xs,var(--ion-grid-padding,5px));-webkit-padding-end:var(--ion-grid-padding-xs,var(--ion-grid-padding,5px));padding-inline-end:var(--ion-grid-padding-xs,var(--ion-grid-padding,5px))}}\@media (min-width:576px){:host{padding-left:var(--ion-grid-padding-sm,var(--ion-grid-padding,5px));padding-right:var(--ion-grid-padding-sm,var(--ion-grid-padding,5px));padding-top:var(--ion-grid-padding-sm,var(--ion-grid-padding,5px));padding-bottom:var(--ion-grid-padding-sm,var(--ion-grid-padding,5px))}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--ion-grid-padding-sm,var(--ion-grid-padding,5px));padding-inline-start:var(--ion-grid-padding-sm,var(--ion-grid-padding,5px));-webkit-padding-end:var(--ion-grid-padding-sm,var(--ion-grid-padding,5px));padding-inline-end:var(--ion-grid-padding-sm,var(--ion-grid-padding,5px))}}}\@media (min-width:768px){:host{padding-left:var(--ion-grid-padding-md,var(--ion-grid-padding,5px));padding-right:var(--ion-grid-padding-md,var(--ion-grid-padding,5px));padding-top:var(--ion-grid-padding-md,var(--ion-grid-padding,5px));padding-bottom:var(--ion-grid-padding-md,var(--ion-grid-padding,5px))}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--ion-grid-padding-md,var(--ion-grid-padding,5px));padding-inline-start:var(--ion-grid-padding-md,var(--ion-grid-padding,5px));-webkit-padding-end:var(--ion-grid-padding-md,var(--ion-grid-padding,5px));padding-inline-end:var(--ion-grid-padding-md,var(--ion-grid-padding,5px))}}}\@media (min-width:992px){:host{padding-left:var(--ion-grid-padding-lg,var(--ion-grid-padding,5px));padding-right:var(--ion-grid-padding-lg,var(--ion-grid-padding,5px));padding-top:var(--ion-grid-padding-lg,var(--ion-grid-padding,5px));padding-bottom:var(--ion-grid-padding-lg,var(--ion-grid-padding,5px))}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--ion-grid-padding-lg,var(--ion-grid-padding,5px));padding-inline-start:var(--ion-grid-padding-lg,var(--ion-grid-padding,5px));-webkit-padding-end:var(--ion-grid-padding-lg,var(--ion-grid-padding,5px));padding-inline-end:var(--ion-grid-padding-lg,var(--ion-grid-padding,5px))}}}\@media (min-width:1200px){:host{padding-left:var(--ion-grid-padding-xl,var(--ion-grid-padding,5px));padding-right:var(--ion-grid-padding-xl,var(--ion-grid-padding,5px));padding-top:var(--ion-grid-padding-xl,var(--ion-grid-padding,5px));padding-bottom:var(--ion-grid-padding-xl,var(--ion-grid-padding,5px))}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--ion-grid-padding-xl,var(--ion-grid-padding,5px));padding-inline-start:var(--ion-grid-padding-xl,var(--ion-grid-padding,5px));-webkit-padding-end:var(--ion-grid-padding-xl,var(--ion-grid-padding,5px));padding-inline-end:var(--ion-grid-padding-xl,var(--ion-grid-padding,5px));margin-left:unset;margin-right:unset;-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto}}}:host(.grid-fixed){width:var(--ion-grid-width-xs,var(--ion-grid-width,100%));max-width:100%}\@media (min-width:576px){:host(.grid-fixed){width:var(--ion-grid-width-sm,var(--ion-grid-width,540px))}}\@media (min-width:768px){:host(.grid-fixed){width:var(--ion-grid-width-md,var(--ion-grid-width,720px))}}\@media (min-width:992px){:host(.grid-fixed){width:var(--ion-grid-width-lg,var(--ion-grid-width,960px))}}\@media (min-width:1200px){:host(.grid-fixed){width:var(--ion-grid-width-xl,var(--ion-grid-width,1140px))}}:host([no-padding]),:host([no-padding]) ::slotted(ion-col){padding-left:0;padding-right:0;padding-top:0;padding-bottom:0}"; }, enumerable: !0, configurable: !0 }), t; }(), Item = function () { function t() { this.itemStyles = new Map, this.multipleInputs = !1, this.button = !1, this.detailIcon = "ios-arrow-forward", this.disabled = !1, this.routerDirection = "forward", this.type = "button"; } return t.prototype.itemStyle = function (t) { t.stopPropagation(); var e = t.target.tagName, i = t.detail, n = {}, r = this.itemStyles.get(e) || {}, o = !1; Object.keys(i).forEach(function (t) { var e = "item-" + t, l = i[t]; l !== r[e] && (o = !0), l && (n[e] = !0); }), o && (this.itemStyles.set(e, n), this.el.forceUpdate()); }, t.prototype.componentDidLoad = function () { Array.from(this.el.querySelectorAll("ion-button")).forEach(function (t) { void 0 === t.size && (t.size = "small"); }); var t = this.el.querySelectorAll("ion-select, ion-datetime"); this.multipleInputs = t.length > 1; }, t.prototype.isClickable = function () { return void 0 !== this.href || this.button; }, t.prototype.hostData = function () { var t, e = {}; return this.itemStyles.forEach(function (t) { Object.assign(e, t); }), { "aria-disabled": this.disabled ? "true" : null, class: Object.assign({}, e, chunk_c82b670d_js_1.c(this.color), (t = { item: !0 }, t["" + this.mode] = !0, t["item-lines-" + this.lines] = void 0 !== this.lines, t["item-disabled"] = this.disabled, t["in-list"] = chunk_c82b670d_js_1.a("ion-list", this.el), t["item-multiple-inputs"] = this.multipleInputs, t["ion-activatable"] = this.isClickable(), t["ion-focusable"] = !0, t)) }; }, t.prototype.render = function () { var t = this, e = t.href, i = t.detail, n = t.mode, r = t.win, o = t.detailIcon, l = t.routerDirection, s = t.type, a = this.isClickable(), u = a ? void 0 === e ? "button" : "a" : "div", c = void 0 !== i ? i : "ios" === n && a; return [clipper_core_js_1.h(u, Object.assign({}, "button" === u ? { type: s } : { href: e }, { class: "item-native", disabled: this.disabled, onClick: function (t) { return chunk_c82b670d_js_1.d(r, e, t, l); } }), clipper_core_js_1.h("slot", { name: "start" }), clipper_core_js_1.h("div", { class: "item-inner" }, clipper_core_js_1.h("div", { class: "input-wrapper" }, clipper_core_js_1.h("slot", null)), clipper_core_js_1.h("slot", { name: "end" }), c && clipper_core_js_1.h("ion-icon", { icon: o, lazy: !1, class: "item-detail-icon" }), clipper_core_js_1.h("div", { class: "item-inner-highlight" })), a && "md" === n && clipper_core_js_1.h("ion-ripple-effect", null)), clipper_core_js_1.h("div", { class: "item-highlight" })]; }, Object.defineProperty(t, "is", { get: function () { return "ion-item"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(t, "encapsulation", { get: function () { return "shadow"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(t, "properties", { get: function () { return { button: { type: Boolean, attr: "button" }, color: { type: String, attr: "color" }, detail: { type: Boolean, attr: "detail" }, detailIcon: { type: String, attr: "detail-icon" }, disabled: { type: Boolean, attr: "disabled" }, el: { elementRef: !0 }, href: { type: String, attr: "href" }, lines: { type: String, attr: "lines" }, mode: { type: String, attr: "mode" }, multipleInputs: { state: !0 }, routerDirection: { type: String, attr: "router-direction" }, type: { type: String, attr: "type" }, win: { context: "window" } }; }, enumerable: !0, configurable: !0 }), Object.defineProperty(t, "listeners", { get: function () { return [{ name: "ionStyle", method: "itemStyle" }]; }, enumerable: !0, configurable: !0 }), Object.defineProperty(t, "style", { get: function () { return ":host{--border-radius:0px;--border-width:0px;--border-style:solid;--padding-top:0px;--padding-bottom:0px;--padding-end:0px;--padding-start:0px;--box-shadow:none;--inner-border-width:0px;--inner-padding-top:0px;--inner-padding-bottom:0px;--inner-padding-start:0px;--inner-padding-end:0px;--inner-box-shadow:none;--show-full-highlight:0;--show-inset-highlight:0;--detail-icon-color:initial;--detail-icon-font-size:20px;--detail-icon-opacity:0.25;--ripple-color:var(--ion-item-background-activated,currentColor);-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:block;position:relative;outline:none;color:var(--color);font-family:var(--ion-font-family,inherit);text-align:initial;text-decoration:none;-webkit-box-sizing:border-box;box-sizing:border-box}:host(.ion-color) .item-native{background:var(--ion-color-base);color:var(--ion-color-contrast)}:host(.ion-color) .item-inner,:host(.ion-color) .item-native{border-color:var(--ion-color-shade)}:host(.ion-focused) .item-native{background:var(--background-focused)}:host(.activated) .item-native{background:var(--background-activated)}:host(.ion-color.activated) .item-native{background:var(--ion-color-tint)}:host(.item-disabled){cursor:default;opacity:.3;pointer-events:none}.item-native{border-radius:var(--border-radius);margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:calc(var(--padding-start) + var(--ion-safe-area-left, 0px));padding-right:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;display:-ms-flexbox;display:flex;position:relative;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;width:100%;min-height:var(--min-height);-webkit-transition:var(--transition);transition:var(--transition);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);outline:none;background:var(--background);-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow);overflow:hidden;-webkit-box-sizing:border-box;box-sizing:border-box}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.item-native{padding-left:unset;padding-right:unset;-webkit-padding-start:calc(var(--padding-start) + var(--ion-safe-area-left, 0px));padding-inline-start:calc(var(--padding-start) + var(--ion-safe-area-left, 0px));-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end)}}.item-native::-moz-focus-inner{border:0}a,button{cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-user-drag:none}.item-inner{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:var(--inner-padding-start);padding-right:calc(var(--ion-safe-area-right, 0px) + var(--inner-padding-end));padding-top:var(--inner-padding-top);padding-bottom:var(--inner-padding-bottom);display:-ms-flexbox;display:flex;position:relative;-ms-flex:1;flex:1;-ms-flex-direction:inherit;flex-direction:inherit;-ms-flex-align:inherit;align-items:inherit;-ms-flex-item-align:stretch;align-self:stretch;min-height:inherit;border-width:var(--inner-border-width);border-style:var(--border-style);border-color:var(--border-color);-webkit-box-shadow:var(--inner-box-shadow);box-shadow:var(--inner-box-shadow);overflow:hidden;-webkit-box-sizing:border-box;box-sizing:border-box}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.item-inner{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--inner-padding-start);padding-inline-start:var(--inner-padding-start);-webkit-padding-end:calc(var(--ion-safe-area-right, 0px) + var(--inner-padding-end));padding-inline-end:calc(var(--ion-safe-area-right, 0px) + var(--inner-padding-end))}}.item-detail-icon{color:var(--detail-icon-color);font-size:var(--detail-icon-font-size);opacity:var(--detail-icon-opacity)}::slotted(ion-icon){font-size:1.6em}::slotted(ion-button){--margin-top:0;--margin-bottom:0;--margin-start:0;--margin-end:0;z-index:1}::slotted(ion-label){-ms-flex:1;flex:1}:host(.item-input),:host([vertical-align-top]){-ms-flex-align:start;align-items:flex-start}.input-wrapper{display:-ms-flexbox;display:flex;-ms-flex:1;flex:1;-ms-flex-direction:inherit;flex-direction:inherit;-ms-flex-align:inherit;align-items:inherit;-ms-flex-item-align:stretch;align-self:stretch;text-overflow:ellipsis;overflow:hidden;-webkit-box-sizing:border-box;box-sizing:border-box}:host(.item-label-floating) .input-wrapper,:host(.item-label-stacked) .input-wrapper{-ms-flex:1;flex:1;-ms-flex-direction:column;flex-direction:column}.item-highlight,.item-inner-highlight{left:0;right:0;bottom:0;position:absolute;background:var(--highlight-background)}.item-highlight{height:var(--full-highlight-height)}.item-inner-highlight{height:var(--inset-highlight-height)}:host(.item-interactive.ion-touched.ion-invalid),:host(.item-interactive.item-has-focus){--full-highlight-height:calc(var(--highlight-height) * var(--show-full-highlight));--inset-highlight-height:calc(var(--highlight-height) * var(--show-inset-highlight))}:host(.item-interactive.item-has-focus){--highlight-background:var(--highlight-color-focused)}:host(.item-interactive.ion-valid){--highlight-background:var(--highlight-color-valid)}:host(.item-interactive.ion-invalid){--highlight-background:var(--highlight-color-invalid)}:host(.item-label-floating) ::slotted(ion-select),:host(.item-label-stacked) ::slotted(ion-select){--padding-start:0;-ms-flex-item-align:stretch;align-self:stretch;width:100%;max-width:100%}:host(.item-label-floating) ::slotted(ion-datetime),:host(.item-label-stacked) ::slotted(ion-datetime){--padding-start:0;width:100%}:host(.item-multiple-inputs) ::slotted(ion-datetime),:host(.item-multiple-inputs) ::slotted(ion-select){position:relative}:host(.item-textarea){-ms-flex-align:stretch;align-items:stretch}::slotted(ion-reorder[slot]){margin-top:0;margin-bottom:0}ion-ripple-effect{color:var(--ripple-color)}:host{--min-height:44px;--transition:background-color 200ms linear;--padding-start:16px;--inner-padding-end:8px;--inner-border-width:0px 0px 0.55px 0px;--background:var(--ion-item-background,var(--ion-background-color,#fff));--background-activated:var(--ion-item-background-activated,#d9d9d9);--background-focused:var(--ion-item-background-activated,#d9d9d9);--border-color:var(--ion-item-border-color,var(--ion-border-color,var(--ion-color-step-150,#c8c7cc)));--color:var(--ion-item-color,var(--ion-text-color,#000));--highlight-height:0;--highlight-color-focused:var(--ion-color-primary,#3880ff);--highlight-color-valid:var(--ion-color-success,#10dc60);--highlight-color-invalid:var(--ion-color-danger,#f04141);font-size:17px}:host(.activated){--transition:none}:host(.item-interactive){--show-full-highlight:0;--show-inset-highlight:1}:host(.item-lines-full){--border-width:0px 0px 0.55px 0px;--show-full-highlight:1;--show-inset-highlight:0}:host(.item-lines-inset){--inner-border-width:0px 0px 0.55px 0px;--show-full-highlight:0;--show-inset-highlight:1}:host(.item-lines-inset),:host(.item-lines-none){--border-width:0px;--show-full-highlight:0}:host(.item-lines-full),:host(.item-lines-none){--inner-border-width:0px;--show-inset-highlight:0}::slotted([slot=start]){margin-left:0;margin-right:16px;margin-top:2px;margin-bottom:2px}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){::slotted([slot=start]){margin-left:unset;margin-right:unset;-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:16px;margin-inline-end:16px}}::slotted([slot=end]){margin-left:8px;margin-right:8px}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){::slotted([slot=end]){margin-left:unset;margin-right:unset;-webkit-margin-start:8px;margin-inline-start:8px;-webkit-margin-end:8px;margin-inline-end:8px}}::slotted(ion-icon[slot=end]),::slotted(ion-icon[slot=start]){margin-left:0;margin-top:7px;margin-bottom:7px}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){::slotted(ion-icon[slot=end]),::slotted(ion-icon[slot=start]){margin-left:unset;-webkit-margin-start:0;margin-inline-start:0}}::slotted(ion-toggle[slot=end]),::slotted(ion-toggle[slot=start]){margin-left:0;margin-right:0;margin-top:0;margin-bottom:0}:host(.item-label-floating) ::slotted([slot=end]),:host(.item-label-stacked) ::slotted([slot=end]){margin-top:7px;margin-bottom:7px}::slotted(.button-small){--padding-top:0px;--padding-bottom:0px;--padding-start:.5em;--padding-end:.5em;height:24px;font-size:13px}::slotted(ion-avatar){width:36px;height:36px}::slotted(ion-thumbnail){width:56px;height:56px}::slotted(ion-avatar[slot=end]),::slotted(ion-thumbnail[slot=end]){margin-left:8px;margin-right:8px;margin-top:8px;margin-bottom:8px}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){::slotted(ion-avatar[slot=end]),::slotted(ion-thumbnail[slot=end]){margin-left:unset;margin-right:unset;-webkit-margin-start:8px;margin-inline-start:8px;-webkit-margin-end:8px;margin-inline-end:8px}}:host(.item-radio) ::slotted(ion-label),:host(.item-toggle) ::slotted(ion-label){margin-left:0}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host(.item-radio) ::slotted(ion-label),:host(.item-toggle) ::slotted(ion-label){margin-left:unset;-webkit-margin-start:0;margin-inline-start:0}}::slotted(ion-label){margin-left:0;margin-right:8px;margin-top:10px;margin-bottom:10px}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){::slotted(ion-label){margin-left:unset;margin-right:unset;-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:8px;margin-inline-end:8px}}:host(.item-label-floating),:host(.item-label-stacked){--min-height:68px}:host(.item-label-floating) ::slotted(ion-select),:host(.item-label-stacked) ::slotted(ion-select){--padding-top:8px;--padding-bottom:8px;--padding-start:0px}"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(t, "styleMode", { get: function () { return "ios"; }, enumerable: !0, configurable: !0 }), t; }(), Row = function () { function t() { } return t.prototype.hostData = function () { var t; return { class: (t = {}, t["" + this.mode] = !0, t) }; }, t.prototype.render = function () { return clipper_core_js_1.h("slot", null); }, Object.defineProperty(t, "is", { get: function () { return "ion-row"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(t, "encapsulation", { get: function () { return "shadow"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(t, "style", { get: function () { return ":host{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}"; }, enumerable: !0, configurable: !0 }), t; }();
exports.IonCol = Col;
exports.IonGrid = Grid;
exports.IonItem = Item;
exports.IonRow = Row;
