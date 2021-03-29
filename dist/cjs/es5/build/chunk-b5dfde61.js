"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CameraSource, CameraDirection, CameraResultType, FilesystemDirectory, FilesystemEncoding, HapticsImpactStyle, HapticsNotificationType, KeyboardStyle, KeyboardResize, ActionSheetOptionStyle, PermissionType, PhotosAlbumType, StatusBarStyle;
!function (e) { e.Prompt = "PROMPT", e.Camera = "CAMERA", e.Photos = "PHOTOS"; }(CameraSource || (CameraSource = {})), function (e) { e.Rear = "REAR", e.Front = "FRONT"; }(CameraDirection || (CameraDirection = {})), function (e) { e.Uri = "uri", e.Base64 = "base64", e.DataUrl = "dataUrl"; }(CameraResultType || (CameraResultType = {})), function (e) { e.Application = "APPLICATION", e.Documents = "DOCUMENTS", e.Data = "DATA", e.Cache = "CACHE", e.External = "EXTERNAL", e.ExternalStorage = "EXTERNAL_STORAGE"; }(FilesystemDirectory || (FilesystemDirectory = {})), function (e) { e.UTF8 = "utf8", e.ASCII = "ascii", e.UTF16 = "utf16"; }(FilesystemEncoding || (FilesystemEncoding = {})), function (e) { e.Heavy = "HEAVY", e.Medium = "MEDIUM", e.Light = "LIGHT"; }(HapticsImpactStyle || (HapticsImpactStyle = {})), function (e) { e.SUCCESS = "SUCCESS", e.WARNING = "WARNING", e.ERROR = "ERROR"; }(HapticsNotificationType || (HapticsNotificationType = {})), function (e) { e.Dark = "DARK", e.Light = "LIGHT"; }(KeyboardStyle || (KeyboardStyle = {})), function (e) { e.Body = "body", e.Ionic = "ionic", e.Native = "native", e.None = "none"; }(KeyboardResize || (KeyboardResize = {})), function (e) { e.Default = "DEFAULT", e.Destructive = "DESTRUCTIVE", e.Cancel = "CANCEL"; }(ActionSheetOptionStyle || (ActionSheetOptionStyle = {})), function (e) { e.Camera = "camera", e.Photos = "photos", e.Geolocation = "geolocation", e.Notifications = "notifications", e.ClipboardRead = "clipboard-read", e.ClipboardWrite = "clipboard-write"; }(PermissionType || (PermissionType = {})), function (e) { e.Smart = "smart", e.Shared = "shared", e.User = "user"; }(PhotosAlbumType || (PhotosAlbumType = {})), function (e) { e.Dark = "DARK", e.Light = "LIGHT"; }(StatusBarStyle || (StatusBarStyle = {}));
var CapacitorWeb = function () { function e() { var e = this; this.platform = "web", this.isNative = !1, this.Plugins = {}, this.Plugins = new Proxy(this.Plugins, { get: function (t, n) { if (void 0 === t[n]) {
        var r = e;
        return new Proxy({}, { get: function (e, t) { return void 0 === e[t] ? r.pluginMethodNoop.bind(r, e, t, n) : e[t]; } });
    } return t[n]; } }); } return e.prototype.pluginMethodNoop = function (e, t, n) { return Promise.reject(n + " does not have web implementation."); }, e.prototype.getPlatform = function () { return this.platform; }, e.prototype.isPluginAvailable = function (e) { return this.Plugins.hasOwnProperty(e); }, e.prototype.convertFileSrc = function (e) { return e; }, e.prototype.handleError = function (e) { console.error(e); }, e; }(), Capacitor$1 = function (e) { return e.Capacitor = e.Capacitor || new CapacitorWeb; }("undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {}), Plugins = Capacitor$1.Plugins, WebPluginRegistry = function () { function e() { this.plugins = {}, this.loadedPlugins = {}; } return e.prototype.addPlugin = function (e) { this.plugins[e.config.name] = e; }, e.prototype.getPlugin = function (e) { return this.plugins[e]; }, e.prototype.loadPlugin = function (e) { var t = this.getPlugin(e); t ? t.load() : console.error("Unable to load web plugin " + e + ", no such plugin found."); }, e.prototype.getPlugins = function () { var e = []; for (var t in this.plugins)
    e.push(this.plugins[t]); return e; }, e; }(), WebPlugins = new WebPluginRegistry, WebPlugin = function () { function e(e, t) { this.config = e, this.loaded = !1, this.listeners = {}, this.windowListeners = {}, t ? t.addPlugin(this) : WebPlugins.addPlugin(this); } return e.prototype.addWindowListener = function (e) { window.addEventListener(e.windowEventName, e.handler), e.registered = !0; }, e.prototype.removeWindowListener = function (e) { e && (window.removeEventListener(e.windowEventName, e.handler), e.registered = !1); }, e.prototype.addListener = function (e, t) { var n = this; this.listeners[e] || (this.listeners[e] = []), this.listeners[e].push(t); var r = this.windowListeners[e]; return r && !r.registered && this.addWindowListener(r), { remove: function () { n.removeListener(e, t); } }; }, e.prototype.removeListener = function (e, t) { var n = this.listeners[e]; if (n) {
    var r = n.indexOf(t);
    this.listeners[e].splice(r, 1), this.listeners[e].length || this.removeWindowListener(this.windowListeners[e]);
} }, e.prototype.notifyListeners = function (e, t) { var n = this.listeners[e]; n && n.forEach(function (e) { return e(t); }); }, e.prototype.hasListeners = function (e) { return !!this.listeners[e].length; }, e.prototype.registerWindowListener = function (e, t) { var n = this; this.windowListeners[t] = { registered: !1, windowEventName: e, pluginEventName: t, handler: function (e) { n.notifyListeners(t, e); } }; }, e.prototype.requestPermissions = function () { return Capacitor.isNative ? Capacitor.nativePromise(this.config.name, "requestPermissions", {}) : Promise.resolve({ results: [] }); }, e.prototype.load = function () { this.loaded = !0; }, e; }(), shouldMergeWebPlugin = function (e) { return e.config.platforms && e.config.platforms.indexOf(Capacitor.platform) >= 0; }, mergeWebPlugins = function (e) { for (var t = 0, n = WebPlugins.getPlugins(); t < n.length; t++)
    mergeWebPlugin(e, n[t]); }, mergeWebPlugin = function (e, t) { e.hasOwnProperty(t.config.name) && !shouldMergeWebPlugin(t) || (e[t.config.name] = t); }, extendStatics = function (e, t) { return (extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) { e.__proto__ = t; } || function (e, t) { for (var n in t)
    t.hasOwnProperty(n) && (e[n] = t[n]); })(e, t); };
exports.a = Plugins;
function __extends(e, t) { function n() { this.constructor = e; } extendStatics(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n); }
function __awaiter(e, t, n, r) { return new (n || (n = Promise))(function (i, o) { function s(e) { try {
    u(r.next(e));
}
catch (e) {
    o(e);
} } function a(e) { try {
    u(r.throw(e));
}
catch (e) {
    o(e);
} } function u(e) { var t; e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n(function (e) { e(t); })).then(s, a); } u((r = r.apply(e, t || [])).next()); }); }
function __generator(e, t) { var n, r, i, o, s = { label: 0, sent: function () { if (1 & i[0])
        throw i[1]; return i[1]; }, trys: [], ops: [] }; return o = { next: a(0), throw: a(1), return: a(2) }, "function" == typeof Symbol && (o[Symbol.iterator] = function () { return this; }), o; function a(o) { return function (a) { return function (o) { if (n)
    throw new TypeError("Generator is already executing."); for (; s;)
    try {
        if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done)
            return i;
        switch (r = 0, i && (o = [2 & o[0], i.value]), o[0]) {
            case 0:
            case 1:
                i = o;
                break;
            case 4: return s.label++, { value: o[1], done: !1 };
            case 5:
                s.label++, r = o[1], o = [0];
                continue;
            case 7:
                o = s.ops.pop(), s.trys.pop();
                continue;
            default:
                if (!(i = (i = s.trys).length > 0 && i[i.length - 1]) && (6 === o[0] || 2 === o[0])) {
                    s = 0;
                    continue;
                }
                if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                    s.label = o[1];
                    break;
                }
                if (6 === o[0] && s.label < i[1]) {
                    s.label = i[1], i = o;
                    break;
                }
                if (i && s.label < i[2]) {
                    s.label = i[2], s.ops.push(o);
                    break;
                }
                i[2] && s.ops.pop(), s.trys.pop();
                continue;
        }
        o = t.call(e, s);
    }
    catch (e) {
        o = [6, e], r = 0;
    }
    finally {
        n = i = 0;
    } if (5 & o[0])
    throw o[1]; return { value: o[0] ? o[1] : void 0, done: !0 }; }([o, a]); }; } }
var AccessibilityPluginWeb = function (e) { function t() { return e.call(this, { name: "Accessibility", platforms: ["web"] }) || this; } return __extends(t, e), t.prototype.isScreenReaderEnabled = function () { throw new Error("Feature not available in the browser"); }, t.prototype.speak = function (e) { if (!("speechSynthesis" in window))
    return Promise.reject("Browser does not support the Speech Synthesis API"); var t = new SpeechSynthesisUtterance(e.value); return e.language && (t.lang = e.language), window.speechSynthesis.speak(t), Promise.resolve(); }, t; }(WebPlugin), Accessibility = new AccessibilityPluginWeb, AppPluginWeb = function (e) { function t() { var t = e.call(this, { name: "App", platforms: ["web"] }) || this; return "undefined" != typeof document && document.addEventListener("visibilitychange", t.handleVisibilityChange.bind(t), !1), t; } return __extends(t, e), t.prototype.exitApp = function () { throw new Error("Method not implemented."); }, t.prototype.canOpenUrl = function (e) { return Promise.resolve({ value: !0 }); }, t.prototype.openUrl = function (e) { return Promise.resolve({ completed: !0 }); }, t.prototype.getLaunchUrl = function () { return Promise.resolve({ url: "" }); }, t.prototype.handleVisibilityChange = function () { var e = { isActive: !0 !== document.hidden }; this.notifyListeners("appStateChange", e); }, t; }(WebPlugin), App = new AppPluginWeb, BrowserPluginWeb = function (e) { function t() { return e.call(this, { name: "Browser", platforms: ["web"] }) || this; } return __extends(t, e), t.prototype.open = function (e) { return __awaiter(this, void 0, void 0, function () { return __generator(this, function (t) { return this._lastWindow = window.open(e.url, e.windowName || "_blank"), [2, Promise.resolve()]; }); }); }, t.prototype.prefetch = function (e) { return __awaiter(this, void 0, void 0, function () { return __generator(this, function (e) { return [2, Promise.resolve()]; }); }); }, t.prototype.close = function () { return __awaiter(this, void 0, void 0, function () { return __generator(this, function (e) { return this._lastWindow && this._lastWindow.close(), [2, Promise.resolve()]; }); }); }, t; }(WebPlugin), Browser = new BrowserPluginWeb, CameraPluginWeb = function (e) { function t() { return e.call(this, { name: "Camera", platforms: ["web"] }) || this; } return __extends(t, e), t.prototype.getPhoto = function (e) { return __awaiter(this, void 0, void 0, function () { var t = this; return __generator(this, function (n) { return [2, new Promise(function (n, r) { return __awaiter(t, void 0, void 0, function () { var t, i = this; return __generator(this, function (o) { switch (o.label) {
        case 0: return t = document.createElement("pwa-camera-modal"), document.body.appendChild(t), [4, t.componentOnReady()];
        case 1: return o.sent(), t.addEventListener("onPhoto", function (o) { return __awaiter(i, void 0, void 0, function () { var i, s; return __generator(this, function (a) { switch (a.label) {
            case 0: return null !== (i = o.detail) ? [3, 1] : (r("User cancelled photos app"), [3, 4]);
            case 1: return i instanceof Error ? (r(i.message), [3, 4]) : [3, 2];
            case 2: return s = n, [4, this._getCameraPhoto(i, e)];
            case 3: s.apply(void 0, [a.sent()]), a.label = 4;
            case 4: return t.dismiss(), document.body.removeChild(t), [2];
        } }); }); }), t.present(), [2];
    } }); }); })]; }); }); }, t.prototype._getCameraPhoto = function (e, t) { return new Promise(function (n, r) { var i = new FileReader, o = e.type.split("/")[1]; t.resultType === CameraResultType.Uri ? n({ webPath: URL.createObjectURL(e), format: o }) : (i.readAsDataURL(e), i.onloadend = function () { var e = i.result; n(t.resultType === CameraResultType.DataUrl ? { dataUrl: e, format: o } : { base64String: e.split(",")[1], format: o }); }, i.onerror = function (e) { r(e); }); }); }, t; }(WebPlugin), Camera = new CameraPluginWeb, ClipboardPluginWeb = function (e) { function t() { return e.call(this, { name: "Clipboard", platforms: ["web"] }) || this; } return __extends(t, e), t.prototype.write = function (e) { return __awaiter(this, void 0, void 0, function () { return __generator(this, function (t) { switch (t.label) {
    case 0: return navigator.clipboard ? void 0 !== e.string || e.url ? [4, navigator.clipboard.writeText(void 0 !== e.string ? e.string : e.url)] : [3, 2] : [2, Promise.reject("Clipboard API not available in this browser")];
    case 1: return t.sent(), [3, 3];
    case 2:
        if (e.image)
            return [2, Promise.reject("Setting images not supported on the web")];
        t.label = 3;
    case 3: return [2, Promise.resolve()];
} }); }); }, t.prototype.read = function (e) { return __awaiter(this, void 0, void 0, function () { var t, n, r, i, o; return __generator(this, function (s) { switch (s.label) {
    case 0: return navigator.clipboard ? "string" !== e.type && "url" !== e.type ? [3, 2] : [4, navigator.clipboard.readText()] : [2, Promise.reject("Clipboard API not available in this browser")];
    case 1: return t = s.sent(), [2, Promise.resolve({ value: t })];
    case 2: return [4, navigator.clipboard.read()];
    case 3:
        for (n = s.sent(), r = 0, i = n.items; r < i.length; r++)
            if ("text/plain" === (o = i[r]).type)
                return [2, Promise.resolve({ value: o.getAs("text/plain") })];
        s.label = 4;
    case 4: return [2, Promise.reject("Unable to get data from clipboard")];
} }); }); }, t; }(WebPlugin), Clipboard = new ClipboardPluginWeb, FilesystemPluginWeb = function (e) { function t() { var t = e.call(this, { name: "Filesystem", platforms: ["web"] }) || this; return t.DEFAULT_DIRECTORY = FilesystemDirectory.Data, t.DB_VERSION = 1, t.DB_NAME = "Disc", t._writeCmds = ["add", "put", "delete"], t; } return __extends(t, e), t.prototype.initDb = function () { return __awaiter(this, void 0, void 0, function () { var e = this; return __generator(this, function (n) { if (void 0 !== this._db)
    return [2, this._db]; if (!("indexedDB" in window))
    throw new Error("This browser doesn't support IndexedDB"); return [2, new Promise(function (n, r) { var i = indexedDB.open(e.DB_NAME, e.DB_VERSION); i.onupgradeneeded = t.doUpgrade, i.onsuccess = function () { e._db = i.result, n(i.result); }, i.onerror = function () { return r(i.error); }, i.onblocked = function () { console.warn("db blocked"); }; })]; }); }); }, t.doUpgrade = function (e) { var t = e.target.result; switch (e.oldVersion) {
    case 0:
    case 1:
    default: t.objectStoreNames.contains("FileStorage") && t.deleteObjectStore("FileStorage"), t.createObjectStore("FileStorage", { keyPath: "path" }).createIndex("by_folder", "folder");
} }, t.prototype.dbRequest = function (e, t) { return __awaiter(this, void 0, void 0, function () { var n; return __generator(this, function (r) { return n = -1 !== this._writeCmds.indexOf(e) ? "readwrite" : "readonly", [2, this.initDb().then(function (r) { return new Promise(function (i, o) { var s = r.transaction(["FileStorage"], n).objectStore("FileStorage"), a = s[e].apply(s, t); a.onsuccess = function () { return i(a.result); }, a.onerror = function () { return o(a.error); }; }); })]; }); }); }, t.prototype.dbIndexRequest = function (e, t, n) { return __awaiter(this, void 0, void 0, function () { var r; return __generator(this, function (i) { return r = -1 !== this._writeCmds.indexOf(t) ? "readwrite" : "readonly", [2, this.initDb().then(function (i) { return new Promise(function (o, s) { var a = i.transaction(["FileStorage"], r).objectStore("FileStorage").index(e), u = a[t].apply(a, n); u.onsuccess = function () { return o(u.result); }, u.onerror = function () { return s(u.error); }; }); })]; }); }); }, t.prototype.getPath = function (e, t) { e = e || this.DEFAULT_DIRECTORY; var n = void 0 !== t ? t.replace(/^[/]+|[/]+$/g, "") : "", r = "/" + e; return "" !== t && (r += "/" + n), r; }, t.prototype.clear = function () { return __awaiter(this, void 0, void 0, function () { var e; return __generator(this, function (t) { switch (t.label) {
    case 0: return [4, this.initDb()];
    case 1: return e = t.sent(), e.transaction(["FileStorage"], "readwrite").objectStore("FileStorage").clear(), [2, {}];
} }); }); }, t.prototype.readFile = function (e) { return __awaiter(this, void 0, void 0, function () { var t, n; return __generator(this, function (r) { switch (r.label) {
    case 0: return t = this.getPath(e.directory, e.path), [4, this.dbRequest("get", [t])];
    case 1:
        if (void 0 === (n = r.sent()))
            throw Error("File does not exist.");
        return [2, { data: n.content }];
} }); }); }, t.prototype.writeFile = function (e) { return __awaiter(this, void 0, void 0, function () { var t, n, r, i, o, s, a, u, c; return __generator(this, function (l) { switch (l.label) {
    case 0: return t = this.getPath(e.directory, e.path), n = e.data, [4, this.dbRequest("get", [t])];
    case 1:
        if ((r = l.sent()) && "directory" === r.type)
            throw "The supplied path is a directory.";
        return i = e.encoding, o = t.substr(0, t.lastIndexOf("/")), [4, this.dbRequest("get", [o])];
    case 2: return void 0 !== l.sent() ? [3, 4] : -1 === (s = o.indexOf("/", 1)) ? [3, 4] : (a = o.substr(s), [4, this.mkdir({ path: a, directory: e.directory, recursive: !0 })]);
    case 3: l.sent(), l.label = 4;
    case 4: return u = Date.now(), c = { path: t, folder: o, type: "file", size: n.length, ctime: u, mtime: u, content: !i && n.indexOf(",") >= 0 ? n.split(",")[1] : n }, [4, this.dbRequest("put", [c])];
    case 5: return l.sent(), [2, {}];
} }); }); }, t.prototype.appendFile = function (e) { return __awaiter(this, void 0, void 0, function () { var t, n, r, i, o, s, a; return __generator(this, function (u) { switch (u.label) {
    case 0: return t = this.getPath(e.directory, e.path), n = e.data, r = t.substr(0, t.lastIndexOf("/")), i = Date.now(), o = i, [4, this.dbRequest("get", [t])];
    case 1:
        if ((s = u.sent()) && "directory" === s.type)
            throw "The supplied path is a directory.";
        return [4, this.dbRequest("get", [r])];
    case 2: return void 0 !== u.sent() ? [3, 4] : (a = r.substr(r.indexOf("/", 1)), [4, this.mkdir({ path: a, directory: e.directory, recursive: !0 })]);
    case 3: u.sent(), u.label = 4;
    case 4: return void 0 !== s && (n = s.content + n, o = s.ctime), [4, this.dbRequest("put", [{ path: t, folder: r, type: "file", size: n.length, ctime: o, mtime: i, content: n }])];
    case 5: return u.sent(), [2, {}];
} }); }); }, t.prototype.deleteFile = function (e) { return __awaiter(this, void 0, void 0, function () { var t; return __generator(this, function (n) { switch (n.label) {
    case 0: return t = this.getPath(e.directory, e.path), [4, this.dbRequest("get", [t])];
    case 1:
        if (void 0 === n.sent())
            throw Error("File does not exist.");
        return [4, this.dbIndexRequest("by_folder", "getAllKeys", [IDBKeyRange.only(t)])];
    case 2:
        if (0 !== n.sent().length)
            throw Error("Folder is not empty.");
        return [4, this.dbRequest("delete", [t])];
    case 3: return n.sent(), [2, {}];
} }); }); }, t.prototype.mkdir = function (e) { return __awaiter(this, void 0, void 0, function () { var t, n, r, i, o, s, a, u, c, l; return __generator(this, function (d) { switch (d.label) {
    case 0: return t = this.getPath(e.directory, e.path), n = e.createIntermediateDirectories, void 0 !== e.createIntermediateDirectories && console.warn("createIntermediateDirectories is deprecated, use recursive"), r = e.recursive, i = n || r, o = t.substr(0, t.lastIndexOf("/")), s = (t.match(/\//g) || []).length, [4, this.dbRequest("get", [o])];
    case 1: return a = d.sent(), [4, this.dbRequest("get", [t])];
    case 2:
        if (u = d.sent(), 1 === s)
            throw Error("Cannot create Root directory");
        if (void 0 !== u)
            throw Error("Current directory does already exist.");
        if (!i && 2 !== s && void 0 === a)
            throw Error("Parent directory must exist");
        return i && 2 !== s && void 0 === a ? (c = o.substr(o.indexOf("/", 1)), [4, this.mkdir({ path: c, directory: e.directory, recursive: i })]) : [3, 4];
    case 3: d.sent(), d.label = 4;
    case 4: return l = Date.now(), [4, this.dbRequest("put", [{ path: t, folder: o, type: "directory", size: 0, ctime: l, mtime: l }])];
    case 5: return d.sent(), [2, {}];
} }); }); }, t.prototype.rmdir = function (e) { return __awaiter(this, void 0, void 0, function () { var t, n, r, i, o, s, a, u, c; return __generator(this, function (l) { switch (l.label) {
    case 0: return r = e.recursive, i = this.getPath(n = e.directory, t = e.path), [4, this.dbRequest("get", [i])];
    case 1:
        if (void 0 === (o = l.sent()))
            throw Error("Folder does not exist.");
        if ("directory" !== o.type)
            throw Error("Requested path is not a directory");
        return [4, this.readdir({ path: t, directory: n })];
    case 2:
        if (0 !== (s = l.sent()).files.length && !r)
            throw Error("Folder is not empty");
        a = 0, u = s.files, l.label = 3;
    case 3: return a < u.length ? [4, this.stat({ path: c = t + "/" + u[a], directory: n })] : [3, 9];
    case 4: return "file" !== l.sent().type ? [3, 6] : [4, this.deleteFile({ path: c, directory: n })];
    case 5: return l.sent(), [3, 8];
    case 6: return [4, this.rmdir({ path: c, directory: n, recursive: r })];
    case 7: l.sent(), l.label = 8;
    case 8: return a++, [3, 3];
    case 9: return [4, this.dbRequest("delete", [i])];
    case 10: return l.sent(), [2, {}];
} }); }); }, t.prototype.readdir = function (e) { return __awaiter(this, void 0, void 0, function () { var t, n; return __generator(this, function (r) { switch (r.label) {
    case 0: return t = this.getPath(e.directory, e.path), [4, this.dbRequest("get", [t])];
    case 1:
        if (n = r.sent(), "" !== e.path && void 0 === n)
            throw Error("Folder does not exist.");
        return [4, this.dbIndexRequest("by_folder", "getAllKeys", [IDBKeyRange.only(t)])];
    case 2: return [2, { files: r.sent().map(function (e) { return e.substring(t.length + 1); }) }];
} }); }); }, t.prototype.getUri = function (e) { return __awaiter(this, void 0, void 0, function () { var t, n; return __generator(this, function (r) { switch (r.label) {
    case 0: return t = this.getPath(e.directory, e.path), [4, this.dbRequest("get", [t])];
    case 1: return void 0 !== (n = r.sent()) ? [3, 3] : [4, this.dbRequest("get", [t + "/"])];
    case 2: n = r.sent(), r.label = 3;
    case 3:
        if (void 0 === n)
            throw Error("Entry does not exist.");
        return [2, { uri: n.path }];
} }); }); }, t.prototype.stat = function (e) { return __awaiter(this, void 0, void 0, function () { var t, n; return __generator(this, function (r) { switch (r.label) {
    case 0: return t = this.getPath(e.directory, e.path), [4, this.dbRequest("get", [t])];
    case 1: return void 0 !== (n = r.sent()) ? [3, 3] : [4, this.dbRequest("get", [t + "/"])];
    case 2: n = r.sent(), r.label = 3;
    case 3:
        if (void 0 === n)
            throw Error("Entry does not exist.");
        return [2, { type: n.type, size: n.size, ctime: n.ctime, mtime: n.mtime, uri: n.path }];
} }); }); }, t.prototype.rename = function (e) { return __awaiter(this, void 0, void 0, function () { return __generator(this, function (t) { return [2, this._copy(e, !0)]; }); }); }, t.prototype.copy = function (e) { return __awaiter(this, void 0, void 0, function () { return __generator(this, function (t) { return [2, this._copy(e, !1)]; }); }); }, t.prototype._copy = function (e, t) { return void 0 === t && (t = !1), __awaiter(this, void 0, void 0, function () { var n, r, i, o, s, a, u, c, l, d, p, h, f, g, y, m, w = this; return __generator(this, function (v) { switch (v.label) {
    case 0:
        if (r = e.from, i = e.directory, o = e.toDirectory, !(n = e.to) || !r)
            throw Error("Both to and from must be provided");
        if (o || (o = i), s = this.getPath(i, r), a = this.getPath(o, n), s === a)
            return [2, {}];
        if (a.startsWith(s))
            throw Error("To path cannot contain the from path");
        v.label = 1;
    case 1: return v.trys.push([1, 3, , 6]), [4, this.stat({ path: n, directory: o })];
    case 2: return u = v.sent(), [3, 6];
    case 3: return v.sent(), (c = n.split("/")).pop(), l = c.join("/"), c.length > 0 ? [4, this.stat({ path: l, directory: o })] : [3, 5];
    case 4:
        if ("directory" !== v.sent().type)
            throw new Error("Parent directory of the to path is a file");
        v.label = 5;
    case 5: return [3, 6];
    case 6:
        if (u && "directory" === u.type)
            throw new Error("Cannot overwrite a directory with a file");
        return [4, this.stat({ path: r, directory: i })];
    case 7:
        switch ((d = v.sent(), p = function (e, t, n) { return __awaiter(w, void 0, void 0, function () { var r, i; return __generator(this, function (s) { switch (s.label) {
            case 0: return r = this.getPath(o, e), [4, this.dbRequest("get", [r])];
            case 1: return (i = s.sent()).ctime = t, i.mtime = n, [4, this.dbRequest("put", [i])];
            case 2: return s.sent(), [2];
        } }); }); }, d.type)) {
            case "file": return [3, 8];
            case "directory": return [3, 15];
        }
        return [3, 28];
    case 8: return [4, this.readFile({ path: r, directory: i })];
    case 9: return h = v.sent(), t ? [4, this.deleteFile({ path: r, directory: i })] : [3, 11];
    case 10: v.sent(), v.label = 11;
    case 11: return [4, this.writeFile({ path: n, directory: o, data: h.data })];
    case 12: return v.sent(), t ? [4, p(n, d.ctime, d.mtime)] : [3, 14];
    case 13: v.sent(), v.label = 14;
    case 14: return [2, {}];
    case 15:
        if (u)
            throw Error("Cannot move a directory over an existing object");
        v.label = 16;
    case 16: return v.trys.push([16, 20, , 21]), [4, this.mkdir({ path: n, directory: o, recursive: !1 })];
    case 17: return v.sent(), t ? [4, p(n, d.ctime, d.mtime)] : [3, 19];
    case 18: v.sent(), v.label = 19;
    case 19: return [3, 21];
    case 20: return v.sent(), [3, 21];
    case 21: return [4, this.readdir({ path: r, directory: i })];
    case 22: f = v.sent().files, g = 0, y = f, v.label = 23;
    case 23: return g < y.length ? [4, this._copy({ from: r + "/" + (m = y[g]), to: n + "/" + m, directory: i, toDirectory: o }, t)] : [3, 26];
    case 24: v.sent(), v.label = 25;
    case 25: return g++, [3, 23];
    case 26: return t ? [4, this.rmdir({ path: r, directory: i })] : [3, 28];
    case 27: v.sent(), v.label = 28;
    case 28: return [2, {}];
} }); }); }, t._debug = !0, t; }(WebPlugin), Filesystem = new FilesystemPluginWeb, extend = function (e) { for (var t = [], n = 1; n < arguments.length; n++)
    t[n - 1] = arguments[n]; return t.forEach(function (t) { if (t && "object" == typeof t)
    for (var n in t)
        t.hasOwnProperty(n) && (e[n] = t[n]); }), e; }, uuid4 = function () { return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (e) { var t = 16 * Math.random() | 0; return ("x" === e ? t : 3 & t | 8).toString(16); }); }, GeolocationPluginWeb = function (e) { function t() { return e.call(this, { name: "Geolocation", platforms: ["web"] }) || this; } return __extends(t, e), t.prototype.getCurrentPosition = function (e) { var t = this; return new Promise(function (n, r) { return t.requestPermissions().then(function (t) { window.navigator.geolocation.getCurrentPosition(function (e) { n(e); }, function (e) { r(e); }, extend({ enableHighAccuracy: !0, timeout: 1e4, maximumAge: 0 }, e)); }); }); }, t.prototype.watchPosition = function (e, t) { return "" + window.navigator.geolocation.watchPosition(function (e) { t(e); }, function (e) { t(null, e); }, extend({ enableHighAccuracy: !0, timeout: 1e4, maximumAge: 0 }, e)); }, t.prototype.clearWatch = function (e) { return window.navigator.geolocation.clearWatch(parseInt(e.id, 10)), Promise.resolve(); }, t; }(WebPlugin), Geolocation = new GeolocationPluginWeb, DevicePluginWeb = function (e) { function t() { return e.call(this, { name: "Device", platforms: ["web"] }) || this; } return __extends(t, e), t.prototype.getInfo = function () { return __awaiter(this, void 0, void 0, function () { var e, t, n; return __generator(this, function (r) { switch (r.label) {
    case 0: e = navigator.userAgent, t = this.parseUa(e), n = {}, r.label = 1;
    case 1: return r.trys.push([1, 3, , 4]), [4, navigator.getBattery()];
    case 2: return n = r.sent(), [3, 4];
    case 3: return r.sent(), [3, 4];
    case 4: return [2, Promise.resolve({ model: t.model, platform: "web", appVersion: "", appBuild: "", operatingSystem: t.operatingSystem, osVersion: t.osVersion, manufacturer: navigator.vendor, isVirtual: !1, batteryLevel: n.level, isCharging: n.charging, uuid: this.getUid() })];
} }); }); }, t.prototype.getLanguageCode = function () { return __awaiter(this, void 0, void 0, function () { return __generator(this, function (e) { return [2, { value: navigator.language }]; }); }); }, t.prototype.parseUa = function (e) { var t = {}, n = e.indexOf("(") + 1, r = e.indexOf(") AppleWebKit"); -1 !== e.indexOf(") Gecko") && (r = e.indexOf(") Gecko")); var i = e.substring(n, r); if (-1 !== e.indexOf("Android"))
    t.model = i.replace("; wv", "").split("; ").pop().split(" Build")[0], t.osVersion = i.split("; ")[1];
else if (t.model = i.split("; ")[0], navigator.oscpu)
    t.osVersion = navigator.oscpu;
else if (-1 !== e.indexOf("Windows"))
    t.osVersion = i;
else {
    var o = i.split("; ").pop().replace(" like Mac OS X", "").split(" ");
    t.osVersion = o[o.length - 1].replace(/_/g, ".");
} return t.operatingSystem = /android/i.test(e) ? "android" : /iPad|iPhone|iPod/.test(e) && !window.MSStream ? "ios" : /Win/.test(e) ? "windows" : /Mac/i.test(e) ? "mac" : "unknown", t; }, t.prototype.getUid = function () { var e = window.localStorage.getItem("_capuid"); return e || (e = uuid4(), window.localStorage.setItem("_capuid", e), e); }, t; }(WebPlugin), Device = new DevicePluginWeb, LocalNotificationsPluginWeb = function (e) { function t() { var t = e.call(this, { name: "LocalNotifications", platforms: ["web"] }) || this; return t.pending = [], t; } return __extends(t, e), t.prototype.sendPending = function () { var e = this, t = [], n = +new Date; this.pending.forEach(function (r) { r.schedule && r.schedule.at && +r.schedule.at <= n && (e.buildNotification(r), t.push(r)); }), console.log("Sent pending, removing", t), this.pending = this.pending.filter(function (e) { return !t.find(function (t) { return t === e; }); }); }, t.prototype.sendNotification = function (e) { var t = this, n = e; if (e.schedule && e.schedule.at) {
    var r = +e.schedule.at - +new Date;
    return this.pending.push(n), void setTimeout(function () { t.sendPending(); }, r);
} this.buildNotification(e); }, t.prototype.buildNotification = function (e) { return new Notification(e.title, { body: e.body }); }, t.prototype.schedule = function (e) { var t = this, n = []; return e.notifications.forEach(function (e) { n.push(t.sendNotification(e)); }), Promise.resolve({ notifications: n.map(function (e) { return { id: "" }; }) }); }, t.prototype.getPending = function () { return Promise.resolve({ notifications: this.pending.map(function (e) { return { id: "" + e.id }; }) }); }, t.prototype.registerActionTypes = function (e) { throw new Error("Method not implemented."); }, t.prototype.cancel = function (e) { return console.log("Cancel these", e), this.pending = this.pending.filter(function (t) { return !e.notifications.find(function (e) { return e.id === "" + t.id; }); }), Promise.resolve(); }, t.prototype.areEnabled = function () { throw new Error("Method not implemented."); }, t.prototype.requestPermissions = function () { return new Promise(function (e, t) { Notification.requestPermission(function (n) { "denied" !== n && "default" !== n ? e({ results: [n] }) : t(n); }); }); }, t; }(WebPlugin), LocalNotifications = new LocalNotificationsPluginWeb, SharePluginWeb = function (e) { function t() { return e.call(this, { name: "Share", platforms: ["web"] }) || this; } return __extends(t, e), t.prototype.share = function (e) { return navigator.share ? navigator.share({ title: e.title, text: e.text, url: e.url }) : Promise.reject("Web Share API not available"); }, t; }(WebPlugin), Share = new SharePluginWeb, ModalsPluginWeb = function (e) { function t() { return e.call(this, { name: "Modals", platforms: ["web"] }) || this; } return __extends(t, e), t.prototype.alert = function (e) { return __awaiter(this, void 0, void 0, function () { return __generator(this, function (t) { return window.alert(e.message), [2, Promise.resolve()]; }); }); }, t.prototype.prompt = function (e) { return __awaiter(this, void 0, void 0, function () { var t; return __generator(this, function (n) { return t = window.prompt(e.message, e.inputPlaceholder || ""), [2, Promise.resolve({ value: t, cancelled: null === t })]; }); }); }, t.prototype.confirm = function (e) { return __awaiter(this, void 0, void 0, function () { var t; return __generator(this, function (n) { return t = window.confirm(e.message), [2, Promise.resolve({ value: t })]; }); }); }, t.prototype.showActions = function (e) { return __awaiter(this, void 0, void 0, function () { var t = this; return __generator(this, function (n) { return [2, new Promise(function (n, r) { return __awaiter(t, void 0, void 0, function () { var t, r; return __generator(this, function (i) { switch (i.label) {
        case 0: return (t = document.querySelector("ion-action-sheet-controller")) || (t = document.createElement("ion-action-sheet-controller"), document.body.appendChild(t)), [4, t.componentOnReady()];
        case 1: return i.sent(), r = e.options.map(function (e, t) { return { text: e.title, role: e.style && e.style.toLowerCase() || "", icon: e.icon || "", handler: function () { n({ index: t }); } }; }), [4, t.create({ title: e.title, buttons: r })];
        case 2: return [4, i.sent().present()];
        case 3: return i.sent(), [2];
    } }); }); })]; }); }); }, t; }(WebPlugin), Modals = new ModalsPluginWeb, MotionPluginWeb = function (e) { function t() { var t = e.call(this, { name: "Motion" }) || this; return t.registerWindowListener("devicemotion", "accel"), t.registerWindowListener("deviceorientation", "orientation"), t; } return __extends(t, e), t; }(WebPlugin), Motion = new MotionPluginWeb, NetworkPluginWeb = function (e) { function t() { var t = e.call(this, { name: "Network", platforms: ["web"] }) || this; return t.listenerFunction = null, t; } return __extends(t, e), t.prototype.getStatus = function () { return new Promise(function (e, t) { if (window.navigator) {
    var n = window.navigator.onLine, r = window.navigator.connection || window.navigator.mozConnection || window.navigator.webkitConnection;
    e({ connected: n, connectionType: n ? r ? r.type || r.effectiveType : "wifi" : "none" });
}
else
    t("Network info not available"); }); }, t.prototype.addListener = function (e, t) { var n = window.navigator.connection || window.navigator.mozConnection || window.navigator.webkitConnection, r = t.bind(this, { connected: !0, connectionType: n ? n.type || n.effectiveType : "wifi" }), i = t.bind(this, { connected: !1, connectionType: "none" }); if (0 === e.localeCompare("networkStatusChange"))
    return window.addEventListener("online", r), window.addEventListener("offline", i), { remove: function () { window.removeEventListener("online", r), window.removeEventListener("offline", i); } }; }, t; }(WebPlugin), Network = new NetworkPluginWeb, PermissionsPluginWeb = function (e) { function t() { return e.call(this, { name: "Permissions" }) || this; } return __extends(t, e), t.prototype.query = function (e) { return __awaiter(this, void 0, void 0, function () { var t; return __generator(this, function (n) { switch (n.label) {
    case 0: return (t = window.navigator).permissions ? [4, t.permissions.query({ name: e.name === PermissionType.Photos ? "camera" : e.name })] : [2, Promise.reject("This browser does not support the Permissions API")];
    case 1: return [2, { state: n.sent().state }];
} }); }); }, t; }(WebPlugin), Permissions = new PermissionsPluginWeb, SplashScreenPluginWeb = function (e) { function t() { return e.call(this, { name: "SplashScreen", platforms: ["web"] }) || this; } return __extends(t, e), t.prototype.show = function (e, t) { return Promise.resolve(); }, t.prototype.hide = function (e, t) { return Promise.resolve(); }, t; }(WebPlugin), SplashScreen = new SplashScreenPluginWeb, StoragePluginWeb = function (e) { function t() { var t = e.call(this, { name: "Storage", platforms: ["web"] }) || this; return t.KEY_PREFIX = "_cap_", t; } return __extends(t, e), t.prototype.get = function (e) { var t = this; return new Promise(function (n, r) { n({ value: window.localStorage.getItem(t.makeKey(e.key)) }); }); }, t.prototype.set = function (e) { var t = this; return new Promise(function (n, r) { window.localStorage.setItem(t.makeKey(e.key), e.value), n(); }); }, t.prototype.remove = function (e) { var t = this; return new Promise(function (n, r) { window.localStorage.removeItem(t.makeKey(e.key)), n(); }); }, t.prototype.keys = function () { var e = this; return new Promise(function (t, n) { t({ keys: Object.keys(localStorage).filter(function (t) { return e.isKey(t); }).map(function (t) { return e.getKey(t); }) }); }); }, t.prototype.clear = function () { var e = this; return new Promise(function (t, n) { Object.keys(localStorage).filter(function (t) { return e.isKey(t); }).forEach(function (e) { return window.localStorage.removeItem(e); }), t(); }); }, t.prototype.makeKey = function (e) { return this.KEY_PREFIX + e; }, t.prototype.isKey = function (e) { return 0 === e.indexOf(this.KEY_PREFIX); }, t.prototype.getKey = function (e) { return e.substr(this.KEY_PREFIX.length); }, t; }(WebPlugin), Storage = new StoragePluginWeb, ToastPluginWeb = function (e) { function t() { return e.call(this, { name: "Toast", platforms: ["web"] }) || this; } return __extends(t, e), t.prototype.show = function (e) { return __awaiter(this, void 0, void 0, function () { var t, n; return __generator(this, function (r) { return t = 3e3, e.duration && (t = "long" === e.duration ? 5e3 : 3e3), (n = document.createElement("pwa-toast")).duration = t, n.message = e.text, document.body.appendChild(n), [2]; }); }); }, t; }(WebPlugin), Toast = new ToastPluginWeb;
mergeWebPlugins(Plugins);
