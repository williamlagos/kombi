import { h } from '../clipper.core.js';

import { e as hasShadowDom, f as debounceEvent, b as findItemLabel, g as assert, d as rIC } from './chunk-e658e8b7.js';
import { d as openURL, c as createColorClasses, a as hostContext } from './chunk-c82b670d.js';
import { d as createOverlay, e as dismissOverlay, f as getOverlay } from './chunk-794673eb.js';
import { a as isPlatform } from './chunk-3beb47a5.js';
import { a as attachComponent, b as lifecycle, c as LIFECYCLE_WILL_UNLOAD, d as LIFECYCLE_WILL_LEAVE, e as LIFECYCLE_DID_LEAVE, f as transition, g as setPageHidden } from './chunk-0844be35.js';

class Carousel {
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
    static get style() { return "generic-carousel ion-toolbar{--background:transparent!important;--border-color:transparent!important}generic-carousel .swiper-slide{display:block}generic-carousel .slide-title{margin-top:2.8rem}generic-carousel .slide-image-container{height:150px}\@media (min-width:400px){generic-carousel .slide-image-container{height:400px}}generic-carousel .slide-image{max-width:60%;margin:36px 0}generic-carousel b{font-weight:500}generic-carousel p{padding:0 40px;font-size:14px;line-height:1.5;color:var(--ion-color-medium)}generic-carousel p b{color:#000}generic-carousel{height:100%;width:100%}"; }
}

class Wizard {
    constructor() {
        this.step = 1;
        this.submitted = false;
        this.needSignup = false;
    }
    next(e) {
        e.preventDefault();
        this.step += 1;
        this.step %= this.steps + 1;
    }
    back(e) {
        e.preventDefault();
        this.step -= 1;
        this.step %= this.steps + 1;
    }
    submit(e) {
        e.preventDefault();
        this.action(e);
    }
    render() {
        const s = [];
        for (let i = 1; i <= this.steps; i++)
            s.push(i);
        return (h("form", { id: this.id, method: "POST", action: "#", novalidate: true },
            h("ion-list", { "no-lines": true }, s.map((step) => (this.step === step ?
                h("div", null,
                    h("slot", { name: 'step-' + step })) :
                h("div", { style: { display: 'none' } },
                    h("slot", { name: 'step-' + step }))))),
            h("div", { style: { 'display': 'flex' }, padding: true },
                this.step > 1 && h("ion-button", { style: { 'flex': '1' }, onClick: (e) => this.back(e), color: "primary", expand: "block" }, "Voltar"),
                this.step === this.steps && h("ion-button", { style: { 'flex': '1' }, onClick: (e) => this.submit(e), color: "primary", expand: "block" }, "Registrar"),
                this.step < this.steps && h("ion-button", { style: { 'flex': '1' }, onClick: (e) => this.next(e), color: "primary", expand: "block" }, "Pr\u00F3ximo"))));
    }
    static get is() { return "generic-wizard"; }
    static get properties() { return {
        "action": {
            "type": "Any",
            "attr": "action"
        },
        "id": {
            "type": String,
            "attr": "id"
        },
        "images": {
            "type": "Any",
            "attr": "images"
        },
        "needSignup": {
            "state": true
        },
        "step": {
            "state": true
        },
        "steps": {
            "type": Number,
            "attr": "steps"
        },
        "submitted": {
            "state": true
        }
    }; }
    static get style() { return "generic-wizard{width:100%;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}generic-wizard form{width:100%}"; }
}

const MAX_UPLOAD_SIZE = 1024;
const ALLOWED_FILE_TYPES = 'image.*';
class Uploader {
    constructor() {
        this.index = 0;
        this.list = [];
    }
    reset() {
        let imagePreviewContainer;
        imagePreviewContainer = this.elementHost.shadowRoot.querySelector('#preview0');
        imagePreviewContainer.style.background = `white`;
        this.list = [];
    }
    onInputChange(files) {
        if (files.length >= 1) {
            for (let i = 0; i < files.length; i++) {
                const imageFile = files[i];
                if (!this.checkFileSize(imageFile.size)) {
                    console.error('Maximum file size exceeded. Max file size is: ' + MAX_UPLOAD_SIZE);
                    return false;
                }
                else if (!this.checkFileType(imageFile.type)) {
                    console.error('File type is not allowed');
                    return false;
                }
                this.uploadImage(imageFile);
            }
            this.list = [];
            this.index = 0;
            this.previews = files;
            for (let i = 0; i < files.length; i++)
                this.list.push(i);
            this.send(files);
        }
        else {
            console.error(files.length === 0 ? 'NO IMAGE UPLOADED' : 'YOU CAN ONLY UPLOAD ONE IMAGE AT THE TIME');
            return false;
        }
    }
    uploadImage(file) {
        const reader = new FileReader();
        reader.onloadstart = () => {
        };
        reader.onload = () => {
            let imagePreviewContainer;
            imagePreviewContainer = this.elementHost.shadowRoot.querySelector('#preview' + this.index);
            imagePreviewContainer.style.backgroundImage = `url(${reader.result})`;
            this.index++;
            this.onUploadCompleted.emit(file);
        };
        reader.onloadend = () => {
        };
        reader.onerror = (err) => {
            console.error('something went wrong...', err);
        };
        reader.readAsDataURL(file);
    }
    checkFileSize(size) {
        return (size / MAX_UPLOAD_SIZE / MAX_UPLOAD_SIZE) <= MAX_UPLOAD_SIZE;
    }
    checkFileType(type) {
        return type.match(ALLOWED_FILE_TYPES).length > 0;
    }
    render() {
        return h("div", { class: "image-upload" },
            h("div", { class: "image-upload__edit" },
                h("label", { htmlFor: "file" }),
                h("input", { type: "file", name: "files[]", value: "", id: "file", accept: "image/*", class: "image-upload__input", onChange: ($event) => this.onInputChange($event.target.files), multiple: true })),
            this.list.length > 0 ?
                this.list.map((preview) => {
                    return (h("div", { class: "image-upload__multiple-preview" },
                        h("div", { id: 'preview' + preview })));
                }) :
                h("div", { class: "image-upload__multiple-preview" },
                    h("div", { id: 'preview0' })));
    }
    static get is() { return "image-uploader"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "elementHost": {
            "elementRef": true
        },
        "index": {
            "state": true
        },
        "list": {
            "state": true
        },
        "previews": {
            "state": true
        },
        "reset": {
            "method": true
        },
        "send": {
            "type": "Any",
            "attr": "send"
        }
    }; }
    static get events() { return [{
            "name": "onUploadCompleted",
            "method": "onUploadCompleted",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ".image-upload,image-uploader{min-width:100%}.image-upload{position:relative;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;margin:1em auto}.image-upload__edit{position:absolute;top:-9px;right:-9px;z-index:1}.image-upload__edit input,.image-upload__edit label{width:34px;height:34px}.image-upload__edit label{display:block;color:#fff;background:#000;border:1px solid transparent;border-radius:100%;-webkit-box-shadow:0 2px 4px 0 rgba(0,0,0,.12);box-shadow:0 2px 4px 0 rgba(0,0,0,.12);cursor:pointer;font-weight:400;-webkit-transition:all .2s ease-in-out;transition:all .2s ease-in-out;z-index:1}.image-upload__edit label:hover{background:#fff;color:#000;border-color:#d6d6d6}label:active{background:red}.image-upload__edit label:after{content:\"✎\";position:absolute;top:10px;left:0;right:0;margin:auto;text-align:center}.image-upload__edit input{position:absolute;left:0;top:0;right:0;bottom:0;opacity:0;width:0;height:100%}.image-upload__preview{width:192px;height:192px;border-radius:100%;border:6px solid #f8f8f8;-webkit-box-shadow:0 2px 4px 0 rgba(0,0,0,.1);box-shadow:0 2px 4px 0 rgba(0,0,0,.1)}.image-upload__multiple-preview{width:80px;height:80px;border-radius:8px;border:6px solid #fff;-webkit-box-shadow:0 2px 4px 0 rgba(0,0,0,.2);box-shadow:0 2px 4px 0 rgba(0,0,0,.2);margin:5px}.image-upload__multiple-preview>div,.image-upload__preview>div{height:100%;width:100%;background-size:cover;background-repeat:no-repeat;background-position:50%}#preview0{background:url(assets/img/flatcube.svg);background-size:cover;background-repeat:no-repeat;background-position:50%}"; }
}

class AlertController {
    create(options) {
        return createOverlay(this.doc.createElement("ion-alert"), options);
    }
    dismiss(data, role, id) {
        return dismissOverlay(this.doc, data, role, "ion-alert", id);
    }
    async getTop() {
        return getOverlay(this.doc, "ion-alert");
    }
    static get is() { return "ion-alert-controller"; }
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

class BackButton {
    async onClick(ev) {
        const nav = this.el.closest("ion-nav");
        ev.preventDefault();
        if (nav && await nav.canGoBack()) {
            return nav.pop({ skipIfBusy: true });
        }
        return openURL(this.win, this.defaultHref, ev, "back");
    }
    hostData() {
        const showBackButton = this.defaultHref !== undefined;
        return {
            class: Object.assign({}, createColorClasses(this.color), { [`${this.mode}`]: true, "button": true, "ion-activatable": true, "show-back-button": showBackButton })
        };
    }
    render() {
        const defaultBackButtonText = this.mode === "ios" ? "Back" : null;
        const backButtonIcon = this.icon != null ? this.icon : this.config.get("backButtonIcon", "arrow-back");
        const backButtonText = this.text != null ? this.text : this.config.get("backButtonText", defaultBackButtonText);
        return (h("button", { type: "button", class: "button-native" }, h("span", { class: "button-inner" }, backButtonIcon && h("ion-icon", { icon: backButtonIcon, lazy: false }), backButtonText && h("span", { class: "button-text" }, backButtonText)), this.mode === "md" && h("ion-ripple-effect", { type: "unbounded" })));
    }
    static get is() { return "ion-back-button"; }
    static get encapsulation() { return "scoped"; }
    static get properties() {
        return {
            "color": {
                "type": String,
                "attr": "color"
            },
            "config": {
                "context": "config"
            },
            "defaultHref": {
                "type": String,
                "attr": "default-href"
            },
            "el": {
                "elementRef": true
            },
            "icon": {
                "type": String,
                "attr": "icon"
            },
            "mode": {
                "type": String,
                "attr": "mode"
            },
            "text": {
                "type": String,
                "attr": "text"
            },
            "win": {
                "context": "window"
            }
        };
    }
    static get listeners() {
        return [{
                "name": "click",
                "method": "onClick"
            }];
    }
    static get style() { return ".sc-ion-back-button-ios-h{--background:transparent;--ripple-color:currentColor;--transition:background-color,opacity 100ms linear;--opacity:1;display:none;color:var(--color);font-family:var(--ion-font-family,inherit);text-align:center;text-decoration:none;text-overflow:ellipsis;text-transform:none;white-space:nowrap;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-font-kerning:none;font-kerning:none}.ion-color.sc-ion-back-button-ios-h   .button-native.sc-ion-back-button-ios{color:var(--ion-color-base)}.activated.sc-ion-back-button-ios-h   .button-native.sc-ion-back-button-ios{opacity:.4}.show-back-button.sc-ion-back-button-ios-h, .can-go-back.sc-ion-back-button-ios-h > ion-header.sc-ion-back-button-ios, .can-go-back > ion-header   .sc-ion-back-button-ios-h{display:block}.button-native.sc-ion-back-button-ios{border-radius:var(--border-radius);-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;margin-left:var(--margin-start);margin-right:var(--margin-end);margin-top:var(--margin-top);margin-bottom:var(--margin-bottom);padding-left:var(--padding-start);padding-right:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;display:block;position:relative;min-width:var(--min-width);min-height:var(--min-height);-webkit-transition:var(--transition);transition:var(--transition);border:0;outline:none;background:var(--background);line-height:1;cursor:pointer;opacity:var(--opacity);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:0;-webkit-appearance:none;-moz-appearance:none;appearance:none}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.button-native.sc-ion-back-button-ios{margin-left:unset;margin-right:unset;-webkit-margin-start:var(--margin-start);margin-inline-start:var(--margin-start);-webkit-margin-end:var(--margin-end);margin-inline-end:var(--margin-end);padding-left:unset;padding-right:unset;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end)}}.button-inner.sc-ion-back-button-ios{display:-ms-flexbox;display:flex;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-ms-flex-negative:0;flex-shrink:0;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;height:100%}ion-icon.sc-ion-back-button-ios{padding-left:var(--icon-padding-start);padding-right:var(--icon-padding-end);padding-top:var(--icon-padding-top);padding-bottom:var(--icon-padding-bottom);margin-left:var(--icon-margin-start);margin-right:var(--icon-margin-end);margin-top:var(--icon-margin-top);margin-bottom:var(--icon-margin-bottom);display:inherit;font-size:var(--icon-font-size);font-weight:var(--icon-font-weight);pointer-events:none}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){ion-icon.sc-ion-back-button-ios{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--icon-padding-start);padding-inline-start:var(--icon-padding-start);-webkit-padding-end:var(--icon-padding-end);padding-inline-end:var(--icon-padding-end);margin-left:unset;margin-right:unset;-webkit-margin-start:var(--icon-margin-start);margin-inline-start:var(--icon-margin-start);-webkit-margin-end:var(--icon-margin-end);margin-inline-end:var(--icon-margin-end)}}.sc-ion-back-button-ios-h{--color:var(--ion-color-primary,#3880ff);--margin-top:0;--margin-end:0;--margin-bottom:0;--margin-start:0;--padding-top:0;--padding-end:0;--padding-bottom:0;--padding-start:0;--min-height:32px;--min-width:auto;--icon-padding-top:0;--icon-padding-end:0;--icon-padding-bottom:0;--icon-padding-start:0;--icon-margin-top:0;--icon-margin-end:-5px;--icon-margin-bottom:0;--icon-margin-start:-4px;--icon-font-size:1.85em;font-size:17px}.button-native.sc-ion-back-button-ios{-webkit-transform:translateZ(0);transform:translateZ(0);overflow:visible;z-index:99}"; }
    static get styleMode() { return "ios"; }
}

class Button {
    constructor() {
        this.inToolbar = false;
        this.buttonType = "button";
        this.disabled = false;
        this.routerDirection = "forward";
        this.strong = false;
        this.type = "button";
        this.onFocus = () => {
            this.ionFocus.emit();
        };
        this.onBlur = () => {
            this.ionBlur.emit();
        };
    }
    componentWillLoad() {
        this.inToolbar = !!this.el.closest("ion-buttons");
    }
    onClick(ev) {
        if (this.type === "button") {
            openURL(this.win, this.href, ev, this.routerDirection);
        }
        else if (hasShadowDom(this.el)) {
            const form = this.el.closest("form");
            if (form) {
                ev.preventDefault();
                const fakeButton = this.win.document.createElement("button");
                fakeButton.type = this.type;
                fakeButton.style.display = "none";
                form.appendChild(fakeButton);
                fakeButton.click();
                fakeButton.remove();
            }
        }
    }
    hostData() {
        const { buttonType, disabled, color, expand, shape, size, strong } = this;
        let fill = this.fill;
        if (fill === undefined) {
            fill = this.inToolbar ? "clear" : "solid";
        }
        return {
            "aria-disabled": disabled ? "true" : null,
            class: Object.assign({}, createColorClasses(color), { [`${this.mode}`]: true, [buttonType]: true, [`${buttonType}-${expand}`]: expand !== undefined, [`${buttonType}-${size}`]: size !== undefined, [`${buttonType}-${shape}`]: shape !== undefined, [`${buttonType}-${fill}`]: true, [`${buttonType}-strong`]: strong, "button-disabled": disabled, "ion-activatable": true, "ion-focusable": true })
        };
    }
    render() {
        const TagType = this.href === undefined ? "button" : "a";
        const attrs = (TagType === "button")
            ? { type: this.type }
            : { href: this.href };
        return (h(TagType, Object.assign({}, attrs, { class: "button-native", disabled: this.disabled, onFocus: this.onFocus, onBlur: this.onBlur }), h("span", { class: "button-inner" }, h("slot", { name: "icon-only" }), h("slot", { name: "start" }), h("slot", null), h("slot", { name: "end" })), this.mode === "md" && h("ion-ripple-effect", { type: this.inToolbar ? "unbounded" : "bounded" })));
    }
    static get is() { return "ion-button"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "buttonType": {
                "type": String,
                "attr": "button-type",
                "mutable": true
            },
            "color": {
                "type": String,
                "attr": "color"
            },
            "disabled": {
                "type": Boolean,
                "attr": "disabled",
                "reflectToAttr": true
            },
            "el": {
                "elementRef": true
            },
            "expand": {
                "type": String,
                "attr": "expand",
                "reflectToAttr": true
            },
            "fill": {
                "type": String,
                "attr": "fill",
                "reflectToAttr": true,
                "mutable": true
            },
            "href": {
                "type": String,
                "attr": "href"
            },
            "mode": {
                "type": String,
                "attr": "mode"
            },
            "routerDirection": {
                "type": String,
                "attr": "router-direction"
            },
            "shape": {
                "type": String,
                "attr": "shape",
                "reflectToAttr": true
            },
            "size": {
                "type": String,
                "attr": "size",
                "reflectToAttr": true
            },
            "strong": {
                "type": Boolean,
                "attr": "strong"
            },
            "type": {
                "type": String,
                "attr": "type"
            },
            "win": {
                "context": "window"
            }
        };
    }
    static get events() {
        return [{
                "name": "ionFocus",
                "method": "ionFocus",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionBlur",
                "method": "ionBlur",
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
    static get style() { return ":host{--overflow:hidden;--ripple-color:currentColor;--border-width:initial;--border-color:initial;--border-style:initial;--box-shadow:none;display:inline-block;width:auto;color:var(--color);font-family:var(--ion-font-family,inherit);text-align:center;text-decoration:none;text-overflow:ellipsis;white-space:nowrap;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;vertical-align:top;vertical-align:-webkit-baseline-middle;pointer-events:auto;-webkit-font-kerning:none;font-kerning:none}:host(.button-disabled){pointer-events:none}:host(.button-disabled) .button-native{cursor:default;opacity:.5;pointer-events:none}:host(.button-solid){--background:var(--ion-color-primary,#3880ff);--background-focused:var(--ion-color-primary-shade,#3171e0);--color:var(--ion-color-primary-contrast,#fff);--color-activated:var(--ion-color-primary-contrast,#fff);--color-focused:var(--ion-color-primary-contrast,#fff)}:host(.button-solid.ion-color) .button-native{background:var(--ion-color-base);color:var(--ion-color-contrast)}:host(.button-solid.ion-color.ion-focused) .button-native{background:var(--ion-color-shade)}:host(.button-outline){--border-color:var(--ion-color-primary,#3880ff);--background:transparent;--color:var(--ion-color-primary,#3880ff);--color-focused:var(--ion-color-primary,#3880ff)}:host(.button-outline.ion-color) .button-native{border-color:var(--ion-color-base);background:transparent;color:var(--ion-color-base)}:host(.button-outline.ion-focused.ion-color) .button-native{background:rgba(var(--ion-color-base-rgb),.1);color:var(--ion-color-base)}:host(.button-clear){--border-width:0;--background:transparent;--color:var(--ion-color-primary,#3880ff)}:host(.button-clear.ion-color) .button-native{background:transparent;color:var(--ion-color-base)}:host(.button-clear.ion-focused.ion-color) .button-native{background:rgba(var(--ion-color-base-rgb),.1);color:var(--ion-color-base)}:host(.button-clear.activated.ion-color) .button-native{background:transparent}:host(.button-block){display:block}:host(.button-block) .button-native{margin-left:0;margin-right:0;display:block;width:100%;clear:both;contain:content}:host(.button-block) .button-native:after{clear:both}:host(.button-full){display:block}:host(.button-full) .button-native{margin-left:0;margin-right:0;display:block;width:100%;contain:content}:host(.button-full:not(.button-round)) .button-native{border-radius:0;border-right-width:0;border-left-width:0}.button-native{border-radius:var(--border-radius);-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:var(--padding-start);padding-right:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;display:block;position:relative;width:100%;height:100%;-webkit-transition:var(--transition);transition:var(--transition);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);outline:none;background:var(--background);line-height:1;-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow);contain:layout style;cursor:pointer;opacity:var(--opacity);overflow:var(--overflow);z-index:0;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-appearance:none;-moz-appearance:none;appearance:none}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.button-native{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end)}}.button-native::-moz-focus-inner{border:0}:host(.ion-focused) .button-native{background:var(--background-focused);color:var(--color-focused)}:host(.activated) .button-native{background:var(--background-activated);color:var(--color-activated)}.button-inner{display:-ms-flexbox;display:flex;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-ms-flex-negative:0;flex-shrink:0;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;height:100%}::slotted(ion-icon){font-size:1.4em;pointer-events:none}::slotted(ion-icon[slot=start]){margin-left:-.3em;margin-right:.3em;margin-top:0;margin-bottom:0}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){::slotted(ion-icon[slot=start]){margin-left:unset;margin-right:unset;-webkit-margin-start:-.3em;margin-inline-start:-.3em;-webkit-margin-end:.3em;margin-inline-end:.3em}}::slotted(ion-icon[slot=end]){margin-left:.3em;margin-right:-.2em;margin-top:0;margin-bottom:0}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){::slotted(ion-icon[slot=end]){margin-left:unset;margin-right:unset;-webkit-margin-start:.3em;margin-inline-start:.3em;-webkit-margin-end:-.2em;margin-inline-end:-.2em}}::slotted(ion-icon[slot=icon-only]){font-size:1.8em}ion-ripple-effect{color:var(--ripple-color)}:host{--border-radius:10px;--padding-top:0;--padding-bottom:0;--padding-start:1em;--padding-end:1em;--transition:background-color,opacity 100ms linear;margin-left:2px;margin-right:2px;margin-top:4px;margin-bottom:4px;height:2.8em;font-size:16px;font-weight:500;letter-spacing:-.03em}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host{margin-left:unset;margin-right:unset;-webkit-margin-start:2px;margin-inline-start:2px;-webkit-margin-end:2px;margin-inline-end:2px}}:host(.button-solid){--background-activated:var(--ion-color-primary-shade,#3171e0)}:host(.button-solid.activated){--opacity:1}:host(.button-solid.activated.ion-color) .button-native{background:var(--ion-color-shade)}:host(.button-outline){--border-radius:10px;--border-width:1px;--border-style:solid;--background-activated:var(--ion-color-primary,#3880ff);--background-focused:rgba(var(--ion-color-primary-rgb,56,128,255),0.1);--color-activated:var(--ion-color-primary-contrast,#fff)}:host(.button-outline.activated.ion-color) .button-native{background:var(--ion-color-base);color:var(--ion-color-contrast)}:host(.button-clear.activated){--opacity:0.4}:host(.button-clear){--background-activated:transparent;--background-focused:rgba(var(--ion-color-primary-rgb,56,128,255),0.1);--color-activated:var(--ion-color-primary,#3880ff);--color-focused:var(--ion-color-primary,#3880ff)}:host(.button-large){--border-radius:12px;--padding-top:0;--padding-start:1em;--padding-end:1em;--padding-bottom:0;height:2.8em;font-size:20px}:host(.button-small){--border-radius:6px;--padding-top:0;--padding-start:0.9em;--padding-end:0.9em;--padding-bottom:0;height:2.1em;font-size:13px}:host(.button-round){--border-radius:64px;--padding-top:0;--padding-start:26px;--padding-end:26px;--padding-bottom:0}:host(.button-strong){font-weight:600}\@media (any-hover:hover){:host(.button-solid:hover){--opacity:0.8}:host(.button-clear:hover){--opacity:0.6}}"; }
    static get styleMode() { return "ios"; }
}

class Card {
    constructor() {
        this.button = false;
        this.type = "button";
        this.disabled = false;
        this.routerDirection = "forward";
    }
    isClickable() {
        return (this.href !== undefined || this.button);
    }
    hostData() {
        return {
            class: Object.assign({ [`${this.mode}`]: true }, createColorClasses(this.color), { "card-disabled": this.disabled, "ion-activatable": this.isClickable() })
        };
    }
    render() {
        const clickable = this.isClickable();
        if (!clickable) {
            return [
                h("slot", null)
            ];
        }
        const { href, mode, win, routerDirection, type } = this;
        const TagType = clickable ? (href === undefined ? "button" : "a") : "div";
        const attrs = TagType === "button" ? { type } : { href };
        return (h(TagType, Object.assign({}, attrs, { class: "card-native", disabled: this.disabled, onClick: (ev) => openURL(win, href, ev, routerDirection) }), h("slot", null), clickable && mode === "md" && h("ion-ripple-effect", null)));
    }
    static get is() { return "ion-card"; }
    static get encapsulation() { return "scoped"; }
    static get properties() {
        return {
            "button": {
                "type": Boolean,
                "attr": "button"
            },
            "color": {
                "type": String,
                "attr": "color"
            },
            "disabled": {
                "type": Boolean,
                "attr": "disabled"
            },
            "href": {
                "type": String,
                "attr": "href"
            },
            "mode": {
                "type": String,
                "attr": "mode"
            },
            "routerDirection": {
                "type": String,
                "attr": "router-direction"
            },
            "type": {
                "type": String,
                "attr": "type"
            },
            "win": {
                "context": "window"
            }
        };
    }
    static get style() { return ".sc-ion-card-ios-h{--ion-safe-area-left:0px;--ion-safe-area-right:0px;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:block;position:relative;background:var(--background);color:var(--color);font-family:var(--ion-font-family,inherit);overflow:hidden}.ion-color.sc-ion-card-ios-h{background:var(--ion-color-base)}.ion-color.sc-ion-card-ios-h, .sc-ion-card-ios-h.ion-color.sc-ion-card-ios-s  ion-card-header , .sc-ion-card-ios-h.ion-color.sc-ion-card-ios-s  ion-card-subtitle , .sc-ion-card-ios-h.ion-color.sc-ion-card-ios-s  ion-card-title {color:var(--ion-color-contrast)}.sc-ion-card-ios-s  img {display:block;width:100%}.sc-ion-card-ios-s  ion-list {margin-left:0;margin-right:0;margin-top:0;margin-bottom:0}.card-disabled.sc-ion-card-ios-h{cursor:default;opacity:.3;pointer-events:none}.card-native.sc-ion-card-ios{font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;width:100%;min-height:var(--min-height);-webkit-transition:var(--transition);transition:var(--transition);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);outline:none;background:var(--background)}.card-native.sc-ion-card-ios::-moz-focus-inner{border:0}a.sc-ion-card-ios, button.sc-ion-card-ios{cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-user-drag:none}ion-ripple-effect.sc-ion-card-ios{color:var(--ripple-color)}.sc-ion-card-ios-h{--background:var(--ion-item-background,transparent);--color:var(--ion-color-step-600,#666);margin-left:16px;margin-right:16px;margin-top:24px;margin-bottom:24px;border-radius:8px;-webkit-transform:translateZ(0);transform:translateZ(0);-webkit-transition:-webkit-transform .5s cubic-bezier(.12,.72,.29,1);transition:-webkit-transform .5s cubic-bezier(.12,.72,.29,1);transition:transform .5s cubic-bezier(.12,.72,.29,1);transition:transform .5s cubic-bezier(.12,.72,.29,1),-webkit-transform .5s cubic-bezier(.12,.72,.29,1);font-size:14px;-webkit-box-shadow:0 4px 16px rgba(0,0,0,.12);box-shadow:0 4px 16px rgba(0,0,0,.12)}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.sc-ion-card-ios-h{margin-left:unset;margin-right:unset;-webkit-margin-start:16px;margin-inline-start:16px;-webkit-margin-end:16px;margin-inline-end:16px}}.activated.sc-ion-card-ios-h{-webkit-transform:scale3d(.97,.97,1);transform:scale3d(.97,.97,1)}"; }
    static get styleMode() { return "ios"; }
}

class CardContent {
    hostData() {
        return {
            class: {
                [`${this.mode}`]: true,
                [`card-content-${this.mode}`]: true
            }
        };
    }
    static get is() { return "ion-card-content"; }
    static get properties() {
        return {
            "mode": {
                "type": String,
                "attr": "mode"
            }
        };
    }
    static get style() { return "ion-card-content{display:block;position:relative}.card-content-ios{padding-left:20px;padding-right:20px;padding-top:20px;padding-bottom:20px;font-size:16px;line-height:1.4}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.card-content-ios{padding-left:unset;padding-right:unset;-webkit-padding-start:20px;padding-inline-start:20px;-webkit-padding-end:20px;padding-inline-end:20px}}.card-content-ios h1{margin-left:0;margin-right:0;margin-top:0;margin-bottom:2px;font-size:24px;font-weight:400}.card-content-ios h2{margin-left:0;margin-right:0;margin-top:2px;margin-bottom:2px;font-size:16px;font-weight:400}.card-content-ios h3,.card-content-ios h4,.card-content-ios h5,.card-content-ios h6{margin-left:0;margin-right:0;margin-top:2px;margin-bottom:2px;font-size:14px;font-weight:400}.card-content-ios p{margin-left:0;margin-right:0;margin-top:0;margin-bottom:2px;font-size:14px}"; }
    static get styleMode() { return "ios"; }
}

class CardHeader {
    constructor() {
        this.translucent = false;
    }
    hostData() {
        return {
            class: Object.assign({}, createColorClasses(this.color), { "card-header-translucent": this.translucent, [`${this.mode}`]: true })
        };
    }
    render() {
        return h("slot", null);
    }
    static get is() { return "ion-card-header"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "color": {
                "type": String,
                "attr": "color"
            },
            "mode": {
                "type": String,
                "attr": "mode"
            },
            "translucent": {
                "type": Boolean,
                "attr": "translucent"
            }
        };
    }
    static get style() { return ":host{display:block;position:relative;background:var(--background);color:var(--color)}:host(.ion-color){background:var(--ion-color-base);color:var(--ion-color-contrast)}:host(.ion-color) ::slotted(ion-card-subtitle),:host(.ion-color) ::slotted(ion-card-title){color:currentColor}:host{padding-left:20px;padding-right:20px;padding-top:20px;padding-bottom:16px}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host{padding-left:unset;padding-right:unset;-webkit-padding-start:20px;padding-inline-start:20px;-webkit-padding-end:20px;padding-inline-end:20px}}:host(.card-header-translucent){background-color:rgba(var(--ion-background-color-rgb,255,255,255),.9);-webkit-backdrop-filter:saturate(180%) blur(30px);backdrop-filter:saturate(180%) blur(30px)}"; }
    static get styleMode() { return "ios"; }
}

class CardSubtitle {
    hostData() {
        return {
            class: Object.assign({}, createColorClasses(this.color), { [`${this.mode}`]: true }),
            "role": "heading",
            "aria-level": "3"
        };
    }
    render() {
        return h("slot", null);
    }
    static get is() { return "ion-card-subtitle"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "color": {
                "type": String,
                "attr": "color"
            },
            "mode": {
                "type": String,
                "attr": "mode"
            }
        };
    }
    static get style() { return ":host{display:block;position:relative;color:var(--color)}:host(.ion-color){color:var(--ion-color-base)}:host{--color:var(--ion-color-step-600,#666);margin-left:0;margin-right:0;margin-top:0;margin-bottom:4px;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;font-size:12px;font-weight:700;letter-spacing:.4px;text-transform:uppercase}"; }
    static get styleMode() { return "ios"; }
}

class CardTitle {
    hostData() {
        return {
            class: Object.assign({}, createColorClasses(this.color), { [`${this.mode}`]: true }),
            "role": "heading",
            "aria-level": "2"
        };
    }
    render() {
        return h("slot", null);
    }
    static get is() { return "ion-card-title"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "color": {
                "type": String,
                "attr": "color"
            },
            "mode": {
                "type": String,
                "attr": "mode"
            }
        };
    }
    static get style() { return ":host{display:block;position:relative;color:var(--color)}:host(.ion-color){color:var(--ion-color-base)}:host{--color:var(--ion-text-color,#000);margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;font-size:28px;font-weight:700;line-height:1.2}"; }
    static get styleMode() { return "ios"; }
}

class Content {
    constructor() {
        this.isScrolling = false;
        this.lastScroll = 0;
        this.queued = false;
        this.cTop = -1;
        this.cBottom = -1;
        this.detail = {
            scrollTop: 0,
            scrollLeft: 0,
            type: "scroll",
            event: undefined,
            startX: 0,
            startY: 0,
            startTimeStamp: 0,
            currentX: 0,
            currentY: 0,
            velocityX: 0,
            velocityY: 0,
            deltaX: 0,
            deltaY: 0,
            timeStamp: 0,
            data: undefined,
            isScrolling: true,
        };
        this.fullscreen = false;
        this.scrollX = false;
        this.scrollY = true;
        this.scrollEvents = false;
    }
    componentWillLoad() {
        if (this.forceOverscroll === undefined) {
            this.forceOverscroll = this.mode === "ios" && isPlatform(this.win, "mobile");
        }
    }
    componentDidLoad() {
        this.resize();
    }
    componentDidUnload() {
        this.onScrollEnd();
    }
    onClick(ev) {
        if (this.isScrolling) {
            ev.preventDefault();
            ev.stopPropagation();
        }
    }
    resize() {
        if (this.fullscreen) {
            this.queue.read(this.readDimensions.bind(this));
        }
        else if (this.cTop !== 0 || this.cBottom !== 0) {
            this.cTop = this.cBottom = 0;
            this.el.forceUpdate();
        }
    }
    readDimensions() {
        const page = getPageElement(this.el);
        const top = Math.max(this.el.offsetTop, 0);
        const bottom = Math.max(page.offsetHeight - top - this.el.offsetHeight, 0);
        const dirty = top !== this.cTop || bottom !== this.cBottom;
        if (dirty) {
            this.cTop = top;
            this.cBottom = bottom;
            this.el.forceUpdate();
        }
    }
    onScroll(ev) {
        const timeStamp = Date.now();
        const shouldStart = !this.isScrolling;
        this.lastScroll = timeStamp;
        if (shouldStart) {
            this.onScrollStart();
        }
        if (!this.queued && this.scrollEvents) {
            this.queued = true;
            this.queue.read(ts => {
                this.queued = false;
                this.detail.event = ev;
                updateScrollDetail(this.detail, this.scrollEl, ts, shouldStart);
                this.ionScroll.emit(this.detail);
            });
        }
    }
    getScrollElement() {
        return Promise.resolve(this.scrollEl);
    }
    scrollToTop(duration = 0) {
        return this.scrollToPoint(undefined, 0, duration);
    }
    scrollToBottom(duration = 0) {
        const y = this.scrollEl.scrollHeight - this.scrollEl.clientHeight;
        return this.scrollToPoint(undefined, y, duration);
    }
    scrollByPoint(x, y, duration) {
        return this.scrollToPoint(x + this.scrollEl.scrollLeft, y + this.scrollEl.scrollTop, duration);
    }
    async scrollToPoint(x, y, duration = 0) {
        const el = this.scrollEl;
        if (duration < 32) {
            if (y != null) {
                el.scrollTop = y;
            }
            if (x != null) {
                el.scrollLeft = x;
            }
            return;
        }
        let resolve;
        let startTime = 0;
        const promise = new Promise(r => resolve = r);
        const fromY = el.scrollTop;
        const fromX = el.scrollLeft;
        const deltaY = y != null ? y - fromY : 0;
        const deltaX = x != null ? x - fromX : 0;
        const step = (timeStamp) => {
            const linearTime = Math.min(1, ((timeStamp - startTime) / duration)) - 1;
            const easedT = Math.pow(linearTime, 3) + 1;
            if (deltaY !== 0) {
                el.scrollTop = Math.floor((easedT * deltaY) + fromY);
            }
            if (deltaX !== 0) {
                el.scrollLeft = Math.floor((easedT * deltaX) + fromX);
            }
            if (easedT < 1) {
                requestAnimationFrame(step);
            }
            else {
                resolve();
            }
        };
        requestAnimationFrame(ts => {
            startTime = ts;
            step(ts);
        });
        return promise;
    }
    onScrollStart() {
        this.isScrolling = true;
        this.ionScrollStart.emit({
            isScrolling: true
        });
        if (this.watchDog) {
            clearInterval(this.watchDog);
        }
        this.watchDog = setInterval(() => {
            if (this.lastScroll < Date.now() - 120) {
                this.onScrollEnd();
            }
        }, 100);
    }
    onScrollEnd() {
        clearInterval(this.watchDog);
        this.watchDog = null;
        if (this.isScrolling) {
            this.isScrolling = false;
            this.ionScrollEnd.emit({
                isScrolling: false
            });
        }
    }
    hostData() {
        return {
            class: Object.assign({}, createColorClasses(this.color), { [`${this.mode}`]: true, "content-sizing": hostContext("ion-popover", this.el), "overscroll": !!this.forceOverscroll }),
            style: {
                "--offset-top": `${this.cTop}px`,
                "--offset-bottom": `${this.cBottom}px`,
            }
        };
    }
    render() {
        const { scrollX, scrollY, forceOverscroll } = this;
        this.resize();
        return [
            h("div", { class: {
                    "inner-scroll": true,
                    "scroll-x": scrollX,
                    "scroll-y": scrollY,
                    "overscroll": (scrollX || scrollY) && !!forceOverscroll
                }, ref: el => this.scrollEl = el, onScroll: ev => this.onScroll(ev) }, h("slot", null)),
            h("slot", { name: "fixed" })
        ];
    }
    static get is() { return "ion-content"; }
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
            "el": {
                "elementRef": true
            },
            "forceOverscroll": {
                "type": Boolean,
                "attr": "force-overscroll",
                "mutable": true
            },
            "fullscreen": {
                "type": Boolean,
                "attr": "fullscreen"
            },
            "getScrollElement": {
                "method": true
            },
            "queue": {
                "context": "queue"
            },
            "scrollByPoint": {
                "method": true
            },
            "scrollEvents": {
                "type": Boolean,
                "attr": "scroll-events"
            },
            "scrollToBottom": {
                "method": true
            },
            "scrollToPoint": {
                "method": true
            },
            "scrollToTop": {
                "method": true
            },
            "scrollX": {
                "type": Boolean,
                "attr": "scroll-x"
            },
            "scrollY": {
                "type": Boolean,
                "attr": "scroll-y"
            },
            "win": {
                "context": "window"
            }
        };
    }
    static get events() {
        return [{
                "name": "ionScrollStart",
                "method": "ionScrollStart",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionScroll",
                "method": "ionScroll",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionScrollEnd",
                "method": "ionScrollEnd",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }];
    }
    static get listeners() {
        return [{
                "name": "click",
                "method": "onClick",
                "capture": true
            }];
    }
    static get style() { return ":host{--background:var(--ion-background-color,#fff);--color:var(--ion-text-color,#000);--padding-top:0px;--padding-bottom:0px;--padding-start:0px;--padding-end:0px;--keyboard-offset:0px;--offset-top:0px;--offset-bottom:0px;--overflow:auto;display:block;position:relative;-ms-flex:1;flex:1;width:100%;height:100%;margin:0!important;padding:0!important;font-family:var(--ion-font-family,inherit);contain:size style}:host(.ion-color) .inner-scroll{background:var(--ion-color-base);color:var(--ion-color-contrast)}:host(.outer-content){--background:var(--ion-color-step-50,#f2f2f2)}.inner-scroll{left:0;right:0;top:calc(var(--offset-top) * -1);bottom:calc(var(--offset-bottom) * -1);padding-left:var(--padding-start);padding-right:var(--padding-end);padding-top:calc(var(--padding-top) + var(--offset-top));padding-bottom:calc(var(--padding-bottom) + var(--keyboard-offset) + var(--offset-bottom));position:absolute;background:var(--background);color:var(--color);-webkit-box-sizing:border-box;box-sizing:border-box;overflow:hidden}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.inner-scroll{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end)}}.scroll-x,.scroll-y{-webkit-overflow-scrolling:touch;will-change:scroll-position;-ms-scroll-chaining:none;overscroll-behavior:contain}.scroll-y{-ms-touch-action:pan-y;touch-action:pan-y;overflow-y:var(--overflow)}.scroll-x{-ms-touch-action:pan-x;touch-action:pan-x;overflow-x:var(--overflow)}.scroll-x.scroll-y{-ms-touch-action:auto;touch-action:auto}.overscroll:after,.overscroll:before{position:absolute;width:1px;height:1px;content:\"\"}.overscroll:before{bottom:-1px}.overscroll:after{top:-1px}:host(.content-sizing){contain:none}:host(.content-sizing) .inner-scroll{position:relative}"; }
}
function getParentElement(el) {
    if (el.parentElement) {
        return el.parentElement;
    }
    if (el.parentNode && el.parentNode.host) {
        return el.parentNode.host;
    }
    return null;
}
function getPageElement(el) {
    const tabs = el.closest("ion-tabs");
    if (tabs) {
        return tabs;
    }
    const page = el.closest("ion-app,ion-page,.ion-page,page-inner");
    if (page) {
        return page;
    }
    return getParentElement(el);
}
function updateScrollDetail(detail, el, timestamp, shouldStart) {
    const prevX = detail.currentX;
    const prevY = detail.currentY;
    const prevT = detail.timeStamp;
    const currentX = el.scrollLeft;
    const currentY = el.scrollTop;
    if (shouldStart) {
        detail.startTimeStamp = timestamp;
        detail.startX = currentX;
        detail.startY = currentY;
        detail.velocityX = detail.velocityY = 0;
    }
    detail.timeStamp = timestamp;
    detail.currentX = detail.scrollLeft = currentX;
    detail.currentY = detail.scrollTop = currentY;
    detail.deltaX = currentX - detail.startX;
    detail.deltaY = currentY - detail.startY;
    const timeDelta = timestamp - prevT;
    if (timeDelta > 0 && timeDelta < 100) {
        const velocityX = (currentX - prevX) / timeDelta;
        const velocityY = (currentY - prevY) / timeDelta;
        detail.velocityX = velocityX * 0.7 + detail.velocityX * 0.3;
        detail.velocityY = velocityY * 0.7 + detail.velocityY * 0.3;
    }
}

class Input {
    constructor() {
        this.inputId = `ion-input-${inputIds++}`;
        this.didBlurAfterEdit = false;
        this.hasFocus = false;
        this.autocapitalize = "off";
        this.autocomplete = "off";
        this.autocorrect = "off";
        this.autofocus = false;
        this.clearInput = false;
        this.debounce = 0;
        this.disabled = false;
        this.name = this.inputId;
        this.readonly = false;
        this.required = false;
        this.spellcheck = false;
        this.type = "text";
        this.value = "";
        this.onInput = (ev) => {
            const input = ev.target;
            if (input) {
                this.value = input.value || "";
            }
            this.ionInput.emit(ev);
        };
        this.onBlur = () => {
            this.hasFocus = false;
            this.focusChanged();
            this.emitStyle();
            this.ionBlur.emit();
        };
        this.onFocus = () => {
            this.hasFocus = true;
            this.focusChanged();
            this.emitStyle();
            this.ionFocus.emit();
        };
        this.onKeydown = () => {
            if (this.clearOnEdit) {
                if (this.didBlurAfterEdit && this.hasValue()) {
                    this.clearTextInput();
                }
                this.didBlurAfterEdit = false;
            }
        };
        this.clearTextInput = (ev) => {
            if (this.clearInput && !this.readonly && !this.disabled && ev) {
                ev.preventDefault();
                ev.stopPropagation();
            }
            this.value = "";
            if (this.nativeInput) {
                this.nativeInput.value = "";
            }
        };
    }
    debounceChanged() {
        this.ionChange = debounceEvent(this.ionChange, this.debounce);
    }
    disabledChanged() {
        this.emitStyle();
    }
    valueChanged() {
        this.emitStyle();
        this.ionChange.emit({ value: this.value });
    }
    componentWillLoad() {
        if (this.clearOnEdit === undefined && this.type === "password") {
            this.clearOnEdit = true;
        }
        this.emitStyle();
    }
    componentDidLoad() {
        this.debounceChanged();
        this.ionInputDidLoad.emit();
    }
    componentDidUnload() {
        this.ionInputDidUnload.emit();
    }
    setFocus() {
        if (this.nativeInput) {
            this.nativeInput.focus();
        }
    }
    getInputElement() {
        return Promise.resolve(this.nativeInput);
    }
    getValue() {
        return this.value || "";
    }
    emitStyle() {
        this.ionStyle.emit({
            "interactive": true,
            "input": true,
            "has-placeholder": this.placeholder != null,
            "has-value": this.hasValue(),
            "has-focus": this.hasFocus,
            "interactive-disabled": this.disabled,
        });
    }
    focusChanged() {
        if (this.clearOnEdit && !this.hasFocus && this.hasValue()) {
            this.didBlurAfterEdit = true;
        }
    }
    hasValue() {
        return this.getValue().length > 0;
    }
    hostData() {
        return {
            "aria-disabled": this.disabled ? "true" : null,
            class: Object.assign({}, createColorClasses(this.color), { [`${this.mode}`]: true, "has-value": this.hasValue(), "has-focus": this.hasFocus })
        };
    }
    render() {
        const value = this.getValue();
        const labelId = this.inputId + "-lbl";
        const label = findItemLabel(this.el);
        if (label) {
            label.id = labelId;
        }
        return [
            h("input", { class: "native-input", ref: input => this.nativeInput = input, "aria-labelledby": labelId, disabled: this.disabled, accept: this.accept, autoCapitalize: this.autocapitalize, autoComplete: this.autocomplete, autoCorrect: this.autocorrect, autoFocus: this.autofocus, inputMode: this.inputmode, min: this.min, max: this.max, minLength: this.minlength, maxLength: this.maxlength, multiple: this.multiple, name: this.name, pattern: this.pattern, placeholder: this.placeholder || "", readOnly: this.readonly, required: this.required, spellCheck: this.spellcheck, step: this.step, size: this.size, type: this.type, value: value, onInput: this.onInput, onBlur: this.onBlur, onFocus: this.onFocus, onKeyDown: this.onKeydown }),
            (this.clearInput && !this.readonly && !this.disabled) && h("button", { type: "button", class: "input-clear-icon", tabindex: "-1", onTouchStart: this.clearTextInput, onMouseDown: this.clearTextInput })
        ];
    }
    static get is() { return "ion-input"; }
    static get encapsulation() { return "scoped"; }
    static get properties() {
        return {
            "accept": {
                "type": String,
                "attr": "accept"
            },
            "autocapitalize": {
                "type": String,
                "attr": "autocapitalize"
            },
            "autocomplete": {
                "type": String,
                "attr": "autocomplete"
            },
            "autocorrect": {
                "type": String,
                "attr": "autocorrect"
            },
            "autofocus": {
                "type": Boolean,
                "attr": "autofocus"
            },
            "clearInput": {
                "type": Boolean,
                "attr": "clear-input"
            },
            "clearOnEdit": {
                "type": Boolean,
                "attr": "clear-on-edit",
                "mutable": true
            },
            "color": {
                "type": String,
                "attr": "color"
            },
            "debounce": {
                "type": Number,
                "attr": "debounce",
                "watchCallbacks": ["debounceChanged"]
            },
            "disabled": {
                "type": Boolean,
                "attr": "disabled",
                "watchCallbacks": ["disabledChanged"]
            },
            "el": {
                "elementRef": true
            },
            "getInputElement": {
                "method": true
            },
            "hasFocus": {
                "state": true
            },
            "inputmode": {
                "type": String,
                "attr": "inputmode"
            },
            "max": {
                "type": String,
                "attr": "max"
            },
            "maxlength": {
                "type": Number,
                "attr": "maxlength"
            },
            "min": {
                "type": String,
                "attr": "min"
            },
            "minlength": {
                "type": Number,
                "attr": "minlength"
            },
            "mode": {
                "type": String,
                "attr": "mode"
            },
            "multiple": {
                "type": Boolean,
                "attr": "multiple"
            },
            "name": {
                "type": String,
                "attr": "name"
            },
            "pattern": {
                "type": String,
                "attr": "pattern"
            },
            "placeholder": {
                "type": String,
                "attr": "placeholder"
            },
            "readonly": {
                "type": Boolean,
                "attr": "readonly"
            },
            "required": {
                "type": Boolean,
                "attr": "required"
            },
            "setFocus": {
                "method": true
            },
            "size": {
                "type": Number,
                "attr": "size"
            },
            "spellcheck": {
                "type": Boolean,
                "attr": "spellcheck"
            },
            "step": {
                "type": String,
                "attr": "step"
            },
            "type": {
                "type": String,
                "attr": "type"
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
                "name": "ionInput",
                "method": "ionInput",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionChange",
                "method": "ionChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionBlur",
                "method": "ionBlur",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionFocus",
                "method": "ionFocus",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionInputDidLoad",
                "method": "ionInputDidLoad",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionInputDidUnload",
                "method": "ionInputDidUnload",
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
    static get style() { return ".sc-ion-input-ios-h{--placeholder-color:initial;--placeholder-font-style:initial;--placeholder-font-weight:initial;--placeholder-opacity:.5;--padding-top:0;--padding-end:0;--padding-bottom:0;--background:transparent;--color:initial;display:-ms-flexbox;display:flex;position:relative;-ms-flex:1;flex:1;-ms-flex-align:center;align-items:center;width:100%;padding:0!important;background:var(--background);color:var(--color);font-family:var(--ion-font-family,inherit);z-index:2}ion-item.sc-ion-input-ios-h:not(.item-label), ion-item:not(.item-label)   .sc-ion-input-ios-h{--padding-start:0}.ion-color.sc-ion-input-ios-h{color:var(--ion-color-base)}.native-input.sc-ion-input-ios{border-radius:var(--border-radius);padding-left:var(--padding-start);padding-right:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;display:inline-block;-ms-flex:1;flex:1;width:100%;max-width:100%;max-height:100%;border:0;outline:none;background:transparent;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-appearance:none;-moz-appearance:none;appearance:none}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.native-input.sc-ion-input-ios{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end)}}.native-input.sc-ion-input-ios::-webkit-input-placeholder{color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.native-input.sc-ion-input-ios:-ms-input-placeholder{color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.native-input.sc-ion-input-ios::-ms-input-placeholder{color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.native-input.sc-ion-input-ios::placeholder{color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.native-input.sc-ion-input-ios:-webkit-autofill{background-color:transparent}.native-input.sc-ion-input-ios:invalid{-webkit-box-shadow:none;box-shadow:none}.native-input.sc-ion-input-ios::-ms-clear{display:none}.native-input[disabled].sc-ion-input-ios{opacity:.4}.cloned-input.sc-ion-input-ios{left:0;top:0;position:absolute;pointer-events:none}[dir=rtl].sc-ion-input-ios-h   .cloned-input.sc-ion-input-ios, [dir=rtl]   .sc-ion-input-ios-h   .cloned-input.sc-ion-input-ios{right:0}.input-clear-icon.sc-ion-input-ios{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;background-position:50%;border:0;outline:none;background-color:transparent;background-repeat:no-repeat;visibility:hidden;-webkit-appearance:none;-moz-appearance:none;appearance:none}.has-focus.has-value.sc-ion-input-ios-h   .input-clear-icon.sc-ion-input-ios{visibility:visible}.has-focus.sc-ion-input-ios-h{pointer-events:none}.has-focus.sc-ion-input-ios-h   a.sc-ion-input-ios, .has-focus.sc-ion-input-ios-h   button.sc-ion-input-ios, .has-focus.sc-ion-input-ios-h   input.sc-ion-input-ios{pointer-events:auto}.sc-ion-input-ios-h{--padding-top:10px;--padding-end:8px;--padding-bottom:10px;--padding-start:0;font-size:inherit}.item-label-floating.sc-ion-input-ios-h, .item-label-floating   .sc-ion-input-ios-h, .item-label-stacked.sc-ion-input-ios-h, .item-label-stacked   .sc-ion-input-ios-h{--padding-top:8px;--padding-bottom:8px;--padding-start:0px}.input-clear-icon.sc-ion-input-ios{background-image:url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20512%20512'><path%20fill='var(--ion-color-step-600,%20%23666666)'%20d='M403.1,108.9c-81.2-81.2-212.9-81.2-294.2,0s-81.2,212.9,0,294.2c81.2,81.2,212.9,81.2,294.2,0S484.3,190.1,403.1,108.9z%20M352,340.2L340.2,352l-84.4-84.2l-84,83.8L160,339.8l84-83.8l-84-83.8l11.8-11.8l84,83.8l84.4-84.2l11.8,11.8L267.6,256L352,340.2z'/></svg>\");width:30px;height:30px;background-size:18px}"; }
    static get styleMode() { return "ios"; }
}
let inputIds = 0;

class ListHeader {
    hostData() {
        return {
            class: Object.assign({}, createColorClasses(this.color), { [`${this.mode}`]: true })
        };
    }
    render() {
        return h("slot", null);
    }
    static get is() { return "ion-list-header"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "color": {
                "type": String,
                "attr": "color"
            },
            "mode": {
                "type": String,
                "attr": "mode"
            }
        };
    }
    static get style() { return ":host{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;width:100%;min-height:40px;background:var(--background);color:var(--color);overflow:hidden}:host(.ion-color){background:var(--ion-color-base);color:var(--ion-color-contrast)}:host{--background:transparent;--color:var(--ion-color-step-850,#262626);padding-left:calc(var(--ion-safe-area-left, 0px) + 16px);position:relative;font-size:12px;font-weight:500;letter-spacing:1px;text-transform:uppercase}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host{padding-left:unset;-webkit-padding-start:calc(var(--ion-safe-area-left, 0px) + 16px);padding-inline-start:calc(var(--ion-safe-area-left, 0px) + 16px)}}"; }
    static get styleMode() { return "ios"; }
}

class ModalController {
    create(options) {
        return createOverlay(this.doc.createElement("ion-modal"), options);
    }
    dismiss(data, role, id) {
        return dismissOverlay(this.doc, data, role, "ion-modal", id);
    }
    async getTop() {
        return getOverlay(this.doc, "ion-modal");
    }
    static get is() { return "ion-modal-controller"; }
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

const VIEW_STATE_NEW = 1;
const VIEW_STATE_ATTACHED = 2;
const VIEW_STATE_DESTROYED = 3;
class ViewController {
    constructor(component, params) {
        this.component = component;
        this.params = params;
        this.state = VIEW_STATE_NEW;
    }
    async init(container) {
        this.state = VIEW_STATE_ATTACHED;
        if (!this.element) {
            const component = this.component;
            this.element = await attachComponent(this.delegate, container, component, ['ion-page', 'ion-page-invisible'], this.params);
        }
    }
    _destroy() {
        assert(this.state !== VIEW_STATE_DESTROYED, 'view state must be ATTACHED');
        const element = this.element;
        if (element) {
            if (this.delegate) {
                this.delegate.removeViewFromDom(element.parentElement, element);
            }
            else {
                element.remove();
            }
        }
        this.nav = undefined;
        this.state = VIEW_STATE_DESTROYED;
    }
}
function matches(view, id, params) {
    if (!view) {
        return false;
    }
    if (view.component !== id) {
        return false;
    }
    const currentParams = view.params;
    if (currentParams === params) {
        return true;
    }
    if (!currentParams && !params) {
        return true;
    }
    if (!currentParams || !params) {
        return false;
    }
    const keysA = Object.keys(currentParams);
    const keysB = Object.keys(params);
    if (keysA.length !== keysB.length) {
        return false;
    }
    for (const key of keysA) {
        if (currentParams[key] !== params[key]) {
            return false;
        }
    }
    return true;
}
function convertToView(page, params) {
    if (!page) {
        return null;
    }
    if (page instanceof ViewController) {
        return page;
    }
    return new ViewController(page, params);
}
function convertToViews(pages) {
    return pages.map(page => {
        if (page instanceof ViewController) {
            return page;
        }
        if ('page' in page) {
            return convertToView(page.page, page.params);
        }
        return convertToView(page, undefined);
    }).filter(v => v !== null);
}

class Nav {
    constructor() {
        this.transInstr = [];
        this.useRouter = false;
        this.isTransitioning = false;
        this.destroyed = false;
        this.views = [];
        this.animated = true;
    }
    swipeGestureChanged() {
        if (this.gesture) {
            this.gesture.setDisabled(this.swipeGesture !== true);
        }
    }
    rootChanged() {
        if (this.root !== undefined) {
            if (!this.useRouter) {
                this.setRoot(this.root, this.rootParams);
            }
        }
    }
    componentWillLoad() {
        this.useRouter =
            !!this.win.document.querySelector("ion-router") &&
                !this.el.closest("[no-router]");
        if (this.swipeGesture === undefined) {
            this.swipeGesture = this.config.getBoolean("swipeBackEnabled", this.mode === "ios");
        }
        this.ionNavWillLoad.emit();
    }
    async componentDidLoad() {
        this.rootChanged();
        this.gesture = (await import('./chunk-9d14d64c.js')).createSwipeBackGesture(this.el, this.queue, this.canStart.bind(this), this.onStart.bind(this), this.onMove.bind(this), this.onEnd.bind(this));
        this.swipeGestureChanged();
    }
    componentDidUnload() {
        for (const view of this.views) {
            lifecycle(view.element, LIFECYCLE_WILL_UNLOAD);
            view._destroy();
        }
        if (this.gesture) {
            this.gesture.destroy();
            this.gesture = undefined;
        }
        this.transInstr.length = this.views.length = 0;
        this.destroyed = true;
    }
    push(component, componentProps, opts, done) {
        return this.queueTrns({
            insertStart: -1,
            insertViews: [{ page: component, params: componentProps }],
            opts
        }, done);
    }
    insert(insertIndex, component, componentProps, opts, done) {
        return this.queueTrns({
            insertStart: insertIndex,
            insertViews: [{ page: component, params: componentProps }],
            opts
        }, done);
    }
    insertPages(insertIndex, insertComponents, opts, done) {
        return this.queueTrns({
            insertStart: insertIndex,
            insertViews: insertComponents,
            opts
        }, done);
    }
    pop(opts, done) {
        return this.queueTrns({
            removeStart: -1,
            removeCount: 1,
            opts
        }, done);
    }
    popTo(indexOrViewCtrl, opts, done) {
        const config = {
            removeStart: -1,
            removeCount: -1,
            opts
        };
        if (typeof indexOrViewCtrl === "object" && indexOrViewCtrl.component) {
            config.removeView = indexOrViewCtrl;
            config.removeStart = 1;
        }
        else if (typeof indexOrViewCtrl === "number") {
            config.removeStart = indexOrViewCtrl + 1;
        }
        return this.queueTrns(config, done);
    }
    popToRoot(opts, done) {
        return this.queueTrns({
            removeStart: 1,
            removeCount: -1,
            opts
        }, done);
    }
    removeIndex(startIndex, removeCount = 1, opts, done) {
        return this.queueTrns({
            removeStart: startIndex,
            removeCount,
            opts
        }, done);
    }
    setRoot(component, componentProps, opts, done) {
        return this.setPages([{ page: component, params: componentProps }], opts, done);
    }
    setPages(views, opts, done) {
        if (opts == null) {
            opts = {};
        }
        if (opts.animated !== true) {
            opts.animated = false;
        }
        return this.queueTrns({
            insertStart: 0,
            insertViews: views,
            removeStart: 0,
            removeCount: -1,
            opts
        }, done);
    }
    setRouteId(id, params, direction) {
        const active = this.getActiveSync();
        if (matches(active, id, params)) {
            return Promise.resolve({
                changed: false,
                element: active.element
            });
        }
        let resolve;
        const promise = new Promise(r => (resolve = r));
        let finish;
        const commonOpts = {
            updateURL: false,
            viewIsReady: enteringEl => {
                let mark;
                const p = new Promise(r => (mark = r));
                resolve({
                    changed: true,
                    element: enteringEl,
                    markVisible: async () => {
                        mark();
                        await finish;
                    }
                });
                return p;
            }
        };
        if (direction === "root") {
            finish = this.setRoot(id, params, commonOpts);
        }
        else {
            const viewController = this.views.find(v => matches(v, id, params));
            if (viewController) {
                finish = this.popTo(viewController, Object.assign({}, commonOpts, { direction: "back" }));
            }
            else if (direction === "forward") {
                finish = this.push(id, params, commonOpts);
            }
            else if (direction === "back") {
                finish = this.setRoot(id, params, Object.assign({}, commonOpts, { direction: "back", animated: true }));
            }
        }
        return promise;
    }
    async getRouteId() {
        const active = this.getActiveSync();
        return active
            ? {
                id: active.element.tagName,
                params: active.params,
                element: active.element
            }
            : undefined;
    }
    getActive() {
        return Promise.resolve(this.getActiveSync());
    }
    getByIndex(index) {
        return Promise.resolve(this.views[index]);
    }
    canGoBack(view) {
        return Promise.resolve(this.canGoBackSync(view));
    }
    getPrevious(view) {
        return Promise.resolve(this.getPreviousSync(view));
    }
    getLength() {
        return this.views.length;
    }
    getActiveSync() {
        return this.views[this.views.length - 1];
    }
    canGoBackSync(view = this.getActiveSync()) {
        return !!(view && this.getPreviousSync(view));
    }
    getPreviousSync(view = this.getActiveSync()) {
        if (!view) {
            return undefined;
        }
        const views = this.views;
        const index = views.indexOf(view);
        return index > 0 ? views[index - 1] : undefined;
    }
    queueTrns(ti, done) {
        if (this.isTransitioning && ti.opts != null && ti.opts.skipIfBusy) {
            return Promise.resolve(false);
        }
        const promise = new Promise((resolve, reject) => {
            ti.resolve = resolve;
            ti.reject = reject;
        });
        ti.done = done;
        if (ti.insertViews && ti.insertViews.length === 0) {
            ti.insertViews = undefined;
        }
        this.transInstr.push(ti);
        this.nextTrns();
        return promise;
    }
    success(result, ti) {
        if (this.destroyed) {
            this.fireError("nav controller was destroyed", ti);
            return;
        }
        if (ti.done) {
            ti.done(result.hasCompleted, result.requiresTransition, result.enteringView, result.leavingView, result.direction);
        }
        ti.resolve(result.hasCompleted);
        if (ti.opts.updateURL !== false && this.useRouter) {
            const router = this.win.document.querySelector("ion-router");
            if (router) {
                const direction = result.direction === "back" ? "back" : "forward";
                router.navChanged(direction);
            }
        }
    }
    failed(rejectReason, ti) {
        if (this.destroyed) {
            this.fireError("nav controller was destroyed", ti);
            return;
        }
        this.transInstr.length = 0;
        this.fireError(rejectReason, ti);
    }
    fireError(rejectReason, ti) {
        if (ti.done) {
            ti.done(false, false, rejectReason);
        }
        if (ti.reject && !this.destroyed) {
            ti.reject(rejectReason);
        }
        else {
            ti.resolve(false);
        }
    }
    nextTrns() {
        if (this.isTransitioning) {
            return false;
        }
        const ti = this.transInstr.shift();
        if (!ti) {
            return false;
        }
        this.runTransition(ti);
        return true;
    }
    async runTransition(ti) {
        try {
            this.ionNavWillChange.emit();
            this.isTransitioning = true;
            this.prepareTI(ti);
            const leavingView = this.getActiveSync();
            const enteringView = this.getEnteringView(ti, leavingView);
            if (!leavingView && !enteringView) {
                throw new Error("no views in the stack to be removed");
            }
            if (enteringView && enteringView.state === VIEW_STATE_NEW) {
                await enteringView.init(this.el);
            }
            this.postViewInit(enteringView, leavingView, ti);
            const requiresTransition = (ti.enteringRequiresTransition || ti.leavingRequiresTransition) &&
                enteringView !== leavingView;
            const result = requiresTransition
                ? await this.transition(enteringView, leavingView, ti)
                : {
                    hasCompleted: true,
                    requiresTransition: false
                };
            this.success(result, ti);
            this.ionNavDidChange.emit();
        }
        catch (rejectReason) {
            this.failed(rejectReason, ti);
        }
        this.isTransitioning = false;
        this.nextTrns();
    }
    prepareTI(ti) {
        const viewsLength = this.views.length;
        ti.opts = ti.opts || {};
        if (ti.opts.delegate === undefined) {
            ti.opts.delegate = this.delegate;
        }
        if (ti.removeView !== undefined) {
            assert(ti.removeStart !== undefined, "removeView needs removeStart");
            assert(ti.removeCount !== undefined, "removeView needs removeCount");
            const index = this.views.indexOf(ti.removeView);
            if (index < 0) {
                throw new Error("removeView was not found");
            }
            ti.removeStart += index;
        }
        if (ti.removeStart !== undefined) {
            if (ti.removeStart < 0) {
                ti.removeStart = viewsLength - 1;
            }
            if (ti.removeCount < 0) {
                ti.removeCount = viewsLength - ti.removeStart;
            }
            ti.leavingRequiresTransition =
                ti.removeCount > 0 && ti.removeStart + ti.removeCount === viewsLength;
        }
        if (ti.insertViews) {
            if (ti.insertStart < 0 || ti.insertStart > viewsLength) {
                ti.insertStart = viewsLength;
            }
            ti.enteringRequiresTransition = ti.insertStart === viewsLength;
        }
        const insertViews = ti.insertViews;
        if (!insertViews) {
            return;
        }
        assert(insertViews.length > 0, "length can not be zero");
        const viewControllers = convertToViews(insertViews);
        if (viewControllers.length === 0) {
            throw new Error("invalid views to insert");
        }
        for (const view of viewControllers) {
            view.delegate = ti.opts.delegate;
            const nav = view.nav;
            if (nav && nav !== this) {
                throw new Error("inserted view was already inserted");
            }
            if (view.state === VIEW_STATE_DESTROYED) {
                throw new Error("inserted view was already destroyed");
            }
        }
        ti.insertViews = viewControllers;
    }
    getEnteringView(ti, leavingView) {
        const insertViews = ti.insertViews;
        if (insertViews !== undefined) {
            return insertViews[insertViews.length - 1];
        }
        const removeStart = ti.removeStart;
        if (removeStart !== undefined) {
            const views = this.views;
            const removeEnd = removeStart + ti.removeCount;
            for (let i = views.length - 1; i >= 0; i--) {
                const view = views[i];
                if ((i < removeStart || i >= removeEnd) && view !== leavingView) {
                    return view;
                }
            }
        }
        return undefined;
    }
    postViewInit(enteringView, leavingView, ti) {
        assert(leavingView || enteringView, "Both leavingView and enteringView are null");
        assert(ti.resolve, "resolve must be valid");
        assert(ti.reject, "reject must be valid");
        const opts = ti.opts;
        const insertViews = ti.insertViews;
        const removeStart = ti.removeStart;
        const removeCount = ti.removeCount;
        let destroyQueue;
        if (removeStart !== undefined && removeCount !== undefined) {
            assert(removeStart >= 0, "removeStart can not be negative");
            assert(removeCount >= 0, "removeCount can not be negative");
            destroyQueue = [];
            for (let i = 0; i < removeCount; i++) {
                const view = this.views[i + removeStart];
                if (view && view !== enteringView && view !== leavingView) {
                    destroyQueue.push(view);
                }
            }
            opts.direction = opts.direction || "back";
        }
        const finalBalance = this.views.length +
            (insertViews !== undefined ? insertViews.length : 0) -
            (removeCount !== undefined ? removeCount : 0);
        assert(finalBalance >= 0, "final balance can not be negative");
        if (finalBalance === 0) {
            console.warn(`You can't remove all the pages in the navigation stack. nav.pop() is probably called too many times.`, this, this.el);
            throw new Error("navigation stack needs at least one root page");
        }
        if (insertViews) {
            let insertIndex = ti.insertStart;
            for (const view of insertViews) {
                this.insertViewAt(view, insertIndex);
                insertIndex++;
            }
            if (ti.enteringRequiresTransition) {
                opts.direction = opts.direction || "forward";
            }
        }
        if (destroyQueue && destroyQueue.length > 0) {
            for (const view of destroyQueue) {
                lifecycle(view.element, LIFECYCLE_WILL_LEAVE);
                lifecycle(view.element, LIFECYCLE_DID_LEAVE);
                lifecycle(view.element, LIFECYCLE_WILL_UNLOAD);
            }
            for (const view of destroyQueue) {
                this.destroyView(view);
            }
        }
    }
    async transition(enteringView, leavingView, ti) {
        const opts = ti.opts;
        const progressCallback = opts.progressAnimation
            ? (ani) => this.sbAni = ani
            : undefined;
        const enteringEl = enteringView.element;
        const leavingEl = leavingView && leavingView.element;
        const animationOpts = Object.assign({ mode: this.mode, showGoBack: this.canGoBackSync(enteringView), queue: this.queue, window: this.win, baseEl: this.el, animationBuilder: this.animation || opts.animationBuilder || this.config.get("navAnimation"), progressCallback, animated: this.animated && this.config.getBoolean("animated", true), enteringEl,
            leavingEl }, opts);
        const { hasCompleted } = await transition(animationOpts);
        return this.transitionFinish(hasCompleted, enteringView, leavingView, opts);
    }
    transitionFinish(hasCompleted, enteringView, leavingView, opts) {
        const cleanupView = hasCompleted ? enteringView : leavingView;
        if (cleanupView) {
            this.cleanup(cleanupView);
        }
        return {
            hasCompleted,
            requiresTransition: true,
            enteringView,
            leavingView,
            direction: opts.direction
        };
    }
    insertViewAt(view, index) {
        const views = this.views;
        const existingIndex = views.indexOf(view);
        if (existingIndex > -1) {
            assert(view.nav === this, "view is not part of the nav");
            views.splice(index, 0, views.splice(existingIndex, 1)[0]);
        }
        else {
            assert(!view.nav, "nav is used");
            view.nav = this;
            views.splice(index, 0, view);
        }
    }
    removeView(view) {
        assert(view.state === VIEW_STATE_ATTACHED || view.state === VIEW_STATE_DESTROYED, "view state should be loaded or destroyed");
        const views = this.views;
        const index = views.indexOf(view);
        assert(index > -1, "view must be part of the stack");
        if (index >= 0) {
            views.splice(index, 1);
        }
    }
    destroyView(view) {
        view._destroy();
        this.removeView(view);
    }
    cleanup(activeView) {
        if (this.destroyed) {
            return;
        }
        const views = this.views;
        const activeViewIndex = views.indexOf(activeView);
        for (let i = views.length - 1; i >= 0; i--) {
            const view = views[i];
            const element = view.element;
            if (i > activeViewIndex) {
                lifecycle(element, LIFECYCLE_WILL_UNLOAD);
                this.destroyView(view);
            }
            else if (i < activeViewIndex) {
                setPageHidden(element, true);
            }
        }
    }
    canStart() {
        return (!!this.swipeGesture &&
            !this.isTransitioning &&
            this.transInstr.length === 0 &&
            this.canGoBackSync());
    }
    onStart() {
        this.queueTrns({
            removeStart: -1,
            removeCount: 1,
            opts: {
                direction: "back",
                progressAnimation: true
            }
        }, undefined);
    }
    onMove(stepValue) {
        if (this.sbAni) {
            this.sbAni.progressStep(stepValue);
        }
    }
    onEnd(shouldComplete, stepValue, dur) {
        if (this.sbAni) {
            this.sbAni.progressEnd(shouldComplete, stepValue, dur);
        }
    }
    render() {
        return (h("slot", null));
    }
    static get is() { return "ion-nav"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "animated": {
                "type": Boolean,
                "attr": "animated"
            },
            "animation": {
                "type": "Any",
                "attr": "animation"
            },
            "canGoBack": {
                "method": true
            },
            "config": {
                "context": "config"
            },
            "delegate": {
                "type": "Any",
                "attr": "delegate"
            },
            "el": {
                "elementRef": true
            },
            "getActive": {
                "method": true
            },
            "getByIndex": {
                "method": true
            },
            "getPrevious": {
                "method": true
            },
            "getRouteId": {
                "method": true
            },
            "insert": {
                "method": true
            },
            "insertPages": {
                "method": true
            },
            "pop": {
                "method": true
            },
            "popTo": {
                "method": true
            },
            "popToRoot": {
                "method": true
            },
            "push": {
                "method": true
            },
            "queue": {
                "context": "queue"
            },
            "removeIndex": {
                "method": true
            },
            "root": {
                "type": String,
                "attr": "root",
                "watchCallbacks": ["rootChanged"]
            },
            "rootParams": {
                "type": "Any",
                "attr": "root-params"
            },
            "setPages": {
                "method": true
            },
            "setRoot": {
                "method": true
            },
            "setRouteId": {
                "method": true
            },
            "swipeGesture": {
                "type": Boolean,
                "attr": "swipe-gesture",
                "mutable": true,
                "watchCallbacks": ["swipeGestureChanged"]
            },
            "win": {
                "context": "window"
            }
        };
    }
    static get events() {
        return [{
                "name": "ionNavWillLoad",
                "method": "ionNavWillLoad",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionNavWillChange",
                "method": "ionNavWillChange",
                "bubbles": false,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionNavDidChange",
                "method": "ionNavDidChange",
                "bubbles": false,
                "cancelable": true,
                "composed": true
            }];
    }
    static get style() { return ":host{left:0;right:0;top:0;bottom:0;position:absolute;contain:layout size style;overflow:hidden;z-index:0}"; }
}

class NavPop {
    pop() {
        const nav = this.el.closest("ion-nav");
        if (nav) {
            nav.pop({ skipIfBusy: true });
        }
    }
    static get is() { return "ion-nav-pop"; }
    static get properties() {
        return {
            "el": {
                "elementRef": true
            }
        };
    }
    static get listeners() {
        return [{
                "name": "child:click",
                "method": "pop"
            }];
    }
}

class NavPush {
    push() {
        const nav = this.el.closest("ion-nav");
        const toPush = this.component;
        if (nav && toPush !== undefined) {
            nav.push(toPush, this.componentProps, { skipIfBusy: true });
        }
    }
    static get is() { return "ion-nav-push"; }
    static get properties() {
        return {
            "component": {
                "type": String,
                "attr": "component"
            },
            "componentProps": {
                "type": "Any",
                "attr": "component-props"
            },
            "el": {
                "elementRef": true
            }
        };
    }
    static get listeners() {
        return [{
                "name": "child:click",
                "method": "push"
            }];
    }
}

class NavSetRoot {
    push() {
        const nav = this.el.closest("ion-nav");
        const toPush = this.component;
        if (nav && toPush !== undefined) {
            nav.setRoot(toPush, this.componentProps, { skipIfBusy: true });
        }
    }
    static get is() { return "ion-nav-set-root"; }
    static get properties() {
        return {
            "component": {
                "type": String,
                "attr": "component"
            },
            "componentProps": {
                "type": "Any",
                "attr": "component-props"
            },
            "el": {
                "elementRef": true
            }
        };
    }
    static get listeners() {
        return [{
                "name": "child:click",
                "method": "push"
            }];
    }
}

class Radio {
    constructor() {
        this.inputId = `ion-rb-${radioButtonIds++}`;
        this.name = this.inputId;
        this.disabled = false;
        this.checked = false;
        this.onFocus = () => {
            this.ionFocus.emit();
        };
        this.onBlur = () => {
            this.ionBlur.emit();
        };
    }
    colorChanged() {
        this.emitStyle();
    }
    checkedChanged(isChecked) {
        if (isChecked) {
            this.ionSelect.emit({
                checked: true,
                value: this.value
            });
        }
        this.emitStyle();
    }
    disabledChanged() {
        this.emitStyle();
    }
    componentWillLoad() {
        if (this.value === undefined) {
            this.value = this.inputId;
        }
        this.emitStyle();
    }
    componentDidLoad() {
        this.ionRadioDidLoad.emit();
    }
    componentDidUnload() {
        this.ionRadioDidUnload.emit();
    }
    onClick() {
        if (this.checked) {
            this.ionDeselect.emit();
        }
        else {
            this.checked = true;
        }
    }
    emitStyle() {
        this.ionStyle.emit({
            "radio-checked": this.checked,
            "interactive-disabled": this.disabled,
        });
    }
    hostData() {
        const { inputId, disabled, checked, color, el } = this;
        const labelId = inputId + "-lbl";
        const label = findItemLabel(el);
        if (label) {
            label.id = labelId;
        }
        return {
            "role": "radio",
            "aria-disabled": disabled ? "true" : null,
            "aria-checked": `${checked}`,
            "aria-labelledby": labelId,
            class: Object.assign({}, createColorClasses(color), { [`${this.mode}`]: true, "in-item": hostContext("ion-item", el), "interactive": true, "radio-checked": checked, "radio-disabled": disabled })
        };
    }
    render() {
        return [
            h("div", { class: "radio-icon" }, h("div", { class: "radio-inner" })),
            h("button", { type: "button", onFocus: this.onFocus, onBlur: this.onBlur, disabled: this.disabled }),
        ];
    }
    static get is() { return "ion-radio"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "checked": {
                "type": Boolean,
                "attr": "checked",
                "mutable": true,
                "watchCallbacks": ["checkedChanged"]
            },
            "color": {
                "type": String,
                "attr": "color",
                "watchCallbacks": ["colorChanged"]
            },
            "disabled": {
                "type": Boolean,
                "attr": "disabled",
                "watchCallbacks": ["disabledChanged"]
            },
            "el": {
                "elementRef": true
            },
            "mode": {
                "type": String,
                "attr": "mode"
            },
            "name": {
                "type": String,
                "attr": "name"
            },
            "value": {
                "type": "Any",
                "attr": "value",
                "mutable": true
            }
        };
    }
    static get events() {
        return [{
                "name": "ionRadioDidLoad",
                "method": "ionRadioDidLoad",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionRadioDidUnload",
                "method": "ionRadioDidUnload",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionStyle",
                "method": "ionStyle",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionSelect",
                "method": "ionSelect",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionDeselect",
                "method": "ionDeselect",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionFocus",
                "method": "ionFocus",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionBlur",
                "method": "ionBlur",
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
    static get style() { return ":host{display:inline-block;position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:2}:host(.radio-disabled){pointer-events:none}.radio-icon{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;contain:layout size style}.radio-icon,button{width:100%;height:100%}button{left:0;top:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;position:absolute;border:0;background:transparent;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:none}:host-context([dir=rtl]) button{right:0}button::-moz-focus-inner{border:0}.radio-icon,.radio-inner{-webkit-box-sizing:border-box;box-sizing:border-box}:host{--color-checked:var(--ion-color-primary,#3880ff);width:15px;height:24px}:host(.ion-color.radio-checked) .radio-inner{border-color:var(--ion-color-base)}.item-radio.item-ios ion-label{margin-left:0}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.item-radio.item-ios ion-label{margin-left:unset;-webkit-margin-start:0;margin-inline-start:0}}.radio-inner{width:33%;height:50%}:host(.radio-checked) .radio-inner{-webkit-transform:rotate(45deg);transform:rotate(45deg);border-width:2px;border-top-width:0;border-left-width:0;border-style:solid;border-color:var(--color-checked)}:host(.radio-disabled){opacity:.3}:host(.ion-focused) .radio-icon:after{border-radius:50%;left:-9px;top:-8px;display:block;position:absolute;width:36px;height:36px;background:var(--ion-color-primary-tint,#4c8dff);content:\"\";opacity:.2}:host([dir=rtl].ion-focused) .radio-icon:after{right:-9px}:host(.in-item){margin-left:8px;margin-right:11px;margin-top:8px;margin-bottom:8px;display:block;position:static}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host(.in-item){margin-left:unset;margin-right:unset;-webkit-margin-start:8px;margin-inline-start:8px;-webkit-margin-end:11px;margin-inline-end:11px}}:host(.in-item[slot=start]){margin-left:3px;margin-right:21px;margin-top:8px;margin-bottom:8px}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host(.in-item[slot=start]){margin-left:unset;margin-right:unset;-webkit-margin-start:3px;margin-inline-start:3px;-webkit-margin-end:21px;margin-inline-end:21px}}"; }
    static get styleMode() { return "ios"; }
}
let radioButtonIds = 0;

class RadioGroup {
    constructor() {
        this.inputId = `ion-rg-${radioGroupIds++}`;
        this.labelId = `${this.inputId}-lbl`;
        this.radios = [];
        this.allowEmptySelection = false;
        this.name = this.inputId;
    }
    valueChanged(value) {
        this.updateRadios();
        this.ionChange.emit({ value });
    }
    onRadioDidLoad(ev) {
        const radio = ev.target;
        radio.name = this.name;
        this.radios.push(radio);
        if (this.value == null && radio.checked) {
            this.value = radio.value;
        }
        else {
            this.updateRadios();
        }
    }
    onRadioDidUnload(ev) {
        const index = this.radios.indexOf(ev.target);
        if (index > -1) {
            this.radios.splice(index, 1);
        }
    }
    onRadioSelect(ev) {
        const selectedRadio = ev.target;
        if (selectedRadio) {
            this.value = selectedRadio.value;
        }
    }
    onRadioDeselect(ev) {
        if (this.allowEmptySelection) {
            const selectedRadio = ev.target;
            if (selectedRadio) {
                selectedRadio.checked = false;
                this.value = undefined;
            }
        }
    }
    componentDidLoad() {
        let header = this.el.querySelector("ion-list-header");
        if (!header) {
            header = this.el.querySelector("ion-item-divider");
        }
        if (header) {
            const label = header.querySelector("ion-label");
            if (label) {
                this.labelId = label.id = this.name + "-lbl";
            }
        }
        this.updateRadios();
    }
    updateRadios() {
        const value = this.value;
        let hasChecked = false;
        for (const radio of this.radios) {
            if (!hasChecked && radio.value === value) {
                hasChecked = true;
                radio.checked = true;
            }
            else {
                radio.checked = false;
            }
        }
    }
    hostData() {
        return {
            "role": "radiogroup",
            "aria-labelledby": this.labelId,
            class: {
                [`${this.mode}`]: true,
            }
        };
    }
    static get is() { return "ion-radio-group"; }
    static get properties() {
        return {
            "allowEmptySelection": {
                "type": Boolean,
                "attr": "allow-empty-selection"
            },
            "el": {
                "elementRef": true
            },
            "name": {
                "type": String,
                "attr": "name"
            },
            "value": {
                "type": "Any",
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
            }];
    }
    static get listeners() {
        return [{
                "name": "ionRadioDidLoad",
                "method": "onRadioDidLoad"
            }, {
                "name": "ionRadioDidUnload",
                "method": "onRadioDidUnload"
            }, {
                "name": "ionSelect",
                "method": "onRadioSelect"
            }, {
                "name": "ionDeselect",
                "method": "onRadioDeselect"
            }];
    }
}
let radioGroupIds = 0;

class Slides {
    constructor() {
        this.didInit = false;
        this.swiper = new Promise(resolve => { this.readySwiper = resolve; });
        this.options = {};
        this.pager = false;
        this.scrollbar = false;
    }
    async optionsChanged() {
        if (this.didInit) {
            const swiper = await this.getSwiper();
            Object.assign(swiper.params, this.options);
            await this.update();
        }
    }
    componentDidLoad() {
        rIC(() => this.initSwiper());
    }
    async componentDidUnload() {
        const swiper = await this.getSwiper();
        swiper.destroy(true, true);
    }
    onSlideChanged() {
        if (this.didInit) {
            this.update();
        }
    }
    async update() {
        const swiper = await this.getSwiper();
        swiper.update();
    }
    async updateAutoHeight(speed) {
        const swiper = await this.getSwiper();
        swiper.updateAutoHeight(speed);
    }
    async slideTo(index, speed, runCallbacks) {
        const swiper = await this.getSwiper();
        swiper.slideTo(index, speed, runCallbacks);
    }
    async slideNext(speed, runCallbacks) {
        const swiper = await this.getSwiper();
        swiper.slideNext(speed, runCallbacks);
    }
    async slidePrev(speed, runCallbacks) {
        const swiper = await this.getSwiper();
        swiper.slidePrev(speed, runCallbacks);
    }
    async getActiveIndex() {
        const swiper = await this.getSwiper();
        return swiper.activeIndex;
    }
    async getPreviousIndex() {
        const swiper = await this.getSwiper();
        return swiper.previousIndex;
    }
    async length() {
        const swiper = await this.getSwiper();
        return swiper.slides.length;
    }
    async isEnd() {
        const swiper = await this.getSwiper();
        return swiper.isEnd;
    }
    async isBeginning() {
        const swiper = await this.getSwiper();
        return swiper.isBeginning;
    }
    async startAutoplay() {
        const swiper = await this.getSwiper();
        if (swiper.autoplay) {
            swiper.autoplay.start();
        }
    }
    async stopAutoplay() {
        const swiper = await this.getSwiper();
        if (swiper.autoplay) {
            swiper.autoplay.stop();
        }
    }
    async lockSwipeToNext(lock) {
        const swiper = await this.getSwiper();
        swiper.allowSlideNext = !lock;
    }
    async lockSwipeToPrev(lock) {
        const swiper = await this.getSwiper();
        swiper.allowSlidePrev = !lock;
    }
    async lockSwipes(lock) {
        const swiper = await this.getSwiper();
        swiper.allowSlideNext = !lock;
        swiper.allowSlidePrev = !lock;
        swiper.allowTouchMove = !lock;
    }
    async initSwiper() {
        const finalOptions = this.normalizeOptions();
        const { Swiper } = await import('./chunk-d7ebbe31.js');
        const swiper = new Swiper(this.el, finalOptions);
        this.didInit = true;
        this.readySwiper(swiper);
    }
    getSwiper() {
        return this.swiper;
    }
    normalizeOptions() {
        const swiperOptions = {
            effect: undefined,
            direction: "horizontal",
            initialSlide: 0,
            loop: false,
            parallax: false,
            slidesPerView: 1,
            spaceBetween: 0,
            speed: 300,
            slidesPerColumn: 1,
            slidesPerColumnFill: "column",
            slidesPerGroup: 1,
            centeredSlides: false,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            touchEventsTarget: "container",
            autoplay: false,
            freeMode: false,
            freeModeMomentum: true,
            freeModeMomentumRatio: 1,
            freeModeMomentumBounce: true,
            freeModeMomentumBounceRatio: 1,
            freeModeMomentumVelocityRatio: 1,
            freeModeSticky: false,
            freeModeMinimumVelocity: 0.02,
            autoHeight: false,
            setWrapperSize: false,
            zoom: {
                maxRatio: 3,
                minRatio: 1,
                toggle: true,
            },
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: true,
            shortSwipes: true,
            longSwipes: true,
            longSwipesRatio: 0.5,
            longSwipesMs: 300,
            followFinger: true,
            threshold: 0,
            touchMoveStopPropagation: true,
            touchReleaseOnEdges: false,
            iOSEdgeSwipeDetection: false,
            iOSEdgeSwipeThreshold: 20,
            resistance: true,
            resistanceRatio: 0.85,
            watchSlidesProgress: false,
            watchSlidesVisibility: false,
            preventClicks: true,
            preventClicksPropagation: true,
            slideToClickedSlide: false,
            loopAdditionalSlides: 0,
            noSwiping: true,
            runCallbacksOnInit: true,
            coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true
            },
            flipEffect: {
                slideShadows: true,
                limitRotation: true
            },
            cubeEffect: {
                slideShadows: true,
                shadow: true,
                shadowOffset: 20,
                shadowScale: 0.94
            },
            fadeEffect: {
                crossfade: false
            },
            a11y: {
                prevSlideMessage: "Previous slide",
                nextSlideMessage: "Next slide",
                firstSlideMessage: "This is the first slide",
                lastSlideMessage: "This is the last slide"
            }
        };
        if (this.pager) {
            swiperOptions.pagination = {
                el: this.paginationEl,
                type: "bullets",
                clickable: false,
                hideOnClick: false,
            };
        }
        if (this.scrollbar) {
            swiperOptions.scrollbar = {
                el: this.scrollbarEl,
                hide: true,
            };
        }
        const eventOptions = {
            on: {
                init: () => {
                    setTimeout(() => {
                        this.ionSlidesDidLoad.emit();
                    }, 20);
                },
                slideChangeTransitionStart: this.ionSlideWillChange.emit,
                slideChangeTransitionEnd: this.ionSlideDidChange.emit,
                slideNextTransitionStart: this.ionSlideNextStart.emit,
                slidePrevTransitionStart: this.ionSlidePrevStart.emit,
                slideNextTransitionEnd: this.ionSlideNextEnd.emit,
                slidePrevTransitionEnd: this.ionSlidePrevEnd.emit,
                transitionStart: this.ionSlideTransitionStart.emit,
                transitionEnd: this.ionSlideTransitionEnd.emit,
                sliderMove: this.ionSlideDrag.emit,
                reachBeginning: this.ionSlideReachStart.emit,
                reachEnd: this.ionSlideReachEnd.emit,
                touchStart: this.ionSlideTouchStart.emit,
                touchEnd: this.ionSlideTouchEnd.emit,
                tap: this.ionSlideTap.emit,
                doubleTap: this.ionSlideDoubleTap.emit
            }
        };
        const customEvents = (!!this.options && !!this.options.on) ? this.options.on : {};
        const mergedEventOptions = { on: Object.assign({}, customEvents, eventOptions.on) };
        return Object.assign({}, swiperOptions, this.options, mergedEventOptions);
    }
    hostData() {
        return {
            class: {
                [`${this.mode}`]: true,
                [`slides-${this.mode}`]: true,
                "swiper-container": true
            }
        };
    }
    render() {
        return [
            h("div", { class: "swiper-wrapper" }, h("slot", null)),
            this.pager && h("div", { class: "swiper-pagination", ref: el => this.paginationEl = el }),
            this.scrollbar && h("div", { class: "swiper-scrollbar", ref: el => this.scrollbarEl = el })
        ];
    }
    static get is() { return "ion-slides"; }
    static get properties() {
        return {
            "el": {
                "elementRef": true
            },
            "getActiveIndex": {
                "method": true
            },
            "getPreviousIndex": {
                "method": true
            },
            "isBeginning": {
                "method": true
            },
            "isEnd": {
                "method": true
            },
            "length": {
                "method": true
            },
            "lockSwipes": {
                "method": true
            },
            "lockSwipeToNext": {
                "method": true
            },
            "lockSwipeToPrev": {
                "method": true
            },
            "mode": {
                "type": String,
                "attr": "mode"
            },
            "options": {
                "type": "Any",
                "attr": "options",
                "watchCallbacks": ["optionsChanged"]
            },
            "pager": {
                "type": Boolean,
                "attr": "pager"
            },
            "scrollbar": {
                "type": Boolean,
                "attr": "scrollbar"
            },
            "slideNext": {
                "method": true
            },
            "slidePrev": {
                "method": true
            },
            "slideTo": {
                "method": true
            },
            "startAutoplay": {
                "method": true
            },
            "stopAutoplay": {
                "method": true
            },
            "update": {
                "method": true
            },
            "updateAutoHeight": {
                "method": true
            }
        };
    }
    static get events() {
        return [{
                "name": "ionSlidesDidLoad",
                "method": "ionSlidesDidLoad",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionSlideTap",
                "method": "ionSlideTap",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionSlideDoubleTap",
                "method": "ionSlideDoubleTap",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionSlideWillChange",
                "method": "ionSlideWillChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionSlideDidChange",
                "method": "ionSlideDidChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionSlideNextStart",
                "method": "ionSlideNextStart",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionSlidePrevStart",
                "method": "ionSlidePrevStart",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionSlideNextEnd",
                "method": "ionSlideNextEnd",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionSlidePrevEnd",
                "method": "ionSlidePrevEnd",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionSlideTransitionStart",
                "method": "ionSlideTransitionStart",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionSlideTransitionEnd",
                "method": "ionSlideTransitionEnd",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionSlideDrag",
                "method": "ionSlideDrag",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionSlideReachStart",
                "method": "ionSlideReachStart",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionSlideReachEnd",
                "method": "ionSlideReachEnd",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionSlideTouchStart",
                "method": "ionSlideTouchStart",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionSlideTouchEnd",
                "method": "ionSlideTouchEnd",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }];
    }
    static get listeners() {
        return [{
                "name": "ionSlideChanged",
                "method": "onSlideChanged"
            }];
    }
    static get style() { return ".swiper-container{margin:0 auto;position:relative;overflow:hidden;list-style:none;padding:0;z-index:1}.swiper-container-no-flexbox .swiper-slide{float:left}.swiper-container-vertical>.swiper-wrapper{-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}.swiper-wrapper{position:relative;width:100%;height:100%;z-index:1;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-transition-property:-webkit-transform;transition-property:-webkit-transform;-o-transition-property:transform;transition-property:transform;transition-property:transform,-webkit-transform;-webkit-box-sizing:content-box;box-sizing:content-box}.swiper-container-android .swiper-slide,.swiper-wrapper{-webkit-transform:translateZ(0);transform:translateZ(0)}.swiper-container-multirow>.swiper-wrapper{-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap}.swiper-container-free-mode>.swiper-wrapper{-webkit-transition-timing-function:ease-out;-o-transition-timing-function:ease-out;transition-timing-function:ease-out;margin:0 auto}.swiper-slide{-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;width:100%;height:100%;position:relative;-webkit-transition-property:-webkit-transform;transition-property:-webkit-transform;-o-transition-property:transform;transition-property:transform;transition-property:transform,-webkit-transform}.swiper-invisible-blank-slide{visibility:hidden}.swiper-container-autoheight,.swiper-container-autoheight .swiper-slide{height:auto}.swiper-container-autoheight .swiper-wrapper{-webkit-box-align:start;-webkit-align-items:flex-start;-ms-flex-align:start;align-items:flex-start;-webkit-transition-property:height,-webkit-transform;transition-property:height,-webkit-transform;-o-transition-property:transform,height;transition-property:transform,height;transition-property:transform,height,-webkit-transform}.swiper-container-3d{-webkit-perspective:1200px;perspective:1200px}.swiper-container-3d .swiper-cube-shadow,.swiper-container-3d .swiper-slide,.swiper-container-3d .swiper-slide-shadow-bottom,.swiper-container-3d .swiper-slide-shadow-left,.swiper-container-3d .swiper-slide-shadow-right,.swiper-container-3d .swiper-slide-shadow-top,.swiper-container-3d .swiper-wrapper{-webkit-transform-style:preserve-3d;transform-style:preserve-3d}.swiper-container-3d .swiper-slide-shadow-bottom,.swiper-container-3d .swiper-slide-shadow-left,.swiper-container-3d .swiper-slide-shadow-right,.swiper-container-3d .swiper-slide-shadow-top{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:10}.swiper-container-3d .swiper-slide-shadow-left{background-image:-webkit-gradient(linear,right top,left top,from(rgba(0,0,0,.5)),to(transparent));background-image:-webkit-linear-gradient(right,rgba(0,0,0,.5),transparent);background-image:-o-linear-gradient(right,rgba(0,0,0,.5),transparent);background-image:linear-gradient(270deg,rgba(0,0,0,.5),transparent)}.swiper-container-3d .swiper-slide-shadow-right{background-image:-webkit-gradient(linear,left top,right top,from(rgba(0,0,0,.5)),to(transparent));background-image:-webkit-linear-gradient(left,rgba(0,0,0,.5),transparent);background-image:-o-linear-gradient(left,rgba(0,0,0,.5),transparent);background-image:linear-gradient(90deg,rgba(0,0,0,.5),transparent)}.swiper-container-3d .swiper-slide-shadow-top{background-image:-webkit-gradient(linear,left bottom,left top,from(rgba(0,0,0,.5)),to(transparent));background-image:-webkit-linear-gradient(bottom,rgba(0,0,0,.5),transparent);background-image:-o-linear-gradient(bottom,rgba(0,0,0,.5),transparent);background-image:linear-gradient(0deg,rgba(0,0,0,.5),transparent)}.swiper-container-3d .swiper-slide-shadow-bottom{background-image:-webkit-gradient(linear,left top,left bottom,from(rgba(0,0,0,.5)),to(transparent));background-image:-webkit-linear-gradient(top,rgba(0,0,0,.5),transparent);background-image:-o-linear-gradient(top,rgba(0,0,0,.5),transparent);background-image:linear-gradient(180deg,rgba(0,0,0,.5),transparent)}.swiper-container-wp8-horizontal,.swiper-container-wp8-horizontal>.swiper-wrapper{-ms-touch-action:pan-y;touch-action:pan-y}.swiper-container-wp8-vertical,.swiper-container-wp8-vertical>.swiper-wrapper{-ms-touch-action:pan-x;touch-action:pan-x}.swiper-button-next,.swiper-button-prev{position:absolute;top:50%;width:27px;height:44px;margin-top:-22px;z-index:10;cursor:pointer;background-size:27px 44px;background-position:50%;background-repeat:no-repeat}.swiper-button-next.swiper-button-disabled,.swiper-button-prev.swiper-button-disabled{opacity:.35;cursor:auto;pointer-events:none}.swiper-button-prev,.swiper-container-rtl .swiper-button-next{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23007aff'%2F%3E%3C%2Fsvg%3E\");left:10px;right:auto}.swiper-button-next,.swiper-container-rtl .swiper-button-prev{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23007aff'%2F%3E%3C%2Fsvg%3E\");right:10px;left:auto}.swiper-button-prev.swiper-button-white,.swiper-container-rtl .swiper-button-next.swiper-button-white{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23ffffff'%2F%3E%3C%2Fsvg%3E\")}.swiper-button-next.swiper-button-white,.swiper-container-rtl .swiper-button-prev.swiper-button-white{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23ffffff'%2F%3E%3C%2Fsvg%3E\")}.swiper-button-prev.swiper-button-black,.swiper-container-rtl .swiper-button-next.swiper-button-black{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23000000'%2F%3E%3C%2Fsvg%3E\")}.swiper-button-next.swiper-button-black,.swiper-container-rtl .swiper-button-prev.swiper-button-black{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23000000'%2F%3E%3C%2Fsvg%3E\")}.swiper-button-lock{display:none}.swiper-pagination{position:absolute;text-align:center;-webkit-transition:opacity .3s;-o-transition:.3s opacity;transition:opacity .3s;-webkit-transform:translateZ(0);transform:translateZ(0);z-index:10}.swiper-pagination.swiper-pagination-hidden{opacity:0}.swiper-container-horizontal>.swiper-pagination-bullets,.swiper-pagination-custom,.swiper-pagination-fraction{bottom:10px;left:0;width:100%}.swiper-pagination-bullets-dynamic{overflow:hidden;font-size:0}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{-webkit-transform:scale(.33);-ms-transform:scale(.33);transform:scale(.33);position:relative}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active,.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-main{-webkit-transform:scale(1);-ms-transform:scale(1);transform:scale(1)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev{-webkit-transform:scale(.66);-ms-transform:scale(.66);transform:scale(.66)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev-prev{-webkit-transform:scale(.33);-ms-transform:scale(.33);transform:scale(.33)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next{-webkit-transform:scale(.66);-ms-transform:scale(.66);transform:scale(.66)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next-next{-webkit-transform:scale(.33);-ms-transform:scale(.33);transform:scale(.33)}.swiper-pagination-bullet{width:8px;height:8px;display:inline-block;border-radius:100%;background:#000;opacity:.2}button.swiper-pagination-bullet{border:none;margin:0;padding:0;-webkit-box-shadow:none;box-shadow:none;-webkit-appearance:none;-moz-appearance:none;appearance:none}.swiper-pagination-clickable .swiper-pagination-bullet{cursor:pointer}.swiper-pagination-bullet-active{opacity:1;background:#007aff}.swiper-container-vertical>.swiper-pagination-bullets{right:10px;top:50%;-webkit-transform:translate3d(0,-50%,0);transform:translate3d(0,-50%,0)}.swiper-container-vertical>.swiper-pagination-bullets .swiper-pagination-bullet{margin:6px 0;display:block}.swiper-container-vertical>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic{top:50%;-webkit-transform:translateY(-50%);-ms-transform:translateY(-50%);transform:translateY(-50%);width:8px}.swiper-container-vertical>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{display:inline-block;-webkit-transition:top .2s,-webkit-transform .2s;transition:top .2s,-webkit-transform .2s;-o-transition:.2s transform,.2s top;transition:transform .2s,top .2s;transition:transform .2s,top .2s,-webkit-transform .2s}.swiper-container-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet{margin:0 4px}.swiper-container-horizontal>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic{left:50%;-webkit-transform:translateX(-50%);-ms-transform:translateX(-50%);transform:translateX(-50%);white-space:nowrap}.swiper-container-horizontal>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{-webkit-transition:left .2s,-webkit-transform .2s;transition:left .2s,-webkit-transform .2s;-o-transition:.2s transform,.2s left;transition:transform .2s,left .2s;transition:transform .2s,left .2s,-webkit-transform .2s}.swiper-container-horizontal.swiper-container-rtl>.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{-webkit-transition:right .2s,-webkit-transform .2s;transition:right .2s,-webkit-transform .2s;-o-transition:.2s transform,.2s right;transition:transform .2s,right .2s;transition:transform .2s,right .2s,-webkit-transform .2s}.swiper-pagination-progressbar{background:rgba(0,0,0,.25);position:absolute}.swiper-pagination-progressbar .swiper-pagination-progressbar-fill{background:#007aff;position:absolute;left:0;top:0;width:100%;height:100%;-webkit-transform:scale(0);-ms-transform:scale(0);transform:scale(0);-webkit-transform-origin:left top;-ms-transform-origin:left top;transform-origin:left top}.swiper-container-rtl .swiper-pagination-progressbar .swiper-pagination-progressbar-fill{-webkit-transform-origin:right top;-ms-transform-origin:right top;transform-origin:right top}.swiper-container-horizontal>.swiper-pagination-progressbar,.swiper-container-vertical>.swiper-pagination-progressbar.swiper-pagination-progressbar-opposite{width:100%;height:4px;left:0;top:0}.swiper-container-horizontal>.swiper-pagination-progressbar.swiper-pagination-progressbar-opposite,.swiper-container-vertical>.swiper-pagination-progressbar{width:4px;height:100%;left:0;top:0}.swiper-pagination-white .swiper-pagination-bullet-active{background:#fff}.swiper-pagination-progressbar.swiper-pagination-white{background:hsla(0,0%,100%,.25)}.swiper-pagination-progressbar.swiper-pagination-white .swiper-pagination-progressbar-fill{background:#fff}.swiper-pagination-black .swiper-pagination-bullet-active{background:#000}.swiper-pagination-progressbar.swiper-pagination-black{background:rgba(0,0,0,.25)}.swiper-pagination-progressbar.swiper-pagination-black .swiper-pagination-progressbar-fill{background:#000}.swiper-pagination-lock{display:none}.swiper-scrollbar{border-radius:10px;position:relative;-ms-touch-action:none;background:rgba(0,0,0,.1)}.swiper-container-horizontal>.swiper-scrollbar{position:absolute;left:1%;bottom:3px;z-index:50;height:5px;width:98%}.swiper-container-vertical>.swiper-scrollbar{position:absolute;right:3px;top:1%;z-index:50;width:5px;height:98%}.swiper-scrollbar-drag{height:100%;width:100%;position:relative;background:rgba(0,0,0,.5);border-radius:10px;left:0;top:0}.swiper-scrollbar-cursor-drag{cursor:move}.swiper-scrollbar-lock{display:none}.swiper-zoom-container{width:100%;height:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;text-align:center}.swiper-zoom-container>canvas,.swiper-zoom-container>img,.swiper-zoom-container>svg{max-width:100%;max-height:100%;-o-object-fit:contain;object-fit:contain}.swiper-slide-zoomed{cursor:move}.swiper-lazy-preloader{width:42px;height:42px;position:absolute;left:50%;top:50%;margin-left:-21px;margin-top:-21px;z-index:10;-webkit-transform-origin:50%;-ms-transform-origin:50%;transform-origin:50%;-webkit-animation:swiper-preloader-spin 1s steps(12,end) infinite;animation:swiper-preloader-spin 1s steps(12,end) infinite}.swiper-lazy-preloader:after{display:block;content:\"\";width:100%;height:100%;background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%20120%20120'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20xmlns%3Axlink%3D'http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink'%3E%3Cdefs%3E%3Cline%20id%3D'l'%20x1%3D'60'%20x2%3D'60'%20y1%3D'7'%20y2%3D'27'%20stroke%3D'%236c6c6c'%20stroke-width%3D'11'%20stroke-linecap%3D'round'%2F%3E%3C%2Fdefs%3E%3Cg%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(30%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(60%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(90%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(120%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(150%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.37'%20transform%3D'rotate(180%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.46'%20transform%3D'rotate(210%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.56'%20transform%3D'rotate(240%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.66'%20transform%3D'rotate(270%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.75'%20transform%3D'rotate(300%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.85'%20transform%3D'rotate(330%2060%2C60)'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E\");background-position:50%;background-size:100%;background-repeat:no-repeat}.swiper-lazy-preloader-white:after{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%20120%20120'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20xmlns%3Axlink%3D'http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink'%3E%3Cdefs%3E%3Cline%20id%3D'l'%20x1%3D'60'%20x2%3D'60'%20y1%3D'7'%20y2%3D'27'%20stroke%3D'%23fff'%20stroke-width%3D'11'%20stroke-linecap%3D'round'%2F%3E%3C%2Fdefs%3E%3Cg%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(30%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(60%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(90%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(120%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(150%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.37'%20transform%3D'rotate(180%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.46'%20transform%3D'rotate(210%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.56'%20transform%3D'rotate(240%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.66'%20transform%3D'rotate(270%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.75'%20transform%3D'rotate(300%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.85'%20transform%3D'rotate(330%2060%2C60)'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E\")}\@-webkit-keyframes swiper-preloader-spin{to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}\@keyframes swiper-preloader-spin{to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}.swiper-container .swiper-notification{position:absolute;left:0;top:0;pointer-events:none;opacity:0;z-index:-1000}.swiper-container-fade.swiper-container-free-mode .swiper-slide{-webkit-transition-timing-function:ease-out;-o-transition-timing-function:ease-out;transition-timing-function:ease-out}.swiper-container-fade .swiper-slide{pointer-events:none;-webkit-transition-property:opacity;-o-transition-property:opacity;transition-property:opacity}.swiper-container-fade .swiper-slide .swiper-slide{pointer-events:none}.swiper-container-fade .swiper-slide-active,.swiper-container-fade .swiper-slide-active .swiper-slide-active{pointer-events:auto}.swiper-container-cube{overflow:visible}.swiper-container-cube .swiper-slide{pointer-events:none;-webkit-backface-visibility:hidden;backface-visibility:hidden;z-index:1;visibility:hidden;-webkit-transform-origin:0 0;-ms-transform-origin:0 0;transform-origin:0 0;width:100%;height:100%}.swiper-container-cube .swiper-slide .swiper-slide{pointer-events:none}.swiper-container-cube.swiper-container-rtl .swiper-slide{-webkit-transform-origin:100% 0;-ms-transform-origin:100% 0;transform-origin:100% 0}.swiper-container-cube .swiper-slide-active,.swiper-container-cube .swiper-slide-active .swiper-slide-active{pointer-events:auto}.swiper-container-cube .swiper-slide-active,.swiper-container-cube .swiper-slide-next,.swiper-container-cube .swiper-slide-next+.swiper-slide,.swiper-container-cube .swiper-slide-prev{pointer-events:auto;visibility:visible}.swiper-container-cube .swiper-slide-shadow-bottom,.swiper-container-cube .swiper-slide-shadow-left,.swiper-container-cube .swiper-slide-shadow-right,.swiper-container-cube .swiper-slide-shadow-top{z-index:0;-webkit-backface-visibility:hidden;backface-visibility:hidden}.swiper-container-cube .swiper-cube-shadow{position:absolute;left:0;bottom:0;width:100%;height:100%;background:#000;opacity:.6;-webkit-filter:blur(50px);filter:blur(50px);z-index:0}.swiper-container-flip{overflow:visible}.swiper-container-flip .swiper-slide{pointer-events:none;-webkit-backface-visibility:hidden;backface-visibility:hidden;z-index:1}.swiper-container-flip .swiper-slide .swiper-slide{pointer-events:none}.swiper-container-flip .swiper-slide-active,.swiper-container-flip .swiper-slide-active .swiper-slide-active{pointer-events:auto}.swiper-container-flip .swiper-slide-shadow-bottom,.swiper-container-flip .swiper-slide-shadow-left,.swiper-container-flip .swiper-slide-shadow-right,.swiper-container-flip .swiper-slide-shadow-top{z-index:0;-webkit-backface-visibility:hidden;backface-visibility:hidden}.swiper-container-coverflow .swiper-wrapper{-ms-perspective:1200px}ion-slides{display:block;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.swiper-pagination-bullet{background:var(--bullet-background)}.swiper-pagination-bullet-active{background:var(--bullet-background-active)}.swiper-pagination-progressbar{background:var(--progress-bar-background)}.swiper-pagination-progressbar .swiper-pagination-progressbar-fill{background:var(--progress-bar-background-active)}.swiper-scrollbar{background:var(--scroll-bar-background)}.swiper-scrollbar-drag{background:var(--scroll-bar-background-active)}.slides-ios{--bullet-background:var(--ion-color-step-200,#ccc);--bullet-background-active:var(--ion-color-primary,#3880ff);--progress-bar-background:rgba(var(--ion-text-color-rgb,0,0,0),0.25);--progress-bar-background-active:var(--ion-color-primary-shade,#3171e0);--scroll-bar-background:rgba(var(--ion-text-color-rgb,0,0,0),0.1);--scroll-bar-background-active:rgba(var(--ion-text-color-rgb,0,0,0),0.5)}"; }
    static get styleMode() { return "ios"; }
}

class Tab {
    constructor() {
        this.loaded = false;
        this.active = false;
    }
    componentWillLoad() {
    }
    async setActive() {
        await this.prepareLazyLoaded();
        this.active = true;
    }
    async prepareLazyLoaded() {
        if (!this.loaded && this.component != null) {
            this.loaded = true;
            try {
                return attachComponent(this.delegate, this.el, this.component, ["ion-page"]);
            }
            catch (e) {
                console.error(e);
            }
        }
        return undefined;
    }
    hostData() {
        const { tab, active, component } = this;
        return {
            "role": "tabpanel",
            "aria-hidden": !active ? "true" : null,
            "aria-labelledby": `tab-button-${tab}`,
            "class": {
                "ion-page": component === undefined,
                "tab-hidden": !active
            }
        };
    }
    render() {
        return h("slot", null);
    }
    static get is() { return "ion-tab"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "active": {
                "type": Boolean,
                "attr": "active",
                "mutable": true
            },
            "component": {
                "type": String,
                "attr": "component"
            },
            "delegate": {
                "type": "Any",
                "attr": "delegate"
            },
            "el": {
                "elementRef": true
            },
            "setActive": {
                "method": true
            },
            "tab": {
                "type": String,
                "attr": "tab"
            }
        };
    }
    static get style() { return ":host(.tab-hidden){display:none!important}"; }
}

class Tabs {
    constructor() {
        this.transitioning = false;
        this.tabs = [];
        this.useRouter = false;
    }
    async componentWillLoad() {
        if (!this.useRouter) {
            this.useRouter = !!this.doc.querySelector("ion-router") && !this.el.closest("[no-router]");
        }
        this.tabs = Array.from(this.el.querySelectorAll("ion-tab"));
        this.ionNavWillLoad.emit();
        this.componentWillUpdate();
    }
    componentDidLoad() {
        this.initSelect();
    }
    componentDidUnload() {
        this.tabs.length = 0;
        this.selectedTab = this.leavingTab = undefined;
    }
    componentWillUpdate() {
        const tabBar = this.el.querySelector("ion-tab-bar");
        if (tabBar) {
            const tab = this.selectedTab ? this.selectedTab.tab : undefined;
            tabBar.selectedTab = tab;
        }
    }
    onTabClicked(ev) {
        const { href, tab } = ev.detail;
        const selectedTab = this.tabs.find(t => t.tab === tab);
        if (this.useRouter && href !== undefined) {
            const router = this.doc.querySelector("ion-router");
            if (router) {
                router.push(href);
            }
        }
        else if (selectedTab) {
            this.select(selectedTab);
        }
    }
    async select(tab) {
        const selectedTab = await this.getTab(tab);
        if (!this.shouldSwitch(selectedTab)) {
            return false;
        }
        await this.setActive(selectedTab);
        await this.notifyRouter();
        this.tabSwitch();
        return true;
    }
    async getTab(tab) {
        const tabEl = (typeof tab === "string")
            ? this.tabs.find(t => t.tab === tab)
            : tab;
        if (!tabEl) {
            console.error(`tab with id: "${tabEl}" does not exist`);
        }
        return tabEl;
    }
    getSelected() {
        return Promise.resolve(this.selectedTab ? this.selectedTab.tab : undefined);
    }
    async setRouteId(id) {
        const selectedTab = await this.getTab(id);
        if (!this.shouldSwitch(selectedTab)) {
            return { changed: false, element: this.selectedTab };
        }
        await this.setActive(selectedTab);
        return {
            changed: true,
            element: this.selectedTab,
            markVisible: () => this.tabSwitch(),
        };
    }
    async getRouteId() {
        const tabId = this.selectedTab && this.selectedTab.tab;
        return tabId !== undefined ? { id: tabId, element: this.selectedTab } : undefined;
    }
    async initSelect() {
        if (this.useRouter) {
            return;
        }
        await Promise.all(this.tabs.map(tab => tab.componentOnReady()));
        await this.select(this.tabs[0]);
    }
    setActive(selectedTab) {
        if (this.transitioning) {
            return Promise.reject("transitioning already happening");
        }
        this.transitioning = true;
        this.leavingTab = this.selectedTab;
        this.selectedTab = selectedTab;
        this.ionTabsWillChange.emit({ tab: selectedTab.tab });
        return selectedTab.setActive();
    }
    tabSwitch() {
        const selectedTab = this.selectedTab;
        const leavingTab = this.leavingTab;
        this.leavingTab = undefined;
        this.transitioning = false;
        if (!selectedTab) {
            return;
        }
        if (leavingTab !== selectedTab) {
            if (leavingTab) {
                leavingTab.active = false;
            }
            this.ionTabsDidChange.emit({ tab: selectedTab.tab });
        }
    }
    notifyRouter() {
        if (this.useRouter) {
            const router = this.doc.querySelector("ion-router");
            if (router) {
                return router.navChanged("forward");
            }
        }
        return Promise.resolve(false);
    }
    shouldSwitch(selectedTab) {
        const leavingTab = this.selectedTab;
        return selectedTab !== undefined && selectedTab !== leavingTab && !this.transitioning;
    }
    render() {
        return [
            h("slot", { name: "top" }),
            h("div", { class: "tabs-inner" }, h("slot", null)),
            h("slot", { name: "bottom" })
        ];
    }
    static get is() { return "ion-tabs"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "config": {
                "context": "config"
            },
            "doc": {
                "context": "document"
            },
            "el": {
                "elementRef": true
            },
            "getRouteId": {
                "method": true
            },
            "getSelected": {
                "method": true
            },
            "getTab": {
                "method": true
            },
            "select": {
                "method": true
            },
            "selectedTab": {
                "state": true
            },
            "setRouteId": {
                "method": true
            },
            "tabs": {
                "state": true
            },
            "useRouter": {
                "type": Boolean,
                "attr": "use-router",
                "mutable": true
            }
        };
    }
    static get events() {
        return [{
                "name": "ionNavWillLoad",
                "method": "ionNavWillLoad",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionTabsWillChange",
                "method": "ionTabsWillChange",
                "bubbles": false,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionTabsDidChange",
                "method": "ionTabsDidChange",
                "bubbles": false,
                "cancelable": true,
                "composed": true
            }];
    }
    static get listeners() {
        return [{
                "name": "ionTabButtonClick",
                "method": "onTabClicked"
            }];
    }
    static get style() { return ":host{left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:absolute;-ms-flex-direction:column;flex-direction:column;width:100%;height:100%;z-index:0}.tabs-inner,:host{contain:layout size style}.tabs-inner{position:relative;-ms-flex:1;flex:1}"; }
}

class Text {
    hostData() {
        return {
            class: Object.assign({}, createColorClasses(this.color), { [`${this.mode}`]: true })
        };
    }
    render() {
        return h("slot", null);
    }
    static get is() { return "ion-text"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "color": {
                "type": String,
                "attr": "color"
            },
            "mode": {
                "type": String,
                "attr": "mode"
            }
        };
    }
    static get style() { return ":host(.ion-color){color:var(--ion-color-base)}"; }
}

class Textarea {
    constructor() {
        this.inputId = `ion-input-${textareaIds++}`;
        this.didBlurAfterEdit = false;
        this.hasFocus = false;
        this.autocapitalize = "none";
        this.autofocus = false;
        this.clearOnEdit = false;
        this.debounce = 0;
        this.disabled = false;
        this.name = this.inputId;
        this.readonly = false;
        this.required = false;
        this.spellcheck = false;
        this.autoGrow = false;
        this.value = "";
        this.onInput = (ev) => {
            if (this.nativeInput) {
                this.value = this.nativeInput.value;
            }
            this.emitStyle();
            this.ionInput.emit(ev);
        };
        this.onFocus = () => {
            this.hasFocus = true;
            this.focusChange();
            this.ionFocus.emit();
        };
        this.onBlur = () => {
            this.hasFocus = false;
            this.focusChange();
            this.ionBlur.emit();
        };
        this.onKeyDown = () => {
            this.checkClearOnEdit();
        };
    }
    debounceChanged() {
        this.ionChange = debounceEvent(this.ionChange, this.debounce);
    }
    disabledChanged() {
        this.emitStyle();
    }
    valueChanged() {
        const nativeInput = this.nativeInput;
        const value = this.getValue();
        if (nativeInput && nativeInput.value !== value) {
            nativeInput.value = value;
        }
        this.runAutoGrow();
        this.emitStyle();
        this.ionChange.emit({ value });
    }
    componentWillLoad() {
        this.emitStyle();
    }
    componentDidLoad() {
        this.debounceChanged();
        this.runAutoGrow();
        this.ionInputDidLoad.emit();
    }
    runAutoGrow() {
        if (this.nativeInput && this.autoGrow) {
            this.nativeInput.style.height = "inherit";
            this.nativeInput.style.height = this.nativeInput.scrollHeight + "px";
        }
    }
    componentDidUnload() {
        this.ionInputDidUnload.emit();
    }
    setFocus() {
        if (this.nativeInput) {
            this.nativeInput.focus();
        }
    }
    getInputElement() {
        return Promise.resolve(this.nativeInput);
    }
    emitStyle() {
        this.ionStyle.emit({
            "interactive": true,
            "textarea": true,
            "input": true,
            "interactive-disabled": this.disabled,
            "has-placeholder": this.placeholder != null,
            "has-value": this.hasValue(),
            "has-focus": this.hasFocus
        });
    }
    checkClearOnEdit() {
        if (!this.clearOnEdit) {
            return;
        }
        if (this.didBlurAfterEdit && this.hasValue()) {
            this.value = "";
        }
        this.didBlurAfterEdit = false;
    }
    focusChange() {
        if (this.clearOnEdit && !this.hasFocus && this.hasValue()) {
            this.didBlurAfterEdit = true;
        }
        this.emitStyle();
    }
    hasValue() {
        return this.getValue() !== "";
    }
    getValue() {
        return this.value || "";
    }
    hostData() {
        return {
            "aria-disabled": this.disabled ? "true" : null,
            class: Object.assign({}, createColorClasses(this.color), { [`${this.mode}`]: true })
        };
    }
    render() {
        const value = this.getValue();
        const labelId = this.inputId + "-lbl";
        const label = findItemLabel(this.el);
        if (label) {
            label.id = labelId;
        }
        return (h("textarea", { class: "native-textarea", ref: el => this.nativeInput = el, autoCapitalize: this.autocapitalize, autoFocus: this.autofocus, disabled: this.disabled, maxLength: this.maxlength, minLength: this.minlength, name: this.name, placeholder: this.placeholder || "", readOnly: this.readonly, required: this.required, spellCheck: this.spellcheck, cols: this.cols, rows: this.rows, wrap: this.wrap, onInput: this.onInput, onBlur: this.onBlur, onFocus: this.onFocus, onKeyDown: this.onKeyDown }, value));
    }
    static get is() { return "ion-textarea"; }
    static get encapsulation() { return "scoped"; }
    static get properties() {
        return {
            "autocapitalize": {
                "type": String,
                "attr": "autocapitalize"
            },
            "autofocus": {
                "type": Boolean,
                "attr": "autofocus"
            },
            "autoGrow": {
                "type": Boolean,
                "attr": "auto-grow"
            },
            "clearOnEdit": {
                "type": Boolean,
                "attr": "clear-on-edit",
                "mutable": true
            },
            "color": {
                "type": String,
                "attr": "color"
            },
            "cols": {
                "type": Number,
                "attr": "cols"
            },
            "debounce": {
                "type": Number,
                "attr": "debounce",
                "watchCallbacks": ["debounceChanged"]
            },
            "disabled": {
                "type": Boolean,
                "attr": "disabled",
                "watchCallbacks": ["disabledChanged"]
            },
            "el": {
                "elementRef": true
            },
            "getInputElement": {
                "method": true
            },
            "hasFocus": {
                "state": true
            },
            "maxlength": {
                "type": Number,
                "attr": "maxlength"
            },
            "minlength": {
                "type": Number,
                "attr": "minlength"
            },
            "mode": {
                "type": String,
                "attr": "mode"
            },
            "name": {
                "type": String,
                "attr": "name"
            },
            "placeholder": {
                "type": String,
                "attr": "placeholder"
            },
            "readonly": {
                "type": Boolean,
                "attr": "readonly"
            },
            "required": {
                "type": Boolean,
                "attr": "required"
            },
            "rows": {
                "type": Number,
                "attr": "rows"
            },
            "setFocus": {
                "method": true
            },
            "spellcheck": {
                "type": Boolean,
                "attr": "spellcheck"
            },
            "value": {
                "type": String,
                "attr": "value",
                "mutable": true,
                "watchCallbacks": ["valueChanged"]
            },
            "wrap": {
                "type": String,
                "attr": "wrap"
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
                "name": "ionInput",
                "method": "ionInput",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionStyle",
                "method": "ionStyle",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionBlur",
                "method": "ionBlur",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionFocus",
                "method": "ionFocus",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionInputDidLoad",
                "method": "ionInputDidLoad",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionInputDidUnload",
                "method": "ionInputDidUnload",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }];
    }
    static get style() { return ".sc-ion-textarea-ios-h{--background:initial;--color:initial;--placeholder-color:initial;--placeholder-font-style:initial;--placeholder-font-weight:initial;--placeholder-opacity:.5;--padding-top:0;--padding-end:0;--padding-bottom:0;--border-radius:0;display:block;position:relative;-ms-flex:1;flex:1;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box;background:var(--background);color:var(--color);font-family:var(--ion-font-family,inherit);z-index:2}.ion-color.sc-ion-textarea-ios-h{background:initial;color:var(--ion-color-base)}ion-item.sc-ion-textarea-ios-h, ion-item   .sc-ion-textarea-ios-h{-ms-flex-item-align:baseline;align-self:baseline}ion-item.sc-ion-textarea-ios-h:not(.item-label), ion-item:not(.item-label)   .sc-ion-textarea-ios-h{--padding-start:0}.native-textarea.sc-ion-textarea-ios{border-radius:var(--border-radius);margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:var(--padding-start);padding-right:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;display:block;width:100%;max-width:100%;max-height:100%;border:0;outline:none;background:transparent;-webkit-box-sizing:border-box;box-sizing:border-box;resize:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;white-space:pre-wrap}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.native-textarea.sc-ion-textarea-ios{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end)}}.native-textarea.sc-ion-textarea-ios::-webkit-input-placeholder{color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.native-textarea.sc-ion-textarea-ios:-ms-input-placeholder{color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.native-textarea.sc-ion-textarea-ios::-ms-input-placeholder{color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.native-textarea.sc-ion-textarea-ios::placeholder{color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.native-textarea[disabled].sc-ion-textarea-ios{opacity:.4}.cloned-input.sc-ion-textarea-ios{left:0;top:0;position:absolute;pointer-events:none}[dir=rtl].sc-ion-textarea-ios-h   .cloned-input.sc-ion-textarea-ios, [dir=rtl]   .sc-ion-textarea-ios-h   .cloned-input.sc-ion-textarea-ios{right:0}.sc-ion-textarea-ios-h{--padding-top:10px;--padding-end:8px;--padding-bottom:10px;--padding-start:0;font-size:inherit}.item-label-floating.sc-ion-textarea-ios-h, .item-label-floating   .sc-ion-textarea-ios-h, .item-label-stacked.sc-ion-textarea-ios-h, .item-label-stacked   .sc-ion-textarea-ios-h{--padding-top:8px;--padding-bottom:8px;--padding-start:0px}"; }
    static get styleMode() { return "ios"; }
}
let textareaIds = 0;

class ToolbarTitle {
    getMode() {
        const toolbar = this.el.closest("ion-toolbar");
        return (toolbar && toolbar.mode) || this.mode;
    }
    hostData() {
        const mode = this.getMode();
        return {
            class: Object.assign({ [`${mode}`]: true, [`title-${mode}`]: true }, createColorClasses(this.color))
        };
    }
    render() {
        return [
            h("div", { class: "toolbar-title" }, h("slot", null))
        ];
    }
    static get is() { return "ion-title"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "color": {
                "type": String,
                "attr": "color"
            },
            "el": {
                "elementRef": true
            }
        };
    }
    static get style() { return ":host{--color:initial;display:-ms-flexbox;display:flex;-ms-flex:1;flex:1;-ms-flex-align:center;align-items:center;color:var(--color)}:host,:host(.title-ios){-webkit-transform:translateZ(0);transform:translateZ(0)}:host(.title-ios){left:0;top:0;padding-left:90px;padding-right:90px;padding-top:0;padding-bottom:0;position:absolute;width:100%;height:100%;font-size:17px;font-weight:600;letter-spacing:-.03em;text-align:center;-webkit-box-sizing:border-box;box-sizing:border-box;pointer-events:none}:host([dir=rtl].title-ios){right:0}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host(.title-ios){padding-left:unset;padding-right:unset;-webkit-padding-start:90px;padding-inline-start:90px;-webkit-padding-end:90px;padding-inline-end:90px}}:host(.title-md){padding-left:12px;padding-right:12px;padding-top:0;padding-bottom:0;font-size:20px;font-weight:500}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host(.title-md){padding-left:unset;padding-right:unset;-webkit-padding-start:12px;padding-inline-start:12px;-webkit-padding-end:12px;padding-inline-end:12px}}:host(.ion-color){color:var(--ion-color-base)}.toolbar-title{display:block;width:100%;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;pointer-events:auto}"; }
}

class ToastController {
    create(options) {
        return createOverlay(this.doc.createElement("ion-toast"), options);
    }
    dismiss(data, role, id) {
        return dismissOverlay(this.doc, data, role, "ion-toast", id);
    }
    async getTop() {
        return getOverlay(this.doc, "ion-toast");
    }
    static get is() { return "ion-toast-controller"; }
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

export { Carousel as GenericCarousel, Wizard as GenericWizard, Uploader as ImageUploader, AlertController as IonAlertController, BackButton as IonBackButton, Button as IonButton, Card as IonCard, CardContent as IonCardContent, CardHeader as IonCardHeader, CardSubtitle as IonCardSubtitle, CardTitle as IonCardTitle, Content as IonContent, Input as IonInput, ListHeader as IonListHeader, ModalController as IonModalController, Nav as IonNav, NavPop as IonNavPop, NavPush as IonNavPush, NavSetRoot as IonNavSetRoot, Radio as IonRadio, RadioGroup as IonRadioGroup, Slides as IonSlides, Tab as IonTab, Tabs as IonTabs, Text as IonText, Textarea as IonTextarea, ToolbarTitle as IonTitle, ToastController as IonToastController };
