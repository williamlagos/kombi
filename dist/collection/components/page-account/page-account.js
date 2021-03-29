import { updateProfile } from '../../actions/session';
export class PageAccount {
    constructor() {
        this.submitted = false;
        this.username = { valid: false, value: '' };
        this.password = { valid: false, value: '' };
        this.data = {};
    }
    componentWillLoad() {
        this.store.mapStateToProps(this, (state) => {
            const { session: { token, profile } } = state;
            return { token, profile };
        });
        this.store.mapDispatchToProps(this, { updateProfile });
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
    async submit(e) {
        e.preventDefault();
        const data = Object.assign({}, this.data, { username: this.username.value !== '' ?
                this.username.value :
                this.profile.username });
        await this.updateProfile(data, this.token);
        const toast = await this.toastCtrl.create({
            message: 'Perfil atualizado com sucesso.',
            duration: 3000
        });
        toast.present();
    }
    render() {
        return [
            h("ion-header", null,
                h("ion-toolbar", null,
                    h("ion-buttons", { slot: "start" },
                        h("ion-menu-button", null),
                        h("ion-back-button", null)),
                    h("ion-title", null, "Conta"))),
            h("ion-content", null,
                h("ion-list", null,
                    h("div", { "padding-top": true, "text-center": true },
                        h("img", { src: this.profile.hasOwnProperty('pictures') && this.profile.pictures.length > 0 ?
                                this.profile.pictures[0] :
                                'http://www.gravatar.com/avatar?d=mm&s=140', style: { maxHeight: '120px' }, alt: "avatar" }),
                        h("h2", null,
                            this.profile.name,
                            " (",
                            this.profile.username,
                            ")"),
                        h("ion-list", null,
                            h("ion-item", null,
                                h("ion-label", { position: "stacked" }, "Atualize seu nome completo"),
                                h("ion-input", { placeholder: this.profile.name, name: "name", onInput: (ev) => this.handleInput(ev) })),
                            h("ion-item", null,
                                h("ion-label", { position: "stacked" }, "Atualize seu endere\u00E7o"),
                                h("ion-input", { placeholder: this.profile.address.street, name: "address", onInput: (ev) => this.handleAddress(ev) })),
                            h("ion-item", null,
                                h("ion-label", { position: "stacked" }, "Atualize seu telefone para contato"),
                                h("ion-input", { placeholder: this.profile.phone, name: "phone", onInput: (ev) => this.handleInput(ev) })),
                            h("ion-item", null,
                                h("ion-label", { position: "stacked" }, "Substituir imagem"),
                                h("image-uploader", { send: (file) => this.handleFile(file), id: "file" })),
                            h("ion-item", null,
                                h("ion-label", { position: "stacked" }, "Atualize seu e-mail para o login"),
                                h("ion-input", { placeholder: this.profile.email, name: "email", onInput: (ev) => this.handleInput(ev) })),
                            h("ion-item", null,
                                h("ion-label", { position: "stacked" }, "Atualize o nome de usu\u00E1rio"),
                                h("ion-input", { placeholder: this.profile.username, name: "username", type: "text", value: this.username.value, onInput: (ev) => this.handleUsername(ev), required: true })),
                            h("ion-text", { color: "danger" },
                                h("p", { hidden: this.username.valid || this.submitted === false, "padding-left": true }, "Nome do usu\u00E1rio \u00E9 requerido")),
                            h("ion-button", { style: { 'flex': '1' }, onClick: (e) => this.submit(e), color: "primary", expand: "block" }, "Atualizar")))))
        ];
    }
    static get is() { return "page-account"; }
    static get properties() { return {
        "alertCtrl": {
            "connect": "ion-alert-controller"
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
        "nav": {
            "connect": "ion-router"
        },
        "password": {
            "state": true
        },
        "profile": {
            "state": true
        },
        "store": {
            "context": "store"
        },
        "submitted": {
            "state": true
        },
        "toastCtrl": {
            "connect": "ion-toast-controller"
        },
        "token": {
            "state": true
        },
        "username": {
            "state": true
        }
    }; }
}
