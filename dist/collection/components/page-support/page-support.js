export class PageSupport {
    constructor() {
        this.supportQuestion = {
            valid: false,
            value: null
        };
        this.submitted = false;
    }
    async componentDidLoad() {
        const toast = await this.toastCtrl.create({
            message: 'O recurso está funcionando. Pode utilizar.',
            duration: 3000
        });
        toast.present();
    }
    handleSupportQuestion(ev) {
        this.validateQuestion();
        this.supportQuestion = Object.assign({}, this.supportQuestion, { value: ev.target.value });
    }
    validateQuestion() {
        if (this.supportQuestion.value && this.supportQuestion.value.length > 0) {
            this.supportQuestion.valid = true;
            this.supportQuestion = Object.assign({}, this.supportQuestion, { valid: true });
            return;
        }
        this.supportQuestion = Object.assign({}, this.supportQuestion, { valid: false });
    }
    async submit(e) {
        e.preventDefault();
        this.validateQuestion();
        this.submitted = true;
        if (this.supportQuestion.valid) {
            this.supportQuestion = Object.assign({}, this.supportQuestion, { value: '' });
            this.submitted = false;
            const toast = await this.toastCtrl.create({
                message: 'A requisição de suporte foi enviada.',
                duration: 3000
            });
            toast.present();
        }
    }
    ionViewCanLeave() {
        if (!this.supportQuestion.value || this.supportQuestion.value.trim().length === 0) {
            return true;
        }
    }
    render() {
        return [
            h("ion-header", null,
                h("ion-toolbar", null,
                    h("ion-buttons", { slot: "start" },
                        h("ion-menu-button", null),
                        h("ion-back-button", null)),
                    h("ion-title", null, "Ajuda"))),
            h("ion-content", null,
                h("div", { class: "support-logo" },
                    h("img", { src: "assets/img/appicon.svg", alt: "Ionic Logo" })),
                h("form", { novalidate: true },
                    h("ion-list", { "no-lines": true },
                        h("ion-item", null,
                            h("ion-label", { position: "stacked", color: "primary" }, "Entre sua mensagem de feedback para que possamos lhe responder"),
                            h("ion-textarea", { name: "supportQuestion", value: this.supportQuestion.value, onInput: (ev) => this.handleSupportQuestion(ev), rows: 6, required: true }))),
                    h("ion-text", { color: "danger" },
                        h("p", { hidden: this.supportQuestion.valid || this.submitted === false, "padding-left": true }, "A mensagem \u00E9 requerida.")),
                    h("div", { padding: true },
                        h("ion-button", { onClick: (e) => this.submit(e), expand: "block", type: "submit" }, "Enviar"))))
        ];
    }
    static get is() { return "page-support"; }
    static get properties() { return {
        "alertCtrl": {
            "connect": "ion-alert-controller"
        },
        "submitted": {
            "state": true
        },
        "supportQuestion": {
            "state": true
        },
        "toastCtrl": {
            "connect": "ion-toast-controller"
        }
    }; }
    static get style() { return "/**style-placeholder:page-support:**/"; }
}
