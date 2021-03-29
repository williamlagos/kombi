import { placeOrder } from '../../actions/merchant';
import { selectMerchantForOrder, showOrderBids } from '../../actions/customer';
import { close } from '../../actions/session';
export class PageOrderDetail {
    constructor() {
        this.data = { 'value': 0.0, 'description': '' };
    }
    async componentWillLoad() {
        this.store.mapStateToProps(this, (state) => {
            const { session: { token }, customer: { bids } } = state;
            return { token, bids };
        });
        this.store.mapDispatchToProps(this, { placeOrder, showOrderBids, selectMerchantForOrder, close });
        await this.showOrderBids(this.token, this.orderId);
    }
    async dismiss(data) {
        this.el.closest('ion-modal').dismiss(data === null ? { 'success': 0 } : data);
        const tabs = await this.tab.componentOnReady();
        tabs.select('tab-drawer');
        this.close();
    }
    offer() {
        console.log(this.order._id);
        console.log(this.orderId);
        const bid = Object.assign({}, this.data, { user: this.userId });
        this.placeOrder(bid, this.orderId, this.token);
        this.dismiss({ 'success': 0 });
    }
    schedule() {
        const merchants = document.querySelector('#merchants');
        this.selectMerchantForOrder(merchants.value, this.orderId, this.token);
        this.dismiss({ 'success': 0 });
    }
    handleInput(ev) {
        ev.preventDefault();
        this.data[ev.target.name] = ev.target.name !== 'description' ?
            +ev.target.value : ev.target.value;
    }
    render() {
        const mode = this.config.get('mode');
        return [
            h("ion-header", null,
                h("ion-toolbar", null,
                    h("ion-buttons", { slot: mode === 'md' ? 'end' : 'start' },
                        h("ion-button", { onClick: () => this.dismiss() }, "Cancelar")),
                    h("ion-title", null, this.order.title))),
            h("ion-content", { class: "outer-content" },
                h("ion-grid", null,
                    h("ion-row", null,
                        h("ion-col", { style: { 'text-align': 'center' }, "col-10": true, "push-1": true, "col-sm-6": true, "push-sm-3": true },
                            h("ion-item", null,
                                this.order.hasOwnProperty('pictures') && this.order.pictures.length > 0 ?
                                    h("img", { style: { 'text-align': 'center', 'margin': '10px 10px 10px 0px' }, src: this.order.pictures[0].externalRef, alt: "Aqui fica a imagem do pedido" }) :
                                    h("img", { style: { 'text-align': 'center', 'margin': '10px 10px 10px 0px' }, alt: "Aqui fica a imagem do pedido" }),
                                h("ion-label", { style: { 'text-align': 'left' } },
                                    h("p", null,
                                        "Origem: ",
                                        this.order.job.origin.address.street + ', ' + this.order.job.origin.address.number),
                                    h("p", null,
                                        "Destino: ",
                                        this.order.job.destination.address.street + ', ' + this.order.job.destination.address.number),
                                    h("p", null, this.order.job.origin.items.length > 1 ?
                                        h("ion-list", null, this.order.job.origin.items.map((item) => h("ion-item", null, item.description))) :
                                        this.order.job.origin.items.length > 0 && this.order.job.origin.items[0].description))))),
                    h("ion-row", null,
                        h("ion-col", null, this.role === 'MERCHANT' ? (h("form", { style: { 'width': '100%' } },
                            h("ion-item", null,
                                h("ion-label", null,
                                    "M\u00E9dia de pre\u00E7o ofertada: ",
                                    Math.round((this.bids.length > 0 ? (this.bids.reduce((obj, bid) => obj.value + bid.value) / this.bids.length) : (0.00)) * 100) / 100)),
                            h("ion-item", null,
                                h("ion-label", { position: "stacked", color: "primary" }, "Digite uma observa\u00E7\u00E3o"),
                                h("ion-textarea", { name: "description", value: "", onInput: (e) => this.handleInput(e) })),
                            h("ion-item", null,
                                h("ion-label", { position: "stacked", color: "primary" }, "Digite o valor desejado"),
                                h("ion-input", { name: "value", type: "number", value: "", onInput: (e) => this.handleInput(e) })),
                            h("ion-button", { expand: "full", color: "primary", onClick: () => this.offer(), fill: "clear" }, "Ofertar"))) : (h("ion-list", null,
                            h("ion-radio-group", { id: "merchants" },
                                h("ion-list-header", null,
                                    h("ion-label", null, "Selecione a oferta de um freteiro:")),
                                this.bids.map((bid, i) => (h("ion-item", null,
                                    h("ion-label", null,
                                        bid.user.name,
                                        " ofereceu R$ ",
                                        bid.value),
                                    h("ion-radio", { slot: "start", value: bid.user._id, checked: i === 0 }))))),
                            h("ion-button", { expand: "block", onClick: () => this.schedule() }, "Agendar frete")))))))
        ];
    }
    static get is() { return "page-order-detail"; }
    static get properties() { return {
        "bids": {
            "state": true
        },
        "config": {
            "context": "config"
        },
        "data": {
            "state": true
        },
        "el": {
            "elementRef": true
        },
        "order": {
            "type": "Any",
            "attr": "order"
        },
        "orderId": {
            "type": String,
            "attr": "order-id"
        },
        "role": {
            "type": String,
            "attr": "role"
        },
        "store": {
            "context": "store"
        },
        "tab": {
            "connect": "ion-tabs"
        },
        "token": {
            "state": true
        },
        "userId": {
            "type": "Any",
            "attr": "user-id"
        }
    }; }
    static get style() { return "/**style-placeholder:page-order-detail:**/"; }
}
