import { registerOrder } from '../../actions/customer';
import { close } from '../../actions/session';
import config from '../../../config';
const gmapURL = 'https://maps.googleapis.com/maps/api/geocode/json?';
export class PageCreate {
    constructor() {
        this.descriptions = [{ description: '' }];
        this.descriptionsLength = 1;
        this.data = {
            job: {
                origin: {
                    items: []
                },
                destination: {}
            }
        };
    }
    componentWillLoad() {
        this.store.mapStateToProps(this, (state) => {
            const { session: { token, directions } } = state;
            return { token, directions };
        });
        this.store.mapDispatchToProps(this, { registerOrder, close });
    }
    parseJwt(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(window.atob(base64));
    }
    async handleSubmit(e) {
        e.preventDefault();
        this.data['customer'] = this.parseJwt(this.token)['_id'];
        this.data['job']['scheduledTo'] = document.querySelector('ion-datetime').value;
        const origAddrObj = this.data['job']['origin']['address'];
        const destAddrObj = this.data['job']['destination']['address'];
        const origAddr = origAddrObj['street'] + ', ' + origAddrObj['number'];
        const destAddr = destAddrObj['street'] + ', ' + destAddrObj['number'];
        const apiKey = config.env.GOOGLE_MAP_KEY;
        const origResponse = await fetch(gmapURL + 'key=' + apiKey + '&address=' + origAddr);
        const destResponse = await fetch(gmapURL + 'key=' + apiKey + '&address=' + destAddr);
        const origPlace = (await origResponse.json()).results[0].geometry.location;
        const destPlace = (await destResponse.json()).results[0].geometry.location;
        this.data['job']['origin']['address']['location'] = { lat: origPlace.lat, lng: origPlace.lng };
        this.data['job']['destination']['address']['location'] = { lat: destPlace.lat, lng: destPlace.lng };
        this.data.job.origin['items'] = [...this.descriptions.slice(0, this.descriptionsLength)];
        this.registerOrder(this.data, this.token);
        const tabs = await this.tab.componentOnReady();
        tabs.select('tab-drawer');
        this.close();
    }
    handleAddress(e, data, type) {
        e.preventDefault();
        this.data['job'][type] = data;
    }
    handleFile(f) {
        const files = [];
        for (let i = 0; i < f.length; i++)
            files.push(f[i]);
        this.data['files'] = [...files];
    }
    handleInput(ev) {
        this.data[ev.target.name] = ev.target.value;
    }
    handleDescription(e) {
        e.preventDefault();
        this.descriptions[this.descriptionsLength - 1] = { description: e.target.value };
        this.descriptions[this.descriptionsLength] = { description: '' };
    }
    addDescription(e) {
        e.preventDefault();
        this.descriptionsLength += 1;
    }
    dateInterval() {
        const d = new Date();
        const dd = String(d.getDate()).padStart(2, '0');
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const yyyy = d.getFullYear();
        const yyyy_t = d.getFullYear() + 1;
        const today = yyyy + '-' + mm + '-' + dd;
        const tomorrow = yyyy_t + '-' + mm + '-' + dd;
        return { today, tomorrow };
    }
    render() {
        const { today, tomorrow } = this.dateInterval();
        const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        const monthShortNames = monthNames.map(month => month.slice(0, 3));
        return [
            h("ion-header", null,
                h("ion-toolbar", null,
                    h("ion-buttons", { slot: "start" },
                        h("ion-menu-button", null)),
                    h("ion-title", null, "Criar Frete"))),
            h("ion-content", { padding: true }, this.directions.slice(-1)[0].component === 'CREATE' &&
                h("generic-wizard", { id: "create", steps: 4, action: async (e) => { await this.handleSubmit(e); } },
                    h("div", { slot: "step-1" },
                        h("ion-item", null,
                            h("ion-label", { position: "stacked", color: "primary" }, "Insira imagens do produto"),
                            h("image-uploader", { send: (files) => this.handleFile(files) })),
                        h("ion-item", null,
                            h("ion-label", { position: "stacked", color: "primary" }, "Insira o t\u00EDtulo do seu an\u00FAncio"),
                            h("ion-input", { name: "title", type: "text", value: "", clearInput: true, onInput: (e) => this.handleInput(e), required: true })),
                        h("ion-item", null,
                            h("ion-label", { position: "stacked", color: "primary" }, "Data de sa\u00EDda"),
                            h("ion-datetime", { min: today, max: tomorrow, "display-format": "MMM DD, YYYY HH:mm", value: "", monthNames: monthNames, monthShortNames: monthShortNames, cancelText: "Cancelar", doneText: "Confirmar", name: "scheduledTo" }))),
                    h("div", { slot: "step-2" },
                        this.descriptions.map((description) => {
                            return (h("ion-item", null,
                                h("ion-label", { position: "stacked", color: "primary" }, "Descreva o item que voc\u00EA precisa carregar"),
                                h("ion-textarea", { rows: 2, name: "description", onInput: (e) => this.handleDescription(e), required: true, value: description['description'] })));
                        }),
                        h("ion-button", { onClick: (e) => this.addDescription(e), color: "tertiary", expand: "block" }, "Adicionar outro item")),
                    h("div", { slot: "step-3" },
                        h("address-input", { input: (e, d) => this.handleAddress(e, d, 'origin'), label: "Endere\u00E7o de sa\u00EDda" })),
                    h("div", { slot: "step-4" },
                        h("address-input", { input: (e, d) => this.handleAddress(e, d, 'destination'), label: "Endere\u00E7o de chegada" }))))
        ];
    }
    static get is() { return "page-create"; }
    static get properties() { return {
        "data": {
            "state": true
        },
        "descriptions": {
            "state": true
        },
        "descriptionsLength": {
            "state": true
        },
        "directions": {
            "state": true
        },
        "store": {
            "context": "store"
        },
        "tab": {
            "connect": "ion-tabs"
        },
        "token": {
            "state": true
        }
    }; }
    static get style() { return "/**style-placeholder:page-create:**/"; }
}
