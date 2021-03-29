export class Wizard {
    constructor() {
        this.step = 1;
        this.submitted = false;
        this.needSignup = false;
    }
    next(e) {
        e.preventDefault();
        this.step += 1;
        this.step %= this.steps + 1;
    }
    back(e) {
        e.preventDefault();
        this.step -= 1;
        this.step %= this.steps + 1;
    }
    submit(e) {
        e.preventDefault();
        this.action(e);
    }
    render() {
        const s = [];
        for (let i = 1; i <= this.steps; i++)
            s.push(i);
        return (h("form", { id: this.id, method: "POST", action: "#", novalidate: true },
            h("ion-list", { "no-lines": true }, s.map((step) => (this.step === step ?
                h("div", null,
                    h("slot", { name: 'step-' + step })) :
                h("div", { style: { display: 'none' } },
                    h("slot", { name: 'step-' + step }))))),
            h("div", { style: { 'display': 'flex' }, padding: true },
                this.step > 1 && h("ion-button", { style: { 'flex': '1' }, onClick: (e) => this.back(e), color: "primary", expand: "block" }, "Voltar"),
                this.step === this.steps && h("ion-button", { style: { 'flex': '1' }, onClick: (e) => this.submit(e), color: "primary", expand: "block" }, "Registrar"),
                this.step < this.steps && h("ion-button", { style: { 'flex': '1' }, onClick: (e) => this.next(e), color: "primary", expand: "block" }, "Pr\u00F3ximo"))));
    }
    static get is() { return "generic-wizard"; }
    static get properties() { return {
        "action": {
            "type": "Any",
            "attr": "action"
        },
        "id": {
            "type": String,
            "attr": "id"
        },
        "images": {
            "type": "Any",
            "attr": "images"
        },
        "needSignup": {
            "state": true
        },
        "step": {
            "state": true
        },
        "steps": {
            "type": Number,
            "attr": "steps"
        },
        "submitted": {
            "state": true
        }
    }; }
    static get style() { return "/**style-placeholder:generic-wizard:**/"; }
}
