import { open, openProfile, revokeToken } from '../../actions/session';
export class Menu {
    constructor() {
        this.profile = {};
        this.directions = {};
        this.appPages = [
            { title: 'Frete', url: 'create', icon: 'cube', role: 'CUSTOMER' },
            { title: 'Ofertas', url: 'speakers', icon: 'cash', role: 'ALL' },
            { title: 'Agenda', url: 'schedule', icon: 'calendar', role: 'ALL' },
            { title: 'Sobre', url: 'about', icon: 'information-circle', role: 'MERCHANT' }
        ];
    }
    componentWillLoad() {
        this.store.mapStateToProps(this, (state) => {
            const { session: { token, profile, directions } } = state;
            return { token, profile, directions };
        });
        this.store.mapDispatchToProps(this, { revokeToken, openProfile, open });
        this.openProfile(this.token);
    }
    checkLoginStatus() {
        return Boolean(this.token);
    }
    parseJwt(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(window.atob(base64));
    }
    async changeTab(tab) {
        this.open(tab.toUpperCase(), '/' + tab);
        const tabCtrl = await this.tabs.componentOnReady();
        await tabCtrl.select(tab);
    }
    async showPage(event, page) {
        event.preventDefault();
        this.open(page.toUpperCase(), '/' + page);
        const navCtrl = document.querySelector('ion-nav');
        await navCtrl.setRoot('page-tabs');
        await navCtrl.push('page-' + page);
    }
    displayRating(rating) {
        const buttons = (h("ion-buttons", { class: "static-stars" },
            h("ion-button", { class: rating >= 1 ? 'marked' : 'unmarked', id: "star-1" }),
            h("ion-button", { class: rating >= 2 ? 'marked' : 'unmarked', id: "star-2" }),
            h("ion-button", { class: rating >= 3 ? 'marked' : 'unmarked', id: "star-3" }),
            h("ion-button", { class: rating >= 4 ? 'marked' : 'unmarked', id: "star-4" }),
            h("ion-button", { class: rating >= 5 ? 'marked' : 'unmarked', id: "star-5" })));
        return buttons;
    }
    renderMenu() {
        const role = this.parseJwt(this.token)['_role'];
        return (h("ion-menu", { contentId: "app", menuId: "first", type: "push" },
            h("ion-header", null,
                h("ion-toolbar", null,
                    h("ion-title", null,
                        h("img", { src: "assets/img/applogo.svg", height: "42", alt: "Shipping" })))),
            h("ion-content", { forceOverscroll: false },
                this.profile && ([
                    h("ion-item", null,
                        h("ion-avatar", { slot: "start" },
                            h("img", { src: this.profile.hasOwnProperty('pictures') && this.profile.pictures.length > 0 ?
                                    this.profile.pictures[0] :
                                    'http://www.gravatar.com/avatar?d=mm&s=140', alt: "Imagem do perfil" })),
                        h("ion-label", null,
                            h("h5", null, this.profile.name),
                            h("p", null, this.profile.email))),
                    h("ion-item", null, this.displayRating(this.profile.hasOwnProperty('rating') ? this.profile.rating : 0))
                ]),
                h("ion-list", null,
                    h("ion-list-header", null, "Navegar"),
                    this.appPages.map((p) => ((p.role === role || p.role === 'ALL') &&
                        h("ion-menu-toggle", { autoHide: false },
                            h("ion-item", { lines: "full", href: "#", onClick: () => this.changeTab(p.url) },
                                h("ion-icon", { slot: "start", name: p.icon }),
                                h("ion-label", null, p.title)))))),
                h("ion-list", null,
                    h("ion-list-header", null, "Conta"),
                    h("ion-menu-toggle", { autoHide: false }, this.checkLoginStatus() ? (h("ion-item", { href: "#", onClick: (e) => this.showPage(e, 'account') },
                        h("ion-icon", { slot: "start", name: "person" }),
                        h("ion-label", null, "Perfil"))) : (h("ion-item", { href: "#login" },
                        h("ion-icon", { slot: "start", name: "log-in" }),
                        h("ion-label", null, "Entrar")))),
                    h("ion-menu-toggle", { autoHide: false },
                        h("ion-item", { href: "#support", button: true, onClick: (e) => this.showPage(e, 'support') },
                            h("ion-icon", { slot: "start", name: "help" }),
                            h("ion-label", null, "Ajuda"))),
                    h("ion-menu-toggle", { autoHide: false }, this.checkLoginStatus() ? (h("ion-item", { onClick: () => this.revokeToken(), button: true },
                        h("ion-icon", { slot: "start", name: "log-out" }),
                        h("ion-label", null, "Sair"))) : (h("ion-item", { href: "#signup", button: true },
                        h("ion-icon", { slot: "start", name: "person-add" }),
                        h("ion-label", null, "Registrar"))))))));
    }
    renderNav(dir) {
        const role = this.parseJwt(this.token)['_role'];
        console.log(dir.slice(-1)[0].component);
        return (h("ion-nav", { id: "app", main: true }, dir.slice(-1)[0].component !== 'DRAWER' ?
            h("page-tabs", { role: role }) :
            h("page-tabs", { role: role, hasTabs: false })));
    }
    render() {
        return (h("ion-split-pane", { when: "lg" },
            this.renderMenu(),
            this.renderNav(this.directions)));
    }
    static get is() { return "app-drawer"; }
    static get properties() { return {
        "directions": {
            "state": true
        },
        "nav": {
            "connect": "ion-nav"
        },
        "profile": {
            "state": true
        },
        "store": {
            "context": "store"
        },
        "tabs": {
            "connect": "page-tabs"
        },
        "token": {
            "state": true
        }
    }; }
    static get style() { return "/**style-placeholder:app-drawer:**/"; }
}
