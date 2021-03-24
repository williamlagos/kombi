const e=window.clipper.h;import{b as t,c as s}from"./chunk-c82b670d.js";import{g as n,a as i,b as o,c as a}from"./chunk-794673eb.js";function r(e,t){const s=new e,n=new e;n.addElement(t.querySelector("ion-backdrop"));const i=new e;return i.addElement(t.querySelector(".loading-wrapper")),n.fromTo("opacity",.01,.3),i.fromTo("opacity",.01,1).fromTo("scale",1.1,1),Promise.resolve(s.addElement(t).easing("ease-in-out").duration(200).add(n).add(i))}function d(e,t){const s=new e,n=new e;n.addElement(t.querySelector("ion-backdrop"));const i=new e;return i.addElement(t.querySelector(".loading-wrapper")),n.fromTo("opacity",.3,0),i.fromTo("opacity",.99,0).fromTo("scale",1,.9),Promise.resolve(s.addElement(t).easing("ease-in-out").duration(200).add(n).add(i))}function l(e,t){const s=new e,n=new e;n.addElement(t.querySelector("ion-backdrop"));const i=new e;return i.addElement(t.querySelector(".loading-wrapper")),n.fromTo("opacity",.01,.32),i.fromTo("opacity",.01,1).fromTo("scale",1.1,1),Promise.resolve(s.addElement(t).easing("ease-in-out").duration(200).add(n).add(i))}function c(e,t){const s=new e,n=new e;n.addElement(t.querySelector("ion-backdrop"));const i=new e;return i.addElement(t.querySelector(".loading-wrapper")),n.fromTo("opacity",.32,0),i.fromTo("opacity",.99,0).fromTo("scale",1,.9),Promise.resolve(s.addElement(t).easing("ease-in-out").duration(200).add(n).add(i))}class m{constructor(){this.presented=!1,this.keyboardClose=!0,this.duration=0,this.backdropDismiss=!1,this.showBackdrop=!0,this.translucent=!1,this.animated=!0}componentWillLoad(){void 0===this.spinner&&(this.spinner=this.config.get("loadingSpinner",this.config.get("spinner","ios"===this.mode?"lines":"crescent")))}onBackdropTap(){this.dismiss(void 0,n)}async present(){await i(this,"loadingEnter",r,l,void 0),this.duration>0&&(this.durationTimeout=setTimeout(()=>this.dismiss(),this.duration+10))}dismiss(e,t){return this.durationTimeout&&clearTimeout(this.durationTimeout),o(this,e,t,"loadingLeave",d,c)}onDidDismiss(){return a(this.el,"ionLoadingDidDismiss")}onWillDismiss(){return a(this.el,"ionLoadingWillDismiss")}hostData(){return{style:{zIndex:4e4+this.overlayIndex},class:Object.assign({},t(this.cssClass),{[`${this.mode}`]:!0,"loading-translucent":this.translucent})}}render(){return[e("ion-backdrop",{visible:this.showBackdrop,tappable:this.backdropDismiss}),e("div",{class:"loading-wrapper",role:"dialog"},this.spinner&&e("div",{class:"loading-spinner"},e("ion-spinner",{name:this.spinner})),this.message&&e("div",{class:"loading-content"},this.message))]}static get is(){return"ion-loading"}static get encapsulation(){return"scoped"}static get properties(){return{animated:{type:Boolean,attr:"animated"},backdropDismiss:{type:Boolean,attr:"backdrop-dismiss"},config:{context:"config"},cssClass:{type:String,attr:"css-class"},dismiss:{method:!0},duration:{type:Number,attr:"duration"},el:{elementRef:!0},enterAnimation:{type:"Any",attr:"enter-animation"},keyboardClose:{type:Boolean,attr:"keyboard-close"},leaveAnimation:{type:"Any",attr:"leave-animation"},message:{type:String,attr:"message"},mode:{type:String,attr:"mode"},onDidDismiss:{method:!0},onWillDismiss:{method:!0},overlayIndex:{type:Number,attr:"overlay-index"},present:{method:!0},showBackdrop:{type:Boolean,attr:"show-backdrop"},spinner:{type:String,attr:"spinner",mutable:!0},translucent:{type:Boolean,attr:"translucent"}}}static get events(){return[{name:"ionLoadingDidPresent",method:"didPresent",bubbles:!0,cancelable:!0,composed:!0},{name:"ionLoadingWillPresent",method:"willPresent",bubbles:!0,cancelable:!0,composed:!0},{name:"ionLoadingWillDismiss",method:"willDismiss",bubbles:!0,cancelable:!0,composed:!0},{name:"ionLoadingDidDismiss",method:"didDismiss",bubbles:!0,cancelable:!0,composed:!0}]}static get listeners(){return[{name:"ionBackdropTap",method:"onBackdropTap"}]}static get style(){return".sc-ion-loading-md-h{--min-width:auto;--width:auto;--min-height:auto;--height:auto;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:fixed;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;font-family:var(--ion-font-family,inherit);contain:strict;-ms-touch-action:none;touch-action:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:1000}.overlay-hidden.sc-ion-loading-md-h{display:none}.loading-wrapper.sc-ion-loading-md{display:-ms-flexbox;display:flex;-ms-flex-align:inherit;align-items:inherit;-ms-flex-pack:inherit;justify-content:inherit;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);background:var(--background);opacity:0;z-index:10}.spinner-bubbles.sc-ion-loading-md, .spinner-circles.sc-ion-loading-md, .spinner-crescent.sc-ion-loading-md, .spinner-dots.sc-ion-loading-md, .spinner-lines.sc-ion-loading-md, .spinner-lines-small.sc-ion-loading-md{color:var(--spinner-color)}.sc-ion-loading-md-h{--background:var(--ion-color-step-50,#f2f2f2);--max-width:280px;--max-height:90%;--spinner-color:var(--ion-color-primary,#3880ff);color:var(--ion-color-step-850,#262626);font-size:14px}.loading-wrapper.sc-ion-loading-md{border-radius:2px;padding-left:24px;padding-right:24px;padding-top:24px;padding-bottom:24px;-webkit-box-shadow:0 16px 20px rgba(0,0,0,.4);box-shadow:0 16px 20px rgba(0,0,0,.4)}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.loading-wrapper.sc-ion-loading-md{padding-left:unset;padding-right:unset;-webkit-padding-start:24px;padding-inline-start:24px;-webkit-padding-end:24px;padding-inline-end:24px}}.loading-spinner.sc-ion-loading-md + .loading-content.sc-ion-loading-md{margin-left:16px}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.loading-spinner.sc-ion-loading-md + .loading-content.sc-ion-loading-md{margin-left:unset;-webkit-margin-start:16px;margin-inline-start:16px}}"}static get styleMode(){return"md"}}const p={lines:{dur:1e3,lines:12,fn:(e,t,s)=>({y1:17,y2:29,style:{transform:`rotate(${30*t+(t<6?180:-180)}deg)`,"animation-delay":`${e*t/s-e}ms`}})},"lines-small":{dur:1e3,lines:12,fn:(e,t,s)=>({y1:12,y2:20,style:{transform:`rotate(${30*t+(t<6?180:-180)}deg)`,"animation-delay":`${e*t/s-e}ms`}})},bubbles:{dur:1e3,circles:9,fn:(e,t,s)=>{const n=`${e*t/s-e}ms`,i=2*Math.PI*t/s;return{r:5,style:{top:`${9*Math.sin(i)}px`,left:`${9*Math.cos(i)}px`,"animation-delay":n}}}},circles:{dur:1e3,circles:8,fn:(e,t,s)=>{const n=t/s,i=`${e*n-e}ms`,o=2*Math.PI*n;return{r:5,style:{top:`${9*Math.sin(o)}px`,left:`${9*Math.cos(o)}px`,"animation-delay":i}}}},crescent:{dur:750,circles:1,fn:()=>({r:26,style:{}})},dots:{dur:750,circles:3,fn:(e,t)=>({r:6,style:{left:`${9-9*t}px`,"animation-delay":-110*t+"ms"}})}};class u{constructor(){this.paused=!1}getName(){return this.name||this.config.get("spinner")||("ios"===this.mode?"lines":"crescent")}hostData(){return{class:Object.assign({},s(this.color),{[`${this.mode}`]:!0,[`spinner-${this.getName()}`]:!0,"spinner-paused":!!this.paused||this.config.getBoolean("_testing")})}}render(){const e=this.getName(),t=p[e]||p.lines,s="number"==typeof this.duration&&this.duration>10?this.duration:t.dur,n=[];if(void 0!==t.circles)for(let e=0;e<t.circles;e++)n.push(h(t,s,e,t.circles));else if(void 0!==t.lines)for(let e=0;e<t.lines;e++)n.push(y(t,s,e,t.lines));return n}static get is(){return"ion-spinner"}static get encapsulation(){return"shadow"}static get properties(){return{color:{type:String,attr:"color"},config:{context:"config"},duration:{type:Number,attr:"duration"},name:{type:String,attr:"name"},paused:{type:Boolean,attr:"paused"}}}static get style(){return":host{display:inline-block;position:relative;width:28px;height:28px;color:var(--color);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}:host(.ion-color){color:var(--ion-color-base)}svg{left:0;top:0;-webkit-transform-origin:center;transform-origin:center;position:absolute;width:100%;height:100%;-webkit-transform:translateZ(0);transform:translateZ(0)}:host-context([dir=rtl]) svg{right:0;-webkit-transform-origin:calc(100% - center);transform-origin:calc(100% - center)}:host(.spinner-lines) line,:host(.spinner-lines-small) line{stroke-width:4px;stroke-linecap:round;stroke:currentColor}:host(.spinner-lines) svg,:host(.spinner-lines-small) svg{-webkit-animation:spinner-fade-out 1s linear infinite;animation:spinner-fade-out 1s linear infinite}:host(.spinner-bubbles) svg{-webkit-animation:spinner-scale-out 1s linear infinite;animation:spinner-scale-out 1s linear infinite;fill:currentColor}:host(.spinner-circles) svg{-webkit-animation:spinner-fade-out 1s linear infinite;animation:spinner-fade-out 1s linear infinite;fill:currentColor}:host(.spinner-crescent) circle{fill:transparent;stroke-width:4px;stroke-dasharray:128px;stroke-dashoffset:82px;stroke:currentColor}:host(.spinner-crescent) svg{-webkit-animation:spinner-rotate 1s linear infinite;animation:spinner-rotate 1s linear infinite}:host(.spinner-dots) circle{stroke-width:0;fill:currentColor}:host(.spinner-dots) svg{-webkit-animation:spinner-dots 1s linear infinite;animation:spinner-dots 1s linear infinite}:host(.spinner-paused) svg{-webkit-animation-play-state:paused;animation-play-state:paused}\@-webkit-keyframes spinner-fade-out{0%{opacity:1}to{opacity:0}}\@keyframes spinner-fade-out{0%{opacity:1}to{opacity:0}}\@-webkit-keyframes spinner-scale-out{0%{-webkit-transform:scale(1);transform:scale(1)}to{-webkit-transform:scale(0);transform:scale(0)}}\@keyframes spinner-scale-out{0%{-webkit-transform:scale(1);transform:scale(1)}to{-webkit-transform:scale(0);transform:scale(0)}}\@-webkit-keyframes spinner-rotate{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}\@keyframes spinner-rotate{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}\@-webkit-keyframes spinner-dots{0%{-webkit-transform:scale(1);transform:scale(1);opacity:.9}50%{-webkit-transform:scale(.4);transform:scale(.4);opacity:.3}to{-webkit-transform:scale(1);transform:scale(1);opacity:.9}}\@keyframes spinner-dots{0%{-webkit-transform:scale(1);transform:scale(1);opacity:.9}50%{-webkit-transform:scale(.4);transform:scale(.4);opacity:.3}to{-webkit-transform:scale(1);transform:scale(1);opacity:.9}}"}}function h(t,s,n,i){const o=t.fn(s,n,i);return o.style["animation-duration"]=`${s}ms`,e("svg",{viewBox:"0 0 64 64",style:o.style},e("circle",{transform:"translate(32,32)",r:o.r}))}function y(t,s,n,i){const o=t.fn(s,n,i);return o.style["animation-duration"]=`${s}ms`,e("svg",{viewBox:"0 0 64 64",style:o.style},e("line",{transform:"translate(32,32)",y1:o.y1,y2:o.y2}))}export{m as IonLoading,u as IonSpinner};