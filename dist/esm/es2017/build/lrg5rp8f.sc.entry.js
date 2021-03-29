import { h } from '../clipper.core.js';

class List {
    constructor() {
        this.inset = false;
    }
    async closeSlidingItems() {
        const item = this.el.querySelector("ion-item-sliding");
        if (item && item.closeOpened) {
            return item.closeOpened();
        }
        return false;
    }
    hostData() {
        return {
            class: {
                [`${this.mode}`]: true,
                [`list-${this.mode}`]: true,
                "list-inset": this.inset,
                [`list-lines-${this.lines}`]: this.lines !== undefined,
                [`list-${this.mode}-lines-${this.lines}`]: this.lines !== undefined
            }
        };
    }
    static get is() { return "ion-list"; }
    static get properties() {
        return {
            "closeSlidingItems": {
                "method": true
            },
            "el": {
                "elementRef": true
            },
            "inset": {
                "type": Boolean,
                "attr": "inset"
            },
            "lines": {
                "type": String,
                "attr": "lines"
            },
            "mode": {
                "type": String,
                "attr": "mode"
            }
        };
    }
    static get style() { return "ion-list{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;display:block;contain:content;list-style-type:none}ion-list.list-inset{-webkit-transform:translateZ(0);transform:translateZ(0);overflow:hidden}.list-ios{margin-left:0;margin-right:0;margin-top:-1px;margin-bottom:32px;background:var(--ion-item-background,var(--ion-background-color,#fff))}.list-ios.list-inset{margin-left:16px;margin-right:16px;margin-top:16px;margin-bottom:16px;border-radius:4px}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.list-ios.list-inset{margin-left:unset;margin-right:unset;-webkit-margin-start:16px;margin-inline-start:16px;-webkit-margin-end:16px;margin-inline-end:16px}}.list-ios.list-inset ion-item{--border-width:0 0 1px 0;--inner-border-width:0}.list-ios.list-inset ion-item:last-child{--border-width:0;--inner-border-width:0}.list-ios.list-inset+ion-list.list-inset{margin-top:0}.list-ios-lines-none .item{--border-width:0;--inner-border-width:0}.list-ios-lines-full .item,.list-ios .item-lines-full{--border-width:0 0 0.55px 0}.list-ios-lines-full .item{--inner-border-width:0}.list-ios-lines-inset .item,.list-ios .item-lines-inset{--inner-border-width:0 0 0.55px 0}.list-ios .item-lines-inset{--border-width:0}.list-ios .item-lines-full{--inner-border-width:0}.list-ios .item-lines-none{--border-width:0;--inner-border-width:0}"; }
    static get styleMode() { return "ios"; }
}

export { List as IonList };
