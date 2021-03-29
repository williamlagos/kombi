"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _sPassive, GestureController = function () { function t(t) { this.doc = t, this.gestureId = 0, this.requestedStart = new Map, this.disabledGestures = new Map, this.disabledScroll = new Set; } return t.prototype.createGesture = function (t) { return new GestureDelegate(this, this.newID(), t.name, t.priority || 0, !!t.disableScroll); }, t.prototype.createBlocker = function (t) { return void 0 === t && (t = {}), new BlockerDelegate(this, this.newID(), t.disable, !!t.disableScroll); }, t.prototype.start = function (t, e, r) { return this.canStart(t) ? (this.requestedStart.set(e, r), !0) : (this.requestedStart.delete(e), !1); }, t.prototype.capture = function (t, e, r) { if (!this.start(t, e, r))
    return !1; var i = this.requestedStart, s = -1e4; if (i.forEach(function (t) { s = Math.max(s, t); }), s === r) {
    this.capturedId = e, i.clear();
    var n = new CustomEvent("ionGestureCaptured", { detail: { gestureName: t } });
    return this.doc.dispatchEvent(n), !0;
} return i.delete(e), !1; }, t.prototype.release = function (t) { this.requestedStart.delete(t), this.capturedId === t && (this.capturedId = void 0); }, t.prototype.disableGesture = function (t, e) { var r = this.disabledGestures.get(t); void 0 === r && (r = new Set, this.disabledGestures.set(t, r)), r.add(e); }, t.prototype.enableGesture = function (t, e) { var r = this.disabledGestures.get(t); void 0 !== r && r.delete(e); }, t.prototype.disableScroll = function (t) { this.disabledScroll.add(t), 1 === this.disabledScroll.size && this.doc.body.classList.add(BACKDROP_NO_SCROLL); }, t.prototype.enableScroll = function (t) { this.disabledScroll.delete(t), 0 === this.disabledScroll.size && this.doc.body.classList.remove(BACKDROP_NO_SCROLL); }, t.prototype.canStart = function (t) { return void 0 === this.capturedId && !this.isDisabled(t); }, t.prototype.isCaptured = function () { return void 0 !== this.capturedId; }, t.prototype.isScrollDisabled = function () { return this.disabledScroll.size > 0; }, t.prototype.isDisabled = function (t) { var e = this.disabledGestures.get(t); return !!(e && e.size > 0); }, t.prototype.newID = function () { return this.gestureId++, this.gestureId; }, t; }(), GestureDelegate = function () { function t(t, e, r, i, s) { this.id = e, this.name = r, this.disableScroll = s, this.priority = 1e6 * i + e, this.ctrl = t; } return t.prototype.canStart = function () { return !!this.ctrl && this.ctrl.canStart(this.name); }, t.prototype.start = function () { return !!this.ctrl && this.ctrl.start(this.name, this.id, this.priority); }, t.prototype.capture = function () { if (!this.ctrl)
    return !1; var t = this.ctrl.capture(this.name, this.id, this.priority); return t && this.disableScroll && this.ctrl.disableScroll(this.id), t; }, t.prototype.release = function () { this.ctrl && (this.ctrl.release(this.id), this.disableScroll && this.ctrl.enableScroll(this.id)); }, t.prototype.destroy = function () { this.release(), this.ctrl = void 0; }, t; }(), BlockerDelegate = function () { function t(t, e, r, i) { this.id = e, this.disable = r, this.disableScroll = i, this.ctrl = t; } return t.prototype.block = function () { if (this.ctrl) {
    if (this.disable)
        for (var t = 0, e = this.disable; t < e.length; t++)
            this.ctrl.disableGesture(e[t], this.id);
    this.disableScroll && this.ctrl.disableScroll(this.id);
} }, t.prototype.unblock = function () { if (this.ctrl) {
    if (this.disable)
        for (var t = 0, e = this.disable; t < e.length; t++)
            this.ctrl.enableGesture(e[t], this.id);
    this.disableScroll && this.ctrl.enableScroll(this.id);
} }, t.prototype.destroy = function () { this.unblock(), this.ctrl = void 0; }, t; }(), BACKDROP_NO_SCROLL = "backdrop-no-scroll", GESTURE_CONTROLLER = new GestureController(document);
exports.GESTURE_CONTROLLER = GESTURE_CONTROLLER;
function addEventListener(t, e, r, i) { var s, n, o = supportsPassive(t) ? { capture: !!i.capture, passive: !!i.passive } : !!i.capture; return t.__zone_symbol__addEventListener ? (s = "__zone_symbol__addEventListener", n = "__zone_symbol__removeEventListener") : (s = "addEventListener", n = "removeEventListener"), t[s](e, r, o), function () { t[n](e, r, o); }; }
function supportsPassive(t) { if (void 0 === _sPassive)
    try {
        var e = Object.defineProperty({}, "passive", { get: function () { _sPassive = !0; } });
        t.addEventListener("optsTest", function () { }, e);
    }
    catch (t) {
        _sPassive = !1;
    } return !!_sPassive; }
var MOUSE_WAIT = 2e3;
function createPointerEvents(t, e, r, i, s) { var n, o, a, c, u, l, d, h = 0; function p(i) { h = Date.now() + MOUSE_WAIT, e(i) && (!o && r && (o = addEventListener(t, "touchmove", r, s)), a || (a = addEventListener(t, "touchend", f, s)), c || (c = addEventListener(t, "touchcancel", f, s))); } function v(i) { h > Date.now() || e(i) && (!l && r && (l = addEventListener(getDocument(t), "mousemove", r, s)), d || (d = addEventListener(getDocument(t), "mouseup", b, s))); } function f(t) { S(), i && i(t); } function b(t) { y(), i && i(t); } function S() { o && o(), a && a(), c && c(), o = a = c = void 0; } function y() { l && l(), d && d(), l = d = void 0; } function m() { S(), y(); } function D(e) { e ? (n && n(), u && u(), n = u = void 0, m()) : (n || (n = addEventListener(t, "touchstart", p, s)), u || (u = addEventListener(t, "mousedown", v, s))); } return { setDisabled: D, stop: m, destroy: function () { D(!0), i = r = e = void 0; } }; }
function getDocument(t) { return t instanceof Document ? t : t.ownerDocument; }
function createPanRecognizer(t, e, r) { var i = r * (Math.PI / 180), s = "x" === t, n = Math.cos(i), o = e * e, a = 0, c = 0, u = !1, l = 0; return { start: function (t, e) { a = t, c = e, l = 0, u = !0; }, detect: function (t, e) { if (!u)
        return !1; var r = t - a, i = e - c, d = r * r + i * i; if (d < o)
        return !1; var h = Math.sqrt(d), p = (s ? r : i) / h; return l = p > n ? 1 : p < -n ? -1 : 0, u = !1, !0; }, isGesture: function () { return 0 !== l; }, getDirection: function () { return l; } }; }
function createGesture(t) { var e = Object.assign({ disableScroll: !1, direction: "x", gesturePriority: 0, passive: !0, maxAngle: 40, threshold: 10 }, t), r = e.canStart, i = e.onWillStart, s = e.onStart, n = e.onEnd, o = e.notCaptured, a = e.onMove, c = e.threshold, u = e.queue, l = { type: "pan", startX: 0, startY: 0, startTimeStamp: 0, currentX: 0, currentY: 0, velocityX: 0, velocityY: 0, deltaX: 0, deltaY: 0, timeStamp: 0, event: void 0, data: void 0 }, d = createPointerEvents(e.el, function (t) { var e = now(t); return !(f || !b) && (updateDetail(t, l), l.startX = l.currentX, l.startY = l.currentY, l.startTimeStamp = l.timeStamp = e, l.velocityX = l.velocityY = l.deltaX = l.deltaY = 0, l.event = t, (!r || !1 !== r(l)) && (p.release(), !!p.start() && (f = !0, 0 === c ? m() : (h.start(l.startX, l.startY), !0)))); }, function (t) { v ? !S && b && (S = !0, calcGestureData(l, t), u.write(y)) : (calcGestureData(l, t), h.detect(l.currentX, l.currentY) && (h.isGesture() && m() || (g(), d.stop(), o && o(l)))); }, E, { capture: !1 }), h = createPanRecognizer(e.direction, e.threshold, e.maxAngle), p = GESTURE_CONTROLLER.createGesture({ name: t.gestureName, priority: t.gesturePriority, disableScroll: t.disableScroll }), v = !1, f = !1, b = !0, S = !1; function y() { v && (S = !1, a && a(l)); } function m() { return !(p && !p.capture() || (v = !0, b = !1, l.startX = l.currentX, l.startY = l.currentY, l.startTimeStamp = l.timeStamp, i ? i(l).then(D) : D(), 0)); } function D() { s && s(l), b = !0; } function g() { v = !1, f = !1, S = !1, b = !0, p.release(); } function E(t) { var e = v, r = b; g(), r && (calcGestureData(l, t), e ? n && n(l) : o && o(l)); } return { setDisabled: function (t) { t && v && E(void 0), d.setDisabled(t); }, destroy: function () { p.destroy(), d.destroy(); } }; }
exports.createGesture = createGesture;
function calcGestureData(t, e) { if (e) {
    var r = t.currentX, i = t.currentY, s = t.timeStamp;
    updateDetail(e, t);
    var n = t.currentX, o = t.currentY, a = (t.timeStamp = now(e)) - s;
    if (a > 0 && a < 100) {
        var c = (o - i) / a;
        t.velocityX = (n - r) / a * .7 + .3 * t.velocityX, t.velocityY = .7 * c + .3 * t.velocityY;
    }
    t.deltaX = n - t.startX, t.deltaY = o - t.startY, t.event = e;
} }
function updateDetail(t, e) { var r = 0, i = 0; if (t) {
    var s = t.changedTouches;
    if (s && s.length > 0) {
        var n = s[0];
        r = n.clientX, i = n.clientY;
    }
    else
        void 0 !== t.pageX && (r = t.pageX, i = t.pageY);
} e.currentX = r, e.currentY = i; }
function now(t) { return t.timeStamp || Date.now(); }
