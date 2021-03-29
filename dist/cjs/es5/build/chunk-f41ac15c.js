"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("../polyfills/tslib.js");
var chunk_fe10219c_js_1 = require("./chunk-fe10219c.js");
var HAS_LOGGED_IN = "hasLoggedIn", HAS_SEEN_TUTORIAL = "hasSeenTutorial", UserDataController = function () { function t() { this.favorites = new Set; } return t.prototype.hasFavorite = function (t) { return this.favorites.has(t); }, t.prototype.addFavorite = function (t) { this.favorites.add(t); }, t.prototype.removeFavorite = function (t) { this.favorites.delete(t); }, t.prototype.login = function (t) { return tslib_1.__awaiter(this, void 0, void 0, function () { return tslib_1.__generator(this, function (e) { switch (e.label) {
    case 0: return [4, chunk_fe10219c_js_1.l(HAS_LOGGED_IN, !0)];
    case 1: return e.sent(), [4, this.setUsername(t)];
    case 2: return e.sent(), window.dispatchEvent(new Event("user:login")), [2];
} }); }); }, t.prototype.signup = function (t) { return tslib_1.__awaiter(this, void 0, void 0, function () { return tslib_1.__generator(this, function (e) { switch (e.label) {
    case 0: return [4, chunk_fe10219c_js_1.l(HAS_LOGGED_IN, !0)];
    case 1: return e.sent(), [4, this.setUsername(t)];
    case 2: return e.sent(), window.dispatchEvent(new Event("user:signup")), [2];
} }); }); }, t.prototype.logout = function () { return tslib_1.__awaiter(this, void 0, void 0, function () { return tslib_1.__generator(this, function (t) { switch (t.label) {
    case 0: return [4, chunk_fe10219c_js_1.m(HAS_LOGGED_IN)];
    case 1: return t.sent(), [4, chunk_fe10219c_js_1.m("username")];
    case 2: return t.sent(), window.dispatchEvent(new Event("user:logout")), [2];
} }); }); }, t.prototype.setUsername = function (t) { return tslib_1.__awaiter(this, void 0, void 0, function () { return tslib_1.__generator(this, function (e) { switch (e.label) {
    case 0: return [4, chunk_fe10219c_js_1.l("username", t)];
    case 1: return e.sent(), [2];
} }); }); }, t.prototype.getUsername = function () { return tslib_1.__awaiter(this, void 0, void 0, function () { return tslib_1.__generator(this, function (t) { return [2, chunk_fe10219c_js_1.n("username")]; }); }); }, t.prototype.isLoggedIn = function () { return tslib_1.__awaiter(this, void 0, void 0, function () { return tslib_1.__generator(this, function (t) { switch (t.label) {
    case 0: return [4, chunk_fe10219c_js_1.n(HAS_LOGGED_IN)];
    case 1: return [2, !0 === t.sent()];
} }); }); }, t.prototype.hasSeenTutorial = function (t) { return tslib_1.__awaiter(this, void 0, void 0, function () { return tslib_1.__generator(this, function (e) { return [2, chunk_fe10219c_js_1.l(HAS_SEEN_TUTORIAL, t)]; }); }); }, t.prototype.checkHasSeenTutorial = function () { return tslib_1.__awaiter(this, void 0, void 0, function () { return tslib_1.__generator(this, function (t) { switch (t.label) {
    case 0: return [4, chunk_fe10219c_js_1.n(HAS_SEEN_TUTORIAL)];
    case 1: return [2, !!t.sent()];
} }); }); }, t; }(), UserData = new UserDataController, ConferenceDataController = function () { function t(t) { this.user = t; } return t.prototype.load = function () { return tslib_1.__awaiter(this, void 0, void 0, function () { var t; return tslib_1.__generator(this, function (e) { switch (e.label) {
    case 0: return this.data ? [2, this.data] : [3, 1];
    case 1: return [4, fetch("/assets/data/data.json")];
    case 2: return [4, e.sent().json()];
    case 3: return t = e.sent(), [2, this.processData(t)];
} }); }); }, t.prototype.processData = function (t) { var e = this; return this.data = t, this.data.tracks = [], this.data.schedule.forEach(function (t) { t.groups.forEach(function (t) { t.sessions.forEach(function (t) { t.speakers = [], t.speakerNames && t.speakerNames.forEach(function (r) { var n = e.data.speakers.find(function (t) { return t.name === r; }); n && (t.speakers.push(n), n.sessions = n.sessions || [], n.sessions.push(t)); }), t.tracks && t.tracks.forEach(function (t) { e.data.tracks.indexOf(t) < 0 && e.data.tracks.push(t); }); }); }); }), this.data; }, t.prototype.getTimeline = function (t, e, r, n) { return void 0 === e && (e = ""), void 0 === r && (r = []), void 0 === n && (n = "all"), tslib_1.__awaiter(this, void 0, void 0, function () { var s, i, o, a = this; return tslib_1.__generator(this, function (u) { switch (u.label) {
    case 0: return [4, this.load()];
    case 1: return s = u.sent(), (i = s.schedule[t]).shownSessions = 0, e = e.toLowerCase().replace(/,|\.|-/g, " "), o = e.split(" ").filter(function (t) { return !!t.trim().length; }), i.groups.forEach(function (t) { t.hide = !0, t.sessions.forEach(function (e) { a.filterSession(e, o, r, n), e.hide || (t.hide = !1, i.shownSessions++); }), a.mapFavorites(t.sessions); }), [2, i];
} }); }); }, t.prototype.mapFavorites = function (t) { var e = this; t.map(function (t) { t.isFavorite = e.user.hasFavorite(t.name); }); }, t.prototype.getSession = function (t) { return tslib_1.__awaiter(this, void 0, void 0, function () { var e, r, n, s, i, o, a, u; return tslib_1.__generator(this, function (c) { switch (c.label) {
    case 0: return [4, this.load()];
    case 1:
        for (e = c.sent(), r = 0, n = e.schedule; r < n.length; r++)
            for (s = 0, i = n[r].groups; s < i.length; s++)
                for (o = 0, a = i[s].sessions; o < a.length; o++)
                    if ((u = a[o]).id === t)
                        return [2, u];
        return [2, null];
} }); }); }, t.prototype.filterSession = function (t, e, r, n) { var s = !1; e.length ? e.forEach(function (e) { t.name.toLowerCase().indexOf(e) > -1 && (s = !0); }) : s = !0; var i = !1; t.tracks.forEach(function (t) { -1 === r.indexOf(t) && (i = !0); }); var o = !1; "favorites" === n ? this.user.hasFavorite(t.name) && (o = !0) : o = !0, t.hide = !(s && i && o); }, t.prototype.getSpeakers = function () { return tslib_1.__awaiter(this, void 0, void 0, function () { return tslib_1.__generator(this, function (t) { switch (t.label) {
    case 0: return [4, this.load()];
    case 1: return [2, t.sent().speakers.sort(function (t, e) { var r = t.name.split(" ").pop(), n = e.name.split(" ").pop(); return r.localeCompare(n); })];
} }); }); }, t.prototype.getSpeaker = function (t) { return tslib_1.__awaiter(this, void 0, void 0, function () { var e, r, n, s; return tslib_1.__generator(this, function (i) { switch (i.label) {
    case 0: return [4, this.load()];
    case 1:
        for (e = i.sent(), r = 0, n = e.speakers; r < n.length; r++)
            if ((s = n[r]).id === t)
                return [2, s];
        return [2, null];
} }); }); }, t.prototype.getTracks = function () { return tslib_1.__awaiter(this, void 0, void 0, function () { return tslib_1.__generator(this, function (t) { switch (t.label) {
    case 0: return [4, this.load()];
    case 1: return [2, t.sent().tracks.sort()];
} }); }); }, t.prototype.getMap = function () { return tslib_1.__awaiter(this, void 0, void 0, function () { return tslib_1.__generator(this, function (t) { switch (t.label) {
    case 0: return [4, this.load()];
    case 1: return [2, t.sent().map];
} }); }); }, t; }(), ConferenceData = new ConferenceDataController(UserData);
exports.b = UserData;
exports.a = ConferenceData;
