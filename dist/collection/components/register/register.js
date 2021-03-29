export class Register {
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
    static get style() { return "/**style-placeholder:register-wizard:**/"; }
}
