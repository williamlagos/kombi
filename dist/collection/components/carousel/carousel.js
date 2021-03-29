export class Carousel {
    async componentDidLoad() {
        setTimeout(() => this.el.querySelector('ion-slides').update(), 100);
    }
    render() {
        return [
            h("ion-header", { "no-border": true },
                h("ion-toolbar", { color: "light" },
                    h("ion-buttons", { slot: "end" }))),
            h("ion-content", { scrollY: false },
                h("ion-slides", { pager: false },
                    h("ion-slide", null,
                        h("slot", { name: "slide1" })),
                    h("ion-slide", null,
                        h("slot", { name: "slide2" })),
                    h("ion-slide", null,
                        h("slot", { name: "slide3" })),
                    h("ion-slide", null,
                        h("slot", { name: "slide4" }))))
        ];
    }
    static get is() { return "generic-carousel"; }
    static get properties() { return {
        "el": {
            "elementRef": true
        },
        "menuCtrl": {
            "connect": "ion-menu-controller"
        },
        "navCtrl": {
            "connect": "ion-nav"
        },
        "store": {
            "context": "store"
        }
    }; }
    static get style() { return "/**style-placeholder:generic-carousel:**/"; }
}
