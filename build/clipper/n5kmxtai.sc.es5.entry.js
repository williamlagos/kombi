clipper.loadBundle("n5kmxtai",["exports","./chunk-79a31f10.js"],function(t,e){var i=window.clipper.h,n={xs:"(min-width: 0px)",sm:"(min-width: 576px)",md:"(min-width: 768px)",lg:"(min-width: 992px)",xl:"(min-width: 1200px)"};function r(t,e){return void 0===e||""===e||!!t.matchMedia&&t.matchMedia(n[e]).matches}var o=window,l=!!(o.CSS&&o.CSS.supports&&o.CSS.supports("--a: 0")),s=["","xs","sm","md","lg","xl"],a=function(){function t(){}return t.prototype.onResize=function(){this.el.forceUpdate()},t.prototype.getColumns=function(t){for(var e,i=0,n=s;i<n.length;i++){var o=n[i],l=r(this.win,o),a=this[t+o.charAt(0).toUpperCase()+o.slice(1)];l&&void 0!==a&&(e=a)}return e},t.prototype.calculateSize=function(){var t=this.getColumns("size");if(t&&""!==t){var e="auto"===t?"auto":l?"calc(calc("+t+" / var(--ion-grid-columns, 12)) * 100%)":t/12*100+"%";return{flex:"0 0 "+e,width:""+e,"max-width":""+e}}},t.prototype.calculatePosition=function(t,e){var i,n=this.getColumns(t);if(n)return(i={})[e]=l?"calc(calc("+n+" / var(--ion-grid-columns, 12)) * 100%)":n>0&&n<12?n/12*100+"%":"auto",i},t.prototype.calculateOffset=function(t){return this.calculatePosition("offset",t?"margin-right":"margin-left")},t.prototype.calculatePull=function(t){return this.calculatePosition("pull",t?"left":"right")},t.prototype.calculatePush=function(t){return this.calculatePosition("push",t?"right":"left")},t.prototype.hostData=function(){var t,e="rtl"===this.win.document.dir;return{class:(t={},t[""+this.mode]=!0,t),style:Object.assign({},this.calculateOffset(e),this.calculatePull(e),this.calculatePush(e),this.calculateSize())}},t.prototype.render=function(){return i("slot",null)},Object.defineProperty(t,"is",{get:function(){return"ion-col"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{el:{elementRef:!0},offset:{type:String,attr:"offset"},offsetLg:{type:String,attr:"offset-lg"},offsetMd:{type:String,attr:"offset-md"},offsetSm:{type:String,attr:"offset-sm"},offsetXl:{type:String,attr:"offset-xl"},offsetXs:{type:String,attr:"offset-xs"},pull:{type:String,attr:"pull"},pullLg:{type:String,attr:"pull-lg"},pullMd:{type:String,attr:"pull-md"},pullSm:{type:String,attr:"pull-sm"},pullXl:{type:String,attr:"pull-xl"},pullXs:{type:String,attr:"pull-xs"},push:{type:String,attr:"push"},pushLg:{type:String,attr:"push-lg"},pushMd:{type:String,attr:"push-md"},pushSm:{type:String,attr:"push-sm"},pushXl:{type:String,attr:"push-xl"},pushXs:{type:String,attr:"push-xs"},size:{type:String,attr:"size"},sizeLg:{type:String,attr:"size-lg"},sizeMd:{type:String,attr:"size-md"},sizeSm:{type:String,attr:"size-sm"},sizeXl:{type:String,attr:"size-xl"},sizeXs:{type:String,attr:"size-xs"},win:{context:"window"}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"listeners",{get:function(){return[{name:"window:resize",method:"onResize",passive:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return".sc-ion-col-h{padding-left:var(--ion-grid-column-padding-xs,var(--ion-grid-column-padding,5px));padding-right:var(--ion-grid-column-padding-xs,var(--ion-grid-column-padding,5px));padding-top:var(--ion-grid-column-padding-xs,var(--ion-grid-column-padding,5px));padding-bottom:var(--ion-grid-column-padding-xs,var(--ion-grid-column-padding,5px));margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;-ms-flex-preferred-size:0;flex-basis:0;-ms-flex-positive:1;flex-grow:1;width:100%;max-width:100%;min-height:1px}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.sc-ion-col-h{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--ion-grid-column-padding-xs,var(--ion-grid-column-padding,5px));padding-inline-start:var(--ion-grid-column-padding-xs,var(--ion-grid-column-padding,5px));-webkit-padding-end:var(--ion-grid-column-padding-xs,var(--ion-grid-column-padding,5px));padding-inline-end:var(--ion-grid-column-padding-xs,var(--ion-grid-column-padding,5px))}}\@media (min-width:576px){.sc-ion-col-h{padding-left:var(--ion-grid-column-padding-sm,var(--ion-grid-column-padding,5px));padding-right:var(--ion-grid-column-padding-sm,var(--ion-grid-column-padding,5px));padding-top:var(--ion-grid-column-padding-sm,var(--ion-grid-column-padding,5px));padding-bottom:var(--ion-grid-column-padding-sm,var(--ion-grid-column-padding,5px))}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.sc-ion-col-h{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--ion-grid-column-padding-sm,var(--ion-grid-column-padding,5px));padding-inline-start:var(--ion-grid-column-padding-sm,var(--ion-grid-column-padding,5px));-webkit-padding-end:var(--ion-grid-column-padding-sm,var(--ion-grid-column-padding,5px));padding-inline-end:var(--ion-grid-column-padding-sm,var(--ion-grid-column-padding,5px))}}}\@media (min-width:768px){.sc-ion-col-h{padding-left:var(--ion-grid-column-padding-md,var(--ion-grid-column-padding,5px));padding-right:var(--ion-grid-column-padding-md,var(--ion-grid-column-padding,5px));padding-top:var(--ion-grid-column-padding-md,var(--ion-grid-column-padding,5px));padding-bottom:var(--ion-grid-column-padding-md,var(--ion-grid-column-padding,5px))}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.sc-ion-col-h{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--ion-grid-column-padding-md,var(--ion-grid-column-padding,5px));padding-inline-start:var(--ion-grid-column-padding-md,var(--ion-grid-column-padding,5px));-webkit-padding-end:var(--ion-grid-column-padding-md,var(--ion-grid-column-padding,5px));padding-inline-end:var(--ion-grid-column-padding-md,var(--ion-grid-column-padding,5px))}}}\@media (min-width:992px){.sc-ion-col-h{padding-left:var(--ion-grid-column-padding-lg,var(--ion-grid-column-padding,5px));padding-right:var(--ion-grid-column-padding-lg,var(--ion-grid-column-padding,5px));padding-top:var(--ion-grid-column-padding-lg,var(--ion-grid-column-padding,5px));padding-bottom:var(--ion-grid-column-padding-lg,var(--ion-grid-column-padding,5px))}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.sc-ion-col-h{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--ion-grid-column-padding-lg,var(--ion-grid-column-padding,5px));padding-inline-start:var(--ion-grid-column-padding-lg,var(--ion-grid-column-padding,5px));-webkit-padding-end:var(--ion-grid-column-padding-lg,var(--ion-grid-column-padding,5px));padding-inline-end:var(--ion-grid-column-padding-lg,var(--ion-grid-column-padding,5px))}}}\@media (min-width:1200px){.sc-ion-col-h{padding-left:var(--ion-grid-column-padding-xl,var(--ion-grid-column-padding,5px));padding-right:var(--ion-grid-column-padding-xl,var(--ion-grid-column-padding,5px));padding-top:var(--ion-grid-column-padding-xl,var(--ion-grid-column-padding,5px));padding-bottom:var(--ion-grid-column-padding-xl,var(--ion-grid-column-padding,5px))}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.sc-ion-col-h{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--ion-grid-column-padding-xl,var(--ion-grid-column-padding,5px));padding-inline-start:var(--ion-grid-column-padding-xl,var(--ion-grid-column-padding,5px));-webkit-padding-end:var(--ion-grid-column-padding-xl,var(--ion-grid-column-padding,5px));padding-inline-end:var(--ion-grid-column-padding-xl,var(--ion-grid-column-padding,5px))}}}"},enumerable:!0,configurable:!0}),t}(),u=function(){function t(){this.fixed=!1}return t.prototype.hostData=function(){var t;return{class:(t={},t[""+this.mode]=!0,t["grid-fixed"]=this.fixed,t)}},t.prototype.render=function(){return i("slot",null)},Object.defineProperty(t,"is",{get:function(){return"ion-grid"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{fixed:{type:Boolean,attr:"fixed"}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return".sc-ion-grid-h{padding-left:var(--ion-grid-padding-xs,var(--ion-grid-padding,5px));padding-right:var(--ion-grid-padding-xs,var(--ion-grid-padding,5px));padding-top:var(--ion-grid-padding-xs,var(--ion-grid-padding,5px));padding-bottom:var(--ion-grid-padding-xs,var(--ion-grid-padding,5px));margin-left:auto;margin-right:auto;display:block;-ms-flex:1;flex:1}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.sc-ion-grid-h{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--ion-grid-padding-xs,var(--ion-grid-padding,5px));padding-inline-start:var(--ion-grid-padding-xs,var(--ion-grid-padding,5px));-webkit-padding-end:var(--ion-grid-padding-xs,var(--ion-grid-padding,5px));padding-inline-end:var(--ion-grid-padding-xs,var(--ion-grid-padding,5px))}}\@media (min-width:576px){.sc-ion-grid-h{padding-left:var(--ion-grid-padding-sm,var(--ion-grid-padding,5px));padding-right:var(--ion-grid-padding-sm,var(--ion-grid-padding,5px));padding-top:var(--ion-grid-padding-sm,var(--ion-grid-padding,5px));padding-bottom:var(--ion-grid-padding-sm,var(--ion-grid-padding,5px))}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.sc-ion-grid-h{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--ion-grid-padding-sm,var(--ion-grid-padding,5px));padding-inline-start:var(--ion-grid-padding-sm,var(--ion-grid-padding,5px));-webkit-padding-end:var(--ion-grid-padding-sm,var(--ion-grid-padding,5px));padding-inline-end:var(--ion-grid-padding-sm,var(--ion-grid-padding,5px))}}}\@media (min-width:768px){.sc-ion-grid-h{padding-left:var(--ion-grid-padding-md,var(--ion-grid-padding,5px));padding-right:var(--ion-grid-padding-md,var(--ion-grid-padding,5px));padding-top:var(--ion-grid-padding-md,var(--ion-grid-padding,5px));padding-bottom:var(--ion-grid-padding-md,var(--ion-grid-padding,5px))}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.sc-ion-grid-h{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--ion-grid-padding-md,var(--ion-grid-padding,5px));padding-inline-start:var(--ion-grid-padding-md,var(--ion-grid-padding,5px));-webkit-padding-end:var(--ion-grid-padding-md,var(--ion-grid-padding,5px));padding-inline-end:var(--ion-grid-padding-md,var(--ion-grid-padding,5px))}}}\@media (min-width:992px){.sc-ion-grid-h{padding-left:var(--ion-grid-padding-lg,var(--ion-grid-padding,5px));padding-right:var(--ion-grid-padding-lg,var(--ion-grid-padding,5px));padding-top:var(--ion-grid-padding-lg,var(--ion-grid-padding,5px));padding-bottom:var(--ion-grid-padding-lg,var(--ion-grid-padding,5px))}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.sc-ion-grid-h{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--ion-grid-padding-lg,var(--ion-grid-padding,5px));padding-inline-start:var(--ion-grid-padding-lg,var(--ion-grid-padding,5px));-webkit-padding-end:var(--ion-grid-padding-lg,var(--ion-grid-padding,5px));padding-inline-end:var(--ion-grid-padding-lg,var(--ion-grid-padding,5px))}}}\@media (min-width:1200px){.sc-ion-grid-h{padding-left:var(--ion-grid-padding-xl,var(--ion-grid-padding,5px));padding-right:var(--ion-grid-padding-xl,var(--ion-grid-padding,5px));padding-top:var(--ion-grid-padding-xl,var(--ion-grid-padding,5px));padding-bottom:var(--ion-grid-padding-xl,var(--ion-grid-padding,5px))}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.sc-ion-grid-h{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--ion-grid-padding-xl,var(--ion-grid-padding,5px));padding-inline-start:var(--ion-grid-padding-xl,var(--ion-grid-padding,5px));-webkit-padding-end:var(--ion-grid-padding-xl,var(--ion-grid-padding,5px));padding-inline-end:var(--ion-grid-padding-xl,var(--ion-grid-padding,5px));margin-left:unset;margin-right:unset;-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto}}}.grid-fixed.sc-ion-grid-h{width:var(--ion-grid-width-xs,var(--ion-grid-width,100%));max-width:100%}\@media (min-width:576px){.grid-fixed.sc-ion-grid-h{width:var(--ion-grid-width-sm,var(--ion-grid-width,540px))}}\@media (min-width:768px){.grid-fixed.sc-ion-grid-h{width:var(--ion-grid-width-md,var(--ion-grid-width,720px))}}\@media (min-width:992px){.grid-fixed.sc-ion-grid-h{width:var(--ion-grid-width-lg,var(--ion-grid-width,960px))}}\@media (min-width:1200px){.grid-fixed.sc-ion-grid-h{width:var(--ion-grid-width-xl,var(--ion-grid-width,1140px))}}[no-padding].sc-ion-grid-h, .sc-ion-grid-h[no-padding] .sc-ion-grid-s > ion-col{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0}"},enumerable:!0,configurable:!0}),t}(),c=function(){function t(){this.itemStyles=new Map,this.multipleInputs=!1,this.button=!1,this.detailIcon="ios-arrow-forward",this.disabled=!1,this.routerDirection="forward",this.type="button"}return t.prototype.itemStyle=function(t){t.stopPropagation();var e=t.target.tagName,i=t.detail,n={},r=this.itemStyles.get(e)||{},o=!1;Object.keys(i).forEach(function(t){var e="item-"+t,l=i[t];l!==r[e]&&(o=!0),l&&(n[e]=!0)}),o&&(this.itemStyles.set(e,n),this.el.forceUpdate())},t.prototype.componentDidLoad=function(){Array.from(this.el.querySelectorAll("ion-button")).forEach(function(t){void 0===t.size&&(t.size="small")});var t=this.el.querySelectorAll("ion-select, ion-datetime");this.multipleInputs=t.length>1},t.prototype.isClickable=function(){return void 0!==this.href||this.button},t.prototype.hostData=function(){var t,i={};return this.itemStyles.forEach(function(t){Object.assign(i,t)}),{"aria-disabled":this.disabled?"true":null,class:Object.assign({},i,e.createColorClasses(this.color),(t={item:!0},t[""+this.mode]=!0,t["item-lines-"+this.lines]=void 0!==this.lines,t["item-disabled"]=this.disabled,t["in-list"]=e.hostContext("ion-list",this.el),t["item-multiple-inputs"]=this.multipleInputs,t["ion-activatable"]=this.isClickable(),t["ion-focusable"]=!0,t))}},t.prototype.render=function(){var t=this,n=t.href,r=t.detail,o=t.mode,l=t.win,s=t.detailIcon,a=t.routerDirection,u=t.type,c=this.isClickable(),p=c?void 0===n?"button":"a":"div",f=void 0!==r?r:"ios"===o&&c;return[i(p,Object.assign({},"button"===p?{type:u}:{href:n},{class:"item-native",disabled:this.disabled,onClick:function(t){return e.openURL(l,n,t,a)}}),i("slot",{name:"start"}),i("div",{class:"item-inner"},i("div",{class:"input-wrapper"},i("slot",null)),i("slot",{name:"end"}),f&&i("ion-icon",{icon:s,lazy:!1,class:"item-detail-icon"}),i("div",{class:"item-inner-highlight"})),c&&"md"===o&&i("ion-ripple-effect",null)),i("div",{class:"item-highlight"})]},Object.defineProperty(t,"is",{get:function(){return"ion-item"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{button:{type:Boolean,attr:"button"},color:{type:String,attr:"color"},detail:{type:Boolean,attr:"detail"},detailIcon:{type:String,attr:"detail-icon"},disabled:{type:Boolean,attr:"disabled"},el:{elementRef:!0},href:{type:String,attr:"href"},lines:{type:String,attr:"lines"},mode:{type:String,attr:"mode"},multipleInputs:{state:!0},routerDirection:{type:String,attr:"router-direction"},type:{type:String,attr:"type"},win:{context:"window"}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"listeners",{get:function(){return[{name:"ionStyle",method:"itemStyle"}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return".sc-ion-item-ios-h{--border-radius:0px;--border-width:0px;--border-style:solid;--padding-top:0px;--padding-bottom:0px;--padding-end:0px;--padding-start:0px;--box-shadow:none;--inner-border-width:0px;--inner-padding-top:0px;--inner-padding-bottom:0px;--inner-padding-start:0px;--inner-padding-end:0px;--inner-box-shadow:none;--show-full-highlight:0;--show-inset-highlight:0;--detail-icon-color:initial;--detail-icon-font-size:20px;--detail-icon-opacity:0.25;--ripple-color:var(--ion-item-background-activated,currentColor);-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:block;position:relative;outline:none;color:var(--color);font-family:var(--ion-font-family,inherit);text-align:initial;text-decoration:none;-webkit-box-sizing:border-box;box-sizing:border-box}.ion-color.sc-ion-item-ios-h   .item-native.sc-ion-item-ios{background:var(--ion-color-base);color:var(--ion-color-contrast)}.ion-color.sc-ion-item-ios-h   .item-inner.sc-ion-item-ios, .ion-color.sc-ion-item-ios-h   .item-native.sc-ion-item-ios{border-color:var(--ion-color-shade)}.ion-focused.sc-ion-item-ios-h   .item-native.sc-ion-item-ios{background:var(--background-focused)}.activated.sc-ion-item-ios-h   .item-native.sc-ion-item-ios{background:var(--background-activated)}.ion-color.activated.sc-ion-item-ios-h   .item-native.sc-ion-item-ios{background:var(--ion-color-tint)}.item-disabled.sc-ion-item-ios-h{cursor:default;opacity:.3;pointer-events:none}.item-native.sc-ion-item-ios{border-radius:var(--border-radius);margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:calc(var(--padding-start) + var(--ion-safe-area-left, 0px));padding-right:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;display:-ms-flexbox;display:flex;position:relative;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;width:100%;min-height:var(--min-height);-webkit-transition:var(--transition);transition:var(--transition);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);outline:none;background:var(--background);-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow);overflow:hidden;-webkit-box-sizing:border-box;box-sizing:border-box}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.item-native.sc-ion-item-ios{padding-left:unset;padding-right:unset;-webkit-padding-start:calc(var(--padding-start) + var(--ion-safe-area-left, 0px));padding-inline-start:calc(var(--padding-start) + var(--ion-safe-area-left, 0px));-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end)}}.item-native.sc-ion-item-ios::-moz-focus-inner{border:0}a.sc-ion-item-ios, button.sc-ion-item-ios{cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-user-drag:none}.item-inner.sc-ion-item-ios{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:var(--inner-padding-start);padding-right:calc(var(--ion-safe-area-right, 0px) + var(--inner-padding-end));padding-top:var(--inner-padding-top);padding-bottom:var(--inner-padding-bottom);display:-ms-flexbox;display:flex;position:relative;-ms-flex:1;flex:1;-ms-flex-direction:inherit;flex-direction:inherit;-ms-flex-align:inherit;align-items:inherit;-ms-flex-item-align:stretch;align-self:stretch;min-height:inherit;border-width:var(--inner-border-width);border-style:var(--border-style);border-color:var(--border-color);-webkit-box-shadow:var(--inner-box-shadow);box-shadow:var(--inner-box-shadow);overflow:hidden;-webkit-box-sizing:border-box;box-sizing:border-box}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.item-inner.sc-ion-item-ios{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--inner-padding-start);padding-inline-start:var(--inner-padding-start);-webkit-padding-end:calc(var(--ion-safe-area-right, 0px) + var(--inner-padding-end));padding-inline-end:calc(var(--ion-safe-area-right, 0px) + var(--inner-padding-end))}}.item-detail-icon.sc-ion-item-ios{color:var(--detail-icon-color);font-size:var(--detail-icon-font-size);opacity:var(--detail-icon-opacity)}.sc-ion-item-ios-s > ion-icon{font-size:1.6em}.sc-ion-item-ios-s > ion-button{--margin-top:0;--margin-bottom:0;--margin-start:0;--margin-end:0;z-index:1}.sc-ion-item-ios-s > ion-label{-ms-flex:1;flex:1}.item-input.sc-ion-item-ios-h, [vertical-align-top].sc-ion-item-ios-h{-ms-flex-align:start;align-items:flex-start}.input-wrapper.sc-ion-item-ios{display:-ms-flexbox;display:flex;-ms-flex:1;flex:1;-ms-flex-direction:inherit;flex-direction:inherit;-ms-flex-align:inherit;align-items:inherit;-ms-flex-item-align:stretch;align-self:stretch;text-overflow:ellipsis;overflow:hidden;-webkit-box-sizing:border-box;box-sizing:border-box}.item-label-floating.sc-ion-item-ios-h   .input-wrapper.sc-ion-item-ios, .item-label-stacked.sc-ion-item-ios-h   .input-wrapper.sc-ion-item-ios{-ms-flex:1;flex:1;-ms-flex-direction:column;flex-direction:column}.item-highlight.sc-ion-item-ios, .item-inner-highlight.sc-ion-item-ios{left:0;right:0;bottom:0;position:absolute;background:var(--highlight-background)}.item-highlight.sc-ion-item-ios{height:var(--full-highlight-height)}.item-inner-highlight.sc-ion-item-ios{height:var(--inset-highlight-height)}.item-interactive.ion-touched.ion-invalid.sc-ion-item-ios-h, .item-interactive.item-has-focus.sc-ion-item-ios-h{--full-highlight-height:calc(var(--highlight-height) * var(--show-full-highlight));--inset-highlight-height:calc(var(--highlight-height) * var(--show-inset-highlight))}.item-interactive.item-has-focus.sc-ion-item-ios-h{--highlight-background:var(--highlight-color-focused)}.item-interactive.ion-valid.sc-ion-item-ios-h{--highlight-background:var(--highlight-color-valid)}.item-interactive.ion-invalid.sc-ion-item-ios-h{--highlight-background:var(--highlight-color-invalid)}.sc-ion-item-ios-h.item-label-floating .sc-ion-item-ios-s > ion-select, .sc-ion-item-ios-h.item-label-stacked .sc-ion-item-ios-s > ion-select{--padding-start:0;-ms-flex-item-align:stretch;align-self:stretch;width:100%;max-width:100%}.sc-ion-item-ios-h.item-label-floating .sc-ion-item-ios-s > ion-datetime, .sc-ion-item-ios-h.item-label-stacked .sc-ion-item-ios-s > ion-datetime{--padding-start:0;width:100%}.sc-ion-item-ios-h.item-multiple-inputs .sc-ion-item-ios-s > ion-datetime, .sc-ion-item-ios-h.item-multiple-inputs .sc-ion-item-ios-s > ion-select{position:relative}.item-textarea.sc-ion-item-ios-h{-ms-flex-align:stretch;align-items:stretch}.sc-ion-item-ios-s > ion-reorder[slot]{margin-top:0;margin-bottom:0}ion-ripple-effect.sc-ion-item-ios{color:var(--ripple-color)}.sc-ion-item-ios-h{--min-height:44px;--transition:background-color 200ms linear;--padding-start:16px;--inner-padding-end:8px;--inner-border-width:0px 0px 0.55px 0px;--background:var(--ion-item-background,var(--ion-background-color,#fff));--background-activated:var(--ion-item-background-activated,#d9d9d9);--background-focused:var(--ion-item-background-activated,#d9d9d9);--border-color:var(--ion-item-border-color,var(--ion-border-color,var(--ion-color-step-150,#c8c7cc)));--color:var(--ion-item-color,var(--ion-text-color,#000));--highlight-height:0;--highlight-color-focused:var(--ion-color-primary,#3880ff);--highlight-color-valid:var(--ion-color-success,#10dc60);--highlight-color-invalid:var(--ion-color-danger,#f04141);font-size:17px}.activated.sc-ion-item-ios-h{--transition:none}.item-interactive.sc-ion-item-ios-h{--show-full-highlight:0;--show-inset-highlight:1}.item-lines-full.sc-ion-item-ios-h{--border-width:0px 0px 0.55px 0px;--show-full-highlight:1;--show-inset-highlight:0}.item-lines-inset.sc-ion-item-ios-h{--inner-border-width:0px 0px 0.55px 0px;--show-full-highlight:0;--show-inset-highlight:1}.item-lines-inset.sc-ion-item-ios-h, .item-lines-none.sc-ion-item-ios-h{--border-width:0px;--show-full-highlight:0}.item-lines-full.sc-ion-item-ios-h, .item-lines-none.sc-ion-item-ios-h{--inner-border-width:0px;--show-inset-highlight:0}.sc-ion-item-ios-s > [slot=start]{margin-left:0;margin-right:16px;margin-top:2px;margin-bottom:2px}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.sc-ion-item-ios-s > [slot=start]{margin-left:unset;margin-right:unset;-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:16px;margin-inline-end:16px}}.sc-ion-item-ios-s > [slot=end]{margin-left:8px;margin-right:8px}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.sc-ion-item-ios-s > [slot=end]{margin-left:unset;margin-right:unset;-webkit-margin-start:8px;margin-inline-start:8px;-webkit-margin-end:8px;margin-inline-end:8px}}.sc-ion-item-ios-s > ion-icon[slot=end], .sc-ion-item-ios-s > ion-icon[slot=start]{margin-left:0;margin-top:7px;margin-bottom:7px}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.sc-ion-item-ios-s > ion-icon[slot=end], .sc-ion-item-ios-s > ion-icon[slot=start]{margin-left:unset;-webkit-margin-start:0;margin-inline-start:0}}.sc-ion-item-ios-s > ion-toggle[slot=end], .sc-ion-item-ios-s > ion-toggle[slot=start]{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0}.sc-ion-item-ios-h.item-label-floating .sc-ion-item-ios-s > [slot=end], .sc-ion-item-ios-h.item-label-stacked .sc-ion-item-ios-s > [slot=end]{margin-top:7px;margin-bottom:7px}.sc-ion-item-ios-s > .button-small{--padding-top:0px;--padding-bottom:0px;--padding-start:.5em;--padding-end:.5em;height:24px;font-size:13px}.sc-ion-item-ios-s > ion-avatar{width:36px;height:36px}.sc-ion-item-ios-s > ion-thumbnail{width:56px;height:56px}.sc-ion-item-ios-s > ion-avatar[slot=end], .sc-ion-item-ios-s > ion-thumbnail[slot=end]{margin-left:8px;margin-right:8px;margin-top:8px;margin-bottom:8px}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.sc-ion-item-ios-s > ion-avatar[slot=end], .sc-ion-item-ios-s > ion-thumbnail[slot=end]{margin-left:unset;margin-right:unset;-webkit-margin-start:8px;margin-inline-start:8px;-webkit-margin-end:8px;margin-inline-end:8px}}.sc-ion-item-ios-h.item-radio .sc-ion-item-ios-s > ion-label, .sc-ion-item-ios-h.item-toggle .sc-ion-item-ios-s > ion-label{margin-left:0}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.sc-ion-item-ios-h.item-radio .sc-ion-item-ios-s > ion-label, .sc-ion-item-ios-h.item-toggle .sc-ion-item-ios-s > ion-label{margin-left:unset;-webkit-margin-start:0;margin-inline-start:0}}.sc-ion-item-ios-s > ion-label{margin-left:0;margin-right:8px;margin-top:10px;margin-bottom:10px}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.sc-ion-item-ios-s > ion-label{margin-left:unset;margin-right:unset;-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:8px;margin-inline-end:8px}}.item-label-floating.sc-ion-item-ios-h, .item-label-stacked.sc-ion-item-ios-h{--min-height:68px}.sc-ion-item-ios-h.item-label-floating .sc-ion-item-ios-s > ion-select, .sc-ion-item-ios-h.item-label-stacked .sc-ion-item-ios-s > ion-select{--padding-top:8px;--padding-bottom:8px;--padding-start:0px}"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"styleMode",{get:function(){return"ios"},enumerable:!0,configurable:!0}),t}(),p=function(){function t(){}return t.prototype.hostData=function(){var t;return{class:(t={},t[""+this.mode]=!0,t)}},t.prototype.render=function(){return i("slot",null)},Object.defineProperty(t,"is",{get:function(){return"ion-row"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return".sc-ion-row-h{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}"},enumerable:!0,configurable:!0}),t}();t.IonCol=a,t.IonGrid=u,t.IonItem=c,t.IonRow=p,Object.defineProperty(t,"__esModule",{value:!0})});