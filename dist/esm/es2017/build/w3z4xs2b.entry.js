import { h } from '../clipper.core.js';

import { b as getClassMap, c as createColorClasses } from './chunk-c82b670d.js';
import { g as BACKDROP, a as present, b as dismiss, c as eventMethod } from './chunk-794673eb.js';

function iosEnterAnimation(AnimationC, baseEl) {
    const baseAnimation = new AnimationC();
    const backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));
    const wrapperAnimation = new AnimationC();
    wrapperAnimation.addElement(baseEl.querySelector('.loading-wrapper'));
    backdropAnimation.fromTo('opacity', 0.01, 0.3);
    wrapperAnimation.fromTo('opacity', 0.01, 1)
        .fromTo('scale', 1.1, 1);
    return Promise.resolve(baseAnimation
        .addElement(baseEl)
        .easing('ease-in-out')
        .duration(200)
        .add(backdropAnimation)
        .add(wrapperAnimation));
}

function iosLeaveAnimation(AnimationC, baseEl) {
    const baseAnimation = new AnimationC();
    const backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));
    const wrapperAnimation = new AnimationC();
    wrapperAnimation.addElement(baseEl.querySelector('.loading-wrapper'));
    backdropAnimation.fromTo('opacity', 0.3, 0);
    wrapperAnimation.fromTo('opacity', 0.99, 0)
        .fromTo('scale', 1, 0.9);
    return Promise.resolve(baseAnimation
        .addElement(baseEl)
        .easing('ease-in-out')
        .duration(200)
        .add(backdropAnimation)
        .add(wrapperAnimation));
}

function mdEnterAnimation(AnimationC, baseEl) {
    const baseAnimation = new AnimationC();
    const backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));
    const wrapperAnimation = new AnimationC();
    wrapperAnimation.addElement(baseEl.querySelector('.loading-wrapper'));
    backdropAnimation.fromTo('opacity', 0.01, 0.32);
    wrapperAnimation.fromTo('opacity', 0.01, 1).fromTo('scale', 1.1, 1);
    return Promise.resolve(baseAnimation
        .addElement(baseEl)
        .easing('ease-in-out')
        .duration(200)
        .add(backdropAnimation)
        .add(wrapperAnimation));
}

function mdLeaveAnimation(AnimationC, baseEl) {
    const baseAnimation = new AnimationC();
    const backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));
    const wrapperAnimation = new AnimationC();
    wrapperAnimation.addElement(baseEl.querySelector('.loading-wrapper'));
    backdropAnimation.fromTo('opacity', 0.32, 0);
    wrapperAnimation.fromTo('opacity', 0.99, 0).fromTo('scale', 1, 0.9);
    return Promise.resolve(baseAnimation
        .addElement(baseEl)
        .easing('ease-in-out')
        .duration(200)
        .add(backdropAnimation)
        .add(wrapperAnimation));
}

class Loading {
    constructor() {
        this.presented = false;
        this.keyboardClose = true;
        this.duration = 0;
        this.backdropDismiss = false;
        this.showBackdrop = true;
        this.translucent = false;
        this.animated = true;
    }
    componentWillLoad() {
        if (this.spinner === undefined) {
            this.spinner = this.config.get("loadingSpinner", this.config.get("spinner", this.mode === "ios" ? "lines" : "crescent"));
        }
    }
    onBackdropTap() {
        this.dismiss(undefined, BACKDROP);
    }
    async present() {
        await present(this, "loadingEnter", iosEnterAnimation, mdEnterAnimation, undefined);
        if (this.duration > 0) {
            this.durationTimeout = setTimeout(() => this.dismiss(), this.duration + 10);
        }
    }
    dismiss(data, role) {
        if (this.durationTimeout) {
            clearTimeout(this.durationTimeout);
        }
        return dismiss(this, data, role, "loadingLeave", iosLeaveAnimation, mdLeaveAnimation);
    }
    onDidDismiss() {
        return eventMethod(this.el, "ionLoadingDidDismiss");
    }
    onWillDismiss() {
        return eventMethod(this.el, "ionLoadingWillDismiss");
    }
    hostData() {
        return {
            style: {
                zIndex: 40000 + this.overlayIndex
            },
            class: Object.assign({}, getClassMap(this.cssClass), { [`${this.mode}`]: true, "loading-translucent": this.translucent })
        };
    }
    render() {
        return [
            h("ion-backdrop", { visible: this.showBackdrop, tappable: this.backdropDismiss }),
            h("div", { class: "loading-wrapper", role: "dialog" }, this.spinner && (h("div", { class: "loading-spinner" }, h("ion-spinner", { name: this.spinner }))), this.message && h("div", { class: "loading-content" }, this.message))
        ];
    }
    static get is() { return "ion-loading"; }
    static get encapsulation() { return "scoped"; }
    static get properties() {
        return {
            "animated": {
                "type": Boolean,
                "attr": "animated"
            },
            "backdropDismiss": {
                "type": Boolean,
                "attr": "backdrop-dismiss"
            },
            "config": {
                "context": "config"
            },
            "cssClass": {
                "type": String,
                "attr": "css-class"
            },
            "dismiss": {
                "method": true
            },
            "duration": {
                "type": Number,
                "attr": "duration"
            },
            "el": {
                "elementRef": true
            },
            "enterAnimation": {
                "type": "Any",
                "attr": "enter-animation"
            },
            "keyboardClose": {
                "type": Boolean,
                "attr": "keyboard-close"
            },
            "leaveAnimation": {
                "type": "Any",
                "attr": "leave-animation"
            },
            "message": {
                "type": String,
                "attr": "message"
            },
            "mode": {
                "type": String,
                "attr": "mode"
            },
            "onDidDismiss": {
                "method": true
            },
            "onWillDismiss": {
                "method": true
            },
            "overlayIndex": {
                "type": Number,
                "attr": "overlay-index"
            },
            "present": {
                "method": true
            },
            "showBackdrop": {
                "type": Boolean,
                "attr": "show-backdrop"
            },
            "spinner": {
                "type": String,
                "attr": "spinner",
                "mutable": true
            },
            "translucent": {
                "type": Boolean,
                "attr": "translucent"
            }
        };
    }
    static get events() {
        return [{
                "name": "ionLoadingDidPresent",
                "method": "didPresent",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionLoadingWillPresent",
                "method": "willPresent",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionLoadingWillDismiss",
                "method": "willDismiss",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionLoadingDidDismiss",
                "method": "didDismiss",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }];
    }
    static get listeners() {
        return [{
                "name": "ionBackdropTap",
                "method": "onBackdropTap"
            }];
    }
    static get style() { return ".sc-ion-loading-ios-h{--min-width:auto;--width:auto;--min-height:auto;--height:auto;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:fixed;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;font-family:var(--ion-font-family,inherit);contain:strict;-ms-touch-action:none;touch-action:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:1000}.overlay-hidden.sc-ion-loading-ios-h{display:none}.loading-wrapper.sc-ion-loading-ios{display:-ms-flexbox;display:flex;-ms-flex-align:inherit;align-items:inherit;-ms-flex-pack:inherit;justify-content:inherit;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);background:var(--background);opacity:0;z-index:10}.spinner-bubbles.sc-ion-loading-ios, .spinner-circles.sc-ion-loading-ios, .spinner-crescent.sc-ion-loading-ios, .spinner-dots.sc-ion-loading-ios, .spinner-lines.sc-ion-loading-ios, .spinner-lines-small.sc-ion-loading-ios{color:var(--spinner-color)}.sc-ion-loading-ios-h{--background:var(--ion-color-step-50,#f2f2f2);--max-width:270px;--max-height:90%;--spinner-color:var(--ion-color-step-600,#666);color:var(--ion-text-color,#000);font-size:14px}.loading-wrapper.sc-ion-loading-ios{border-radius:8px;padding-left:34px;padding-right:34px;padding-top:24px;padding-bottom:24px}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.loading-wrapper.sc-ion-loading-ios{padding-left:unset;padding-right:unset;-webkit-padding-start:34px;padding-inline-start:34px;-webkit-padding-end:34px;padding-inline-end:34px}}.loading-translucent.sc-ion-loading-ios-h   .loading-wrapper.sc-ion-loading-ios{background-color:rgba(var(--ion-background-color-rgb,255,255,255),.8);-webkit-backdrop-filter:saturate(180%) blur(20px);backdrop-filter:saturate(180%) blur(20px)}.loading-content.sc-ion-loading-ios{font-weight:700}.loading-spinner.sc-ion-loading-ios + .loading-content.sc-ion-loading-ios{margin-left:16px}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.loading-spinner.sc-ion-loading-ios + .loading-content.sc-ion-loading-ios{margin-left:unset;-webkit-margin-start:16px;margin-inline-start:16px}}"; }
    static get styleMode() { return "ios"; }
}

const spinners = {
    'lines': {
        dur: 1000,
        lines: 12,
        fn: (dur, index, total) => {
            const transform = `rotate(${30 * index + (index < 6 ? 180 : -180)}deg)`;
            const animationDelay = `${(dur * index / total) - dur}ms`;
            return {
                y1: 17,
                y2: 29,
                style: {
                    'transform': transform,
                    'animation-delay': animationDelay,
                }
            };
        }
    },
    'lines-small': {
        dur: 1000,
        lines: 12,
        fn: (dur, index, total) => {
            const transform = `rotate(${30 * index + (index < 6 ? 180 : -180)}deg)`;
            const animationDelay = `${(dur * index / total) - dur}ms`;
            return {
                y1: 12,
                y2: 20,
                style: {
                    'transform': transform,
                    'animation-delay': animationDelay,
                }
            };
        }
    },
    'bubbles': {
        dur: 1000,
        circles: 9,
        fn: (dur, index, total) => {
            const animationDelay = `${(dur * index / total) - dur}ms`;
            const angle = 2 * Math.PI * index / total;
            return {
                r: 5,
                style: {
                    'top': `${9 * Math.sin(angle)}px`,
                    'left': `${9 * Math.cos(angle)}px`,
                    'animation-delay': animationDelay,
                }
            };
        }
    },
    'circles': {
        dur: 1000,
        circles: 8,
        fn: (dur, index, total) => {
            const step = index / total;
            const animationDelay = `${(dur * step) - dur}ms`;
            const angle = 2 * Math.PI * step;
            return {
                r: 5,
                style: {
                    'top': `${9 * Math.sin(angle)}px`,
                    'left': `${9 * Math.cos(angle)}px`,
                    'animation-delay': animationDelay,
                }
            };
        }
    },
    'crescent': {
        dur: 750,
        circles: 1,
        fn: () => {
            return {
                r: 26,
                style: {}
            };
        }
    },
    'dots': {
        dur: 750,
        circles: 3,
        fn: (_, index) => {
            const animationDelay = -(110 * index) + 'ms';
            return {
                r: 6,
                style: {
                    'left': `${9 - (9 * index)}px`,
                    'animation-delay': animationDelay,
                }
            };
        }
    }
};
const SPINNERS = spinners;

class Spinner {
    constructor() {
        this.paused = false;
    }
    getName() {
        const name = this.name || this.config.get("spinner");
        if (name) {
            return name;
        }
        return (this.mode === "ios") ? "lines" : "crescent";
    }
    hostData() {
        return {
            class: Object.assign({}, createColorClasses(this.color), { [`${this.mode}`]: true, [`spinner-${this.getName()}`]: true, "spinner-paused": !!this.paused || this.config.getBoolean("_testing") })
        };
    }
    render() {
        const name = this.getName();
        const spinner = SPINNERS[name] || SPINNERS["lines"];
        const duration = (typeof this.duration === "number" && this.duration > 10 ? this.duration : spinner.dur);
        const svgs = [];
        if (spinner.circles !== undefined) {
            for (let i = 0; i < spinner.circles; i++) {
                svgs.push(buildCircle(spinner, duration, i, spinner.circles));
            }
        }
        else if (spinner.lines !== undefined) {
            for (let i = 0; i < spinner.lines; i++) {
                svgs.push(buildLine(spinner, duration, i, spinner.lines));
            }
        }
        return svgs;
    }
    static get is() { return "ion-spinner"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "color": {
                "type": String,
                "attr": "color"
            },
            "config": {
                "context": "config"
            },
            "duration": {
                "type": Number,
                "attr": "duration"
            },
            "name": {
                "type": String,
                "attr": "name"
            },
            "paused": {
                "type": Boolean,
                "attr": "paused"
            }
        };
    }
    static get style() { return ":host{display:inline-block;position:relative;width:28px;height:28px;color:var(--color);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}:host(.ion-color){color:var(--ion-color-base)}svg{left:0;top:0;-webkit-transform-origin:center;transform-origin:center;position:absolute;width:100%;height:100%;-webkit-transform:translateZ(0);transform:translateZ(0)}:host-context([dir=rtl]) svg{right:0;-webkit-transform-origin:calc(100% - center);transform-origin:calc(100% - center)}:host(.spinner-lines) line,:host(.spinner-lines-small) line{stroke-width:4px;stroke-linecap:round;stroke:currentColor}:host(.spinner-lines) svg,:host(.spinner-lines-small) svg{-webkit-animation:spinner-fade-out 1s linear infinite;animation:spinner-fade-out 1s linear infinite}:host(.spinner-bubbles) svg{-webkit-animation:spinner-scale-out 1s linear infinite;animation:spinner-scale-out 1s linear infinite;fill:currentColor}:host(.spinner-circles) svg{-webkit-animation:spinner-fade-out 1s linear infinite;animation:spinner-fade-out 1s linear infinite;fill:currentColor}:host(.spinner-crescent) circle{fill:transparent;stroke-width:4px;stroke-dasharray:128px;stroke-dashoffset:82px;stroke:currentColor}:host(.spinner-crescent) svg{-webkit-animation:spinner-rotate 1s linear infinite;animation:spinner-rotate 1s linear infinite}:host(.spinner-dots) circle{stroke-width:0;fill:currentColor}:host(.spinner-dots) svg{-webkit-animation:spinner-dots 1s linear infinite;animation:spinner-dots 1s linear infinite}:host(.spinner-paused) svg{-webkit-animation-play-state:paused;animation-play-state:paused}\@-webkit-keyframes spinner-fade-out{0%{opacity:1}to{opacity:0}}\@keyframes spinner-fade-out{0%{opacity:1}to{opacity:0}}\@-webkit-keyframes spinner-scale-out{0%{-webkit-transform:scale(1);transform:scale(1)}to{-webkit-transform:scale(0);transform:scale(0)}}\@keyframes spinner-scale-out{0%{-webkit-transform:scale(1);transform:scale(1)}to{-webkit-transform:scale(0);transform:scale(0)}}\@-webkit-keyframes spinner-rotate{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}\@keyframes spinner-rotate{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}\@-webkit-keyframes spinner-dots{0%{-webkit-transform:scale(1);transform:scale(1);opacity:.9}50%{-webkit-transform:scale(.4);transform:scale(.4);opacity:.3}to{-webkit-transform:scale(1);transform:scale(1);opacity:.9}}\@keyframes spinner-dots{0%{-webkit-transform:scale(1);transform:scale(1);opacity:.9}50%{-webkit-transform:scale(.4);transform:scale(.4);opacity:.3}to{-webkit-transform:scale(1);transform:scale(1);opacity:.9}}"; }
}
function buildCircle(spinner, duration, index, total) {
    const data = spinner.fn(duration, index, total);
    data.style["animation-duration"] = `${duration}ms`;
    return (h("svg", { viewBox: "0 0 64 64", style: data.style }, h("circle", { transform: "translate(32,32)", r: data.r })));
}
function buildLine(spinner, duration, index, total) {
    const data = spinner.fn(duration, index, total);
    data.style["animation-duration"] = `${duration}ms`;
    return (h("svg", { viewBox: "0 0 64 64", style: data.style }, h("line", { transform: "translate(32,32)", y1: data.y1, y2: data.y2 })));
}

export { Loading as IonLoading, Spinner as IonSpinner };
