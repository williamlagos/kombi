import { h } from '../clipper.core.js';

import './chunk-c46efb37.js';
import { g as setToken, h as toggleIntro, i as openRegister, j as closeRegister, k as register } from './chunk-fe10219c.js';
import { a as config } from './chunk-a28cfce0.js';

const hostname = window && window.location && window.location.hostname;
const endpoint = hostname === 'localhost' ? 'https://localhost:4000/' : 'https://app.shipping.net/';
class Entrance {
    constructor() {
        this.client_id = config.env.FACEBOOK_ID;
        this.client_secret = config.env.FACEBOOK_SECRET;
        this.facebook_url = 'https://graph.facebook.com/v4.0';
    }
    startTimer() {
    }
    async storeFacebookToken(response) {
        const res = await response.json();
        const url = `${this.facebook_url}/me?fields=id%2Cname%2Cemail%2Cpicture%2Cbirthday%2Caddress&access_token=${res['access_token']}`;
        const responseObj = await fetch(url);
        const { birthday, email, id, name, address, picture } = await responseObj.json();
        return {
            name,
            email,
            address,
            role: 'CUSTOMER',
            password: id,
            birthDate: birthday,
            files: [await (await fetch(picture.data.url)).blob()]
        };
    }
    async checkFacebookCode() {
        const params = Entrance.parseUrl();
        if (params.hasOwnProperty('code')) {
            const authorization_code = params['code'];
            const url = `${this.facebook_url}/oauth/access_token?client_id=${this.client_id}&client_secret=${this.client_secret}&redirect_uri=${endpoint}&code=${authorization_code}`;
            console.log(url);
            return this.storeFacebookToken(await fetch(url));
        }
        else {
            return null;
        }
    }
    openFacebook() {
        const app_id = '411855926099953';
        const facebook_url = 'https://www.facebook.com/v4.0/dialog/oauth';
        window.location.href = `${facebook_url}?client_id=${app_id}&redirect_uri=${endpoint}&state=loggedin`;
    }
    static parseUrl() {
        return window.location.search.slice(1).split('&').reduce((map, obj) => {
            map[obj.split('=').slice(0)[0]] = obj.split('=').slice(1)[0];
            return map;
        }, {});
    }
}

class Entrance$1 {
    constructor() {
        this.username = {
            valid: false,
            value: ''
        };
        this.password = {
            valid: false,
            value: ''
        };
        this.name = '';
        this.submitted = false;
        this.registered = false;
    }
    async componentWillLoad() {
        this.store.mapStateToProps(this, (state) => {
            const { session: { name, introduced, registered } } = state;
            return { name, introduced, registered };
        });
        this.store.mapDispatchToProps(this, {
            setToken,
            toggleIntro,
            openRegister,
            closeRegister,
            register
        });
        this.entrance = new Entrance();
        const registerObj = await this.entrance.checkFacebookCode();
        if (registerObj !== null) {
            const { email, password } = registerObj;
            await this.register(registerObj);
            await this.setToken(email, password);
        }
    }
    handleUsername(ev) {
        this.validateUsername();
        this.username = Object.assign({}, this.username, { value: ev.target.value });
    }
    handlePassword(ev) {
        this.validatePassword();
        this.password.value = ev.target.value;
        this.password = Object.assign({}, this.password, { value: ev.target.value });
    }
    validateUsername() {
        if (this.username.value && this.username.value.length > 0) {
            this.username = Object.assign({}, this.username, { valid: true });
            return;
        }
        this.username = Object.assign({}, this.username, { valid: false });
    }
    validatePassword() {
        if (this.password.value && this.password.value.length > 0) {
            this.password.valid = true;
            this.password = Object.assign({}, this.password, { valid: true });
            return;
        }
        this.password = Object.assign({}, this.password, { valid: false });
    }
    async onLogin(e) {
        e.preventDefault();
        this.validatePassword();
        this.validateUsername();
        this.submitted = true;
        if (this.password.valid && this.username.valid) {
            this.setToken(this.username.value, this.password.value);
        }
    }
    renderLogin() {
        return [
            h("ion-header", null,
                h("ion-toolbar", null,
                    h("ion-buttons", { slot: "start" },
                        h("ion-menu-toggle", { "auto-hide": false },
                            h("ion-icon", { name: "menu" }))),
                    h("ion-title", null, "Entrar"))),
            h("ion-content", { padding: true },
                h("ion-grid", null,
                    h("ion-row", null,
                        h("ion-col", { "size-md": "4", "offset-md": "4" },
                            h("div", { class: "login-logo" },
                                h("img", { src: "assets/img/appicon.svg", alt: "Ionic logo" })),
                            h("form", { novalidate: "true", onSubmit: (e) => this.onLogin(e) },
                                h("ion-list", { "no-lines": true },
                                    h("ion-item", null,
                                        h("ion-label", { position: "stacked", color: "primary" }, "E-mail"),
                                        h("ion-input", { name: "username", type: "text", value: this.username.value, onInput: (ev) => this.handleUsername(ev), spellcheck: false, autocapitalize: "off", required: true })),
                                    h("ion-text", { color: "danger" },
                                        h("p", { hidden: this.username.valid || this.submitted === false, "padding-left": true }, "Nome do usu\u00E1rio \u00E9 requerido")),
                                    h("ion-item", null,
                                        h("ion-label", { position: "stacked", color: "primary" }, "Senha"),
                                        h("ion-input", { name: "password", type: "password", value: this.password.value, onInput: (ev) => this.handlePassword(ev), required: true })),
                                    h("ion-text", { color: "danger" },
                                        h("p", { hidden: this.password.valid || this.submitted === false, "padding-left": true }, "Senha \u00E9 requerida"))),
                                h("ion-row", { "responsive-sm": true },
                                    h("ion-col", null,
                                        h("ion-button", { type: "submit", expand: "block" }, "Entrar")),
                                    h("ion-col", null,
                                        h("ion-button", { onClick: () => this.openRegister(), color: "light", expand: "block" }, "Registrar"))),
                                h("ion-row", { "responsive-sm": true },
                                    h("ion-col", null,
                                        h("ion-button", { onClick: () => this.entrance.openFacebook(), color: "tertiary", expand: "block" }, "Entrar com o Facebook"))))))))
        ];
    }
    render() {
        if (!this.introduced) {
            return (h("generic-carousel", null,
                h("div", { slot: "slide1" },
                    h("div", { class: "slide-image-container" },
                        h("img", { src: "assets/img/tour_1_clipper.svg", class: "slide-image" })),
                    h("h2", { class: "slide-title" },
                        "Bem-vindo ao ",
                        h("b", null, "Shipping")),
                    h("p", null,
                        "O ",
                        h("b", null, "Shipping"),
                        " \u00E9 um aplicativo de servi\u00E7os de mudan\u00E7a e fretagem, simples, pr\u00E1tico e r\u00E1pido."),
                    h("ion-button", { fill: "clear", href: "#", onClick: () => this.toggleIntro(true) },
                        "Continuar",
                        h("ion-icon", { slot: "end", name: "arrow-forward" }))),
                h("div", { slot: "slide2" },
                    h("div", { class: "slide-image-container" },
                        h("img", { src: "assets/img/tour_2_map.svg", class: "slide-image" })),
                    h("h2", { class: "slide-title" }, "Por que usar o Shipping?"),
                    h("p", null,
                        h("b", null, "Shipping"),
                        " conta com prestadores de entrega e mudan\u00E7a bem selecionados e revisados pela nossa equipe."),
                    h("ion-button", { fill: "clear", href: "#", onClick: () => this.toggleIntro(true) },
                        "Continuar",
                        h("ion-icon", { slot: "end", name: "arrow-forward" }))),
                h("div", { slot: "slide3" },
                    h("div", { class: "slide-image-container" },
                        h("img", { src: "assets/img/tour_3_payment.svg", class: "slide-image" })),
                    h("h2", { class: "slide-title" }, "Pago a mais para usar este servi\u00E7o?"),
                    h("p", null,
                        "O aplicativo \u00E9 ",
                        h("b", null, "100% gratuito"),
                        ", apenas \u00E9 cobrado o valor que \u00E9 combinado pela plataforma entre o freteiro e voc\u00EA."),
                    h("ion-button", { fill: "clear", href: "#", onClick: () => this.toggleIntro(true) },
                        "Continuar",
                        h("ion-icon", { slot: "end", name: "arrow-forward" }))),
                h("div", { slot: "slide4" },
                    h("div", { class: "slide-image-container" },
                        h("img", { src: "assets/img/tour_4_start.svg", class: "slide-image" })),
                    h("h2", { class: "slide-title" }, "Pronto para Come\u00E7ar?"),
                    h("ion-button", { fill: "clear", href: "#", onClick: () => this.toggleIntro(true) },
                        "Come\u00E7ar",
                        h("ion-icon", { slot: "end", name: "arrow-forward" })))));
        }
        return !this.registered ?
            h("register-wizard", { action: (d) => this.register(d), exit: () => this.closeRegister() }) :
            this.renderLogin();
    }
    static get is() { return "app-entrance"; }
    static get properties() { return {
        "introduced": {
            "state": true
        },
        "name": {
            "state": true
        },
        "password": {
            "state": true
        },
        "registered": {
            "state": true
        },
        "store": {
            "context": "store"
        },
        "submitted": {
            "state": true
        },
        "username": {
            "state": true
        }
    }; }
    static get style() { return "app-entrance{width:100%;height:100%}app-entrance .login-logo{padding:20px 0;min-height:200px;text-align:center}app-entrance .login-logo img{max-width:150px}app-entrance .signup-logo{padding:20px 0;min-height:200px;text-align:center}app-entrance .signup-logo img{max-width:150px}app-entrance .list{margin-bottom:0}"; }
}

class Register {
    constructor() {
        this.submitted = false;
        this.username = { valid: false, value: '' };
        this.password = { valid: false, value: '' };
        this.data = {};
    }
    handleInput(ev) {
        this.data[ev.target.name] = ev.target.value;
    }
    handleRadio(ev) {
        this.data[ev.target.name] = [ev.target.value];
    }
    handleFile(files) {
        this.data['files'] = [files[0]];
    }
    handleAddress(ev) {
        this.data['address'] = {
            'street': ev.target.value
        };
    }
    handleUsername(ev) {
        this.validateUsername();
        this.username = Object.assign({}, this.username, { value: ev.target.value });
    }
    handlePassword(ev) {
        this.validatePassword();
        this.password.value = ev.target.value;
        this.password = Object.assign({}, this.password, { value: ev.target.value });
    }
    validateUsername() {
        if (this.username.value && this.username.value.length > 0) {
            this.username = Object.assign({}, this.username, { valid: true });
            return;
        }
        this.username = Object.assign({}, this.username, { valid: false });
    }
    validatePassword() {
        if (this.password.value && this.password.value.length > 0) {
            this.password.valid = true;
            this.password = Object.assign({}, this.password, { valid: true });
            return;
        }
        this.password = Object.assign({}, this.password, { valid: false });
    }
    unload(e) {
        e.preventDefault();
        this.exit();
    }
    submit(e) {
        e.preventDefault();
        const data = Object.assign({}, this.data, { username: this.username.value, password: this.password.value });
        this.action(data);
    }
    render() {
        return [
            h("ion-header", null,
                h("ion-toolbar", null,
                    h("ion-buttons", { slot: "start" },
                        h("ion-back-button", { onClick: e => this.unload(e), defaultHref: "/" })),
                    h("ion-title", null, "Registro"))),
            h("ion-content", { padding: true },
                h("div", { class: "signup-logo" },
                    h("img", { src: "assets/img/appicon.svg", alt: "Ionic Logo" })),
                h("generic-wizard", { id: "register", steps: 4, action: (e) => this.submit(e) },
                    h("div", { slot: "step-1" },
                        h("ion-item", null,
                            h("ion-label", { position: "stacked" }, "Digite seu nome completo"),
                            h("ion-input", { name: "name", onInput: (ev) => this.handleInput(ev) })),
                        h("ion-item", null,
                            h("ion-label", { position: "stacked" }, "Digite seu endere\u00E7o"),
                            h("ion-input", { name: "address", onInput: (ev) => this.handleAddress(ev) })),
                        h("ion-item", null,
                            h("ion-label", { position: "stacked" }, "Digite seu telefone para contato"),
                            h("ion-input", { name: "phone", onInput: (ev) => this.handleInput(ev) })),
                        h("ion-radio-group", { name: "role" },
                            h("ion-list-header", null,
                                h("ion-label", null, "Voc\u00EA \u00E9 freteiro ou busca por frete?")),
                            h("ion-item", null,
                                h("ion-label", null, "Cliente"),
                                h("ion-radio", { onClick: (ev) => this.handleRadio(ev), slot: "start", value: "CUSTOMER", checked: true })),
                            h("ion-item", null,
                                h("ion-label", null, "Freteiro"),
                                h("ion-radio", { onClick: (ev) => this.handleRadio(ev), slot: "start", value: "MERCHANT" })))),
                    h("div", { slot: "step-2" },
                        h("ion-item", null,
                            h("ion-label", { position: "stacked" }, "Insira imagens"),
                            h("image-uploader", { send: (file) => this.handleFile(file), id: "file" }))),
                    h("div", { slot: "step-3" },
                        h("ion-item", null,
                            h("ion-label", { position: "stacked" }, "Digite seu e-mail para o login"),
                            h("ion-input", { name: "email", onInput: (ev) => this.handleInput(ev) })),
                        h("ion-item", null,
                            h("ion-label", { position: "stacked" }, "Digite um nome de usu\u00E1rio"),
                            h("ion-input", { name: "username", type: "text", value: this.username.value, onInput: (ev) => this.handleUsername(ev), required: true })),
                        h("ion-text", { color: "danger" },
                            h("p", { hidden: this.username.valid || this.submitted === false, "padding-left": true }, "Nome do usu\u00E1rio \u00E9 requerido")),
                        h("ion-item", null,
                            h("ion-label", { position: "stacked" }, "Digite sua senha"),
                            h("ion-input", { name: "password", type: "password", value: this.password.value, onInput: (ev) => this.handlePassword(ev), required: true })),
                        h("ion-text", { color: "danger" },
                            h("p", { hidden: this.password.valid || this.submitted === false, "padding-left": true }, "Senha \u00E9 requerida")),
                        h("ion-item", null,
                            h("ion-label", { position: "stacked" }, "Digite sua senha novamente"),
                            h("ion-input", { type: "password", name: "scpassword" }))),
                    h("div", { slot: "step-4" },
                        h("ion-item", null,
                            h("ion-label", { position: "stacked" }, "Informa\u00E7\u00F5es adicionais"),
                            h("ion-textarea", { name: "info", rows: 4, onInput: (ev) => this.handleInput(ev) })))))
        ];
    }
    static get is() { return "register-wizard"; }
    static get properties() { return {
        "action": {
            "type": "Any",
            "attr": "action"
        },
        "data": {
            "state": true
        },
        "exit": {
            "type": "Any",
            "attr": "exit"
        },
        "images": {
            "type": "Any",
            "attr": "images"
        },
        "password": {
            "state": true
        },
        "submitted": {
            "state": true
        },
        "username": {
            "state": true
        }
    }; }
    static get style() { return ""; }
}

export { Entrance$1 as AppEntrance, Register as RegisterWizard };
