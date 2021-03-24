const t=window.clipper.h;import{i as e,g as i}from"./chunk-e658e8b7.js";import{GESTURE_CONTROLLER as s}from"./chunk-04f0cf95.js";class n{constructor(){this.lastOnEnd=0,this.blocker=s.createBlocker({disableScroll:!0}),this.isAnimating=!1,this._isOpen=!1,this.isPaneVisible=!1,this.isEndSide=!1,this.disabled=!1,this.side="start",this.swipeGesture=!0,this.maxEdgeStart=50}typeChanged(t,e){const i=this.contentEl;i&&(void 0!==e&&i.classList.remove(`menu-content-${e}`),i.classList.add(`menu-content-${t}`),i.removeAttribute("style")),this.menuInnerEl&&this.menuInnerEl.removeAttribute("style"),this.animation=void 0}disabledChanged(){this.updateState(),this.ionMenuChange.emit({disabled:this.disabled,open:this._isOpen})}sideChanged(){this.isEndSide=e(this.win,this.side)}swipeGestureChanged(){this.updateState()}async componentWillLoad(){if(void 0===this.type&&(this.type=this.config.get("menuType","ios"===this.mode?"reveal":"overlay")),this.isServer)return void(this.disabled=!0);const t=this.menuCtrl=await this.lazyMenuCtrl.componentOnReady().then(t=>t._getInstance()),e=this.el.parentNode,i=void 0!==this.contentId?this.doc.getElementById(this.contentId):e&&e.querySelector&&e.querySelector("[main]");i&&i.tagName?(this.contentEl=i,i.classList.add("menu-content"),this.typeChanged(this.type,void 0),this.sideChanged(),t._register(this),this.gesture=(await import("./chunk-04f0cf95.js")).createGesture({el:this.doc,queue:this.queue,gestureName:"menu-swipe",gesturePriority:30,threshold:10,canStart:t=>this.canStart(t),onWillStart:()=>this.onWillStart(),onStart:()=>this.onStart(),onMove:t=>this.onMove(t),onEnd:t=>this.onEnd(t)}),this.updateState()):console.error('Menu: must have a "content" element to listen for drag events on.')}componentDidLoad(){this.ionMenuChange.emit({disabled:this.disabled,open:this._isOpen})}componentDidUnload(){this.blocker.destroy(),this.menuCtrl._unregister(this),this.animation&&this.animation.destroy(),this.gesture&&(this.gesture.destroy(),this.gesture=void 0),this.animation=void 0,this.contentEl=this.backdropEl=this.menuInnerEl=void 0}onSplitPaneChanged(t){this.isPaneVisible=t.detail.isPane(this.el),this.updateState()}onBackdropClick(t){this.lastOnEnd<t.timeStamp-100&&t.composedPath&&!t.composedPath().includes(this.menuInnerEl)&&(t.preventDefault(),t.stopPropagation(),this.close())}isOpen(){return Promise.resolve(this._isOpen)}isActive(){return Promise.resolve(this._isActive())}open(t=!0){return this.setOpen(!0,t)}close(t=!0){return this.setOpen(!1,t)}toggle(t=!0){return this.setOpen(!this._isOpen,t)}setOpen(t,e=!0){return this.menuCtrl._setOpen(this,t,e)}async _setOpen(t,e=!0){return!(!this._isActive()||this.isAnimating||t===this._isOpen||(this.beforeAnimation(t),await this.loadAnimation(),await this.startAnimation(t,e),this.afterAnimation(t),0))}async loadAnimation(){const t=this.menuInnerEl.offsetWidth;t===this.width&&void 0!==this.animation||(this.width=t,this.animation&&(this.animation.destroy(),this.animation=void 0),this.animation=await this.menuCtrl._createAnimation(this.type,this))}async startAnimation(t,e){const i=this.animation.reverse(!t);e?await i.playAsync():i.playSync()}_isActive(){return!this.disabled&&!this.isPaneVisible}canSwipe(){return this.swipeGesture&&!this.isAnimating&&this._isActive()}canStart(t){return!!this.canSwipe()&&(!!this._isOpen||!this.menuCtrl.getOpenSync()&&(e=t.currentX,i=this.maxEdgeStart,this.isEndSide?e>=this.win.innerWidth-i:e<=i));var e,i}onWillStart(){return this.beforeAnimation(!this._isOpen),this.loadAnimation()}onStart(){this.isAnimating&&this.animation&&this.animation.reverse(this._isOpen).progressStart()}onMove(t){if(!this.isAnimating||!this.animation)return;const e=a(t.deltaX,this._isOpen,this.isEndSide);this.animation.progressStep(e/this.width)}onEnd(t){if(!this.isAnimating||!this.animation)return;const e=this._isOpen,i=this.isEndSide,s=a(t.deltaX,e,i),n=this.width,o=s/n,r=t.velocityX,h=n/2,l=r>=0&&(r>.2||t.deltaX>h),d=r<=0&&(r<-.2||t.deltaX<-h),c=e?i?l:d:i?d:l;let m=!e&&c;e&&!c&&(m=!0);const u=(c?1-o:o)*n;let p=0;if(u>5){const t=u/Math.abs(r);p=Math.min(t,300)}this.lastOnEnd=t.timeStamp,this.animation.onFinish(()=>this.afterAnimation(m),{clearExistingCallbacks:!0,oneTimeCallback:!0}).progressEnd(c,o,p)}beforeAnimation(t){this.el.classList.add(o),this.backdropEl&&this.backdropEl.classList.add(r),this.blocker.block(),this.isAnimating=!0,t?this.ionWillOpen.emit():this.ionWillClose.emit()}afterAnimation(t){this._isOpen=t,this.isAnimating=!1,this._isOpen||this.blocker.unblock(),this.enableListener(this,"click",t),t?(this.contentEl&&this.contentEl.classList.add(h),this.ionDidOpen.emit()):(this.el.classList.remove(o),this.contentEl&&this.contentEl.classList.remove(h),this.backdropEl&&this.backdropEl.classList.remove(r),this.ionDidClose.emit())}updateState(){const t=this._isActive();this.gesture&&this.gesture.setDisabled(!t||!this.swipeGesture),!t&&this._isOpen&&this.forceClosing(),!this.disabled&&this.menuCtrl&&this.menuCtrl._setActiveMenu(this)}forceClosing(){this.isAnimating=!0,this.animation.reverse(!0).playSync(),this.afterAnimation(!1)}hostData(){const{isEndSide:t,type:e,disabled:i,isPaneVisible:s}=this;return{role:"complementary",class:{[`${this.mode}`]:!0,[`menu-type-${e}`]:!0,"menu-enabled":!i,"menu-side-end":t,"menu-side-start":!t,"menu-pane-visible":s}}}render(){return[t("div",{class:"menu-inner",ref:t=>this.menuInnerEl=t},t("slot",null)),t("ion-backdrop",{ref:t=>this.backdropEl=t,class:"menu-backdrop",tappable:!1,stopPropagation:!1})]}static get is(){return"ion-menu"}static get encapsulation(){return"shadow"}static get properties(){return{close:{method:!0},config:{context:"config"},contentId:{type:String,attr:"content-id"},disabled:{type:Boolean,attr:"disabled",mutable:!0,watchCallbacks:["disabledChanged"]},doc:{context:"document"},el:{elementRef:!0},enableListener:{context:"enableListener"},isActive:{method:!0},isEndSide:{state:!0},isOpen:{method:!0},isPaneVisible:{state:!0},isServer:{context:"isServer"},lazyMenuCtrl:{connect:"ion-menu-controller"},maxEdgeStart:{type:Number,attr:"max-edge-start"},menuId:{type:String,attr:"menu-id"},open:{method:!0},queue:{context:"queue"},setOpen:{method:!0},side:{type:String,attr:"side",reflectToAttr:!0,watchCallbacks:["sideChanged"]},swipeGesture:{type:Boolean,attr:"swipe-gesture",watchCallbacks:["swipeGestureChanged"]},toggle:{method:!0},type:{type:String,attr:"type",mutable:!0,watchCallbacks:["typeChanged"]},win:{context:"window"}}}static get events(){return[{name:"ionWillOpen",method:"ionWillOpen",bubbles:!0,cancelable:!0,composed:!0},{name:"ionWillClose",method:"ionWillClose",bubbles:!0,cancelable:!0,composed:!0},{name:"ionDidOpen",method:"ionDidOpen",bubbles:!0,cancelable:!0,composed:!0},{name:"ionDidClose",method:"ionDidClose",bubbles:!0,cancelable:!0,composed:!0},{name:"ionMenuChange",method:"ionMenuChange",bubbles:!0,cancelable:!0,composed:!0}]}static get listeners(){return[{name:"body:ionSplitPaneVisible",method:"onSplitPaneChanged"},{name:"click",method:"onBackdropClick",capture:!0,disabled:!0}]}static get style(){return".sc-ion-menu-md-h{--width:304px;--min-width:auto;--max-width:auto;--height:100%;--min-height:auto;--max-height:auto;--background:var(--ion-background-color,#fff);left:0;right:0;top:0;bottom:0;display:none;position:absolute;contain:strict}.show-menu.sc-ion-menu-md-h{display:block}.menu-inner.sc-ion-menu-md{left:0;right:auto;top:0;bottom:0;-webkit-transform:translate3d(-9999px,0,0);transform:translate3d(-9999px,0,0);display:-ms-flexbox;display:flex;position:absolute;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:justify;justify-content:space-between;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);background:var(--background);contain:strict}[dir=rtl].sc-ion-menu-md-h   .menu-inner.sc-ion-menu-md, [dir=rtl]   .sc-ion-menu-md-h   .menu-inner.sc-ion-menu-md{left:auto;right:0;-webkit-transform:translate3d(calc(-1 * -9999px),0,0);transform:translate3d(calc(-1 * -9999px),0,0)}.menu-side-start.sc-ion-menu-md-h   .menu-inner.sc-ion-menu-md{--ion-safe-area-right:0px;right:auto;left:0}.menu-side-end.sc-ion-menu-md-h   .menu-inner.sc-ion-menu-md{--ion-safe-area-left:0px;right:0;left:auto}ion-backdrop.sc-ion-menu-md{display:none;opacity:.01;z-index:-1}\@media (max-width:340px){.menu-inner.sc-ion-menu-md{--width:264px}}.menu-type-reveal.sc-ion-menu-md-h{z-index:0}.menu-type-reveal.show-menu.sc-ion-menu-md-h   .menu-inner.sc-ion-menu-md{-webkit-transform:translateZ(0);transform:translateZ(0)}.menu-type-overlay.sc-ion-menu-md-h{z-index:80}.menu-type-overlay.sc-ion-menu-md-h   .show-backdrop.sc-ion-menu-md{display:block;cursor:pointer}.menu-pane-visible.sc-ion-menu-md-h   .menu-inner.sc-ion-menu-md{left:0;right:0;width:auto;-webkit-transform:none!important;transform:none!important;-webkit-box-shadow:none!important;box-shadow:none!important}.menu-pane-visible.sc-ion-menu-md-h   ion-backdrop.sc-ion-menu-md{display:hidden!important}.menu-type-overlay.sc-ion-menu-md-h   .menu-inner.sc-ion-menu-md{-webkit-box-shadow:0 2px 22px 0 rgba(0,0,0,.09),4px 0 16px 0 rgba(0,0,0,.18);box-shadow:0 2px 22px 0 rgba(0,0,0,.09),4px 0 16px 0 rgba(0,0,0,.18)}"}static get styleMode(){return"md"}}function a(t,e,i){return Math.max(0,e!==i?-t:t)}const o="show-menu",r="show-backdrop",h="menu-content-open";class l{constructor(){this.visible=!1,this.autoHide=!0}componentDidLoad(){return this.updateVisibility()}async onClick(){const t=await d(this.doc);t&&await t.get(this.menu)&&t.toggle(this.menu)}async updateVisibility(){const t=await d(this.doc);if(t){const e=await t.get(this.menu);if(e&&await e.isActive())return void(this.visible=!0)}this.visible=!1}hostData(){const t=this.autoHide&&!this.visible;return{"aria-hidden":t?"true":null,class:{[`${this.mode}`]:!0,"menu-toggle-hidden":t}}}render(){return t("slot",null)}static get is(){return"ion-menu-toggle"}static get encapsulation(){return"shadow"}static get properties(){return{autoHide:{type:Boolean,attr:"auto-hide"},doc:{context:"document"},menu:{type:String,attr:"menu"},visible:{state:!0}}}static get listeners(){return[{name:"click",method:"onClick"},{name:"body:ionMenuChange",method:"updateVisibility"},{name:"body:ionSplitPaneVisible",method:"updateVisibility"}]}static get style(){return".menu-toggle-hidden.sc-ion-menu-toggle-h{display:none}"}}function d(t){const e=t.querySelector("ion-menu-controller");return e?e.componentOnReady():Promise.resolve(void 0)}export{n as IonMenu,l as IonMenuToggle};