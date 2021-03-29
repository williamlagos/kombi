import { ConferenceData } from '../../providers/conference-data';
import { cancelOrder, finishOrder, rateOrder, showMyOrders } from '../../actions/merchant';
import { showMyOrders as showCustomerOrders } from '../../actions/customer';
import { open } from '../../actions/session';
import config from '../../../config';
export class Route {
    constructor() {
        this.gmapKey = config.env.GOOGLE_MAP_KEY;
        this.orders = [];
        this.startedOrders = [];
        this.finishedOrders = [];
    }
    async componentWillLoad() {
        this.mapData = await ConferenceData.getMap();
        this.store.mapStateToProps(this, (state) => {
            const { session: { token, directions } } = state;
            return { token, directions };
        });
        this.role = this.parseJwt(this.token)['_role'];
        if (this.role === 'MERCHANT') {
            this.store.mapStateToProps(this, (state) => {
                const { merchant: { orders } } = state;
                return { orders };
            });
            this.store.mapDispatchToProps(this, { open, showMyOrders, cancelOrder, rateOrder, finishOrder });
        }
        else if (this.role === 'CUSTOMER') {
            this.store.mapStateToProps(this, (state) => {
                const { customer: { orders } } = state;
                return { orders };
            });
            this.store.mapDispatchToProps(this, { open, showCustomerOrders, cancelOrder, rateOrder, finishOrder });
        }
        await this.populateOrders();
        await getGoogleMaps(this.gmapKey);
    }
    async componentDidLoad() {
        await this.populateMap();
    }
    async populateMap() {
        const mapData = this.mapData;
        const mapEle = this.el.querySelector('.map-canvas');
        const map = new google.maps.Map(mapEle, {
            center: this.startedOrders.length > 0 ?
                this.startedOrders[0].job.origin.address.location :
                mapData.find((d) => d.center),
            zoom: 16
        });
        mapData.forEach(() => {
            google.maps.event.addListenerOnce(map, 'idle', () => {
                mapEle.classList.add('show-map');
            });
        });
    }
    async componentWillUpdate() {
        await this.populateOrders(false);
    }
    async populateOrders(update = true) {
        if (update)
            this.role === 'MERCHANT' ? await this.showMyOrders(this.token) : await this.showCustomerOrders(this.token);
        this.startedOrders = this.orders.filter((order) => order.status === 'started');
        this.finishedOrders = this.orders.filter((order) => order.status === 'finished' && (order.customerRate < 0 || order.merchantRate < 0));
        this.hasOrder = this.startedOrders.length > 0;
        this.hasFinishedOrder = this.finishedOrders.length > 0;
    }
    isEmpty(obj) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }
    parseJwt(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(window.atob(base64));
    }
    navigate() {
        const gmapUrl = 'https://www.google.com/maps/dir/';
        const j = this.startedOrders[0].job;
        const daddr = `${j.destination.address.street}, ${j.destination.address.number}`;
        const oaddr = `${j.origin.address.street}, ${j.origin.address.number}`;
        window.location.replace(`${gmapUrl}?api=1&travelmode=driving&origin=${oaddr}&destination=${daddr}`);
    }
    async cancelCurrentOrder(orderId) {
        await this.cancelOrder(orderId, this.token);
        await this.populateOrders();
    }
    async finishCurrentOrder(orderId) {
        await this.finishOrder(orderId, this.token);
        await this.populateOrders();
    }
    async rateCurrentOrder(orderId) {
        await this.rateOrder(orderId, this.rating, this.token);
        await this.populateOrders();
    }
    toggleStar(ev, id) {
        ev.preventDefault();
        this.rating = +id.split('-')[1];
        console.log(this.rating);
        for (let i = 1; i <= 5; i++)
            document.getElementById(`star-${i}`).classList.remove('marked');
        for (let i = 1; i <= this.rating; i++) {
            const cl = document.getElementById(`star-${i}`).classList;
            cl.add('marked');
        }
    }
    render() {
        let oaddr = '';
        let daddr = '';
        const gmapUrl = 'https://www.google.com/maps/embed/v1/directions';
        if (this.hasOrder || this.hasFinishedOrder) {
            const j = this.hasFinishedOrder ? this.finishedOrders[0].job : this.startedOrders[0].job;
            daddr = `${j.destination.address.street}, ${j.destination.address.number}`;
            oaddr = `${j.origin.address.street}, ${j.origin.address.number}`;
        }
        return [
            h("ion-header", null,
                h("ion-toolbar", null,
                    h("ion-buttons", { slot: "start" },
                        h("ion-menu-button", null)),
                    h("ion-title", null, "Mapa"))),
            h("div", { style: (this.hasOrder || this.hasFinishedOrder) ? { 'display': 'none' } : { 'height': '100%' }, class: "map-canvas" }),
            h("div", { style: { 'flex': '1', 'display': 'flex', 'flex-direction': 'column' } }, (this.hasOrder || this.hasFinishedOrder) && ([
                h("iframe", { frameborder: "0", style: { border: '0', height: '100%', width: '100%' }, src: `${gmapUrl}?origin=${oaddr}&destination=${daddr}&key=${this.gmapKey}` }),
                h("div", null,
                    h("ion-card", null,
                        h("ion-card-header", null,
                            h("ion-card-subtitle", null, this.hasFinishedOrder ? 'Avalie seu frete' : 'Prepare seus itens'),
                            h("ion-card-title", null, this.hasFinishedOrder ? 'Frete Concluído' : 'Frete em Andamento')),
                        this.hasOrder && ([
                            h("ion-card-content", null,
                                "O freteiro est\u00E1 a caminho de ",
                                this.startedOrders[0].job.origin.address.street + ', ' + this.startedOrders[0].job.origin.address.number,
                                ", a partir de ",
                                this.startedOrders[0].job.scheduledTo,
                                ". Aguarde a chegada do prestador de servi\u00E7os para come\u00E7ar o frete para o endere\u00E7o",
                                ' ' + this.startedOrders[0].job.destination.address.street + ', ' + this.startedOrders[0].job.destination.address.number,
                                ". Contate o",
                                ' ' + this.startedOrders[0].merchant.name,
                                " pelo telefone ",
                                this.startedOrders[0].merchant.phone,
                                " ou e-mail ",
                                this.startedOrders[0].merchant.email,
                                " em caso de necessidade."),
                            h("div", null, this.role === 'MERCHANT' ? (h("div", { style: { 'display': 'flex', 'padding': '0px 15px' } },
                                h("ion-button", { style: { 'flex': '1' }, color: "danger", onClick: () => this.cancelCurrentOrder(this.startedOrders[0]._id) }, "Cancelar"),
                                h("ion-button", { style: { 'flex': '1' }, color: "tertiary", onClick: () => this.navigate() }, "Navegar"),
                                h("ion-button", { style: { 'flex': '1' }, color: "success", onClick: () => this.finishCurrentOrder(this.startedOrders[0]._id) }, "Concluir"))) : (h("div", { style: { 'display': 'flex', 'padding': '0px 15px' } },
                                h("ion-button", { style: { 'flex': '1' }, color: "danger", onClick: () => this.cancelCurrentOrder(this.startedOrders[0]._id), expand: "block" }, "Cancelar")))),
                            h("br", null)
                        ]),
                        this.hasFinishedOrder && ([
                            h("ion-card-content", null,
                                h("ion-buttons", { class: "stars" },
                                    h("ion-button", { id: "star-1", onClick: (e) => this.toggleStar(e, 'star-1') }),
                                    h("ion-button", { id: "star-2", onClick: (e) => this.toggleStar(e, 'star-2') }),
                                    h("ion-button", { id: "star-3", onClick: (e) => this.toggleStar(e, 'star-3') }),
                                    h("ion-button", { id: "star-4", onClick: (e) => this.toggleStar(e, 'star-4') }),
                                    h("ion-button", { id: "star-5", onClick: (e) => this.toggleStar(e, 'star-5') }))),
                            h("div", { style: { 'display': 'flex', 'padding': '0px 15px' } },
                                h("ion-button", { style: { 'flex': '1' }, color: "tertiary", onClick: () => this.rateCurrentOrder(this.finishedOrders[0]._id), expand: "block" }, "Enviar")),
                            h("br", null)
                        ])))
            ]))
        ];
    }
    static get is() { return "app-map"; }
    static get properties() { return {
        "directions": {
            "state": true
        },
        "el": {
            "elementRef": true
        },
        "finishedOrders": {
            "state": true
        },
        "hasFinishedOrder": {
            "state": true
        },
        "hasOrder": {
            "state": true
        },
        "orders": {
            "state": true
        },
        "rating": {
            "state": true
        },
        "role": {
            "state": true
        },
        "startedOrders": {
            "state": true
        },
        "store": {
            "context": "store"
        },
        "token": {
            "state": true
        }
    }; }
    static get style() { return "/**style-placeholder:app-map:**/"; }
}
function getGoogleMaps(apiKey) {
    const win = window;
    const googleModule = win.google;
    if (googleModule && googleModule.maps) {
        return Promise.resolve(googleModule.maps);
    }
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
        script.onload = () => {
            const googleModule2 = win.google;
            if (googleModule2 && googleModule2.maps) {
                resolve(googleModule2.maps);
            }
            else {
                reject('google maps not available');
            }
        };
    });
}
