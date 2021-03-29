"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var clipper_core_js_1 = require("../clipper.core.js");
var chunk_c82b670d_js_1 = require("./chunk-c82b670d.js");
var chunk_794673eb_js_1 = require("./chunk-794673eb.js");
var sanitizeDOMString = function (e) { try {
    if ("string" != typeof e || "" === e)
        return e;
    var t = document.createDocumentFragment(), n = document.createElement("div");
    t.appendChild(n), n.innerHTML = e, blockedTags.forEach(function (e) { for (var n = t.querySelectorAll(e), r = n.length - 1; r >= 0; r--) {
        var a = n[r];
        a.parentNode ? a.parentNode.removeChild(a) : t.removeChild(a);
        for (var i = getElementChildren(a), o = 0; o < i.length; o++)
            sanitizeElement(i[o]);
    } });
    for (var r = getElementChildren(t), a = 0; a < r.length; a++)
        sanitizeElement(r[a]);
    var i = document.createElement("div");
    i.appendChild(t);
    var o = i.querySelector("div");
    return null !== o ? o.innerHTML : i.innerHTML;
}
catch (e) {
    return console.error(e), "";
} }, sanitizeElement = function (e) { if (!e.nodeType || 1 === e.nodeType) {
    for (var t = e.attributes.length - 1; t >= 0; t--) {
        var n = e.attributes[t], r = n.name;
        if (allowedAttributes.includes(r.toLowerCase())) {
            var a = n.value;
            null != a && a.toLowerCase().includes("javascript:") && e.removeAttribute(r);
        }
        else
            e.removeAttribute(r);
    }
    var i = getElementChildren(e);
    for (t = 0; t < i.length; t++)
        sanitizeElement(i[t]);
} }, getElementChildren = function (e) { return null != e.children ? e.children : e.childNodes; }, allowedAttributes = ["class", "id", "href", "src"], blockedTags = ["script", "style", "iframe", "meta", "link", "object", "embed"];
function iosEnterAnimation(e, t) { var n = new e, r = new e; r.addElement(t.querySelector("ion-backdrop")); var a = new e; a.addElement(t.querySelector(".alert-wrapper")), r.fromTo("opacity", .01, .3), a.fromTo("opacity", .01, 1).fromTo("scale", 1.1, 1); var i = n.addElement(t).easing("ease-in-out").duration(200).add(r).add(a); return Promise.resolve(i); }
function iosLeaveAnimation(e, t) { var n = new e, r = new e; r.addElement(t.querySelector("ion-backdrop")); var a = new e; a.addElement(t.querySelector(".alert-wrapper")), r.fromTo("opacity", .3, 0), a.fromTo("opacity", .99, 0).fromTo("scale", 1, .9); var i = n.addElement(t).easing("ease-in-out").duration(200).add(r).add(a); return Promise.resolve(i); }
function mdEnterAnimation(e, t) { var n = new e, r = new e; r.addElement(t.querySelector("ion-backdrop")); var a = new e; return a.addElement(t.querySelector(".alert-wrapper")), r.fromTo("opacity", .01, .32), a.fromTo("opacity", .01, 1).fromTo("scale", .9, 1), Promise.resolve(n.addElement(t).easing("ease-in-out").duration(150).add(r).add(a)); }
function mdLeaveAnimation(e, t) { var n = new e, r = new e; r.addElement(t.querySelector("ion-backdrop")); var a = new e; return a.addElement(t.querySelector(".alert-wrapper")), r.fromTo("opacity", .32, 0), a.fromTo("opacity", .99, 0), Promise.resolve(n.addElement(t).easing("ease-in-out").duration(150).add(r).add(a)); }
var Alert = function () { function e() { this.processedInputs = [], this.processedButtons = [], this.presented = !1, this.keyboardClose = !0, this.buttons = [], this.inputs = [], this.backdropDismiss = !0, this.translucent = !1, this.animated = !0; } return e.prototype.buttonsChanged = function () { this.processedButtons = this.buttons.map(function (e) { return "string" == typeof e ? { text: e, role: "cancel" === e.toLowerCase() ? "cancel" : void 0 } : e; }); }, e.prototype.inputsChanged = function () { var e = this, t = this.inputs, n = new Set(t.map(function (e) { return e.type; })); n.has("checkbox") && n.has("radio") && console.warn("Alert cannot mix input types: " + Array.from(n.values()).join("/") + ". Please see alert docs for more info."), this.inputType = n.values().next().value, this.processedInputs = t.map(function (t, n) { return { type: t.type || "text", name: t.name || "" + n, placeholder: t.placeholder || "", value: t.value, label: t.label, checked: !!t.checked, disabled: !!t.disabled, id: t.id || "alert-input-" + e.overlayIndex + "-" + n, handler: t.handler, min: t.min, max: t.max }; }); }, e.prototype.componentWillLoad = function () { this.inputsChanged(), this.buttonsChanged(); }, e.prototype.onBackdropTap = function () { this.dismiss(void 0, chunk_794673eb_js_1.g); }, e.prototype.dispatchCancelHandler = function (e) { if (chunk_794673eb_js_1.h(e.detail.role)) {
    var t = this.processedButtons.find(function (e) { return "cancel" === e.role; });
    this.callButtonHandler(t);
} }, e.prototype.present = function () { return chunk_794673eb_js_1.a(this, "alertEnter", iosEnterAnimation, mdEnterAnimation); }, e.prototype.dismiss = function (e, t) { return chunk_794673eb_js_1.b(this, e, t, "alertLeave", iosLeaveAnimation, mdLeaveAnimation); }, e.prototype.onDidDismiss = function () { return chunk_794673eb_js_1.c(this.el, "ionAlertDidDismiss"); }, e.prototype.onWillDismiss = function () { return chunk_794673eb_js_1.c(this.el, "ionAlertWillDismiss"); }, e.prototype.rbClick = function (e) { for (var t = 0, n = this.processedInputs; t < n.length; t++) {
    var r = n[t];
    r.checked = r === e;
} this.activeId = e.id, e.handler && e.handler(e), this.el.forceUpdate(); }, e.prototype.cbClick = function (e) { e.checked = !e.checked, e.handler && e.handler(e), this.el.forceUpdate(); }, e.prototype.buttonClick = function (e) { var t = e.role, n = this.getValues(); if (chunk_794673eb_js_1.h(t))
    return this.dismiss({ values: n }, t); var r = this.callButtonHandler(e, n); return !1 !== r ? this.dismiss(Object.assign({ values: n }, r), e.role) : Promise.resolve(!1); }, e.prototype.callButtonHandler = function (e, t) { if (e && e.handler) {
    var n = e.handler(t);
    if (!1 === n)
        return !1;
    if ("object" == typeof n)
        return n;
} return {}; }, e.prototype.getValues = function () { if (0 !== this.processedInputs.length) {
    if ("radio" === this.inputType) {
        var e = this.processedInputs.find(function (e) { return !!e.checked; });
        return e ? e.value : void 0;
    }
    if ("checkbox" === this.inputType)
        return this.processedInputs.filter(function (e) { return e.checked; }).map(function (e) { return e.value; });
    var t = {};
    return this.processedInputs.forEach(function (e) { t[e.name] = e.value || ""; }), t;
} }, e.prototype.renderAlertInputs = function (e) { switch (this.inputType) {
    case "checkbox": return this.renderCheckbox(e);
    case "radio": return this.renderRadio(e);
    default: return this.renderInput(e);
} }, e.prototype.renderCheckbox = function (e) { var t = this, n = this.processedInputs; return 0 === n.length ? null : clipper_core_js_1.h("div", { class: "alert-checkbox-group", "aria-labelledby": e }, n.map(function (e) { return clipper_core_js_1.h("button", { type: "button", onClick: function () { return t.cbClick(e); }, "aria-checked": "" + e.checked, id: e.id, disabled: e.disabled, tabIndex: 0, role: "checkbox", class: "alert-tappable alert-checkbox alert-checkbox-button ion-focusable" }, clipper_core_js_1.h("div", { class: "alert-button-inner" }, clipper_core_js_1.h("div", { class: "alert-checkbox-icon" }, clipper_core_js_1.h("div", { class: "alert-checkbox-inner" })), clipper_core_js_1.h("div", { class: "alert-checkbox-label" }, e.label)), "md" === t.mode && clipper_core_js_1.h("ion-ripple-effect", null)); })); }, e.prototype.renderRadio = function (e) { var t = this, n = this.processedInputs; return 0 === n.length ? null : clipper_core_js_1.h("div", { class: "alert-radio-group", role: "radiogroup", "aria-labelledby": e, "aria-activedescendant": this.activeId }, n.map(function (e) { return clipper_core_js_1.h("button", { type: "button", onClick: function () { return t.rbClick(e); }, "aria-checked": "" + e.checked, disabled: e.disabled, id: e.id, tabIndex: 0, class: "alert-radio-button alert-tappable alert-radio ion-focusable", role: "radio" }, clipper_core_js_1.h("div", { class: "alert-button-inner" }, clipper_core_js_1.h("div", { class: "alert-radio-icon" }, clipper_core_js_1.h("div", { class: "alert-radio-inner" })), clipper_core_js_1.h("div", { class: "alert-radio-label" }, e.label))); })); }, e.prototype.renderInput = function (e) { var t = this.processedInputs; return 0 === t.length ? null : clipper_core_js_1.h("div", { class: "alert-input-group", "aria-labelledby": e }, t.map(function (e) { return clipper_core_js_1.h("div", { class: "alert-input-wrapper" }, clipper_core_js_1.h("input", { placeholder: e.placeholder, value: e.value, type: e.type, min: e.min, max: e.max, onInput: function (t) { return e.value = t.target.value; }, id: e.id, disabled: e.disabled, tabIndex: 0, class: "alert-input" })); })); }, e.prototype.hostData = function () { var e; return { role: "dialog", "aria-modal": "true", style: { zIndex: 2e4 + this.overlayIndex }, class: Object.assign({}, chunk_c82b670d_js_1.b(this.cssClass), (e = {}, e["" + this.mode] = !0, e["alert-translucent"] = this.translucent, e)) }; }, e.prototype.renderAlertButtons = function () { var e = this, t = this.processedButtons; return clipper_core_js_1.h("div", { class: { "alert-button-group": !0, "alert-button-group-vertical": t.length > 2 } }, t.map(function (t) { return clipper_core_js_1.h("button", { type: "button", class: buttonClass(t), tabIndex: 0, onClick: function () { return e.buttonClick(t); } }, clipper_core_js_1.h("span", { class: "alert-button-inner" }, t.text), "md" === e.mode && clipper_core_js_1.h("ion-ripple-effect", null)); })); }, e.prototype.render = function () { var e, t = "alert-" + this.overlayIndex + "-hdr", n = "alert-" + this.overlayIndex + "-sub-hdr", r = "alert-" + this.overlayIndex + "-msg"; return void 0 !== this.header ? e = t : void 0 !== this.subHeader && (e = n), [clipper_core_js_1.h("ion-backdrop", { tappable: this.backdropDismiss }), clipper_core_js_1.h("div", { class: "alert-wrapper" }, clipper_core_js_1.h("div", { class: "alert-head" }, this.header && clipper_core_js_1.h("h2", { id: t, class: "alert-title" }, this.header), this.subHeader && clipper_core_js_1.h("h2", { id: n, class: "alert-sub-title" }, this.subHeader)), clipper_core_js_1.h("div", { id: r, class: "alert-message", innerHTML: sanitizeDOMString(this.message) }), this.renderAlertInputs(e), this.renderAlertButtons())]; }, Object.defineProperty(e, "is", { get: function () { return "ion-alert"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "encapsulation", { get: function () { return "scoped"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "properties", { get: function () { return { animated: { type: Boolean, attr: "animated" }, backdropDismiss: { type: Boolean, attr: "backdrop-dismiss" }, buttons: { type: "Any", attr: "buttons", watchCallbacks: ["buttonsChanged"] }, config: { context: "config" }, cssClass: { type: String, attr: "css-class" }, dismiss: { method: !0 }, el: { elementRef: !0 }, enterAnimation: { type: "Any", attr: "enter-animation" }, header: { type: String, attr: "header" }, inputs: { type: "Any", attr: "inputs", mutable: !0, watchCallbacks: ["inputsChanged"] }, keyboardClose: { type: Boolean, attr: "keyboard-close" }, leaveAnimation: { type: "Any", attr: "leave-animation" }, message: { type: String, attr: "message" }, mode: { type: String, attr: "mode" }, onDidDismiss: { method: !0 }, onWillDismiss: { method: !0 }, overlayIndex: { type: Number, attr: "overlay-index" }, present: { method: !0 }, subHeader: { type: String, attr: "sub-header" }, translucent: { type: Boolean, attr: "translucent" } }; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "events", { get: function () { return [{ name: "ionAlertDidPresent", method: "didPresent", bubbles: !0, cancelable: !0, composed: !0 }, { name: "ionAlertWillPresent", method: "willPresent", bubbles: !0, cancelable: !0, composed: !0 }, { name: "ionAlertWillDismiss", method: "willDismiss", bubbles: !0, cancelable: !0, composed: !0 }, { name: "ionAlertDidDismiss", method: "didDismiss", bubbles: !0, cancelable: !0, composed: !0 }]; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "listeners", { get: function () { return [{ name: "ionBackdropTap", method: "onBackdropTap" }, { name: "ionAlertWillDismiss", method: "dispatchCancelHandler" }]; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "style", { get: function () { return ".sc-ion-alert-ios-h{--min-width:250px;--width:auto;--min-height:auto;--height:auto;--max-height:90%;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:fixed;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;font-family:var(--ion-font-family,inherit);contain:strict;-ms-touch-action:none;touch-action:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:1000}.overlay-hidden.sc-ion-alert-ios-h{display:none}.alert-top.sc-ion-alert-ios-h{padding-top:50px;-ms-flex-align:start;align-items:flex-start}.alert-wrapper.sc-ion-alert-ios{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);background:var(--background);contain:content;opacity:0;z-index:10}.alert-title.sc-ion-alert-ios{margin-top:0}.alert-sub-title.sc-ion-alert-ios, .alert-title.sc-ion-alert-ios{margin-left:0;margin-right:0;margin-bottom:0;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0}.alert-sub-title.sc-ion-alert-ios{margin-top:5px;font-weight:400}.alert-message.sc-ion-alert-ios{-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-overflow-scrolling:touch;overflow-y:scroll;overscroll-behavior-y:contain}.alert-checkbox-group.sc-ion-alert-ios::-webkit-scrollbar, .alert-message.sc-ion-alert-ios::-webkit-scrollbar, .alert-radio-group.sc-ion-alert-ios::-webkit-scrollbar{display:none}.alert-input.sc-ion-alert-ios{padding-left:0;padding-right:0;padding-top:10px;padding-bottom:10px;width:100%;border:0;background:inherit;font:inherit;-webkit-box-sizing:border-box;box-sizing:border-box}.alert-button-group.sc-ion-alert-ios{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;width:100%}.alert-button-group-vertical.sc-ion-alert-ios{-ms-flex-direction:column;flex-direction:column;-ms-flex-wrap:nowrap;flex-wrap:nowrap}.alert-button.sc-ion-alert-ios{display:block;border:0;font-size:14px;line-height:20px;z-index:0}.alert-button.ion-focused.sc-ion-alert-ios, .alert-tappable.ion-focused.sc-ion-alert-ios{background:var(--ion-color-step-100,#e6e6e6)}.alert-button-inner.sc-ion-alert-ios{-ms-flex-flow:row nowrap;flex-flow:row nowrap;-ms-flex-negative:0;flex-shrink:0;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;height:100%}.alert-button-inner.sc-ion-alert-ios, .alert-tappable.sc-ion-alert-ios{display:-ms-flexbox;display:flex;width:100%}.alert-tappable.sc-ion-alert-ios{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;border:0;background:transparent;font-size:inherit;line-height:normal;text-align:start;-webkit-appearance:none;-moz-appearance:none;appearance:none;contain:strict}.alert-button.sc-ion-alert-ios, .alert-checkbox.sc-ion-alert-ios, .alert-input.sc-ion-alert-ios, .alert-radio.sc-ion-alert-ios{outline:none}.alert-checkbox-icon.sc-ion-alert-ios, .alert-checkbox-inner.sc-ion-alert-ios, .alert-radio-icon.sc-ion-alert-ios{-webkit-box-sizing:border-box;box-sizing:border-box}.sc-ion-alert-ios-h{--background:var(--ion-overlay-background-color,var(--ion-color-step-150,#f9f9f9));--max-width:270px;font-size:14px}.alert-wrapper.sc-ion-alert-ios{border-radius:13px;-webkit-box-shadow:none;box-shadow:none;overflow:hidden}.alert-translucent.sc-ion-alert-ios-h   .alert-wrapper.sc-ion-alert-ios{background:rgba(var(--ion-background-color-rgb,255,255,255),.9);-webkit-backdrop-filter:saturate(180%) blur(20px);backdrop-filter:saturate(180%) blur(20px)}.alert-head.sc-ion-alert-ios{padding-left:16px;padding-right:16px;padding-top:12px;padding-bottom:7px;text-align:center}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.alert-head.sc-ion-alert-ios{padding-left:unset;padding-right:unset;-webkit-padding-start:16px;padding-inline-start:16px;-webkit-padding-end:16px;padding-inline-end:16px}}.alert-title.sc-ion-alert-ios{margin-top:8px;color:var(--ion-text-color,#000);font-size:17px;font-weight:600}.alert-sub-title.sc-ion-alert-ios{color:var(--ion-color-step-600,#666);font-size:14px}.alert-input-group.sc-ion-alert-ios, .alert-message.sc-ion-alert-ios{padding-left:16px;padding-right:16px;padding-top:0;padding-bottom:21px;color:var(--ion-text-color,#000);font-size:13px;text-align:center}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.alert-input-group.sc-ion-alert-ios, .alert-message.sc-ion-alert-ios{padding-left:unset;padding-right:unset;-webkit-padding-start:16px;padding-inline-start:16px;-webkit-padding-end:16px;padding-inline-end:16px}}.alert-message.sc-ion-alert-ios{max-height:240px}.alert-message.sc-ion-alert-ios:empty{padding-left:0;padding-right:0;padding-top:0;padding-bottom:12px}.alert-input.sc-ion-alert-ios{border-radius:4px;margin-top:10px;padding-left:6px;padding-right:6px;padding-top:6px;padding-bottom:6px;border:.55px solid var(--ion-color-step-250,#bfbfbf);background-color:var(--ion-background-color,#fff);-webkit-appearance:none;-moz-appearance:none;appearance:none}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.alert-input.sc-ion-alert-ios{padding-left:unset;padding-right:unset;-webkit-padding-start:6px;padding-inline-start:6px;-webkit-padding-end:6px;padding-inline-end:6px}}.alert-input.sc-ion-alert-ios::-webkit-input-placeholder{color:var(--ion-placeholder-color,var(--ion-color-step-400,#999));font-family:inherit;font-weight:inherit}.alert-input.sc-ion-alert-ios:-ms-input-placeholder{color:var(--ion-placeholder-color,var(--ion-color-step-400,#999));font-family:inherit;font-weight:inherit}.alert-input.sc-ion-alert-ios::-ms-input-placeholder{color:var(--ion-placeholder-color,var(--ion-color-step-400,#999));font-family:inherit;font-weight:inherit}.alert-input.sc-ion-alert-ios::placeholder{color:var(--ion-placeholder-color,var(--ion-color-step-400,#999));font-family:inherit;font-weight:inherit}.alert-input.sc-ion-alert-ios::-ms-clear{display:none}.alert-checkbox-group.sc-ion-alert-ios, .alert-radio-group.sc-ion-alert-ios{-ms-scroll-chaining:none;overscroll-behavior:contain;max-height:240px;border-top:.55px solid rgba(var(--ion-text-color-rgb,0,0,0),.2);overflow-y:scroll;-webkit-overflow-scrolling:touch}.alert-tappable.sc-ion-alert-ios{height:44px}.alert-radio-label.sc-ion-alert-ios{padding-left:13px;padding-right:13px;padding-top:13px;padding-bottom:13px;-ms-flex:1;flex:1;-ms-flex-order:0;order:0;color:var(--ion-text-color,#000);text-overflow:ellipsis;white-space:nowrap;overflow:hidden}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.alert-radio-label.sc-ion-alert-ios{padding-left:unset;padding-right:unset;-webkit-padding-start:13px;padding-inline-start:13px;-webkit-padding-end:13px;padding-inline-end:13px}}[aria-checked=true].sc-ion-alert-ios   .alert-radio-label.sc-ion-alert-ios{color:var(--ion-color-primary,#3880ff)}.alert-radio-icon.sc-ion-alert-ios{position:relative;-ms-flex-order:1;order:1;min-width:30px}[aria-checked=true].sc-ion-alert-ios   .alert-radio-inner.sc-ion-alert-ios{left:7px;top:-7px;position:absolute;width:6px;height:12px;-webkit-transform:rotate(45deg);transform:rotate(45deg);border-width:2px;border-top-width:0;border-left-width:0;border-style:solid;border-color:var(--ion-color-primary,#3880ff)}[dir=rtl].sc-ion-alert-ios-h   [aria-checked=true].sc-ion-alert-ios   .alert-radio-inner.sc-ion-alert-ios, [dir=rtl]   .sc-ion-alert-ios-h   [aria-checked=true].sc-ion-alert-ios   .alert-radio-inner.sc-ion-alert-ios{right:7px}.alert-checkbox-label.sc-ion-alert-ios{padding-left:13px;padding-right:13px;padding-top:13px;padding-bottom:13px;-ms-flex:1;flex:1;color:var(--ion-text-color,#000);text-overflow:ellipsis;white-space:nowrap;overflow:hidden}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.alert-checkbox-label.sc-ion-alert-ios{padding-left:unset;padding-right:unset;-webkit-padding-start:13px;padding-inline-start:13px;-webkit-padding-end:13px;padding-inline-end:13px}}.alert-checkbox-icon.sc-ion-alert-ios{border-radius:50%;margin-left:16px;margin-right:6px;margin-top:10px;margin-bottom:10px;position:relative;width:24px;height:24px;border-width:1px;border-style:solid;border-color:var(--ion-item-border-color,var(--ion-border-color,var(--ion-color-step-150,#c8c7cc)));background-color:var(--ion-item-background,var(--ion-background-color,#fff));contain:strict}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.alert-checkbox-icon.sc-ion-alert-ios{margin-left:unset;margin-right:unset;-webkit-margin-start:16px;margin-inline-start:16px;-webkit-margin-end:6px;margin-inline-end:6px}}[aria-checked=true].sc-ion-alert-ios   .alert-checkbox-icon.sc-ion-alert-ios{border-color:var(--ion-color-primary,#3880ff);background-color:var(--ion-color-primary,#3880ff)}[aria-checked=true].sc-ion-alert-ios   .alert-checkbox-inner.sc-ion-alert-ios{left:9px;top:4px;position:absolute;width:5px;height:12px;-webkit-transform:rotate(45deg);transform:rotate(45deg);border-width:1px;border-top-width:0;border-left-width:0;border-style:solid;border-color:var(--ion-background-color,#fff)}[dir=rtl].sc-ion-alert-ios-h   [aria-checked=true].sc-ion-alert-ios   .alert-checkbox-inner.sc-ion-alert-ios, [dir=rtl]   .sc-ion-alert-ios-h   [aria-checked=true].sc-ion-alert-ios   .alert-checkbox-inner.sc-ion-alert-ios{right:9px}.alert-button-group.sc-ion-alert-ios{margin-right:-.55px;-ms-flex-wrap:wrap;flex-wrap:wrap}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.alert-button-group.sc-ion-alert-ios{margin-right:unset;-webkit-margin-end:-.55px;margin-inline-end:-.55px}}.alert-button.sc-ion-alert-ios{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;border-radius:0;-ms-flex:1 1 auto;flex:1 1 auto;min-width:50%;height:44px;border-top:.55px solid rgba(var(--ion-text-color-rgb,0,0,0),.2);border-right:.55px solid rgba(var(--ion-text-color-rgb,0,0,0),.2);background-color:transparent;color:var(--ion-color-primary,#3880ff);font-size:17px;overflow:hidden}[dir=rtl].sc-ion-alert-ios-h   .alert-button.sc-ion-alert-ios:first-child, [dir=rtl]   .sc-ion-alert-ios-h   .alert-button.sc-ion-alert-ios:first-child{border-right:0}.alert-button.sc-ion-alert-ios:last-child{border-right:0;font-weight:700}[dir=rtl].sc-ion-alert-ios-h   .alert-button.sc-ion-alert-ios:last-child, [dir=rtl]   .sc-ion-alert-ios-h   .alert-button.sc-ion-alert-ios:last-child{border-right:.55px solid rgba(var(--ion-text-color-rgb,0,0,0),.2)}.alert-button.activated.sc-ion-alert-ios{background-color:rgba(var(--ion-text-color-rgb,0,0,0),.1)}"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "styleMode", { get: function () { return "ios"; }, enumerable: !0, configurable: !0 }), e; }();
exports.IonAlert = Alert;
function buttonClass(e) { return Object.assign({ "alert-button": !0, "ion-focusable": !0, "ion-activatable": !0 }, chunk_c82b670d_js_1.b(e.cssClass)); }
