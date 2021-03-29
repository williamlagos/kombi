"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function rIC(e) { "requestIdleCallback" in window ? window.requestIdleCallback(e) : setTimeout(e, 32); }
exports.d = rIC;
function hasShadowDom(e) { return !!e.shadowRoot && !!e.attachShadow; }
exports.e = hasShadowDom;
function findItemLabel(e) { var n = e.closest("ion-item"); return n ? n.querySelector("ion-label") : null; }
exports.b = findItemLabel;
function renderHiddenInput(e, n, t, a, r) { if (e || hasShadowDom(n)) {
    var o = n.querySelector("input.aux-input");
    o || ((o = n.ownerDocument.createElement("input")).type = "hidden", o.classList.add("aux-input"), n.appendChild(o)), o.disabled = r, o.name = t, o.value = a || "";
} }
exports.c = renderHiddenInput;
function clamp(e, n, t) { return Math.max(e, Math.min(n, t)); }
exports.a = clamp;
function assert(e, n) { if (!e) {
    var t = "ASSERT: " + n;
    throw console.error(t), new Error(t);
} }
exports.g = assert;
function now(e) { return e.timeStamp || Date.now(); }
exports.h = now;
function pointerCoord(e) { if (e) {
    var n = e.changedTouches;
    if (n && n.length > 0) {
        var t = n[0];
        return { x: t.clientX, y: t.clientY };
    }
    if (void 0 !== e.pageX)
        return { x: e.pageX, y: e.pageY };
} return { x: 0, y: 0 }; }
exports.k = pointerCoord;
function isEndSide(e, n) { var t = "rtl" === e.document.dir; switch (n) {
    case "start": return t;
    case "end": return !t;
    default: throw new Error('"' + n + '" is not a valid value for [side]. Use "start" or "end" instead.');
} }
exports.i = isEndSide;
function debounceEvent(e, n) { var t = e._original || e; return { _original: e, emit: debounce(t.emit.bind(t), n) }; }
exports.f = debounceEvent;
function debounce(e, n) { var t; return void 0 === n && (n = 0), function () { for (var a = [], r = 0; r < arguments.length; r++)
    a[r] = arguments[r]; clearTimeout(t), t = setTimeout.apply(void 0, [e, n].concat(a)); }; }
exports.j = debounce;
