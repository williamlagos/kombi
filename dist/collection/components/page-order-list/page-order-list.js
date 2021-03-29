import { Plugins } from '@capacitor/core';
import { showOrder } from '../../actions/merchant';
import { showMyOrders } from '../../actions/customer';
const { Browser } = Plugins;
export class PageOrderList {
    constructor() {
        this.speakers = [];
        this.orders = [];
        this.orderNumberStart = 0;
        this.orderNumberEnd = 12;
    }
    async componentWillLoad() {
        this.store.mapStateToProps(this, (state) => {
            const { session: { token } } = state;
            return { token };
        });
        this.role = this.parseJwt(this.token)['_role'];
        if (this.role === 'MERCHANT') {
            this.store.mapStateToProps(this, (state) => {
                const { merchant: { orders } } = state;
                return { orders };
            });
            this.store.mapDispatchToProps(this, { showOrder });
            await this.showOrder(this.token);
        }
        else if (this.role === 'CUSTOMER') {
            console.log('YES');
            this.store.mapStateToProps(this, (state) => {
                const { customer: { orders } } = state;
                return { orders };
            });
            this.store.mapDispatchToProps(this, { showMyOrders });
            await this.showMyOrders(this.token);
        }
    }
    goToSpeakerTwitter(speaker) {
        console.log('goToSpeakerTwitter', speaker);
        Browser.open({
            url: `https://twitter.com/${speaker.twitter}`
        });
    }
    async openSpeakerShare(speaker) {
        const actionSheet = await this.actionSheetCtrl.create({
            header: 'Share ' + speaker.name,
            buttons: [
                {
                    text: 'Copy Link',
                    handler: () => {
                        console.log('Copy link clicked on https://twitter.com/' + speaker.twitter);
                        if (window['cordova'] &&
                            window['cordova'].plugins.clipboard) {
                            window['cordova'].plugins.clipboard.copy('https://twitter.com/' + speaker.twitter);
                        }
                    }
                },
                {
                    text: 'Share via ...'
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    }
    async openContact(speaker) {
        const mode = this.mode;
        const actionSheet = await this.actionSheetCtrl.create({
            header: 'Contact ' + speaker.name,
            buttons: [
                {
                    text: `Email ( ${speaker.email} )`,
                    icon: mode !== 'ios' ? 'mail' : null,
                    handler: () => {
                        window.open('mailto:' + speaker.email);
                    }
                },
                {
                    text: `Call ( ${speaker.phone} )`,
                    icon: mode !== 'ios' ? 'call' : null,
                    handler: () => {
                        window.open('tel:' + speaker.phone);
                    }
                }
            ]
        });
        actionSheet.present();
    }
    parseJwt(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(window.atob(base64));
    }
    async offer(e, order) {
        const modal = await this.modalCtrl.create({
            component: 'page-order-detail',
            componentProps: {
                role: this.role,
                userId: this.parseJwt(this.token)._id,
                orderId: e.target.id,
                order
            }
        });
        await modal.present();
        const { data } = await modal.onDidDismiss();
        if (data.success === 0)
            e.target.disabled = true;
    }
    previousOrders() {
        this.orderNumberStart -= 12;
        this.orderNumberEnd -= 12;
    }
    nextOrders() {
        this.orderNumberStart += 12;
        this.orderNumberEnd += 12;
    }
    render() {
        const reverseOrders = this.orders.reverse();
        const currentOrders = reverseOrders.slice(this.orderNumberStart, this.orderNumberEnd);
        return [
            h("ion-header", null,
                h("ion-toolbar", null,
                    h("ion-buttons", { slot: "start" },
                        h("ion-menu-button", null)),
                    h("ion-title", null, "Ofertar"))),
            h("ion-content", { class: "outer-content" },
                h("ion-list", null,
                    h("ion-grid", { fixed: true },
                        h("ion-row", { "align-items-stretch": true },
                            this.orders.length > 12 && ([
                                h("ion-button", { fill: "clear", disabled: this.orderNumberStart === 0, onClick: () => this.previousOrders() }, "Anterior"),
                                h("ion-button", { fill: "clear", disabled: this.orderNumberEnd >= this.orders.length, onClick: () => this.nextOrders() }, "Pr\u00F3ximo")
                            ]),
                            currentOrders.map(order => (order.status === 'created' && (h("ion-col", { size: "12", "size-md": "6" },
                                h("ion-card", { class: "speaker-card" },
                                    h("a", { style: { 'text-decoration': 'none' }, href: `/speakers/${order.id}` },
                                        h("img", { style: { 'text-align': 'center' }, src: order.hasOwnProperty('pictures') && order.pictures.length > 0 ? order.pictures[0].externalRef : 'assets/img/box.svg', alt: "Aqui fica a imagem do pedido" })),
                                    h("ion-card-header", null,
                                        h("ion-card-subtitle", null, order.job.origin.address.street + ', ' + order.job.origin.address.number),
                                        h("ion-card-title", null, order.title)),
                                    h("ion-card-content", null, order.job.origin.items.length > 1 ?
                                        h("ion-list", null, order.job.origin.items.map((item) => h("ion-item", null, item.description))) :
                                        order.job.origin.items.length > 0 && order.job.origin.items[0].description),
                                    this.role === 'MERCHANT' ? (h("ion-button", { id: order._id, expand: "full", color: "primary", disabled: order.placed, fill: "clear", onClick: (e) => this.offer(e, order) }, order.placed ? 'Frete já ofertado' : 'Ofertar')) : (h("ion-button", { id: order._id, expand: "full", color: "primary", disabled: order.placed, fill: "clear", onClick: (e) => this.offer(e, order) }, order.placed ? 'Frete já selecionado' : 'Ver ofertas')))))))))))
        ];
    }
    static get is() { return "page-order-list"; }
    static get properties() { return {
        "actionSheetCtrl": {
            "connect": "ion-action-sheet-controller"
        },
        "modalCtrl": {
            "connect": "ion-modal-controller"
        },
        "orderNumberEnd": {
            "state": true
        },
        "orderNumberStart": {
            "state": true
        },
        "orders": {
            "state": true
        },
        "role": {
            "state": true
        },
        "store": {
            "context": "store"
        },
        "token": {
            "state": true
        }
    }; }
    static get style() { return "/**style-placeholder:page-order-list:**/"; }
}
