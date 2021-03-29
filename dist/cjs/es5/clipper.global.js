"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function appGlobal(n, x, w, d, r, h) {
    (function (Context, resourcesUrl) {
    })(x, r);
    (function (Context, resourcesUrl) {
        var getPlatforms = function (t) { return setupPlatforms(t); }, isPlatform = function (t, n) { return getPlatforms(t).includes(n); }, setupPlatforms = function (t) { t.Ionic = t.Ionic || {}; var n = t.Ionic.platforms; return null == n && (n = t.Ionic.platforms = detectPlatforms(t)).forEach(function (n) { return t.document.documentElement.classList.add("plt-" + n); }), n; }, isMobileWeb = function (t) { return isMobile(t) && !isHybrid(t); }, detectPlatforms = function (t) { return Object.keys(PLATFORMS_MAP).filter(function (n) { return PLATFORMS_MAP[n](t); }); }, isIpad = function (t) { return testUserAgent(t, /iPad/i); }, isIphone = function (t) { return testUserAgent(t, /iPhone/i); }, isIOS = function (t) { return testUserAgent(t, /iPad|iPhone|iPod/i); }, isAndroid = function (t) { return testUserAgent(t, /android|sink/i); }, isAndroidTablet = function (t) { return isAndroid(t) && !testUserAgent(t, /mobile/i); }, isPhablet = function (t) { var n = t.innerWidth, e = t.innerHeight, i = Math.min(n, e), o = Math.max(n, e); return i > 390 && i < 520 && o > 620 && o < 800; }, isTablet = function (t) { var n = t.innerWidth, e = t.innerHeight, i = Math.min(n, e), o = Math.max(n, e); return isIpad(t) || isAndroidTablet(t) || i > 460 && i < 820 && o > 780 && o < 1400; }, isMobile = function (t) { return matchMedia(t, "(any-pointer:coarse)"); }, isDesktop = function (t) { return !isMobile(t); }, isHybrid = function (t) { return isCordova(t) || isCapacitorNative(t); }, isCordova = function (t) { return !!(t.cordova || t.phonegap || t.PhoneGap); }, isCapacitorNative = function (t) { var n = t.Capacitor; return !(!n || !n.isNative); }, isElectron = function (t) { return testUserAgent(t, /electron/); }, isPWA = function (t) { return !!t.matchMedia && (t.matchMedia("(display-mode: standalone)").matches || t.navigator.standalone); }, testUserAgent = function (t, n) { return !(!t.navigator || !t.navigator.userAgent) && n.test(t.navigator.userAgent); }, matchMedia = function (t, n) { return !!t.matchMedia && t.matchMedia(n).matches; }, PLATFORMS_MAP = { ipad: isIpad, iphone: isIphone, ios: isIOS, android: isAndroid, phablet: isPhablet, tablet: isTablet, cordova: isCordova, capacitor: isCapacitorNative, electron: isElectron, pwa: isPWA, mobile: isMobile, mobileweb: isMobileWeb, desktop: isDesktop, hybrid: isHybrid }, Config = function () { function t(t) { this.m = new Map(Object.entries(t)); } return t.prototype.get = function (t, n) { var e = this.m.get(t); return void 0 !== e ? e : n; }, t.prototype.getBoolean = function (t, n) { void 0 === n && (n = !1); var e = this.m.get(t); return void 0 === e ? n : "string" == typeof e ? "true" === e : !!e; }, t.prototype.getNumber = function (t, n) { var e = parseFloat(this.m.get(t)); return isNaN(e) ? void 0 !== n ? n : NaN : e; }, t.prototype.set = function (t, n) { this.m.set(t, n); }, t; }();
        function configFromSession(t) { try {
            var n = t.sessionStorage.getItem(IONIC_SESSION_KEY);
            return null !== n ? JSON.parse(n) : {};
        }
        catch (t) {
            return {};
        } }
        function saveConfig(t, n) { try {
            t.sessionStorage.setItem(IONIC_SESSION_KEY, JSON.stringify(n));
        }
        catch (t) {
            return;
        } }
        function configFromURL(t) { var n = {}; return t.location.search.slice(1).split("&").map(function (t) { return t.split("="); }).map(function (t) { var n = t[1]; return [decodeURIComponent(t[0]), decodeURIComponent(n)]; }).filter(function (t) { return startsWith(t[0], IONIC_PREFIX); }).map(function (t) { var n = t[1]; return [t[0].slice(IONIC_PREFIX.length), n]; }).forEach(function (t) { n[t[0]] = t[1]; }), n; }
        function startsWith(t, n) { return t.substr(0, n.length) === n; }
        var IONIC_PREFIX = "ionic:", IONIC_SESSION_KEY = "ionic-persist-config", win = "undefined" != typeof window ? window : {}, Ionic = win.Ionic = win.Ionic || {};
        Object.defineProperty(Ionic, "queue", { get: function () { return Context.queue; } }), setupPlatforms(win), Context.isPlatform = isPlatform;
        var configObj = Object.assign({}, configFromSession(win), { persistConfig: !1 }, Ionic.config, configFromURL(win)), config = Ionic.config = Context.config = new Config(configObj);
        config.getBoolean("persistConfig") && saveConfig(win, configObj);
        var documentElement = win.document ? win.document.documentElement : null, mode = config.get("mode", documentElement && documentElement.getAttribute("mode") || (isPlatform(win, "ios") ? "ios" : "md"));
        Ionic.mode = Context.mode = mode, config.set("mode", mode), documentElement && (documentElement.setAttribute("mode", mode), documentElement.classList.add(mode)), config.getBoolean("_testing") && config.set("animated", !1);
    })(x, r);
    (function (Context, resourcesUrl) {
        Context.store = function () { var t; return { getStore: function () { return t; }, setStore: function (n) { t = n; }, getState: function () { return t && t.getState(); }, mapDispatchToProps: function (n, e) { Object.keys(e).forEach(function (r) { var o = e[r]; Object.defineProperty(n, r, { get: function () { return function () { for (var n = [], e = 0; e < arguments.length; e++)
                    n[e] = arguments[e]; return t.dispatch(o.apply(void 0, n)); }; }, configurable: !0, enumerable: !0 }); }); }, mapStateToProps: function (n, e) { var r = function (r, o) { var u = e(t.getState()); Object.keys(u).forEach(function (t) { n[t] = u[t]; }); }, o = t.subscribe(function () { return r(); }); return r(), o; } }; }();
    })(x, r);
}
exports.default = appGlobal;
