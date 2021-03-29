import { open } from '../../actions/session';
export class PageTabs {
    constructor() {
        this.hasTabs = true;
    }
    componentWillLoad() {
        this.store.mapStateToProps(this, (state) => {
            const { session: { directions } } = state;
            return { directions };
        });
        this.store.mapDispatchToProps(this, { open });
    }
    async componentDidLoad() {
        const menuCtlr = await this.menuCtrl.componentOnReady();
        const tabsCtlr = await this.tabCtrl.componentOnReady();
        tabsCtlr.select('tab-drawer');
        document.querySelector('ion-tabs').select('tab-drawer');
        menuCtlr.enable(true);
    }
    async select(tab) {
        const tabsCtlr = await this.tabCtrl.componentOnReady();
        tabsCtlr.select('tab-' + tab);
    }
    toggleOpen(tab) {
        this.open(tab.toUpperCase(), '/' + tab);
    }
    render() {
        return [
            h("ion-tabs", null,
                h("slot", null),
                [
                    h("ion-tab", { tab: "tab-drawer", component: "app-map" }),
                    h("ion-tab", { tab: "tab-schedule", component: "page-schedule" }),
                    h("ion-tab", { tab: "tab-create", component: "page-create" }),
                    h("ion-tab", { tab: "tab-speakers", component: "page-order-list" }),
                    h("ion-tab", { tab: "tab-about", component: "page-about" })
                ],
                h("ion-tab-bar", { slot: "bottom" },
                    this.role === 'CUSTOMER' && [
                        h("ion-tab-button", { tab: "tab-create", onClick: () => this.toggleOpen('create') },
                            h("ion-icon", { name: "cube" }),
                            h("ion-label", null, "Criar")),
                        h("ion-tab-button", { tab: "tab-speakers", onClick: () => this.toggleOpen('speakers') },
                            h("ion-icon", { name: "cash" }),
                            h("ion-label", null, "Ofertas")),
                        h("ion-tab-button", { tab: "tab-schedule", onClick: () => this.toggleOpen('schedule') },
                            h("ion-icon", { name: "calendar" }),
                            h("ion-label", null, "Fretes"))
                    ],
                    this.role === 'MERCHANT' && [
                        h("ion-tab-button", { tab: "tab-speakers", onClick: () => this.toggleOpen('speakers') },
                            h("ion-icon", { name: "cash" }),
                            h("ion-label", null, "Ofertar")),
                        h("ion-tab-button", { tab: "tab-schedule", onClick: () => this.toggleOpen('schedule') },
                            h("ion-icon", { name: "calendar" }),
                            h("ion-label", null, "Fretes")),
                        h("ion-tab-button", { tab: "tab-about", onClick: () => this.toggleOpen('about') },
                            h("ion-icon", { name: "information-circle" }),
                            h("ion-label", null, "Sobre"))
                    ]))
        ];
    }
    static get is() { return "page-tabs"; }
    static get properties() { return {
        "directions": {
            "state": true
        },
        "hasTabs": {
            "type": Boolean,
            "attr": "has-tabs"
        },
        "menuCtrl": {
            "connect": "ion-menu-controller"
        },
        "role": {
            "type": "Any",
            "attr": "role"
        },
        "select": {
            "method": true
        },
        "store": {
            "context": "store"
        },
        "tabCtrl": {
            "connect": "ion-tabs"
        }
    }; }
    static get style() { return "/**style-placeholder:page-tabs:**/"; }
}
