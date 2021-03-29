"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("../polyfills/tslib.js");
var clipper_core_js_1 = require("../clipper.core.js");
require("./chunk-c46efb37.js");
var chunk_fe10219c_js_1 = require("./chunk-fe10219c.js");
var chunk_a28cfce0_js_1 = require("./chunk-a28cfce0.js");
var hostname = window && window.location && window.location.hostname, endpoint = "localhost" === hostname ? "https://localhost:4000/" : "https://app.shipping.net/", Entrance = function () { function e() { this.client_id = chunk_a28cfce0_js_1.a.env.FACEBOOK_ID, this.client_secret = chunk_a28cfce0_js_1.a.env.FACEBOOK_SECRET, this.facebook_url = "https://graph.facebook.com/v4.0"; } return e.prototype.startTimer = function () { }, e.prototype.storeFacebookToken = function (e) { return tslib_1.__awaiter(this, void 0, void 0, function () { var t, n, i; return tslib_1.__generator(this, function (o) { switch (o.label) {
    case 0: return [4, e.json()];
    case 1: return t = o.sent(), [4, fetch(this.facebook_url + "/me?fields=id%2Cname%2Cemail%2Cpicture%2Cbirthday%2Caddress&access_token=" + t.access_token)];
    case 2: return [4, o.sent().json()];
    case 3: return n = o.sent(), i = { name: n.name, email: n.email, address: n.address, role: "CUSTOMER", password: n.id, birthDate: n.birthday }, [4, fetch(n.picture.data.url)];
    case 4: return [4, o.sent().blob()];
    case 5: return [2, (i.files = [o.sent()], i)];
} }); }); }, e.prototype.checkFacebookCode = function () { return tslib_1.__awaiter(this, void 0, void 0, function () { var t, n, i; return tslib_1.__generator(this, function (o) { switch (o.label) {
    case 0: return (t = e.parseUrl()).hasOwnProperty("code") ? (n = this.facebook_url + "/oauth/access_token?client_id=" + this.client_id + "&client_secret=" + this.client_secret + "&redirect_uri=" + endpoint + "&code=" + t.code, console.log(n), i = this.storeFacebookToken, [4, fetch(n)]) : [3, 2];
    case 1: return [2, i.apply(this, [o.sent()])];
    case 2: return [2, null];
} }); }); }, e.prototype.openFacebook = function () { window.location.href = "https://www.facebook.com/v4.0/dialog/oauth?client_id=411855926099953&redirect_uri=" + endpoint + "&state=loggedin"; }, e.parseUrl = function () { return window.location.search.slice(1).split("&").reduce(function (e, t) { return e[t.split("=").slice(0)[0]] = t.split("=").slice(1)[0], e; }, {}); }, e; }(), Entrance$1 = function () { function e() { this.username = { valid: !1, value: "" }, this.password = { valid: !1, value: "" }, this.name = "", this.submitted = !1, this.registered = !1; } return e.prototype.componentWillLoad = function () { return tslib_1.__awaiter(this, void 0, void 0, function () { var e, t, n; return tslib_1.__generator(this, function (i) { switch (i.label) {
    case 0: return this.store.mapStateToProps(this, function (e) { var t = e.session; return { name: t.name, introduced: t.introduced, registered: t.registered }; }), this.store.mapDispatchToProps(this, { setToken: chunk_fe10219c_js_1.g, toggleIntro: chunk_fe10219c_js_1.h, openRegister: chunk_fe10219c_js_1.i, closeRegister: chunk_fe10219c_js_1.j, register: chunk_fe10219c_js_1.k }), this.entrance = new Entrance, [4, this.entrance.checkFacebookCode()];
    case 1: return null === (e = i.sent()) ? [3, 4] : (t = e.email, n = e.password, [4, this.register(e)]);
    case 2: return i.sent(), [4, this.setToken(t, n)];
    case 3: i.sent(), i.label = 4;
    case 4: return [2];
} }); }); }, e.prototype.handleUsername = function (e) { this.validateUsername(), this.username = Object.assign({}, this.username, { value: e.target.value }); }, e.prototype.handlePassword = function (e) { this.validatePassword(), this.password.value = e.target.value, this.password = Object.assign({}, this.password, { value: e.target.value }); }, e.prototype.validateUsername = function () { this.username = this.username.value && this.username.value.length > 0 ? Object.assign({}, this.username, { valid: !0 }) : Object.assign({}, this.username, { valid: !1 }); }, e.prototype.validatePassword = function () { if (this.password.value && this.password.value.length > 0)
    return this.password.valid = !0, void (this.password = Object.assign({}, this.password, { valid: !0 })); this.password = Object.assign({}, this.password, { valid: !1 }); }, e.prototype.onLogin = function (e) { return tslib_1.__awaiter(this, void 0, void 0, function () { return tslib_1.__generator(this, function (t) { return e.preventDefault(), this.validatePassword(), this.validateUsername(), this.submitted = !0, this.password.valid && this.username.valid && this.setToken(this.username.value, this.password.value), [2]; }); }); }, e.prototype.renderLogin = function () { var e = this; return [clipper_core_js_1.h("ion-header", null, clipper_core_js_1.h("ion-toolbar", null, clipper_core_js_1.h("ion-buttons", { slot: "start" }, clipper_core_js_1.h("ion-menu-toggle", { "auto-hide": !1 }, clipper_core_js_1.h("ion-icon", { name: "menu" }))), clipper_core_js_1.h("ion-title", null, "Entrar"))), clipper_core_js_1.h("ion-content", { padding: !0 }, clipper_core_js_1.h("ion-grid", null, clipper_core_js_1.h("ion-row", null, clipper_core_js_1.h("ion-col", { "size-md": "4", "offset-md": "4" }, clipper_core_js_1.h("div", { class: "login-logo" }, clipper_core_js_1.h("img", { src: "assets/img/appicon.svg", alt: "Ionic logo" })), clipper_core_js_1.h("form", { novalidate: "true", onSubmit: function (t) { return e.onLogin(t); } }, clipper_core_js_1.h("ion-list", { "no-lines": !0 }, clipper_core_js_1.h("ion-item", null, clipper_core_js_1.h("ion-label", { position: "stacked", color: "primary" }, "E-mail"), clipper_core_js_1.h("ion-input", { name: "username", type: "text", value: this.username.value, onInput: function (t) { return e.handleUsername(t); }, spellcheck: !1, autocapitalize: "off", required: !0 })), clipper_core_js_1.h("ion-text", { color: "danger" }, clipper_core_js_1.h("p", { hidden: this.username.valid || !1 === this.submitted, "padding-left": !0 }, "Nome do usuário é requerido")), clipper_core_js_1.h("ion-item", null, clipper_core_js_1.h("ion-label", { position: "stacked", color: "primary" }, "Senha"), clipper_core_js_1.h("ion-input", { name: "password", type: "password", value: this.password.value, onInput: function (t) { return e.handlePassword(t); }, required: !0 })), clipper_core_js_1.h("ion-text", { color: "danger" }, clipper_core_js_1.h("p", { hidden: this.password.valid || !1 === this.submitted, "padding-left": !0 }, "Senha é requerida"))), clipper_core_js_1.h("ion-row", { "responsive-sm": !0 }, clipper_core_js_1.h("ion-col", null, clipper_core_js_1.h("ion-button", { type: "submit", expand: "block" }, "Entrar")), clipper_core_js_1.h("ion-col", null, clipper_core_js_1.h("ion-button", { onClick: function () { return e.openRegister(); }, color: "light", expand: "block" }, "Registrar"))), clipper_core_js_1.h("ion-row", { "responsive-sm": !0 }, clipper_core_js_1.h("ion-col", null, clipper_core_js_1.h("ion-button", { onClick: function () { return e.entrance.openFacebook(); }, color: "tertiary", expand: "block" }, "Entrar com o Facebook"))))))))]; }, e.prototype.render = function () { var e = this; return this.introduced ? this.registered ? this.renderLogin() : clipper_core_js_1.h("register-wizard", { action: function (t) { return e.register(t); }, exit: function () { return e.closeRegister(); } }) : clipper_core_js_1.h("generic-carousel", null, clipper_core_js_1.h("div", { slot: "slide1" }, clipper_core_js_1.h("div", { class: "slide-image-container" }, clipper_core_js_1.h("img", { src: "assets/img/tour_1_clipper.svg", class: "slide-image" })), clipper_core_js_1.h("h2", { class: "slide-title" }, "Bem-vindo ao ", clipper_core_js_1.h("b", null, "Shipping")), clipper_core_js_1.h("p", null, "O ", clipper_core_js_1.h("b", null, "Shipping"), " é um aplicativo de serviços de mudança e fretagem, simples, prático e rápido."), clipper_core_js_1.h("ion-button", { fill: "clear", href: "#", onClick: function () { return e.toggleIntro(!0); } }, "Continuar", clipper_core_js_1.h("ion-icon", { slot: "end", name: "arrow-forward" }))), clipper_core_js_1.h("div", { slot: "slide2" }, clipper_core_js_1.h("div", { class: "slide-image-container" }, clipper_core_js_1.h("img", { src: "assets/img/tour_2_map.svg", class: "slide-image" })), clipper_core_js_1.h("h2", { class: "slide-title" }, "Por que usar o Shipping?"), clipper_core_js_1.h("p", null, clipper_core_js_1.h("b", null, "Shipping"), " conta com prestadores de entrega e mudança bem selecionados e revisados pela nossa equipe."), clipper_core_js_1.h("ion-button", { fill: "clear", href: "#", onClick: function () { return e.toggleIntro(!0); } }, "Continuar", clipper_core_js_1.h("ion-icon", { slot: "end", name: "arrow-forward" }))), clipper_core_js_1.h("div", { slot: "slide3" }, clipper_core_js_1.h("div", { class: "slide-image-container" }, clipper_core_js_1.h("img", { src: "assets/img/tour_3_payment.svg", class: "slide-image" })), clipper_core_js_1.h("h2", { class: "slide-title" }, "Pago a mais para usar este serviço?"), clipper_core_js_1.h("p", null, "O aplicativo é ", clipper_core_js_1.h("b", null, "100% gratuito"), ", apenas é cobrado o valor que é combinado pela plataforma entre o freteiro e você."), clipper_core_js_1.h("ion-button", { fill: "clear", href: "#", onClick: function () { return e.toggleIntro(!0); } }, "Continuar", clipper_core_js_1.h("ion-icon", { slot: "end", name: "arrow-forward" }))), clipper_core_js_1.h("div", { slot: "slide4" }, clipper_core_js_1.h("div", { class: "slide-image-container" }, clipper_core_js_1.h("img", { src: "assets/img/tour_4_start.svg", class: "slide-image" })), clipper_core_js_1.h("h2", { class: "slide-title" }, "Pronto para Começar?"), clipper_core_js_1.h("ion-button", { fill: "clear", href: "#", onClick: function () { return e.toggleIntro(!0); } }, "Começar", clipper_core_js_1.h("ion-icon", { slot: "end", name: "arrow-forward" })))); }, Object.defineProperty(e, "is", { get: function () { return "app-entrance"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "properties", { get: function () { return { introduced: { state: !0 }, name: { state: !0 }, password: { state: !0 }, registered: { state: !0 }, store: { context: "store" }, submitted: { state: !0 }, username: { state: !0 } }; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "style", { get: function () { return "app-entrance{width:100%;height:100%}app-entrance .login-logo{padding:20px 0;min-height:200px;text-align:center}app-entrance .login-logo img{max-width:150px}app-entrance .signup-logo{padding:20px 0;min-height:200px;text-align:center}app-entrance .signup-logo img{max-width:150px}app-entrance .list{margin-bottom:0}"; }, enumerable: !0, configurable: !0 }), e; }(), Register = function () { function e() { this.submitted = !1, this.username = { valid: !1, value: "" }, this.password = { valid: !1, value: "" }, this.data = {}; } return e.prototype.handleInput = function (e) { this.data[e.target.name] = e.target.value; }, e.prototype.handleRadio = function (e) { this.data[e.target.name] = [e.target.value]; }, e.prototype.handleFile = function (e) { this.data.files = [e[0]]; }, e.prototype.handleAddress = function (e) { this.data.address = { street: e.target.value }; }, e.prototype.handleUsername = function (e) { this.validateUsername(), this.username = Object.assign({}, this.username, { value: e.target.value }); }, e.prototype.handlePassword = function (e) { this.validatePassword(), this.password.value = e.target.value, this.password = Object.assign({}, this.password, { value: e.target.value }); }, e.prototype.validateUsername = function () { this.username = this.username.value && this.username.value.length > 0 ? Object.assign({}, this.username, { valid: !0 }) : Object.assign({}, this.username, { valid: !1 }); }, e.prototype.validatePassword = function () { if (this.password.value && this.password.value.length > 0)
    return this.password.valid = !0, void (this.password = Object.assign({}, this.password, { valid: !0 })); this.password = Object.assign({}, this.password, { valid: !1 }); }, e.prototype.unload = function (e) { e.preventDefault(), this.exit(); }, e.prototype.submit = function (e) { e.preventDefault(); var t = Object.assign({}, this.data, { username: this.username.value, password: this.password.value }); this.action(t); }, e.prototype.render = function () { var e = this; return [clipper_core_js_1.h("ion-header", null, clipper_core_js_1.h("ion-toolbar", null, clipper_core_js_1.h("ion-buttons", { slot: "start" }, clipper_core_js_1.h("ion-back-button", { onClick: function (t) { return e.unload(t); }, defaultHref: "/" })), clipper_core_js_1.h("ion-title", null, "Registro"))), clipper_core_js_1.h("ion-content", { padding: !0 }, clipper_core_js_1.h("div", { class: "signup-logo" }, clipper_core_js_1.h("img", { src: "assets/img/appicon.svg", alt: "Ionic Logo" })), clipper_core_js_1.h("generic-wizard", { id: "register", steps: 4, action: function (t) { return e.submit(t); } }, clipper_core_js_1.h("div", { slot: "step-1" }, clipper_core_js_1.h("ion-item", null, clipper_core_js_1.h("ion-label", { position: "stacked" }, "Digite seu nome completo"), clipper_core_js_1.h("ion-input", { name: "name", onInput: function (t) { return e.handleInput(t); } })), clipper_core_js_1.h("ion-item", null, clipper_core_js_1.h("ion-label", { position: "stacked" }, "Digite seu endereço"), clipper_core_js_1.h("ion-input", { name: "address", onInput: function (t) { return e.handleAddress(t); } })), clipper_core_js_1.h("ion-item", null, clipper_core_js_1.h("ion-label", { position: "stacked" }, "Digite seu telefone para contato"), clipper_core_js_1.h("ion-input", { name: "phone", onInput: function (t) { return e.handleInput(t); } })), clipper_core_js_1.h("ion-radio-group", { name: "role" }, clipper_core_js_1.h("ion-list-header", null, clipper_core_js_1.h("ion-label", null, "Você é freteiro ou busca por frete?")), clipper_core_js_1.h("ion-item", null, clipper_core_js_1.h("ion-label", null, "Cliente"), clipper_core_js_1.h("ion-radio", { onClick: function (t) { return e.handleRadio(t); }, slot: "start", value: "CUSTOMER", checked: !0 })), clipper_core_js_1.h("ion-item", null, clipper_core_js_1.h("ion-label", null, "Freteiro"), clipper_core_js_1.h("ion-radio", { onClick: function (t) { return e.handleRadio(t); }, slot: "start", value: "MERCHANT" })))), clipper_core_js_1.h("div", { slot: "step-2" }, clipper_core_js_1.h("ion-item", null, clipper_core_js_1.h("ion-label", { position: "stacked" }, "Insira imagens"), clipper_core_js_1.h("image-uploader", { send: function (t) { return e.handleFile(t); }, id: "file" }))), clipper_core_js_1.h("div", { slot: "step-3" }, clipper_core_js_1.h("ion-item", null, clipper_core_js_1.h("ion-label", { position: "stacked" }, "Digite seu e-mail para o login"), clipper_core_js_1.h("ion-input", { name: "email", onInput: function (t) { return e.handleInput(t); } })), clipper_core_js_1.h("ion-item", null, clipper_core_js_1.h("ion-label", { position: "stacked" }, "Digite um nome de usuário"), clipper_core_js_1.h("ion-input", { name: "username", type: "text", value: this.username.value, onInput: function (t) { return e.handleUsername(t); }, required: !0 })), clipper_core_js_1.h("ion-text", { color: "danger" }, clipper_core_js_1.h("p", { hidden: this.username.valid || !1 === this.submitted, "padding-left": !0 }, "Nome do usuário é requerido")), clipper_core_js_1.h("ion-item", null, clipper_core_js_1.h("ion-label", { position: "stacked" }, "Digite sua senha"), clipper_core_js_1.h("ion-input", { name: "password", type: "password", value: this.password.value, onInput: function (t) { return e.handlePassword(t); }, required: !0 })), clipper_core_js_1.h("ion-text", { color: "danger" }, clipper_core_js_1.h("p", { hidden: this.password.valid || !1 === this.submitted, "padding-left": !0 }, "Senha é requerida")), clipper_core_js_1.h("ion-item", null, clipper_core_js_1.h("ion-label", { position: "stacked" }, "Digite sua senha novamente"), clipper_core_js_1.h("ion-input", { type: "password", name: "scpassword" }))), clipper_core_js_1.h("div", { slot: "step-4" }, clipper_core_js_1.h("ion-item", null, clipper_core_js_1.h("ion-label", { position: "stacked" }, "Informações adicionais"), clipper_core_js_1.h("ion-textarea", { name: "info", rows: 4, onInput: function (t) { return e.handleInput(t); } })))))]; }, Object.defineProperty(e, "is", { get: function () { return "register-wizard"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "properties", { get: function () { return { action: { type: "Any", attr: "action" }, data: { state: !0 }, exit: { type: "Any", attr: "exit" }, images: { type: "Any", attr: "images" }, password: { state: !0 }, submitted: { state: !0 }, username: { state: !0 } }; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "style", { get: function () { return ""; }, enumerable: !0, configurable: !0 }), e; }();
exports.AppEntrance = Entrance$1;
exports.RegisterWizard = Register;
