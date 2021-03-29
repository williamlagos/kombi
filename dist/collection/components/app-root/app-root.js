import { App } from '../../containers/app';
import { toggleTour } from '../../actions/session';
import { Plugins } from '@capacitor/core';
const { SplashScreen } = Plugins;
export class AppRoot {
    async componentWillLoad() {
        this.app = new App();
        this.app.startTimer();
        this.store.setStore(this.app._store);
        this.store.mapStateToProps(this, (state) => {
            const { session: { token, explained } } = state;
            return { token, explained };
        });
        this.store.mapDispatchToProps(this, { toggleTour });
    }
    async componentDidLoad() {
        this.checkLoginStatus();
        try {
            await SplashScreen.hide();
        }
        catch (_a) {
            return;
        }
    }
    checkLoginStatus() {
        return Boolean(this.token);
    }
    checkExplainedStatus() {
        return Boolean(this.explained);
    }
    render() {
        return (h("ion-app", null, this.checkLoginStatus() ? (this.checkExplainedStatus() ? (h("app-drawer", null)) : (h("generic-carousel", null,
            h("ion-slide", { slot: "slide1" },
                h("div", { class: "slide-image-container" },
                    h("img", { src: "assets/img/tour_1_clipper.svg", class: "slide-image" })),
                h("h2", { class: "slide-title" },
                    "Bem-vindo ao ",
                    h("b", null, "Shipping")),
                h("p", null,
                    "O ",
                    h("b", null, "Shipping"),
                    " \u00E9 um aplicativo de servi\u00E7os de mudan\u00E7a e fretagem, simples, pr\u00E1tico e r\u00E1pido. Esta \u00E9 uma vers\u00E3o para testes - poder\u00E1 ter alguns problemas e pedimos sua compreens\u00E3o. Pressione em continuar."),
                h("ion-button", { fill: "clear", href: "#", onClick: () => this.toggleTour(true) },
                    "Continuar",
                    h("ion-icon", { slot: "end", name: "arrow-forward" })))))) : (h("app-entrance", null))));
    }
    static get is() { return "app-root"; }
    static get properties() { return {
        "explained": {
            "state": true
        },
        "store": {
            "context": "store"
        },
        "token": {
            "state": true
        }
    }; }
    static get style() { return "/**style-placeholder:app-root:**/"; }
}
