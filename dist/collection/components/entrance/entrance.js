import { closeRegister, openRegister, register, setToken, toggleIntro } from '../../actions/session';
import { Entrance as EntranceContainer } from '../../containers/entrance';
export class Entrance {
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
        this.entrance = new EntranceContainer();
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
    static get style() { return "/**style-placeholder:app-entrance:**/"; }
}
