import { h } from '../clipper.core.js';

import './chunk-c46efb37.js';
import { b as showMyOrders$1 } from './chunk-b29ff8f0.js';
import { a as close } from './chunk-fe10219c.js';
import { i as isEndSide } from './chunk-e658e8b7.js';
import { c as createColorClasses } from './chunk-c82b670d.js';
import { d as createOverlay, e as dismissOverlay, f as getOverlay } from './chunk-794673eb.js';
import { a as showMyOrders, f as selectOrder, b as cancelOrder, g as startOrder } from './chunk-3c944ae9.js';
import { a as ConferenceData, b as UserData } from './chunk-f41ac15c.js';

class PageSchedule {
    constructor() {
        this.excludeTracks = [];
        this.dayIndex = 0;
        this.groups = [];
        this.shownSessions = [];
        this.segment = 'awaiting';
        this.queryText = '';
        this.orders = [];
        this.scheduleOrders = [];
        this.awaitingOrders = [];
        this.slided = false;
    }
    async componentWillLoad() {
        this.updateSchedule();
        this.store.mapStateToProps(this, (state) => {
            const { session: { token } } = state;
            return { token };
        });
        this.store.mapDispatchToProps(this, { close });
        this.role = this.parseJwt(this.token)['_role'];
        if (this.role === 'MERCHANT') {
            this.store.mapStateToProps(this, (state) => {
                const { merchant: { orders } } = state;
                return { orders };
            });
            this.store.mapDispatchToProps(this, { showMyOrders, selectOrder, cancelOrder, startOrder });
        }
        else if (this.role === 'CUSTOMER') {
            this.store.mapStateToProps(this, (state) => {
                const { customer: { orders } } = state;
                return { orders };
            });
            this.store.mapDispatchToProps(this, { showCustomerOrders: showMyOrders$1, cancelOrder });
        }
        await this.populateOrders();
    }
    componentDidLoad() {
        this.scheduleList = this.el.querySelector('#scheduleList');
        this.fab = this.el.querySelector('#socialFab');
    }
    async populateOrders() {
        this.role === 'MERCHANT' ? await this.showMyOrders(this.token) : await this.showCustomerOrders(this.token);
        this.scheduleOrders = this.orders.filter((order) => order.status === 'accepted');
        this.awaitingOrders = this.orders.filter((order) => order.status === 'awaiting_for_confirmation');
    }
    parseJwt(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(window.atob(base64));
    }
    segmentChanged(event) {
        this.segment = event.target.value;
        this.updateSchedule();
    }
    searchbarChanged(event) {
        this.queryText = event.target.value;
        console.log(this.queryText);
        this.updateSchedule();
    }
    modalDidDismiss(event) {
        if (event) {
            this.excludeTracks = event.detail.data;
            this.updateSchedule();
        }
    }
    loadingWillDismiss() {
        this.fab.close();
    }
    async updateSchedule() {
        const data = await ConferenceData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment);
        this.shownSessions = data.shownSessions;
        this.groups = data.groups;
        this.el.forceUpdate();
    }
    async presentFilter() {
        const modal = await this.modalCtrl.create({
            component: 'page-schedule-filter',
            componentProps: {
                excludedTracks: this.excludeTracks,
            }
        });
        await modal.present();
    }
    async cancelCurrentOrder(orderId) {
        await this.cancelOrder(orderId, this.token);
        await this.populateOrders();
        const tabs = await this.tab.componentOnReady();
        tabs.select('tab-drawer');
        this.close();
    }
    async startCurrentOrder(orderId) {
        await this.startOrder(orderId, this.token);
        const tabs = await this.tab.componentOnReady();
        tabs.select('tab-drawer');
        this.close();
    }
    async confirmOrder(orderId) {
        const alert = await this.alertCtrl.create({
            header: 'Confirmar o frete para o horário?',
            buttons: [
                {
                    text: 'Cancelar',
                    handler: () => {
                    }
                },
                {
                    text: 'Confirmar',
                    handler: async () => {
                        this.selectOrder(orderId, this.token);
                        await this.populateOrders();
                    }
                }
            ]
        });
        alert.present();
    }
    async removeFavorite(session, title) {
        const alert = await this.alertCtrl.create({
            header: title,
            message: 'Would you like to remove this session from your favorites?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: () => {
                    }
                },
                {
                    text: 'Remove',
                    handler: () => {
                        UserData.removeFavorite(session.name);
                        this.updateSchedule();
                    }
                }
            ]
        });
        alert.present();
    }
    async openSocial(social) {
        this.toggleList();
        const loading = await this.loadingCtrl.create({
            message: `Posting to ${social}`,
            duration: (Math.random() * 1000) + 500
        });
        await loading.present();
    }
    toggleList() {
        const fabButton = this.fab.querySelector('ion-fab-button');
        fabButton.activated = !fabButton.activated;
        const fabList = this.fab.querySelector('ion-fab-list');
        fabList.activated = !fabList.activated;
    }
    async toggleSlide(sliderId) {
        const slider = document.getElementById(sliderId);
        !this.slided ? await slider.open('end') : await slider.close();
        this.slided = !this.slided;
    }
    render() {
        return [
            h("ion-header", { class: "aligned" },
                h("ion-toolbar", { class: "aligned" },
                    h("ion-buttons", { slot: "start" },
                        h("ion-menu-button", null)),
                    h("ion-segment", { class: "aligned", value: this.segment },
                        h("ion-segment-button", { value: "awaiting" }, "Aguardando"),
                        h("ion-segment-button", { value: "schedule" }, "Agendados")),
                    h("ion-buttons", { slot: "end" }))),
            h("ion-content", null,
                h("ion-list", { id: "scheduleList", hidden: this.shownSessions === 0 }, (this.segment === 'awaiting' ? this.awaitingOrders : this.scheduleOrders).map((order) => h("ion-item-group", null,
                    h("ion-item-sliding", { class: "item-sliding-track", id: order._id, onClick: () => this.toggleSlide(order._id) },
                        h("ion-item-options", { side: "start" }, order.status === 'accepted' && (h("ion-item-option", { color: "danger", onClick: () => this.cancelCurrentOrder(order._id) }, "Cancelar"))),
                        h("ion-item", { class: "item-sliding-track-trabalho", href: "#" },
                            h("ion-label", null,
                                h("h3", null, order.job.destination.address.street + ' ' + order.job.destination.address.number),
                                h("p", null,
                                    " ",
                                    order.job.scheduledTo,
                                    " - ",
                                    order.job.origin.address.street + ' ' + order.job.origin.address.number))),
                        h("ion-item-options", { side: "end" }, this.role === 'MERCHANT' && (order.status === 'awaiting_for_confirmation' ? (h("ion-item-option", { color: "favorite", onClick: () => this.confirmOrder(order._id) }, "Confirmar")) : (h("ion-item-option", { color: "tertiary", onClick: () => this.startCurrentOrder(order._id) }, "Come\u00E7ar")))))))),
                h("ion-list-header", { hidden: (this.segment === 'awaiting' ? this.awaitingOrders : this.scheduleOrders).length > 0 }, "N\u00E3o h\u00E1 sess\u00F5es encontradas"))
        ];
    }
    static get is() { return "page-schedule"; }
    static get properties() { return {
        "alertCtrl": {
            "connect": "ion-alert-controller"
        },
        "awaitingOrders": {
            "state": true
        },
        "config": {
            "context": "config"
        },
        "el": {
            "elementRef": true
        },
        "groups": {
            "state": true
        },
        "loadingCtrl": {
            "connect": "ion-loading-controller"
        },
        "modalCtrl": {
            "connect": "ion-modal-controller"
        },
        "orders": {
            "state": true
        },
        "queryText": {
            "state": true
        },
        "role": {
            "state": true
        },
        "scheduleOrders": {
            "state": true
        },
        "segment": {
            "state": true
        },
        "shownSessions": {
            "state": true
        },
        "slided": {
            "state": true
        },
        "store": {
            "context": "store"
        },
        "tab": {
            "connect": "ion-tabs"
        },
        "token": {
            "state": true
        }
    }; }
    static get listeners() { return [{
            "name": "ionChange",
            "method": "segmentChanged"
        }, {
            "name": "ionInput",
            "method": "searchbarChanged"
        }, {
            "name": "body:ionModalDidDismiss",
            "method": "modalDidDismiss"
        }, {
            "name": "body:ionLoadingWillDismiss",
            "method": "loadingWillDismiss"
        }]; }
    static get style() { return ".ion-item-divider.sticky{position:sticky;position:-webkit-sticky;top:0}.item-sliding-track ion-label{border-left:2px solid transparent;padding-left:10px}.item-sliding-track-trabalho ion-label{border-left-color:var(--ion-color-primary)}.item-sliding-track-jantar ion-label{border-left-color:var(--ion-color-angular)}.item-sliding-track-quarto ion-label{border-left-color:var(--ion-color-communication)}.item-sliding-track-cozinha ion-label{border-left-color:var(--ion-color-tooling)}.item-sliding-track-lazer ion-label{border-left-color:var(--ion-color-services)}.item-sliding-track-living ion-label{border-left-color:var(--ion-color-design)}.item-sliding-track-oficina ion-label{border-left-color:var(--ion-color-workshop)}.item-sliding-track-comida ion-label{border-left-color:var(--ion-color-food)}.item-sliding-track-biblioteca ion-label{border-left-color:var(--ion-color-documentation)}.item-sliding-track-comercial ion-label{border-left-color:var(--ion-color-navigation)}.aligned{min-height:56px}"; }
}

class ItemGroup {
    hostData() {
        return {
            "role": "group",
            class: {
                [`${this.mode}`]: true,
                [`item-group-${this.mode}`]: true,
                "item": true
            }
        };
    }
    static get is() { return "ion-item-group"; }
    static get style() { return "ion-item-group{display:block}.item-group-ios ion-item-sliding:last-child .item,.item-group-ios ion-item:last-child{--border-width:0}"; }
    static get styleMode() { return "ios"; }
}

class ItemOption {
    constructor() {
        this.disabled = false;
        this.expandable = false;
    }
    onClick(ev) {
        const el = ev.target.closest("ion-item-option");
        if (el) {
            ev.preventDefault();
        }
    }
    hostData() {
        const { disabled, expandable } = this;
        return {
            class: Object.assign({}, createColorClasses(this.color), { [`${this.mode}`]: true, "item-option-disabled": disabled, "item-option-expandable": expandable, "ion-activatable": true })
        };
    }
    render() {
        const TagType = this.href === undefined ? "button" : "a";
        return (h(TagType, { type: "button", class: "button-native", disabled: this.disabled, href: this.href }, h("span", { class: "button-inner" }, h("slot", { name: "top" }), h("div", { class: "horizontal-wrapper" }, h("slot", { name: "start" }), h("slot", { name: "icon-only" }), h("slot", null), h("slot", { name: "end" })), h("slot", { name: "bottom" })), this.mode === "md" && h("ion-ripple-effect", null)));
    }
    static get is() { return "ion-item-option"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "color": {
                "type": String,
                "attr": "color"
            },
            "disabled": {
                "type": Boolean,
                "attr": "disabled"
            },
            "el": {
                "elementRef": true
            },
            "expandable": {
                "type": Boolean,
                "attr": "expandable"
            },
            "href": {
                "type": String,
                "attr": "href"
            },
            "mode": {
                "type": String,
                "attr": "mode"
            }
        };
    }
    static get listeners() {
        return [{
                "name": "click",
                "method": "onClick"
            }];
    }
    static get style() { return ":host{--background:var(--ion-color-primary,#3880ff);--color:var(--ion-color-primary-contrast,#fff);background:var(--background);color:var(--color);font-family:var(--ion-font-family,inherit)}:host(.in-list.item-options-end:last-child){padding-right:calc(.7em + var(--ion-safe-area-right))}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host(.in-list.item-options-end:last-child){padding-right:unset;-webkit-padding-end:calc(.7em + var(--ion-safe-area-right));padding-inline-end:calc(.7em + var(--ion-safe-area-right))}}:host(.in-list.item-options-start:first-child){padding-left:calc(.7em + var(--ion-safe-area-left))}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host(.in-list.item-options-start:first-child){padding-left:unset;-webkit-padding-start:calc(.7em + var(--ion-safe-area-left));padding-inline-start:calc(.7em + var(--ion-safe-area-left))}}:host(.ion-color){background:var(--ion-color-base);color:var(--ion-color-contrast)}.button-native{font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;padding-left:.7em;padding-right:.7em;padding-top:0;padding-bottom:0;display:inline-block;position:relative;width:100%;height:100%;border:0;outline:none;background:transparent;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;-webkit-box-sizing:border-box;box-sizing:border-box}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.button-native{padding-left:unset;padding-right:unset;-webkit-padding-start:.7em;padding-inline-start:.7em;-webkit-padding-end:.7em;padding-inline-end:.7em}}.button-inner{-ms-flex-flow:column nowrap;flex-flow:column nowrap;height:100%}.button-inner,.horizontal-wrapper{display:-ms-flexbox;display:flex;-ms-flex-negative:0;flex-shrink:0;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%}.horizontal-wrapper{-ms-flex-flow:row nowrap;flex-flow:row nowrap}::slotted(*){-ms-flex-negative:0;flex-shrink:0}::slotted([slot=start]){margin-left:0;margin-right:5px;margin-top:0;margin-bottom:0}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){::slotted([slot=start]){margin-left:unset;margin-right:unset;-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:5px;margin-inline-end:5px}}::slotted([slot=end]){margin-left:5px;margin-right:0;margin-top:0;margin-bottom:0}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){::slotted([slot=end]){margin-left:unset;margin-right:unset;-webkit-margin-start:5px;margin-inline-start:5px;-webkit-margin-end:0;margin-inline-end:0}}::slotted([slot=icon-only]){padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;margin-left:10px;margin-right:10px;margin-top:0;margin-bottom:0;min-width:.9em;font-size:1.8em}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){::slotted([slot=icon-only]){margin-left:unset;margin-right:unset;-webkit-margin-start:10px;margin-inline-start:10px;-webkit-margin-end:10px;margin-inline-end:10px}}:host(.item-option-expandable){-ms-flex-negative:0;flex-shrink:0;-webkit-transition-duration:0;transition-duration:0;-webkit-transition-property:none;transition-property:none;-webkit-transition-timing-function:cubic-bezier(.65,.05,.36,1);transition-timing-function:cubic-bezier(.65,.05,.36,1)}:host(.item-option-disabled){pointer-events:none}:host(.item-option-disabled) .button-native{cursor:default;opacity:.5;pointer-events:none}:host{font-size:16px}:host(.activated){background:var(--ion-color-primary-shade,#3171e0)}:host(.ion-color.activated){background:var(--ion-color-shade)}"; }
    static get styleMode() { return "ios"; }
}

class ItemOptions {
    constructor() {
        this.side = "end";
    }
    fireSwipeEvent() {
        this.ionSwipe.emit({
            side: this.side
        });
    }
    hostData() {
        const isEnd = isEndSide(this.win, this.side);
        return {
            class: {
                [`${this.mode}`]: true,
                [`item-options-${this.mode}`]: true,
                "item-options-start": !isEnd,
                "item-options-end": isEnd
            }
        };
    }
    static get is() { return "ion-item-options"; }
    static get properties() {
        return {
            "el": {
                "elementRef": true
            },
            "fireSwipeEvent": {
                "method": true
            },
            "side": {
                "type": String,
                "attr": "side"
            },
            "win": {
                "context": "window"
            }
        };
    }
    static get events() {
        return [{
                "name": "ionSwipe",
                "method": "ionSwipe",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }];
    }
    static get style() { return "ion-item-options{top:0;right:0;-ms-flex-pack:end;justify-content:flex-end;display:none;position:absolute;height:100%;font-size:14px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:1}:host-context([dir=rtl]) ion-item-options{-ms-flex-pack:start;justify-content:flex-start}:host-context([dir=rtl]) ion-item-options:not(.item-options-end){right:auto;left:0;-ms-flex-pack:end;justify-content:flex-end}.item-options-start{right:auto;left:0;-ms-flex-pack:start;justify-content:flex-start}:host-context([dir=rtl]) .item-options-start{-ms-flex-pack:end;justify-content:flex-end}.item-options-start ion-item-option:first-child{padding-right:var(--ion-safe-area-left)}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.item-options-start ion-item-option:first-child{padding-right:unset;-webkit-padding-end:var(--ion-safe-area-left);padding-inline-end:var(--ion-safe-area-left)}}.item-options-end ion-item-option:last-child{padding-right:var(--ion-safe-area-right)}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.item-options-end ion-item-option:last-child{padding-right:unset;-webkit-padding-end:var(--ion-safe-area-right);padding-inline-end:var(--ion-safe-area-right)}}:host-context([dir=rtl]) .item-sliding-active-slide.item-sliding-active-options-start ion-item-options:not(.item-options-end){width:100%;visibility:visible}.item-sliding-active-slide ion-item-options{display:-ms-flexbox;display:flex;visibility:hidden}.item-sliding-active-slide.item-sliding-active-options-end ion-item-options:not(.item-options-start),.item-sliding-active-slide.item-sliding-active-options-start .item-options-start{width:100%;visibility:visible}.item-options-ios{border-bottom-width:0;border-bottom-style:solid;border-bottom-color:var(--ion-item-border-color,var(--ion-border-color,var(--ion-color-step-150,#c8c7cc)))}.item-options-ios.item-options-end{border-bottom-width:.55px}.list-ios-lines-none .item-options-ios{border-bottom-width:0}.list-ios-lines-full .item-options-ios,.list-ios-lines-inset .item-options-ios.item-options-end{border-bottom-width:.55px}"; }
    static get styleMode() { return "ios"; }
}

const SWIPE_MARGIN = 30;
const ELASTIC_FACTOR = 0.55;
let openSlidingItem;
class ItemSliding {
    constructor() {
        this.item = null;
        this.openAmount = 0;
        this.initialOpenAmount = 0;
        this.optsWidthRightSide = 0;
        this.optsWidthLeftSide = 0;
        this.sides = 0;
        this.optsDirty = true;
        this.state = 2;
        this.disabled = false;
    }
    disabledChanged() {
        if (this.gesture) {
            this.gesture.setDisabled(this.disabled);
        }
    }
    async componentDidLoad() {
        this.item = this.el.querySelector("ion-item");
        await this.updateOptions();
        this.gesture = (await import('./chunk-04f0cf95.js')).createGesture({
            el: this.el,
            queue: this.queue,
            gestureName: "item-swipe",
            gesturePriority: 100,
            threshold: 5,
            canStart: () => this.canStart(),
            onStart: () => this.onStart(),
            onMove: ev => this.onMove(ev),
            onEnd: ev => this.onEnd(ev),
        });
        this.disabledChanged();
    }
    componentDidUnload() {
        if (this.gesture) {
            this.gesture.destroy();
            this.gesture = undefined;
        }
        this.item = null;
        this.leftOptions = this.rightOptions = undefined;
        if (openSlidingItem === this.el) {
            openSlidingItem = undefined;
        }
    }
    getOpenAmount() {
        return Promise.resolve(this.openAmount);
    }
    getSlidingRatio() {
        return Promise.resolve(this.getSlidingRatioSync());
    }
    async open(side) {
        if (this.item === null) {
            return;
        }
        const optionsToOpen = this.getOptions(side);
        if (!optionsToOpen) {
            return;
        }
        if (side === undefined) {
            side = (optionsToOpen === this.leftOptions) ? "start" : "end";
        }
        const isStartOpen = this.openAmount < 0;
        const isEndOpen = this.openAmount > 0;
        if (isStartOpen && optionsToOpen === this.leftOptions) {
            return;
        }
        if (isEndOpen && optionsToOpen === this.rightOptions) {
            return;
        }
        this.closeOpened();
        this.state = 4;
        requestAnimationFrame(() => {
            this.calculateOptsWidth();
            const width = (side === "end") ? this.optsWidthRightSide : -this.optsWidthLeftSide;
            openSlidingItem = this.el;
            this.setOpenAmount(width, false);
            this.state = (side === "end") ? 8 : 16;
        });
    }
    async close() {
        this.setOpenAmount(0, true);
    }
    async closeOpened() {
        if (openSlidingItem !== undefined) {
            openSlidingItem.close();
            openSlidingItem = undefined;
            return true;
        }
        return false;
    }
    getOptions(side) {
        if (side === undefined) {
            return this.leftOptions || this.rightOptions;
        }
        else if (side === "start") {
            return this.leftOptions;
        }
        else {
            return this.rightOptions;
        }
    }
    async updateOptions() {
        const options = this.el.querySelectorAll("ion-item-options");
        let sides = 0;
        this.leftOptions = this.rightOptions = undefined;
        for (let i = 0; i < options.length; i++) {
            const option = await options.item(i).componentOnReady();
            if (option.side === "start") {
                this.leftOptions = option;
                sides |= 1;
            }
            else {
                this.rightOptions = option;
                sides |= 2;
            }
        }
        this.optsDirty = true;
        this.sides = sides;
    }
    canStart() {
        const selected = openSlidingItem;
        if (selected && selected !== this.el) {
            this.closeOpened();
            return false;
        }
        return !!(this.rightOptions || this.leftOptions);
    }
    onStart() {
        openSlidingItem = this.el;
        if (this.tmr !== undefined) {
            clearTimeout(this.tmr);
            this.tmr = undefined;
        }
        if (this.openAmount === 0) {
            this.optsDirty = true;
            this.state = 4;
        }
        this.initialOpenAmount = this.openAmount;
        if (this.item) {
            this.item.style.transition = "none";
        }
    }
    onMove(gesture) {
        if (this.optsDirty) {
            this.calculateOptsWidth();
        }
        let openAmount = this.initialOpenAmount - gesture.deltaX;
        switch (this.sides) {
            case 2:
                openAmount = Math.max(0, openAmount);
                break;
            case 1:
                openAmount = Math.min(0, openAmount);
                break;
            case 3: break;
            case 0: return;
            default:
                console.warn("invalid ItemSideFlags value", this.sides);
                break;
        }
        let optsWidth;
        if (openAmount > this.optsWidthRightSide) {
            optsWidth = this.optsWidthRightSide;
            openAmount = optsWidth + (openAmount - optsWidth) * ELASTIC_FACTOR;
        }
        else if (openAmount < -this.optsWidthLeftSide) {
            optsWidth = -this.optsWidthLeftSide;
            openAmount = optsWidth + (openAmount - optsWidth) * ELASTIC_FACTOR;
        }
        this.setOpenAmount(openAmount, false);
    }
    onEnd(gesture) {
        const velocity = gesture.velocityX;
        let restingPoint = (this.openAmount > 0)
            ? this.optsWidthRightSide
            : -this.optsWidthLeftSide;
        const isResetDirection = (this.openAmount > 0) === !(velocity < 0);
        const isMovingFast = Math.abs(velocity) > 0.3;
        const isOnCloseZone = Math.abs(this.openAmount) < Math.abs(restingPoint / 2);
        if (swipeShouldReset(isResetDirection, isMovingFast, isOnCloseZone)) {
            restingPoint = 0;
        }
        const state = this.state;
        this.setOpenAmount(restingPoint, true);
        if ((state & 32) !== 0 && this.rightOptions) {
            this.rightOptions.fireSwipeEvent();
        }
        else if ((state & 64) !== 0 && this.leftOptions) {
            this.leftOptions.fireSwipeEvent();
        }
    }
    calculateOptsWidth() {
        this.optsWidthRightSide = 0;
        if (this.rightOptions) {
            this.rightOptions.style.display = "flex";
            this.optsWidthRightSide = this.rightOptions.offsetWidth;
            this.rightOptions.style.display = "";
        }
        this.optsWidthLeftSide = 0;
        if (this.leftOptions) {
            this.leftOptions.style.display = "flex";
            this.optsWidthLeftSide = this.leftOptions.offsetWidth;
            this.leftOptions.style.display = "";
        }
        this.optsDirty = false;
    }
    setOpenAmount(openAmount, isFinal) {
        if (this.tmr !== undefined) {
            clearTimeout(this.tmr);
            this.tmr = undefined;
        }
        if (!this.item) {
            return;
        }
        const style = this.item.style;
        this.openAmount = openAmount;
        if (isFinal) {
            style.transition = "";
        }
        if (openAmount > 0) {
            this.state = (openAmount >= (this.optsWidthRightSide + SWIPE_MARGIN))
                ? 8 | 32
                : 8;
        }
        else if (openAmount < 0) {
            this.state = (openAmount <= (-this.optsWidthLeftSide - SWIPE_MARGIN))
                ? 16 | 64
                : 16;
        }
        else {
            this.tmr = setTimeout(() => {
                this.state = 2;
                this.tmr = undefined;
            }, 600);
            openSlidingItem = undefined;
            style.transform = "";
            return;
        }
        style.transform = `translate3d(${-openAmount}px,0,0)`;
        this.ionDrag.emit({
            amount: openAmount,
            ratio: this.getSlidingRatioSync()
        });
    }
    getSlidingRatioSync() {
        if (this.openAmount > 0) {
            return this.openAmount / this.optsWidthRightSide;
        }
        else if (this.openAmount < 0) {
            return this.openAmount / this.optsWidthLeftSide;
        }
        else {
            return 0;
        }
    }
    hostData() {
        return {
            class: {
                [`${this.mode}`]: true,
                "item-sliding-active-slide": (this.state !== 2),
                "item-sliding-active-options-end": (this.state & 8) !== 0,
                "item-sliding-active-options-start": (this.state & 16) !== 0,
                "item-sliding-active-swipe-end": (this.state & 32) !== 0,
                "item-sliding-active-swipe-start": (this.state & 64) !== 0
            }
        };
    }
    static get is() { return "ion-item-sliding"; }
    static get properties() {
        return {
            "close": {
                "method": true
            },
            "closeOpened": {
                "method": true
            },
            "disabled": {
                "type": Boolean,
                "attr": "disabled",
                "watchCallbacks": ["disabledChanged"]
            },
            "el": {
                "elementRef": true
            },
            "getOpenAmount": {
                "method": true
            },
            "getSlidingRatio": {
                "method": true
            },
            "open": {
                "method": true
            },
            "queue": {
                "context": "queue"
            },
            "state": {
                "state": true
            }
        };
    }
    static get events() {
        return [{
                "name": "ionDrag",
                "method": "ionDrag",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }];
    }
    static get style() { return "ion-item-sliding{display:block;position:relative;width:100%;overflow:hidden}ion-item-sliding,ion-item-sliding .item{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.item-sliding-active-slide .item{position:relative;-webkit-transition:-webkit-transform .5s cubic-bezier(.36,.66,.04,1);transition:-webkit-transform .5s cubic-bezier(.36,.66,.04,1);transition:transform .5s cubic-bezier(.36,.66,.04,1);transition:transform .5s cubic-bezier(.36,.66,.04,1),-webkit-transform .5s cubic-bezier(.36,.66,.04,1);opacity:1;z-index:2;pointer-events:none;will-change:transform}.item-sliding-active-swipe-end .item-options-end .item-option-expandable{padding-left:100%;-ms-flex-order:1;order:1;-webkit-transition-duration:.6s;transition-duration:.6s;-webkit-transition-property:padding-left;transition-property:padding-left}:host-context([dir=rtl]) .item-sliding-active-swipe-end .item-options-end .item-option-expandable{-ms-flex-order:-1;order:-1}.item-sliding-active-swipe-start .item-options-start .item-option-expandable{padding-right:100%;-ms-flex-order:-1;order:-1;-webkit-transition-duration:.6s;transition-duration:.6s;-webkit-transition-property:padding-right;transition-property:padding-right}:host-context([dir=rtl]) .item-sliding-active-swipe-start .item-options-start .item-option-expandable{-ms-flex-order:1;order:1}"; }
}
function swipeShouldReset(isResetDirection, isMovingFast, isOnResetZone) {
    return (!isMovingFast && isOnResetZone) || (isResetDirection && isMovingFast);
}

class LoadingController {
    create(options) {
        return createOverlay(this.doc.createElement("ion-loading"), options);
    }
    dismiss(data, role, id) {
        return dismissOverlay(this.doc, data, role, "ion-loading", id);
    }
    async getTop() {
        return getOverlay(this.doc, "ion-loading");
    }
    static get is() { return "ion-loading-controller"; }
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

class Segment {
    constructor() {
        this.disabled = false;
        this.scrollable = false;
    }
    valueChanged(value) {
        this.updateButtons();
        this.ionChange.emit({ value });
    }
    segmentClick(ev) {
        const selectedButton = ev.target;
        this.value = selectedButton.value;
    }
    componentWillLoad() {
        this.emitStyle();
    }
    componentDidLoad() {
        if (this.value == null) {
            const checked = this.getButtons().find(b => b.checked);
            if (checked) {
                this.value = checked.value;
            }
        }
        this.updateButtons();
    }
    emitStyle() {
        this.ionStyle.emit({
            "segment": true
        });
    }
    updateButtons() {
        const value = this.value;
        for (const button of this.getButtons()) {
            button.checked = (button.value === value);
        }
    }
    getButtons() {
        return Array.from(this.el.querySelectorAll("ion-segment-button"));
    }
    hostData() {
        return {
            class: Object.assign({}, createColorClasses(this.color), { [`${this.mode}`]: true, "segment-disabled": this.disabled, "segment-scrollable": this.scrollable })
        };
    }
    static get is() { return "ion-segment"; }
    static get encapsulation() { return "scoped"; }
    static get properties() {
        return {
            "color": {
                "type": String,
                "attr": "color"
            },
            "disabled": {
                "type": Boolean,
                "attr": "disabled"
            },
            "el": {
                "elementRef": true
            },
            "mode": {
                "type": String,
                "attr": "mode"
            },
            "scrollable": {
                "type": Boolean,
                "attr": "scrollable"
            },
            "value": {
                "type": String,
                "attr": "value",
                "mutable": true,
                "watchCallbacks": ["valueChanged"]
            }
        };
    }
    static get events() {
        return [{
                "name": "ionChange",
                "method": "ionChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionStyle",
                "method": "ionStyle",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }];
    }
    static get listeners() {
        return [{
                "name": "ionSelect",
                "method": "segmentClick"
            }];
    }
    static get style() { return ".sc-ion-segment-ios-h{--indicator-color-checked:initial;--ripple-color:initial;--color-activated:initial;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:-ms-flexbox;display:flex;-ms-flex-align:stretch;align-items:stretch;-ms-flex-pack:center;justify-content:center;width:100%;font-family:var(--ion-font-family,inherit);text-align:center}.sc-ion-segment-ios-s > .segment-button-disabled, .segment-disabled.sc-ion-segment-ios-h{pointer-events:none}.segment-scrollable.sc-ion-segment-ios-h{-ms-flex-pack:start;justify-content:start;width:auto;overflow-x:scroll}.segment-scrollable.sc-ion-segment-ios-h::-webkit-scrollbar{display:none}.sc-ion-segment-ios-h{--background:transparent;--background-hover:rgba(var(--ion-color-primary-rgb,56,128,255),0.1);--background-activated:rgba(var(--ion-color-primary-rgb,56,128,255),0.16);--background-checked:var(--ion-color-primary,#3880ff);--color:var(--ion-color-primary,#3880ff);--color-checked:var(--ion-color-primary-contrast,#fff);--color-disabled:rgba(var(--ion-color-primary-rgb,56,128,255),0.3);--color-checked-disabled:rgba(var(--ion-color-primary-contrast-rgb,255,255,255),0.3);--border-color:var(--ion-color-primary,#3880ff);--indicator-color:transparent}.segment-disabled.sc-ion-segment-ios-h{opacity:.3}.sc-ion-segment-ios-h.ion-color.sc-ion-segment-ios-s > ion-segment-button{--border-color:var(--ion-color-base);--background-hover:rgba(var(--ion-color-base-rgb),0.04);background:transparent;color:var(--ion-color-base)}.sc-ion-segment-ios-h.ion-color.sc-ion-segment-ios-s > .activated{background:rgba(var(--ion-color-base-rgb),.16);color:var(--ion-color-base)}.sc-ion-segment-ios-h.ion-color.sc-ion-segment-ios-s > .segment-button-checked, .sc-ion-segment-ios-h.ion-color.sc-ion-segment-ios-s > .segment-button-checked.activated{background:var(--ion-color-base);color:var(--ion-color-contrast)}.sc-ion-segment-ios-h.ion-color.sc-ion-segment-ios-s > .segment-button-disabled{color:rgba(var(--ion-color-base-rgb),.3)}.sc-ion-segment-ios-h.ion-color.sc-ion-segment-ios-s > .segment-button-checked.segment-button-disabled{color:rgba(var(--ion-color-contrast-rgb),.3)}.sc-ion-segment-ios-hion-toolbar.sc-ion-segment-ios-s > ion-segment-button, ion-toolbar .sc-ion-segment-ios-h.sc-ion-segment-ios-s > ion-segment-button{max-width:100px;font-size:12px;line-height:22px}.sc-ion-segment-ios-hion-toolbar:not(.ion-color).sc-ion-segment-ios-s > ion-segment-button, ion-toolbar .sc-ion-segment-ios-h:not(.ion-color).sc-ion-segment-ios-s > ion-segment-button{border-color:var(--ion-toolbar-color-checked,var(--border-color));color:var(--ion-toolbar-color-unchecked,var(--color))}.sc-ion-segment-ios-hion-toolbar:not(.ion-color).sc-ion-segment-ios-s > .segment-button-checked, ion-toolbar .sc-ion-segment-ios-h:not(.ion-color).sc-ion-segment-ios-s > .segment-button-checked{color:var(--ion-toolbar-color-checked,var(--color-checked))}.sc-ion-segment-ios-hion-toolbar.ion-color:not(.ion-color).sc-ion-segment-ios-s > ion-segment-button, ion-toolbar.ion-color .sc-ion-segment-ios-h:not(.ion-color).sc-ion-segment-ios-s > ion-segment-button{--color:var(--ion-color-contrast);--color-disabled:rgba(var(--ion-color-contrast-rgb),0.3);--color-checked:var(--ion-color-base);--color-checked-disabled:rgba(var(--ion-color-contrast-rgb),0.3);--background-hover:rgba(var(--ion-color-contrast-rgb),0.1);--background-activated:rgba(var(--ion-color-contrast-rgb),0.16);--background-checked:var(--ion-color-contrast);--border-color:var(--ion-color-contrast)}"; }
    static get styleMode() { return "ios"; }
}

let ids = 0;
class SegmentButton {
    constructor() {
        this.checked = false;
        this.disabled = false;
        this.layout = "icon-top";
        this.value = "ion-sb-" + (ids++);
    }
    checkedChanged(checked, prev) {
        if (checked && !prev) {
            this.ionSelect.emit();
        }
    }
    onClick() {
        this.checked = true;
    }
    get hasLabel() {
        return !!this.el.querySelector("ion-label");
    }
    get hasIcon() {
        return !!this.el.querySelector("ion-icon");
    }
    hostData() {
        const { checked, disabled, hasIcon, hasLabel, layout } = this;
        return {
            "aria-disabled": disabled ? "true" : null,
            class: {
                [`${this.mode}`]: true,
                "segment-button-has-label": hasLabel,
                "segment-button-has-icon": hasIcon,
                "segment-button-has-label-only": hasLabel && !hasIcon,
                "segment-button-has-icon-only": hasIcon && !hasLabel,
                "segment-button-disabled": disabled,
                "segment-button-checked": checked,
                [`segment-button-layout-${layout}`]: true,
                "ion-activatable": true,
                "ion-activatable-instant": true,
            }
        };
    }
    render() {
        return [
            h("button", { type: "button", "aria-pressed": this.checked ? "true" : null, class: "button-native", disabled: this.disabled }, h("slot", null), this.mode === "md" && h("ion-ripple-effect", null)),
            h("div", { class: "segment-button-indicator" })
        ];
    }
    static get is() { return "ion-segment-button"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "checked": {
                "type": Boolean,
                "attr": "checked",
                "mutable": true,
                "watchCallbacks": ["checkedChanged"]
            },
            "disabled": {
                "type": Boolean,
                "attr": "disabled"
            },
            "el": {
                "elementRef": true
            },
            "layout": {
                "type": String,
                "attr": "layout"
            },
            "mode": {
                "type": String,
                "attr": "mode"
            },
            "value": {
                "type": String,
                "attr": "value"
            }
        };
    }
    static get events() {
        return [{
                "name": "ionSelect",
                "method": "ionSelect",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }];
    }
    static get listeners() {
        return [{
                "name": "click",
                "method": "onClick"
            }];
    }
    static get style() { return ":host{--padding-start:0;--padding-end:0;--padding-top:0;--padding-bottom:0;display:-ms-flexbox;display:flex;-ms-flex:1 0 auto;flex:1 0 auto;-ms-flex-direction:column;flex-direction:column;height:auto;border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);color:var(--color);text-decoration:none;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;-webkit-font-kerning:none;font-kerning:none}:host(:first-of-type){border-top-left-radius:var(--border-radius);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:var(--border-radius)}:host([dir=rtl]:first-of-type){border-top-left-radius:0;border-top-right-radius:var(--border-radius);border-bottom-right-radius:var(--border-radius);border-bottom-left-radius:0}:host(:not(:first-of-type)){border-left-width:0}:host(:last-of-type){border-top-left-radius:0;border-top-right-radius:var(--border-radius);border-bottom-right-radius:var(--border-radius);border-bottom-left-radius:0}:host([dir=rtl]:last-of-type){border-top-left-radius:var(--border-radius);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:var(--border-radius)}.button-native{border-radius:inherit;font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;margin-left:var(--margin-start);margin-right:var(--margin-end);margin-top:var(--margin-top);margin-bottom:var(--margin-bottom);padding-left:var(--padding-start);padding-right:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);display:-ms-flexbox;display:flex;position:relative;-ms-flex-direction:inherit;flex-direction:inherit;-ms-flex-positive:1;flex-grow:1;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;min-width:inherit;max-width:inherit;height:auto;min-height:inherit;max-height:inherit;-webkit-transition:var(--transition);transition:var(--transition);border:none;outline:none;background:transparent;contain:content;cursor:pointer}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.button-native{margin-left:unset;margin-right:unset;-webkit-margin-start:var(--margin-start);margin-inline-start:var(--margin-start);-webkit-margin-end:var(--margin-end);margin-inline-end:var(--margin-end);padding-left:unset;padding-right:unset;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end)}}.segment-button-indicator{-ms-flex-item-align:end;align-self:flex-end;width:100%;height:2px;background-color:var(--indicator-color);opacity:1}:host(.segment-button-checked){background:var(--background-checked);color:var(--color-checked)}:host(.segment-button-checked) .segment-button-indicator{background-color:var(--indicator-color-checked,var(--color-checked))}:host(.activated){color:var(--color-activated,var(--color))}:host(.segment-button-disabled){color:var(--color-disabled)}:host(.segment-button-disabled.segment-button-checked){color:var(--color-checked-disabled)}::slotted(ion-icon){-ms-flex-order:-1;order:-1}::slotted(ion-label){display:block;-ms-flex-item-align:center;align-self:center;line-height:22px;text-overflow:ellipsis;white-space:nowrap;-webkit-box-sizing:border-box;box-sizing:border-box}:host(.segment-button-layout-icon-start) .button-native{-ms-flex-direction:row;flex-direction:row}:host(.segment-button-layout-icon-end) .button-native{-ms-flex-direction:row-reverse;flex-direction:row-reverse}:host(.segment-button-layout-icon-bottom) .button-native{-ms-flex-direction:column-reverse;flex-direction:column-reverse}:host(.segment-button-layout-icon-hide) ::slotted(ion-icon),:host(.segment-button-layout-label-hide) ::slotted(ion-label){display:none}ion-ripple-effect{color:var(--ripple-color,var(--color-checked))}:host{--border-radius:4px;--border-width:1px;--border-style:solid;--transition:100ms all linear;min-height:24px;font-size:13px;line-height:37px}.segment-button-indicator{display:none}::slotted(ion-icon){font-size:24px}:host(.segment-button-layout-icon-start) ::slotted(ion-label){margin-left:2px;margin-right:0}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host(.segment-button-layout-icon-start) ::slotted(ion-label){margin-left:unset;margin-right:unset;-webkit-margin-start:2px;margin-inline-start:2px;-webkit-margin-end:0;margin-inline-end:0}}:host(.segment-button-layout-icon-end) ::slotted(ion-label){margin-left:0;margin-right:2px}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host(.segment-button-layout-icon-end) ::slotted(ion-label){margin-left:unset;margin-right:unset;-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:2px;margin-inline-end:2px}}\@media (any-hover:hover){:host(:hover:not(.segment-button-checked)){background:var(--background-hover)}}:host(.activated){background:var(--background-activated)}:host(.segment-button-checked.activated){background:var(--background-checked);color:var(--color-checked)}"; }
    static get styleMode() { return "ios"; }
}

export { PageSchedule, ItemGroup as IonItemGroup, ItemOption as IonItemOption, ItemOptions as IonItemOptions, ItemSliding as IonItemSliding, LoadingController as IonLoadingController, Segment as IonSegment, SegmentButton as IonSegmentButton };
