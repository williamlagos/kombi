import { h } from '../clipper.core.js';

class Slide {
    componentDidLoad() {
        this.ionSlideChanged.emit();
    }
    componentDidUnload() {
        this.ionSlideChanged.emit();
    }
    hostData() {
        return {
            class: {
                [`${this.mode}`]: true,
                "swiper-slide": true,
                "swiper-zoom-container": true
            }
        };
    }
    static get is() { return "ion-slide"; }
    static get events() {
        return [{
                "name": "ionSlideChanged",
                "method": "ionSlideChanged",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }];
    }
    static get style() { return "ion-slide{height:100%}.slide-zoom,ion-slide{display:block;width:100%}.slide-zoom,.swiper-slide{text-align:center}.swiper-slide{display:-ms-flexbox;display:flex;position:relative;-ms-flex-negative:0;flex-shrink:0;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;height:100%;font-size:18px;-webkit-box-sizing:border-box;box-sizing:border-box}.swiper-slide img{width:auto;max-width:100%;height:auto;max-height:100%}"; }
}

export { Slide as IonSlide };
