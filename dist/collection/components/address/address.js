export class AddressInput {
    constructor() {
        this.data = { address: {} };
    }
    address(e) {
        e.preventDefault();
        this.data.address[e.target.name] = e.target.value;
        this.input(e, this.data);
    }
    render() {
        return (h("ion-item", null,
            h("ion-label", { position: "stacked", color: "primary" }, this.label),
            h("ion-grid", null,
                h("ion-row", null,
                    h("ion-col", { size: "9" },
                        h("ion-input", { name: "street", placeholder: "Endere\u00E7o", type: "text", onInput: (e) => this.address(e), clearInput: true, value: "", required: true })),
                    h("ion-col", { size: "3" },
                        h("ion-input", { name: "number", placeholder: "Num.", onInput: (e) => this.address(e), clearInput: true, value: "", required: true }))),
                h("ion-row", null,
                    h("ion-col", null,
                        h("ion-input", { name: "complement", placeholder: "Complemento", type: "text", onInput: (e) => this.address(e), clearInput: true, value: "", required: true }))),
                h("ion-row", null,
                    h("ion-col", null,
                        h("ion-input", { name: "neighbourhood", placeholder: "Bairro", type: "text", onInput: (e) => this.address(e), clearInput: true, value: "", required: true }))),
                h("ion-row", null,
                    h("ion-col", { size: "9" },
                        h("ion-input", { name: "city", placeholder: "Cidade", type: "text", onInput: (e) => this.address(e), clearInput: true, value: "", required: true })),
                    h("ion-col", { size: "3" },
                        h("ion-input", { name: "state", placeholder: "UF", type: "text", onInput: (e) => this.address(e), clearInput: true, value: "", required: true }))),
                h("ion-row", null,
                    h("ion-col", null,
                        h("ion-input", { name: "vicinity", placeholder: "Dica de endere\u00E7o", type: "text", onInput: (e) => this.address(e), clearInput: true, value: "", required: true }))))));
    }
    static get is() { return "address-input"; }
    static get properties() { return {
        "data": {
            "state": true
        },
        "input": {
            "type": "Any",
            "attr": "input"
        },
        "label": {
            "type": String,
            "attr": "label"
        },
        "name": {
            "type": String,
            "attr": "name"
        }
    }; }
    static get style() { return "/**style-placeholder:address-input:**/"; }
}
