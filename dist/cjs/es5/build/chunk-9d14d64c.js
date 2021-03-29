"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chunk_04f0cf95_js_1 = require("./chunk-04f0cf95.js");
function createSwipeBackGesture(e, t, r, n, a, i) { var o = e.ownerDocument.defaultView; return chunk_04f0cf95_js_1.createGesture({ el: e, queue: t, gestureName: "goback-swipe", gesturePriority: 40, threshold: 10, canStart: function (e) { return e.startX <= 50 && r(); }, onStart: n, onMove: function (e) { a(e.deltaX / o.innerWidth); }, onEnd: function (e) { var t = o.innerWidth, r = e.deltaX / t, n = e.velocityX, a = n >= 0 && (n > .2 || e.deltaX > t / 2), u = (a ? 1 - r : r) * t, c = 0; if (u > 5) {
        var s = u / Math.abs(n);
        c = Math.min(s, 300);
    } i(a, r, c); } }); }
exports.createSwipeBackGesture = createSwipeBackGesture;
