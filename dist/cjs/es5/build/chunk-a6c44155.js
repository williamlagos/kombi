"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("../polyfills/tslib.js");
function startHardwareBackButton(t) { var e = !1; t.document.addEventListener("backbutton", function () { if (!e) {
    var n = [], r = new CustomEvent("ionBackButton", { bubbles: !1, detail: { register: function (t, e) { n.push({ priority: t, handler: e }); } } });
    if (t.document.dispatchEvent(r), n.length > 0) {
        var i, a = Number.MIN_SAFE_INTEGER;
        n.forEach(function (t) { var e = t.priority; e >= a && (a = e, i = t.handler); }), e = !0, executeAction(i).then(function () { return e = !1; });
    }
} }); }
exports.startHardwareBackButton = startHardwareBackButton;
function executeAction(t) { return tslib_1.__awaiter(this, void 0, void 0, function () { var e, n; return tslib_1.__generator(this, function (r) { switch (r.label) {
    case 0: return r.trys.push([0, 3, , 4]), t ? null == (e = t()) ? [3, 2] : [4, e] : [3, 2];
    case 1: r.sent(), r.label = 2;
    case 2: return [3, 4];
    case 3: return n = r.sent(), console.error(n), [3, 4];
    case 4: return [2];
} }); }); }
