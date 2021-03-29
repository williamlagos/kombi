import { ConferenceData } from '../../providers/conference-data';
import { UserData } from '../../providers/user-data';
import { cancelOrder, selectOrder, showMyOrders, startOrder } from '../../actions/merchant';
import { showMyOrders as showCustomerOrders } from '../../actions/customer';
import { close } from '../../actions/session';
export class PageSchedule {
    constructor() {
        this.excludeTracks = [];
        this.dayIndex = 0;
        this.groups = [];
        this.shownSessions = [];
        this.segment = 'awaiting';
        this.queryText = '';
        this.orders = [];
        this.scheduleOrders = [];
        this.awaitingOrders = [];
        this.slided = false;
    }
    async componentWillLoad() {
        this.updateSchedule();
        this.store.mapStateToProps(this, (state) => {
            const { session: { token } } = state;
            return { token };
        });
        this.store.mapDispatchToProps(this, { close });
        this.role = this.parseJwt(this.token)['_role'];
        if (this.role === 'MERCHANT') {
            this.store.mapStateToProps(this, (state) => {
                const { merchant: { orders } } = state;
                return { orders };
            });
            this.store.mapDispatchToProps(this, { showMyOrders, selectOrder, cancelOrder, startOrder });
        }
        else if (this.role === 'CUSTOMER') {
            this.store.mapStateToProps(this, (state) => {
                const { customer: { orders } } = state;
                return { orders };
            });
            this.store.mapDispatchToProps(this, { showCustomerOrders, cancelOrder });
        }
        await this.populateOrders();
    }
    componentDidLoad() {
        this.scheduleList = this.el.querySelector('#scheduleList');
        this.fab = this.el.querySelector('#socialFab');
    }
    async populateOrders() {
        this.role === 'MERCHANT' ? await this.showMyOrders(this.token) : await this.showCustomerOrders(this.token);
        this.scheduleOrders = this.orders.filter((order) => order.status === 'accepted');
        this.awaitingOrders = this.orders.filter((order) => order.status === 'awaiting_for_confirmation');
    }
    parseJwt(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(window.atob(base64));
    }
    segmentChanged(event) {
        this.segment = event.target.value;
        this.updateSchedule();
    }
    searchbarChanged(event) {
        this.queryText = event.target.value;
        console.log(this.queryText);
        this.updateSchedule();
    }
    modalDidDismiss(event) {
        if (event) {
            this.excludeTracks = event.detail.data;
            this.updateSchedule();
        }
    }
    loadingWillDismiss() {
        this.fab.close();
    }
    async updateSchedule() {
        const data = await ConferenceData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment);
        this.shownSessions = data.shownSessions;
        this.groups = data.groups;
        this.el.forceUpdate();
    }
    async presentFilter() {
        const modal = await this.modalCtrl.create({
            component: 'page-schedule-filter',
            componentProps: {
                excludedTracks: this.excludeTracks,
            }
        });
        await modal.present();
    }
    async cancelCurrentOrder(orderId) {
        await this.cancelOrder(orderId, this.token);
        await this.populateOrders();
        const tabs = await this.tab.componentOnReady();
        tabs.select('tab-drawer');
        this.close();
    }
    async startCurrentOrder(orderId) {
        await this.startOrder(orderId, this.token);
        const tabs = await this.tab.componentOnReady();
        tabs.select('tab-drawer');
        this.close();
    }
    async confirmOrder(orderId) {
        const alert = await this.alertCtrl.create({
            header: 'Confirmar o frete para o horário?',
            buttons: [
                {
                    text: 'Cancelar',
                    handler: () => {
                    }
                },
                {
                    text: 'Confirmar',
                    handler: async () => {
                        this.selectOrder(orderId, this.token);
                        await this.populateOrders();
                    }
                }
            ]
        });
        alert.present();
    }
    async removeFavorite(session, title) {
        const alert = await this.alertCtrl.create({
            header: title,
            message: 'Would you like to remove this session from your favorites?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: () => {
                    }
                },
                {
                    text: 'Remove',
                    handler: () => {
                        UserData.removeFavorite(session.name);
                        this.updateSchedule();
                    }
                }
            ]
        });
        alert.present();
    }
    async openSocial(social) {
        this.toggleList();
        const loading = await this.loadingCtrl.create({
            message: `Posting to ${social}`,
            duration: (Math.random() * 1000) + 500
        });
        await loading.present();
    }
    toggleList() {
        const fabButton = this.fab.querySelector('ion-fab-button');
        fabButton.activated = !fabButton.activated;
        const fabList = this.fab.querySelector('ion-fab-list');
        fabList.activated = !fabList.activated;
    }
    async toggleSlide(sliderId) {
        const slider = document.getElementById(sliderId);
        !this.slided ? await slider.open('end') : await slider.close();
        this.slided = !this.slided;
    }
    render() {
        return [
            h("ion-header", { class: "aligned" },
                h("ion-toolbar", { class: "aligned" },
                    h("ion-buttons", { slot: "start" },
                        h("ion-menu-button", null)),
                    h("ion-segment", { class: "aligned", value: this.segment },
                        h("ion-segment-button", { value: "awaiting" }, "Aguardando"),
                        h("ion-segment-button", { value: "schedule" }, "Agendados")),
                    h("ion-buttons", { slot: "end" }))),
            h("ion-content", null,
                h("ion-list", { id: "scheduleList", hidden: this.shownSessions === 0 }, (this.segment === 'awaiting' ? this.awaitingOrders : this.scheduleOrders).map((order) => h("ion-item-group", null,
                    h("ion-item-sliding", { class: "item-sliding-track", id: order._id, onClick: () => this.toggleSlide(order._id) },
                        h("ion-item-options", { side: "start" }, order.status === 'accepted' && (h("ion-item-option", { color: "danger", onClick: () => this.cancelCurrentOrder(order._id) }, "Cancelar"))),
                        h("ion-item", { class: "item-sliding-track-trabalho", href: "#" },
                            h("ion-label", null,
                                h("h3", null, order.job.destination.address.street + ' ' + order.job.destination.address.number),
                                h("p", null,
                                    " ",
                                    order.job.scheduledTo,
                                    " - ",
                                    order.job.origin.address.street + ' ' + order.job.origin.address.number))),
                        h("ion-item-options", { side: "end" }, this.role === 'MERCHANT' && (order.status === 'awaiting_for_confirmation' ? (h("ion-item-option", { color: "favorite", onClick: () => this.confirmOrder(order._id) }, "Confirmar")) : (h("ion-item-option", { color: "tertiary", onClick: () => this.startCurrentOrder(order._id) }, "Come\u00E7ar")))))))),
                h("ion-list-header", { hidden: (this.segment === 'awaiting' ? this.awaitingOrders : this.scheduleOrders).length > 0 }, "N\u00E3o h\u00E1 sess\u00F5es encontradas"))
        ];
    }
    static get is() { return "page-schedule"; }
    static get properties() { return {
        "alertCtrl": {
            "connect": "ion-alert-controller"
        },
        "awaitingOrders": {
            "state": true
        },
        "config": {
            "context": "config"
        },
        "el": {
            "elementRef": true
        },
        "groups": {
            "state": true
        },
        "loadingCtrl": {
            "connect": "ion-loading-controller"
        },
        "modalCtrl": {
            "connect": "ion-modal-controller"
        },
        "orders": {
            "state": true
        },
        "queryText": {
            "state": true
        },
        "role": {
            "state": true
        },
        "scheduleOrders": {
            "state": true
        },
        "segment": {
            "state": true
        },
        "shownSessions": {
            "state": true
        },
        "slided": {
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
    static get listeners() { return [{
            "name": "ionChange",
            "method": "segmentChanged"
        }, {
            "name": "ionInput",
            "method": "searchbarChanged"
        }, {
            "name": "body:ionModalDidDismiss",
            "method": "modalDidDismiss"
        }, {
            "name": "body:ionLoadingWillDismiss",
            "method": "loadingWillDismiss"
        }]; }
    static get style() { return "/**style-placeholder:page-schedule:**/"; }
}
