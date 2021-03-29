import*as tslib_1 from"../polyfills/tslib.js";import{h}from"../clipper.core.js";import{i as isEndSide,g as assert}from"./chunk-e658e8b7.js";import{GESTURE_CONTROLLER}from"./chunk-04f0cf95.js";var Menu=function(){function t(){this.lastOnEnd=0,this.blocker=GESTURE_CONTROLLER.createBlocker({disableScroll:!0}),this.isAnimating=!1,this._isOpen=!1,this.isPaneVisible=!1,this.isEndSide=!1,this.disabled=!1,this.side="start",this.swipeGesture=!0,this.maxEdgeStart=50}return t.prototype.typeChanged=function(t,e){var i=this.contentEl;i&&(void 0!==e&&i.classList.remove("menu-content-"+e),i.classList.add("menu-content-"+t),i.removeAttribute("style")),this.menuInnerEl&&this.menuInnerEl.removeAttribute("style"),this.animation=void 0},t.prototype.disabledChanged=function(){this.updateState(),this.ionMenuChange.emit({disabled:this.disabled,open:this._isOpen})},t.prototype.sideChanged=function(){this.isEndSide=isEndSide(this.win,this.side)},t.prototype.swipeGestureChanged=function(){this.updateState()},t.prototype.componentWillLoad=function(){return tslib_1.__awaiter(this,void 0,void 0,function(){var t,e,i,n,o,s=this;return tslib_1.__generator(this,function(r){switch(r.label){case 0:return void 0===this.type&&(this.type=this.config.get("menuType","ios"===this.mode?"reveal":"overlay")),this.isServer?(this.disabled=!0,[2]):(e=this,[4,this.lazyMenuCtrl.componentOnReady().then(function(t){return t._getInstance()})]);case 1:return t=e.menuCtrl=r.sent(),i=this.el.parentNode,(n=void 0!==this.contentId?this.doc.getElementById(this.contentId):i&&i.querySelector&&i.querySelector("[main]"))&&n.tagName?(this.contentEl=n,n.classList.add("menu-content"),this.typeChanged(this.type,void 0),this.sideChanged(),t._register(this),o=this,[4,import("./chunk-04f0cf95.js")]):(console.error('Menu: must have a "content" element to listen for drag events on.'),[2]);case 2:return o.gesture=r.sent().createGesture({el:this.doc,queue:this.queue,gestureName:"menu-swipe",gesturePriority:30,threshold:10,canStart:function(t){return s.canStart(t)},onWillStart:function(){return s.onWillStart()},onStart:function(){return s.onStart()},onMove:function(t){return s.onMove(t)},onEnd:function(t){return s.onEnd(t)}}),this.updateState(),[2]}})})},t.prototype.componentDidLoad=function(){this.ionMenuChange.emit({disabled:this.disabled,open:this._isOpen})},t.prototype.componentDidUnload=function(){this.blocker.destroy(),this.menuCtrl._unregister(this),this.animation&&this.animation.destroy(),this.gesture&&(this.gesture.destroy(),this.gesture=void 0),this.animation=void 0,this.contentEl=this.backdropEl=this.menuInnerEl=void 0},t.prototype.onSplitPaneChanged=function(t){this.isPaneVisible=t.detail.isPane(this.el),this.updateState()},t.prototype.onBackdropClick=function(t){this.lastOnEnd<t.timeStamp-100&&t.composedPath&&!t.composedPath().includes(this.menuInnerEl)&&(t.preventDefault(),t.stopPropagation(),this.close())},t.prototype.isOpen=function(){return Promise.resolve(this._isOpen)},t.prototype.isActive=function(){return Promise.resolve(this._isActive())},t.prototype.open=function(t){return void 0===t&&(t=!0),this.setOpen(!0,t)},t.prototype.close=function(t){return void 0===t&&(t=!0),this.setOpen(!1,t)},t.prototype.toggle=function(t){return void 0===t&&(t=!0),this.setOpen(!this._isOpen,t)},t.prototype.setOpen=function(t,e){return void 0===e&&(e=!0),this.menuCtrl._setOpen(this,t,e)},t.prototype._setOpen=function(t,e){return void 0===e&&(e=!0),tslib_1.__awaiter(this,void 0,void 0,function(){return tslib_1.__generator(this,function(i){switch(i.label){case 0:return!this._isActive()||this.isAnimating||t===this._isOpen?[2,!1]:(this.beforeAnimation(t),[4,this.loadAnimation()]);case 1:return i.sent(),[4,this.startAnimation(t,e)];case 2:return i.sent(),this.afterAnimation(t),[2,!0]}})})},t.prototype.loadAnimation=function(){return tslib_1.__awaiter(this,void 0,void 0,function(){var t,e;return tslib_1.__generator(this,function(i){switch(i.label){case 0:return(t=this.menuInnerEl.offsetWidth)===this.width&&void 0!==this.animation?[2]:(this.width=t,this.animation&&(this.animation.destroy(),this.animation=void 0),e=this,[4,this.menuCtrl._createAnimation(this.type,this)]);case 1:return e.animation=i.sent(),[2]}})})},t.prototype.startAnimation=function(t,e){return tslib_1.__awaiter(this,void 0,void 0,function(){var i;return tslib_1.__generator(this,function(n){switch(n.label){case 0:return i=this.animation.reverse(!t),e?[4,i.playAsync()]:[3,2];case 1:return n.sent(),[3,3];case 2:i.playSync(),n.label=3;case 3:return[2]}})})},t.prototype._isActive=function(){return!this.disabled&&!this.isPaneVisible},t.prototype.canSwipe=function(){return this.swipeGesture&&!this.isAnimating&&this._isActive()},t.prototype.canStart=function(t){return!!this.canSwipe()&&(!!this._isOpen||!this.menuCtrl.getOpenSync()&&checkEdgeSide(this.win,t.currentX,this.isEndSide,this.maxEdgeStart))},t.prototype.onWillStart=function(){return this.beforeAnimation(!this._isOpen),this.loadAnimation()},t.prototype.onStart=function(){this.isAnimating&&this.animation&&this.animation.reverse(this._isOpen).progressStart()},t.prototype.onMove=function(t){if(this.isAnimating&&this.animation){var e=computeDelta(t.deltaX,this._isOpen,this.isEndSide);this.animation.progressStep(e/this.width)}},t.prototype.onEnd=function(t){var e=this;if(this.isAnimating&&this.animation){var i=this._isOpen,n=this.isEndSide,o=computeDelta(t.deltaX,i,n),s=this.width,r=o/s,a=t.velocityX,l=s/2,u=a>=0&&(a>.2||t.deltaX>l),c=a<=0&&(a<-.2||t.deltaX<-l),h=i?n?u:c:n?c:u,d=!i&&h;i&&!h&&(d=!0);var p=(h?1-r:r)*s,m=0;if(p>5){var b=p/Math.abs(a);m=Math.min(b,300)}this.lastOnEnd=t.timeStamp,this.animation.onFinish(function(){return e.afterAnimation(d)},{clearExistingCallbacks:!0,oneTimeCallback:!0}).progressEnd(h,r,m)}},t.prototype.beforeAnimation=function(t){this.el.classList.add(SHOW_MENU),this.backdropEl&&this.backdropEl.classList.add(SHOW_BACKDROP),this.blocker.block(),this.isAnimating=!0,t?this.ionWillOpen.emit():this.ionWillClose.emit()},t.prototype.afterAnimation=function(t){this._isOpen=t,this.isAnimating=!1,this._isOpen||this.blocker.unblock(),this.enableListener(this,"click",t),t?(this.contentEl&&this.contentEl.classList.add(MENU_CONTENT_OPEN),this.ionDidOpen.emit()):(this.el.classList.remove(SHOW_MENU),this.contentEl&&this.contentEl.classList.remove(MENU_CONTENT_OPEN),this.backdropEl&&this.backdropEl.classList.remove(SHOW_BACKDROP),this.ionDidClose.emit())},t.prototype.updateState=function(){var t=this._isActive();this.gesture&&this.gesture.setDisabled(!t||!this.swipeGesture),!t&&this._isOpen&&this.forceClosing(),!this.disabled&&this.menuCtrl&&this.menuCtrl._setActiveMenu(this)},t.prototype.forceClosing=function(){this.isAnimating=!0,this.animation.reverse(!0).playSync(),this.afterAnimation(!1)},t.prototype.hostData=function(){var t,e=this.isEndSide,i=this.type,n=this.disabled,o=this.isPaneVisible;return{role:"complementary",class:(t={},t[""+this.mode]=!0,t["menu-type-"+i]=!0,t["menu-enabled"]=!n,t["menu-side-end"]=e,t["menu-side-start"]=!e,t["menu-pane-visible"]=o,t)}},t.prototype.render=function(){var t=this;return[h("div",{class:"menu-inner",ref:function(e){return t.menuInnerEl=e}},h("slot",null)),h("ion-backdrop",{ref:function(e){return t.backdropEl=e},class:"menu-backdrop",tappable:!1,stopPropagation:!1})]},Object.defineProperty(t,"is",{get:function(){return"ion-menu"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{close:{method:!0},config:{context:"config"},contentId:{type:String,attr:"content-id"},disabled:{type:Boolean,attr:"disabled",mutable:!0,watchCallbacks:["disabledChanged"]},doc:{context:"document"},el:{elementRef:!0},enableListener:{context:"enableListener"},isActive:{method:!0},isEndSide:{state:!0},isOpen:{method:!0},isPaneVisible:{state:!0},isServer:{context:"isServer"},lazyMenuCtrl:{connect:"ion-menu-controller"},maxEdgeStart:{type:Number,attr:"max-edge-start"},menuId:{type:String,attr:"menu-id"},open:{method:!0},queue:{context:"queue"},setOpen:{method:!0},side:{type:String,attr:"side",reflectToAttr:!0,watchCallbacks:["sideChanged"]},swipeGesture:{type:Boolean,attr:"swipe-gesture",watchCallbacks:["swipeGestureChanged"]},toggle:{method:!0},type:{type:String,attr:"type",mutable:!0,watchCallbacks:["typeChanged"]},win:{context:"window"}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"events",{get:function(){return[{name:"ionWillOpen",method:"ionWillOpen",bubbles:!0,cancelable:!0,composed:!0},{name:"ionWillClose",method:"ionWillClose",bubbles:!0,cancelable:!0,composed:!0},{name:"ionDidOpen",method:"ionDidOpen",bubbles:!0,cancelable:!0,composed:!0},{name:"ionDidClose",method:"ionDidClose",bubbles:!0,cancelable:!0,composed:!0},{name:"ionMenuChange",method:"ionMenuChange",bubbles:!0,cancelable:!0,composed:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"listeners",{get:function(){return[{name:"body:ionSplitPaneVisible",method:"onSplitPaneChanged"},{name:"click",method:"onBackdropClick",capture:!0,disabled:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return".sc-ion-menu-md-h{--width:304px;--min-width:auto;--max-width:auto;--height:100%;--min-height:auto;--max-height:auto;--background:var(--ion-background-color,#fff);left:0;right:0;top:0;bottom:0;display:none;position:absolute;contain:strict}.show-menu.sc-ion-menu-md-h{display:block}.menu-inner.sc-ion-menu-md{left:0;right:auto;top:0;bottom:0;-webkit-transform:translate3d(-9999px,0,0);transform:translate3d(-9999px,0,0);display:-ms-flexbox;display:flex;position:absolute;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:justify;justify-content:space-between;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);background:var(--background);contain:strict}[dir=rtl].sc-ion-menu-md-h   .menu-inner.sc-ion-menu-md, [dir=rtl]   .sc-ion-menu-md-h   .menu-inner.sc-ion-menu-md{left:auto;right:0;-webkit-transform:translate3d(calc(-1 * -9999px),0,0);transform:translate3d(calc(-1 * -9999px),0,0)}.menu-side-start.sc-ion-menu-md-h   .menu-inner.sc-ion-menu-md{--ion-safe-area-right:0px;right:auto;left:0}.menu-side-end.sc-ion-menu-md-h   .menu-inner.sc-ion-menu-md{--ion-safe-area-left:0px;right:0;left:auto}ion-backdrop.sc-ion-menu-md{display:none;opacity:.01;z-index:-1}\@media (max-width:340px){.menu-inner.sc-ion-menu-md{--width:264px}}.menu-type-reveal.sc-ion-menu-md-h{z-index:0}.menu-type-reveal.show-menu.sc-ion-menu-md-h   .menu-inner.sc-ion-menu-md{-webkit-transform:translateZ(0);transform:translateZ(0)}.menu-type-overlay.sc-ion-menu-md-h{z-index:80}.menu-type-overlay.sc-ion-menu-md-h   .show-backdrop.sc-ion-menu-md{display:block;cursor:pointer}.menu-pane-visible.sc-ion-menu-md-h   .menu-inner.sc-ion-menu-md{left:0;right:0;width:auto;-webkit-transform:none!important;transform:none!important;-webkit-box-shadow:none!important;box-shadow:none!important}.menu-pane-visible.sc-ion-menu-md-h   ion-backdrop.sc-ion-menu-md{display:hidden!important}.menu-type-overlay.sc-ion-menu-md-h   .menu-inner.sc-ion-menu-md{-webkit-box-shadow:0 2px 22px 0 rgba(0,0,0,.09),4px 0 16px 0 rgba(0,0,0,.18);box-shadow:0 2px 22px 0 rgba(0,0,0,.09),4px 0 16px 0 rgba(0,0,0,.18)}"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"styleMode",{get:function(){return"md"},enumerable:!0,configurable:!0}),t}();function computeDelta(t,e,i){return Math.max(0,e!==i?-t:t)}function checkEdgeSide(t,e,i,n){return i?e>=t.innerWidth-n:e<=n}var SHOW_MENU="show-menu",SHOW_BACKDROP="show-backdrop",MENU_CONTENT_OPEN="menu-content-open",MenuToggle=function(){function t(){this.visible=!1,this.autoHide=!0}return t.prototype.componentDidLoad=function(){return this.updateVisibility()},t.prototype.onClick=function(){return tslib_1.__awaiter(this,void 0,void 0,function(){var t;return tslib_1.__generator(this,function(e){switch(e.label){case 0:return[4,getMenuController(this.doc)];case 1:return(t=e.sent())?[4,t.get(this.menu)]:[3,3];case 2:e.sent()&&t.toggle(this.menu),e.label=3;case 3:return[2]}})})},t.prototype.updateVisibility=function(){return tslib_1.__awaiter(this,void 0,void 0,function(){var t,e,i;return tslib_1.__generator(this,function(n){switch(n.label){case 0:return[4,getMenuController(this.doc)];case 1:return(t=n.sent())?[4,t.get(this.menu)]:[3,5];case 2:return e=n.sent(),(i=e)?[4,e.isActive()]:[3,4];case 3:i=n.sent(),n.label=4;case 4:if(i)return this.visible=!0,[2];n.label=5;case 5:return this.visible=!1,[2]}})})},t.prototype.hostData=function(){var t,e=this.autoHide&&!this.visible;return{"aria-hidden":e?"true":null,class:(t={},t[""+this.mode]=!0,t["menu-toggle-hidden"]=e,t)}},t.prototype.render=function(){return h("slot",null)},Object.defineProperty(t,"is",{get:function(){return"ion-menu-toggle"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{autoHide:{type:Boolean,attr:"auto-hide"},doc:{context:"document"},menu:{type:String,attr:"menu"},visible:{state:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"listeners",{get:function(){return[{name:"click",method:"onClick"},{name:"body:ionMenuChange",method:"updateVisibility"},{name:"body:ionSplitPaneVisible",method:"updateVisibility"}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return".menu-toggle-hidden.sc-ion-menu-toggle-h{display:none}"},enumerable:!0,configurable:!0}),t}();function getMenuController(t){var e=t.querySelector("ion-menu-controller");return e?e.componentOnReady():Promise.resolve(void 0)}export{Menu as IonMenu,MenuToggle as IonMenuToggle};