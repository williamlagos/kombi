import { h } from '../clipper.core.js';

import { h as now } from './chunk-e658e8b7.js';
import { GESTURE_CONTROLLER } from './chunk-04f0cf95.js';

class Backdrop {
    constructor() {
        this.lastClick = -10000;
        this.blocker = GESTURE_CONTROLLER.createBlocker({
            disableScroll: true
        });
        this.visible = true;
        this.tappable = true;
        this.stopPropagation = true;
    }
    componentDidLoad() {
        if (this.stopPropagation) {
            this.blocker.block();
        }
    }
    componentDidUnload() {
        this.blocker.destroy();
    }
    onTouchStart(ev) {
        this.lastClick = now(ev);
        this.emitTap(ev);
    }
    onMouseDown(ev) {
        if (this.lastClick < now(ev) - 2500) {
            this.emitTap(ev);
        }
    }
    emitTap(ev) {
        if (this.stopPropagation) {
            ev.preventDefault();
            ev.stopPropagation();
        }
        if (this.tappable) {
            this.ionBackdropTap.emit();
        }
    }
    hostData() {
        return {
            tabindex: "-1",
            class: {
                [`${this.mode}`]: true,
                "backdrop-hide": !this.visible,
                "backdrop-no-tappable": !this.tappable,
            }
        };
    }
    static get is() { return "ion-backdrop"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "doc": {
                "context": "document"
            },
            "stopPropagation": {
                "type": Boolean,
                "attr": "stop-propagation"
            },
            "tappable": {
                "type": Boolean,
                "attr": "tappable"
            },
            "visible": {
                "type": Boolean,
                "attr": "visible"
            }
        };
    }
    static get events() {
        return [{
                "name": "ionBackdropTap",
                "method": "ionBackdropTap",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }];
    }
    static get listeners() {
        return [{
                "name": "touchstart",
                "method": "onTouchStart",
                "capture": true
            }, {
                "name": "click",
                "method": "onMouseDown",
                "capture": true
            }, {
                "name": "mousedown",
                "method": "onMouseDown",
                "capture": true
            }];
    }
    static get style() { return ".sc-ion-backdrop-md-h{left:0;right:0;top:0;bottom:0;display:block;position:absolute;-webkit-transform:translateZ(0);transform:translateZ(0);contain:strict;cursor:pointer;opacity:.01;-ms-touch-action:none;touch-action:none;z-index:2}.backdrop-hide.sc-ion-backdrop-md-h{background:transparent}.backdrop-no-tappable.sc-ion-backdrop-md-h{cursor:auto}.sc-ion-backdrop-md-h{background-color:var(--ion-backdrop-color,#000)}"; }
    static get styleMode() { return "md"; }
}

export { Backdrop as IonBackdrop };
