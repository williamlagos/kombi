import { h } from '../clipper.core.js';

function baseAnimation(AnimationC) {
    return Promise.resolve(new AnimationC()
        .easing('cubic-bezier(0.0, 0.0, 0.2, 1)')
        .easingReverse('cubic-bezier(0.4, 0.0, 0.6, 1)')
        .duration(300));
}

const BOX_SHADOW_WIDTH = 8;
function menuOverlayAnimation(AnimationC, _, menu) {
    let closedX;
    let openedX;
    const width = menu.width + BOX_SHADOW_WIDTH;
    if (menu.isEndSide) {
        closedX = width + 'px';
        openedX = '0px';
    }
    else {
        closedX = -width + 'px';
        openedX = '0px';
    }
    const menuAnimation = new AnimationC()
        .addElement(menu.menuInnerEl)
        .fromTo('translateX', closedX, openedX);
    const backdropAnimation = new AnimationC()
        .addElement(menu.backdropEl)
        .fromTo('opacity', 0.01, 0.32);
    return baseAnimation(AnimationC).then(animation => {
        return animation.add(menuAnimation)
            .add(backdropAnimation);
    });
}

function menuPushAnimation(AnimationC, _, menu) {
    let contentOpenedX;
    let menuClosedX;
    const width = menu.width;
    if (menu.isEndSide) {
        contentOpenedX = -width + 'px';
        menuClosedX = width + 'px';
    }
    else {
        contentOpenedX = width + 'px';
        menuClosedX = -width + 'px';
    }
    const menuAnimation = new AnimationC()
        .addElement(menu.menuInnerEl)
        .fromTo('translateX', menuClosedX, '0px');
    const contentAnimation = new AnimationC()
        .addElement(menu.contentEl)
        .fromTo('translateX', '0px', contentOpenedX);
    const backdropAnimation = new AnimationC()
        .addElement(menu.backdropEl)
        .fromTo('opacity', 0.01, 0.32);
    return baseAnimation(AnimationC).then(animation => {
        return animation.add(menuAnimation)
            .add(backdropAnimation)
            .add(contentAnimation);
    });
}

function menuRevealAnimation(AnimationC, _, menu) {
    const openedX = (menu.width * (menu.isEndSide ? -1 : 1)) + 'px';
    const contentOpen = new AnimationC()
        .addElement(menu.contentEl)
        .fromTo('translateX', '0px', openedX);
    return baseAnimation(AnimationC).then(animation => {
        return animation.add(contentOpen);
    });
}

class MenuController {
    constructor() {
        this.menus = [];
        this.menuAnimations = new Map();
        this.registerAnimation("reveal", menuRevealAnimation);
        this.registerAnimation("push", menuPushAnimation);
        this.registerAnimation("overlay", menuOverlayAnimation);
    }
    async open(menu) {
        const menuEl = await this.get(menu);
        if (menuEl) {
            return menuEl.open();
        }
        return false;
    }
    async close(menu) {
        const menuEl = await (menu !== undefined ? this.get(menu) : this.getOpen());
        if (menuEl !== undefined) {
            return menuEl.close();
        }
        return false;
    }
    async toggle(menu) {
        const menuEl = await this.get(menu);
        if (menuEl) {
            return menuEl.toggle();
        }
        return false;
    }
    async enable(enable, menu) {
        const menuEl = await this.get(menu);
        if (menuEl) {
            menuEl.disabled = !enable;
        }
        return menuEl;
    }
    async swipeGesture(enable, menu) {
        const menuEl = await this.get(menu);
        if (menuEl) {
            menuEl.swipeGesture = enable;
        }
        return menuEl;
    }
    async isOpen(menu) {
        if (menu != null) {
            const menuEl = await this.get(menu);
            return (menuEl !== undefined && menuEl.isOpen());
        }
        else {
            const menuEl = await this.getOpen();
            return menuEl !== undefined;
        }
    }
    async isEnabled(menu) {
        const menuEl = await this.get(menu);
        if (menuEl) {
            return !menuEl.disabled;
        }
        return false;
    }
    async get(menu) {
        await this.waitUntilReady();
        if (menu === "start" || menu === "end") {
            const menuRef = this.find(m => m.side === menu && !m.disabled);
            if (menuRef) {
                return menuRef;
            }
            return this.find(m => m.side === menu);
        }
        else if (menu != null) {
            return this.find(m => m.menuId === menu);
        }
        const menuEl = this.find(m => !m.disabled);
        if (menuEl) {
            return menuEl;
        }
        return this.menus.length > 0 ? this.menus[0].el : undefined;
    }
    async getOpen() {
        await this.waitUntilReady();
        return this.getOpenSync();
    }
    async getMenus() {
        await this.waitUntilReady();
        return this.getMenusSync();
    }
    async isAnimating() {
        await this.waitUntilReady();
        return this.isAnimatingSync();
    }
    registerAnimation(name, animation) {
        this.menuAnimations.set(name, animation);
    }
    _getInstance() {
        return Promise.resolve(this);
    }
    _register(menu) {
        const menus = this.menus;
        if (menus.indexOf(menu) < 0) {
            if (!menu.disabled) {
                this._setActiveMenu(menu);
            }
            menus.push(menu);
        }
    }
    _unregister(menu) {
        const index = this.menus.indexOf(menu);
        if (index > -1) {
            this.menus.splice(index, 1);
        }
    }
    _setActiveMenu(menu) {
        const side = menu.side;
        this.menus
            .filter(m => m.side === side && m !== menu)
            .forEach(m => m.disabled = true);
    }
    async _setOpen(menu, shouldOpen, animated) {
        if (this.isAnimatingSync()) {
            return false;
        }
        if (shouldOpen) {
            const openedMenu = await this.getOpen();
            if (openedMenu && menu.el !== openedMenu) {
                await openedMenu.setOpen(false, false);
            }
        }
        return menu._setOpen(shouldOpen, animated);
    }
    async _createAnimation(type, menuCmp) {
        const animationBuilder = this.menuAnimations.get(type);
        if (!animationBuilder) {
            throw new Error("animation not registered");
        }
        const animation = await import('./chunk-d84dff50.js')
            .then(mod => mod.create(animationBuilder, null, menuCmp));
        if (!this.config.getBoolean("animated", true)) {
            animation.duration(0);
        }
        return animation;
    }
    getOpenSync() {
        return this.find(m => m._isOpen);
    }
    getMenusSync() {
        return this.menus.map(menu => menu.el);
    }
    isAnimatingSync() {
        return this.menus.some(menu => menu.isAnimating);
    }
    find(predicate) {
        const instance = this.menus.find(predicate);
        if (instance !== undefined) {
            return instance.el;
        }
        return undefined;
    }
    waitUntilReady() {
        return Promise.all(Array.from(this.doc.querySelectorAll("ion-menu"))
            .map(menu => menu.componentOnReady()));
    }
    static get is() { return "ion-menu-controller"; }
    static get properties() {
        return {
            "_getInstance": {
                "method": true
            },
            "close": {
                "method": true
            },
            "config": {
                "context": "config"
            },
            "doc": {
                "context": "document"
            },
            "enable": {
                "method": true
            },
            "get": {
                "method": true
            },
            "getMenus": {
                "method": true
            },
            "getOpen": {
                "method": true
            },
            "isAnimating": {
                "method": true
            },
            "isEnabled": {
                "method": true
            },
            "isOpen": {
                "method": true
            },
            "open": {
                "method": true
            },
            "registerAnimation": {
                "method": true
            },
            "swipeGesture": {
                "method": true
            },
            "toggle": {
                "method": true
            }
        };
    }
    static get style() { return ".menu-content{-webkit-transform:translateZ(0);transform:translateZ(0)}.menu-content-open{cursor:pointer;-ms-touch-action:manipulation;touch-action:manipulation;pointer-events:none}.ios .menu-content-reveal{-webkit-box-shadow:-8px 0 42px rgba(0,0,0,.08);box-shadow:-8px 0 42px rgba(0,0,0,.08)}[dir=rtl].ios .menu-content-reveal{-webkit-box-shadow:8px 0 42px rgba(0,0,0,.08);box-shadow:8px 0 42px rgba(0,0,0,.08)}.md .menu-content-push,.md .menu-content-reveal{-webkit-box-shadow:0 2px 22px 0 rgba(0,0,0,.09),4px 0 16px 0 rgba(0,0,0,.18);box-shadow:0 2px 22px 0 rgba(0,0,0,.09),4px 0 16px 0 rgba(0,0,0,.18)}"; }
}

export { MenuController as IonMenuController };
