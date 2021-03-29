import { h } from '../clipper.core.js';

import { i as isEndSide, g as assert } from './chunk-e658e8b7.js';
import { GESTURE_CONTROLLER } from './chunk-04f0cf95.js';

class Menu {
    constructor() {
        this.lastOnEnd = 0;
        this.blocker = GESTURE_CONTROLLER.createBlocker({ disableScroll: true });
        this.isAnimating = false;
        this._isOpen = false;
        this.isPaneVisible = false;
        this.isEndSide = false;
        this.disabled = false;
        this.side = "start";
        this.swipeGesture = true;
        this.maxEdgeStart = 50;
    }
    typeChanged(type, oldType) {
        const contentEl = this.contentEl;
        if (contentEl) {
            if (oldType !== undefined) {
                contentEl.classList.remove(`menu-content-${oldType}`);
            }
            contentEl.classList.add(`menu-content-${type}`);
            contentEl.removeAttribute("style");
        }
        if (this.menuInnerEl) {
            this.menuInnerEl.removeAttribute("style");
        }
        this.animation = undefined;
    }
    disabledChanged() {
        this.updateState();
        this.ionMenuChange.emit({
            disabled: this.disabled,
            open: this._isOpen
        });
    }
    sideChanged() {
        this.isEndSide = isEndSide(this.win, this.side);
    }
    swipeGestureChanged() {
        this.updateState();
    }
    async componentWillLoad() {
        if (this.type === undefined) {
            this.type = this.config.get("menuType", this.mode === "ios" ? "reveal" : "overlay");
        }
        if (this.isServer) {
            this.disabled = true;
            return;
        }
        const menuCtrl = this.menuCtrl = await this.lazyMenuCtrl.componentOnReady().then(p => p._getInstance());
        const el = this.el;
        const parent = el.parentNode;
        const content = this.contentId !== undefined
            ? this.doc.getElementById(this.contentId)
            : parent && parent.querySelector && parent.querySelector("[main]");
        if (!content || !content.tagName) {
            console.error("Menu: must have a \"content\" element to listen for drag events on.");
            return;
        }
        this.contentEl = content;
        content.classList.add("menu-content");
        this.typeChanged(this.type, undefined);
        this.sideChanged();
        menuCtrl._register(this);
        this.gesture = (await import('./chunk-04f0cf95.js')).createGesture({
            el: this.doc,
            queue: this.queue,
            gestureName: "menu-swipe",
            gesturePriority: 30,
            threshold: 10,
            canStart: ev => this.canStart(ev),
            onWillStart: () => this.onWillStart(),
            onStart: () => this.onStart(),
            onMove: ev => this.onMove(ev),
            onEnd: ev => this.onEnd(ev),
        });
        this.updateState();
    }
    componentDidLoad() {
        this.ionMenuChange.emit({ disabled: this.disabled, open: this._isOpen });
    }
    componentDidUnload() {
        this.blocker.destroy();
        this.menuCtrl._unregister(this);
        if (this.animation) {
            this.animation.destroy();
        }
        if (this.gesture) {
            this.gesture.destroy();
            this.gesture = undefined;
        }
        this.animation = undefined;
        this.contentEl = this.backdropEl = this.menuInnerEl = undefined;
    }
    onSplitPaneChanged(ev) {
        this.isPaneVisible = ev.detail.isPane(this.el);
        this.updateState();
    }
    onBackdropClick(ev) {
        if (this.lastOnEnd < ev.timeStamp - 100) {
            const shouldClose = (ev.composedPath)
                ? !ev.composedPath().includes(this.menuInnerEl)
                : false;
            if (shouldClose) {
                ev.preventDefault();
                ev.stopPropagation();
                this.close();
            }
        }
    }
    isOpen() {
        return Promise.resolve(this._isOpen);
    }
    isActive() {
        return Promise.resolve(this._isActive());
    }
    open(animated = true) {
        return this.setOpen(true, animated);
    }
    close(animated = true) {
        return this.setOpen(false, animated);
    }
    toggle(animated = true) {
        return this.setOpen(!this._isOpen, animated);
    }
    setOpen(shouldOpen, animated = true) {
        return this.menuCtrl._setOpen(this, shouldOpen, animated);
    }
    async _setOpen(shouldOpen, animated = true) {
        if (!this._isActive() || this.isAnimating || shouldOpen === this._isOpen) {
            return false;
        }
        this.beforeAnimation(shouldOpen);
        await this.loadAnimation();
        await this.startAnimation(shouldOpen, animated);
        this.afterAnimation(shouldOpen);
        return true;
    }
    async loadAnimation() {
        const width = this.menuInnerEl.offsetWidth;
        if (width === this.width && this.animation !== undefined) {
            return;
        }
        this.width = width;
        if (this.animation) {
            this.animation.destroy();
            this.animation = undefined;
        }
        this.animation = await this.menuCtrl._createAnimation(this.type, this);
    }
    async startAnimation(shouldOpen, animated) {
        const ani = this.animation.reverse(!shouldOpen);
        if (animated) {
            await ani.playAsync();
        }
        else {
            ani.playSync();
        }
    }
    _isActive() {
        return !this.disabled && !this.isPaneVisible;
    }
    canSwipe() {
        return this.swipeGesture && !this.isAnimating && this._isActive();
    }
    canStart(detail) {
        if (!this.canSwipe()) {
            return false;
        }
        if (this._isOpen) {
            return true;
        }
        else if (this.menuCtrl.getOpenSync()) {
            return false;
        }
        return checkEdgeSide(this.win, detail.currentX, this.isEndSide, this.maxEdgeStart);
    }
    onWillStart() {
        this.beforeAnimation(!this._isOpen);
        return this.loadAnimation();
    }
    onStart() {
        if (!this.isAnimating || !this.animation) {
            assert(false, "isAnimating has to be true");
            return;
        }
        this.animation.reverse(this._isOpen).progressStart();
    }
    onMove(detail) {
        if (!this.isAnimating || !this.animation) {
            assert(false, "isAnimating has to be true");
            return;
        }
        const delta = computeDelta(detail.deltaX, this._isOpen, this.isEndSide);
        const stepValue = delta / this.width;
        this.animation.progressStep(stepValue);
    }
    onEnd(detail) {
        if (!this.isAnimating || !this.animation) {
            assert(false, "isAnimating has to be true");
            return;
        }
        const isOpen = this._isOpen;
        const isEndSide = this.isEndSide;
        const delta = computeDelta(detail.deltaX, isOpen, isEndSide);
        const width = this.width;
        const stepValue = delta / width;
        const velocity = detail.velocityX;
        const z = width / 2;
        const shouldCompleteRight = velocity >= 0 && (velocity > 0.2 || detail.deltaX > z);
        const shouldCompleteLeft = velocity <= 0 && (velocity < -0.2 || detail.deltaX < -z);
        const shouldComplete = isOpen
            ? isEndSide ? shouldCompleteRight : shouldCompleteLeft
            : isEndSide ? shouldCompleteLeft : shouldCompleteRight;
        let shouldOpen = !isOpen && shouldComplete;
        if (isOpen && !shouldComplete) {
            shouldOpen = true;
        }
        const missing = shouldComplete ? 1 - stepValue : stepValue;
        const missingDistance = missing * width;
        let realDur = 0;
        if (missingDistance > 5) {
            const dur = missingDistance / Math.abs(velocity);
            realDur = Math.min(dur, 300);
        }
        this.lastOnEnd = detail.timeStamp;
        this.animation
            .onFinish(() => this.afterAnimation(shouldOpen), {
            clearExistingCallbacks: true,
            oneTimeCallback: true
        })
            .progressEnd(shouldComplete, stepValue, realDur);
    }
    beforeAnimation(shouldOpen) {
        assert(!this.isAnimating, "_before() should not be called while animating");
        this.el.classList.add(SHOW_MENU);
        if (this.backdropEl) {
            this.backdropEl.classList.add(SHOW_BACKDROP);
        }
        this.blocker.block();
        this.isAnimating = true;
        if (shouldOpen) {
            this.ionWillOpen.emit();
        }
        else {
            this.ionWillClose.emit();
        }
    }
    afterAnimation(isOpen) {
        assert(this.isAnimating, "_before() should be called while animating");
        this._isOpen = isOpen;
        this.isAnimating = false;
        if (!this._isOpen) {
            this.blocker.unblock();
        }
        this.enableListener(this, "click", isOpen);
        if (isOpen) {
            if (this.contentEl) {
                this.contentEl.classList.add(MENU_CONTENT_OPEN);
            }
            this.ionDidOpen.emit();
        }
        else {
            this.el.classList.remove(SHOW_MENU);
            if (this.contentEl) {
                this.contentEl.classList.remove(MENU_CONTENT_OPEN);
            }
            if (this.backdropEl) {
                this.backdropEl.classList.remove(SHOW_BACKDROP);
            }
            this.ionDidClose.emit();
        }
    }
    updateState() {
        const isActive = this._isActive();
        if (this.gesture) {
            this.gesture.setDisabled(!isActive || !this.swipeGesture);
        }
        if (!isActive && this._isOpen) {
            this.forceClosing();
        }
        if (!this.disabled && this.menuCtrl) {
            this.menuCtrl._setActiveMenu(this);
        }
        assert(!this.isAnimating, "can not be animating");
    }
    forceClosing() {
        assert(this._isOpen, "menu cannot be closed");
        this.isAnimating = true;
        const ani = this.animation.reverse(true);
        ani.playSync();
        this.afterAnimation(false);
    }
    hostData() {
        const { isEndSide, type, disabled, isPaneVisible } = this;
        return {
            role: "complementary",
            class: {
                [`${this.mode}`]: true,
                [`menu-type-${type}`]: true,
                "menu-enabled": !disabled,
                "menu-side-end": isEndSide,
                "menu-side-start": !isEndSide,
                "menu-pane-visible": isPaneVisible
            }
        };
    }
    render() {
        return [
            h("div", { class: "menu-inner", ref: el => this.menuInnerEl = el }, h("slot", null)),
            h("ion-backdrop", { ref: el => this.backdropEl = el, class: "menu-backdrop", tappable: false, stopPropagation: false })
        ];
    }
    static get is() { return "ion-menu"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "close": {
                "method": true
            },
            "config": {
                "context": "config"
            },
            "contentId": {
                "type": String,
                "attr": "content-id"
            },
            "disabled": {
                "type": Boolean,
                "attr": "disabled",
                "mutable": true,
                "watchCallbacks": ["disabledChanged"]
            },
            "doc": {
                "context": "document"
            },
            "el": {
                "elementRef": true
            },
            "enableListener": {
                "context": "enableListener"
            },
            "isActive": {
                "method": true
            },
            "isEndSide": {
                "state": true
            },
            "isOpen": {
                "method": true
            },
            "isPaneVisible": {
                "state": true
            },
            "isServer": {
                "context": "isServer"
            },
            "lazyMenuCtrl": {
                "connect": "ion-menu-controller"
            },
            "maxEdgeStart": {
                "type": Number,
                "attr": "max-edge-start"
            },
            "menuId": {
                "type": String,
                "attr": "menu-id"
            },
            "open": {
                "method": true
            },
            "queue": {
                "context": "queue"
            },
            "setOpen": {
                "method": true
            },
            "side": {
                "type": String,
                "attr": "side",
                "reflectToAttr": true,
                "watchCallbacks": ["sideChanged"]
            },
            "swipeGesture": {
                "type": Boolean,
                "attr": "swipe-gesture",
                "watchCallbacks": ["swipeGestureChanged"]
            },
            "toggle": {
                "method": true
            },
            "type": {
                "type": String,
                "attr": "type",
                "mutable": true,
                "watchCallbacks": ["typeChanged"]
            },
            "win": {
                "context": "window"
            }
        };
    }
    static get events() {
        return [{
                "name": "ionWillOpen",
                "method": "ionWillOpen",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionWillClose",
                "method": "ionWillClose",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionDidOpen",
                "method": "ionDidOpen",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionDidClose",
                "method": "ionDidClose",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionMenuChange",
                "method": "ionMenuChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }];
    }
    static get listeners() {
        return [{
                "name": "body:ionSplitPaneVisible",
                "method": "onSplitPaneChanged"
            }, {
                "name": "click",
                "method": "onBackdropClick",
                "capture": true,
                "disabled": true
            }];
    }
    static get style() { return ".sc-ion-menu-ios-h{--width:304px;--min-width:auto;--max-width:auto;--height:100%;--min-height:auto;--max-height:auto;--background:var(--ion-background-color,#fff);left:0;right:0;top:0;bottom:0;display:none;position:absolute;contain:strict}.show-menu.sc-ion-menu-ios-h{display:block}.menu-inner.sc-ion-menu-ios{left:0;right:auto;top:0;bottom:0;-webkit-transform:translate3d(-9999px,0,0);transform:translate3d(-9999px,0,0);display:-ms-flexbox;display:flex;position:absolute;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:justify;justify-content:space-between;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);background:var(--background);contain:strict}[dir=rtl].sc-ion-menu-ios-h   .menu-inner.sc-ion-menu-ios, [dir=rtl]   .sc-ion-menu-ios-h   .menu-inner.sc-ion-menu-ios{left:auto;right:0;-webkit-transform:translate3d(calc(-1 * -9999px),0,0);transform:translate3d(calc(-1 * -9999px),0,0)}.menu-side-start.sc-ion-menu-ios-h   .menu-inner.sc-ion-menu-ios{--ion-safe-area-right:0px;right:auto;left:0}.menu-side-end.sc-ion-menu-ios-h   .menu-inner.sc-ion-menu-ios{--ion-safe-area-left:0px;right:0;left:auto}ion-backdrop.sc-ion-menu-ios{display:none;opacity:.01;z-index:-1}\@media (max-width:340px){.menu-inner.sc-ion-menu-ios{--width:264px}}.menu-type-reveal.sc-ion-menu-ios-h{z-index:0}.menu-type-reveal.show-menu.sc-ion-menu-ios-h   .menu-inner.sc-ion-menu-ios{-webkit-transform:translateZ(0);transform:translateZ(0)}.menu-type-overlay.sc-ion-menu-ios-h{z-index:80}.menu-type-overlay.sc-ion-menu-ios-h   .show-backdrop.sc-ion-menu-ios{display:block;cursor:pointer}.menu-pane-visible.sc-ion-menu-ios-h   .menu-inner.sc-ion-menu-ios{left:0;right:0;width:auto;-webkit-transform:none!important;transform:none!important;-webkit-box-shadow:none!important;box-shadow:none!important}.menu-pane-visible.sc-ion-menu-ios-h   ion-backdrop.sc-ion-menu-ios{display:hidden!important}.menu-type-push.sc-ion-menu-ios-h{z-index:80}.menu-type-push.sc-ion-menu-ios-h   .show-backdrop.sc-ion-menu-ios{display:block}"; }
    static get styleMode() { return "ios"; }
}
function computeDelta(deltaX, isOpen, isEndSide) {
    return Math.max(0, isOpen !== isEndSide ? -deltaX : deltaX);
}
function checkEdgeSide(win, posX, isEndSide, maxEdgeStart) {
    if (isEndSide) {
        return posX >= win.innerWidth - maxEdgeStart;
    }
    else {
        return posX <= maxEdgeStart;
    }
}
const SHOW_MENU = "show-menu";
const SHOW_BACKDROP = "show-backdrop";
const MENU_CONTENT_OPEN = "menu-content-open";

class MenuToggle {
    constructor() {
        this.visible = false;
        this.autoHide = true;
    }
    componentDidLoad() {
        return this.updateVisibility();
    }
    async onClick() {
        const menuCtrl = await getMenuController(this.doc);
        if (menuCtrl) {
            const menu = await menuCtrl.get(this.menu);
            if (menu) {
                menuCtrl.toggle(this.menu);
            }
        }
    }
    async updateVisibility() {
        const menuCtrl = await getMenuController(this.doc);
        if (menuCtrl) {
            const menu = await menuCtrl.get(this.menu);
            if (menu && await menu.isActive()) {
                this.visible = true;
                return;
            }
        }
        this.visible = false;
    }
    hostData() {
        const hidden = this.autoHide && !this.visible;
        return {
            "aria-hidden": hidden ? "true" : null,
            class: {
                [`${this.mode}`]: true,
                "menu-toggle-hidden": hidden,
            }
        };
    }
    render() {
        return h("slot", null);
    }
    static get is() { return "ion-menu-toggle"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "autoHide": {
                "type": Boolean,
                "attr": "auto-hide"
            },
            "doc": {
                "context": "document"
            },
            "menu": {
                "type": String,
                "attr": "menu"
            },
            "visible": {
                "state": true
            }
        };
    }
    static get listeners() {
        return [{
                "name": "click",
                "method": "onClick"
            }, {
                "name": "body:ionMenuChange",
                "method": "updateVisibility"
            }, {
                "name": "body:ionSplitPaneVisible",
                "method": "updateVisibility"
            }];
    }
    static get style() { return ".menu-toggle-hidden.sc-ion-menu-toggle-h{display:none}"; }
}
function getMenuController(doc) {
    const menuControllerElement = doc.querySelector("ion-menu-controller");
    if (!menuControllerElement) {
        return Promise.resolve(undefined);
    }
    return menuControllerElement.componentOnReady();
}

export { Menu as IonMenu, MenuToggle as IonMenuToggle };
