export class PageAbout {
    async presentPopover(event) {
        const popover = await this.popoverCtrl.create({
            component: 'page-about-popover',
            event
        });
        popover.present();
    }
    render() {
        return [
            h("ion-header", null,
                h("ion-toolbar", null,
                    h("ion-buttons", { slot: "start" },
                        h("ion-menu-button", null)),
                    h("ion-title", null, "Sobre"))),
            h("ion-content", null,
                h("div", { class: "about-header" },
                    h("img", { src: "assets/img/ionic-logo-white.svg", alt: "ionic logo" })),
                h("div", { padding: true, class: "about-info" },
                    h("h4", null, "Shipping App"),
                    h("p", null, "O aplicativo Shipping veio para facilitar seu dia-a-dia quando est\u00E1 precisando levar objetos, de todos os tamanhos de um ponto para o outro, com a sele\u00E7\u00E3o dos melhores freteiros da plataforma.")))
        ];
    }
    static get is() { return "page-about"; }
    static get properties() { return {
        "popoverCtrl": {
            "connect": "ion-popover-controller"
        }
    }; }
    static get style() { return "/**style-placeholder:page-about:**/"; }
}
