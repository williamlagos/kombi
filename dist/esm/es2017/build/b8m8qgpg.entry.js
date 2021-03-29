import { h } from '../clipper.core.js';

class MenuButton {
    constructor() {
        this.autoHide = true;
    }
    hostData() {
        return {
            class: {
                [`${this.mode}`]: true,
                "button": true,
                "ion-activatable": true,
            }
        };
    }
    render() {
        const menuIcon = this.config.get("menuIcon", "menu");
        return (h("ion-menu-toggle", { menu: this.menu, autoHide: this.autoHide }, h("button", { type: "button" }, h("slot", null, h("ion-icon", { icon: menuIcon, mode: this.mode, color: this.color, lazy: false })), this.mode === "md" && h("ion-ripple-effect", { type: "unbounded" }))));
    }
    static get is() { return "ion-menu-button"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "autoHide": {
                "type": Boolean,
                "attr": "auto-hide"
            },
            "color": {
                "type": String,
                "attr": "color"
            },
            "config": {
                "context": "config"
            },
            "menu": {
                "type": String,
                "attr": "menu"
            },
            "mode": {
                "type": String,
                "attr": "mode"
            }
        };
    }
    static get style() { return ":host{--padding-top:0;--padding-bottom:0;color:var(--color);text-align:center;text-decoration:none;text-overflow:ellipsis;text-transform:none;white-space:nowrap;-webkit-font-kerning:none;font-kerning:none}button{font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:var(--padding-start);padding-right:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:-ms-flexbox;display:flex;position:relative;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-ms-flex-negative:0;flex-shrink:0;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;height:32px;border:0;outline:none;background:transparent;line-height:1;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:0;-webkit-appearance:none;-moz-appearance:none;appearance:none}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){button{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end)}}ion-icon{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;pointer-events:none}:host(.ion-color) .button-native{color:var(--ion-color-base)}:host{--color:initial;--padding-start:8px;--padding-end:8px}ion-icon{font-size:26px}"; }
    static get styleMode() { return "md"; }
}

export { MenuButton as IonMenuButton };
