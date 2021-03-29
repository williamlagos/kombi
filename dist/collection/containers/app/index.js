import { configureStore } from '../../store';
import { showMyOrders } from '../../actions/merchant';
import { showMyOrders as showCustomerOrders } from '../../actions/customer';
export class App {
    constructor() {
        this._store = configureStore({});
    }
    startTimer() {
        let storeState = this._store.getState();
        this._store.subscribe(() => { storeState = this._store.getState(); });
        setInterval(() => {
            const { token } = storeState.session;
            if (token !== '') {
                const actions = this.pendingActions(storeState);
                actions.forEach(async (a) => this._store.dispatch(await a(token)));
            }
        }, 5000);
    }
    static parseJwt(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(window.atob(base64));
    }
    updateMapDrawer(role, customer, merchant) {
        const actions = [];
        if (role === 'CUSTOMER') {
            if (customer.orders.length >= 0) {
                actions.push(showCustomerOrders);
            }
        }
        else if (role === 'MERCHANT') {
            if (merchant.orders.length >= 0) {
                actions.push(showMyOrders);
            }
        }
        return actions;
    }
    pendingActions(state) {
        const { customer, merchant, session } = state;
        const { directions, token } = session;
        const role = App.parseJwt(token)['_role'];
        const activeTab = directions.slice(-1)[0].component;
        if (activeTab === 'DRAWER')
            return this.updateMapDrawer(role, customer, merchant);
        else
            return [];
    }
}
