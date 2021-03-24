function e(e){return Promise.resolve((new e).easing("cubic-bezier(0.0, 0.0, 0.2, 1)").easingReverse("cubic-bezier(0.4, 0.0, 0.6, 1)").duration(300))}const t=8;function n(n,i,s){let r,a;const o=s.width+t;s.isEndSide?(r=o+"px",a="0px"):(r=-o+"px",a="0px");const d=(new n).addElement(s.menuInnerEl).fromTo("translateX",r,a),c=(new n).addElement(s.backdropEl).fromTo("opacity",.01,.32);return e(n).then(e=>e.add(d).add(c))}function i(t,n,i){let s,r;const a=i.width;i.isEndSide?(s=-a+"px",r=a+"px"):(s=a+"px",r=-a+"px");const o=(new t).addElement(i.menuInnerEl).fromTo("translateX",r,"0px"),d=(new t).addElement(i.contentEl).fromTo("translateX","0px",s),c=(new t).addElement(i.backdropEl).fromTo("opacity",.01,.32);return e(t).then(e=>e.add(o).add(c).add(d))}function s(t,n,i){const s=i.width*(i.isEndSide?-1:1)+"px",r=(new t).addElement(i.contentEl).fromTo("translateX","0px",s);return e(t).then(e=>e.add(r))}class r{constructor(){this.menus=[],this.menuAnimations=new Map,this.registerAnimation("reveal",s),this.registerAnimation("push",i),this.registerAnimation("overlay",n)}async open(e){const t=await this.get(e);return!!t&&t.open()}async close(e){const t=await(void 0!==e?this.get(e):this.getOpen());return void 0!==t&&t.close()}async toggle(e){const t=await this.get(e);return!!t&&t.toggle()}async enable(e,t){const n=await this.get(t);return n&&(n.disabled=!e),n}async swipeGesture(e,t){const n=await this.get(t);return n&&(n.swipeGesture=e),n}async isOpen(e){if(null!=e){const t=await this.get(e);return void 0!==t&&t.isOpen()}return void 0!==await this.getOpen()}async isEnabled(e){const t=await this.get(e);return!!t&&!t.disabled}async get(e){if(await this.waitUntilReady(),"start"===e||"end"===e){return this.find(t=>t.side===e&&!t.disabled)||this.find(t=>t.side===e)}if(null!=e)return this.find(t=>t.menuId===e);return this.find(e=>!e.disabled)||(this.menus.length>0?this.menus[0].el:void 0)}async getOpen(){return await this.waitUntilReady(),this.getOpenSync()}async getMenus(){return await this.waitUntilReady(),this.getMenusSync()}async isAnimating(){return await this.waitUntilReady(),this.isAnimatingSync()}registerAnimation(e,t){this.menuAnimations.set(e,t)}_getInstance(){return Promise.resolve(this)}_register(e){const t=this.menus;t.indexOf(e)<0&&(e.disabled||this._setActiveMenu(e),t.push(e))}_unregister(e){const t=this.menus.indexOf(e);t>-1&&this.menus.splice(t,1)}_setActiveMenu(e){const t=e.side;this.menus.filter(n=>n.side===t&&n!==e).forEach(e=>e.disabled=!0)}async _setOpen(e,t,n){if(this.isAnimatingSync())return!1;if(t){const t=await this.getOpen();t&&e.el!==t&&await t.setOpen(!1,!1)}return e._setOpen(t,n)}async _createAnimation(e,t){const n=this.menuAnimations.get(e);if(!n)throw new Error("animation not registered");const i=await import("./chunk-d84dff50.js").then(e=>e.create(n,null,t));return this.config.getBoolean("animated",!0)||i.duration(0),i}getOpenSync(){return this.find(e=>e._isOpen)}getMenusSync(){return this.menus.map(e=>e.el)}isAnimatingSync(){return this.menus.some(e=>e.isAnimating)}find(e){const t=this.menus.find(e);if(void 0!==t)return t.el}waitUntilReady(){return Promise.all(Array.from(this.doc.querySelectorAll("ion-menu")).map(e=>e.componentOnReady()))}static get is(){return"ion-menu-controller"}static get properties(){return{_getInstance:{method:!0},close:{method:!0},config:{context:"config"},doc:{context:"document"},enable:{method:!0},get:{method:!0},getMenus:{method:!0},getOpen:{method:!0},isAnimating:{method:!0},isEnabled:{method:!0},isOpen:{method:!0},open:{method:!0},registerAnimation:{method:!0},swipeGesture:{method:!0},toggle:{method:!0}}}static get style(){return".menu-content{-webkit-transform:translateZ(0);transform:translateZ(0)}.menu-content-open{cursor:pointer;-ms-touch-action:manipulation;touch-action:manipulation;pointer-events:none}.ios .menu-content-reveal{-webkit-box-shadow:-8px 0 42px rgba(0,0,0,.08);box-shadow:-8px 0 42px rgba(0,0,0,.08)}[dir=rtl].ios .menu-content-reveal{-webkit-box-shadow:8px 0 42px rgba(0,0,0,.08);box-shadow:8px 0 42px rgba(0,0,0,.08)}.md .menu-content-push,.md .menu-content-reveal{-webkit-box-shadow:0 2px 22px 0 rgba(0,0,0,.09),4px 0 16px 0 rgba(0,0,0,.18);box-shadow:0 2px 22px 0 rgba(0,0,0,.09),4px 0 16px 0 rgba(0,0,0,.18)}"}}export{r as IonMenuController};