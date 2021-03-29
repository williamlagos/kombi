import { h } from '../clipper.core.js';

import { d as createOverlay, e as dismissOverlay, f as getOverlay } from './chunk-794673eb.js';

class PageAbout {
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
    static get style() { return ".about-header{background-color:var(--ion-color-dark);padding:16px;width:100%;text-align:center}.about-header img{max-width:200px;padding:25px 5px 20px 0}.about-info p{color:var(--ion-color-medium);text-align:left}.about-info ion-icon{color:var(--ion-color-primary)}.ios .about-info{text-align:center}"; }
}

class PopoverController {
    create(options) {
        return createOverlay(this.doc.createElement("ion-popover"), options);
    }
    dismiss(data, role, id) {
        return dismissOverlay(this.doc, data, role, "ion-popover", id);
    }
    async getTop() {
        return getOverlay(this.doc, "ion-popover");
    }
    static get is() { return "ion-popover-controller"; }
    static get properties() {
        return {
            "create": {
                "method": true
            },
            "dismiss": {
                "method": true
            },
            "doc": {
                "context": "document"
            },
            "getTop": {
                "method": true
            }
        };
    }
}

export { PageAbout, PopoverController as IonPopoverController };
