const t=window.clipper.h;import{n as e}from"./chunk-d849fd5a.js";import"./chunk-1c3f1b74.js";import{a as s,b as i}from"./chunk-2d7d20a8.js";import{a as o,f as n,b as a,g as r}from"./chunk-4c9a5991.js";import{a as l}from"./chunk-17f44925.js";import{g as h}from"./chunk-e658e8b7.js";import{a as d}from"./chunk-c82b670d.js";import{f as c,g as u,h as p}from"./chunk-794673eb.js";class m{constructor(){this.excludeTracks=[],this.dayIndex=0,this.groups=[],this.shownSessions=[],this.segment="awaiting",this.queryText="",this.orders=[],this.scheduleOrders=[],this.awaitingOrders=[],this.slided=!1}async componentWillLoad(){this.updateSchedule(),this.store.mapStateToProps(this,t=>{const{session:{token:e}}=t;return{token:e}}),this.store.mapDispatchToProps(this,{close:e}),this.role=this.parseJwt(this.token)._role,"MERCHANT"===this.role?(this.store.mapStateToProps(this,t=>{const{merchant:{orders:e}}=t;return{orders:e}}),this.store.mapDispatchToProps(this,{showMyOrders:o,selectOrder:n,cancelOrder:a,startOrder:r})):"CUSTOMER"===this.role&&(this.store.mapStateToProps(this,t=>{const{customer:{orders:e}}=t;return{orders:e}}),this.store.mapDispatchToProps(this,{showCustomerOrders:l,cancelOrder:a})),await this.populateOrders()}componentDidLoad(){this.scheduleList=this.el.querySelector("#scheduleList"),this.fab=this.el.querySelector("#socialFab")}async populateOrders(){"MERCHANT"===this.role?await this.showMyOrders(this.token):await this.showCustomerOrders(this.token),this.scheduleOrders=this.orders.filter(t=>"accepted"===t.status),this.awaitingOrders=this.orders.filter(t=>"awaiting_for_confirmation"===t.status)}parseJwt(t){const e=t.split(".")[1].replace(/-/g,"+").replace(/_/g,"/");return JSON.parse(window.atob(e))}segmentChanged(t){this.segment=t.target.value,this.updateSchedule()}searchbarChanged(t){this.queryText=t.target.value,console.log(this.queryText),this.updateSchedule()}modalDidDismiss(t){t&&(this.excludeTracks=t.detail.data,this.updateSchedule())}loadingWillDismiss(){this.fab.close()}async updateSchedule(){const t=await s.getTimeline(this.dayIndex,this.queryText,this.excludeTracks,this.segment);this.shownSessions=t.shownSessions,this.groups=t.groups,this.el.forceUpdate()}async presentFilter(){const t=await this.modalCtrl.create({component:"page-schedule-filter",componentProps:{excludedTracks:this.excludeTracks}});await t.present()}async cancelCurrentOrder(t){await this.cancelOrder(t,this.token),await this.populateOrders(),(await this.tab.componentOnReady()).select("tab-drawer"),this.close()}async startCurrentOrder(t){await this.startOrder(t,this.token),(await this.tab.componentOnReady()).select("tab-drawer"),this.close()}async confirmOrder(t){(await this.alertCtrl.create({header:"Confirmar o frete para o horário?",buttons:[{text:"Cancelar",handler:()=>{}},{text:"Confirmar",handler:async()=>{this.selectOrder(t,this.token),await this.populateOrders()}}]})).present()}async removeFavorite(t,e){(await this.alertCtrl.create({header:e,message:"Would you like to remove this session from your favorites?",buttons:[{text:"Cancel",handler:()=>{}},{text:"Remove",handler:()=>{i.removeFavorite(t.name),this.updateSchedule()}}]})).present()}async openSocial(t){this.toggleList();const e=await this.loadingCtrl.create({message:`Posting to ${t}`,duration:1e3*Math.random()+500});await e.present()}toggleList(){const t=this.fab.querySelector("ion-fab-button");t.activated=!t.activated;const e=this.fab.querySelector("ion-fab-list");e.activated=!e.activated}async toggleSlide(t){const e=document.getElementById(t);this.slided?await e.close():await e.open("end"),this.slided=!this.slided}render(){return[t("ion-header",{class:"aligned"},t("ion-toolbar",{class:"aligned"},t("ion-buttons",{slot:"start"},t("ion-menu-button",null)),t("ion-segment",{class:"aligned",value:this.segment},t("ion-segment-button",{value:"awaiting"},"Aguardando"),t("ion-segment-button",{value:"schedule"},"Agendados")),t("ion-buttons",{slot:"end"}))),t("ion-content",null,t("ion-list",{id:"scheduleList",hidden:0===this.shownSessions},("awaiting"===this.segment?this.awaitingOrders:this.scheduleOrders).map(e=>t("ion-item-group",null,t("ion-item-sliding",{class:"item-sliding-track",id:e._id,onClick:()=>this.toggleSlide(e._id)},t("ion-item-options",{side:"start"},"accepted"===e.status&&t("ion-item-option",{color:"danger",onClick:()=>this.cancelCurrentOrder(e._id)},"Cancelar")),t("ion-item",{class:"item-sliding-track-trabalho",href:"#"},t("ion-label",null,t("h3",null,e.job.destination.address.street+" "+e.job.destination.address.number),t("p",null," ",e.job.scheduledTo," - ",e.job.origin.address.street+" "+e.job.origin.address.number))),t("ion-item-options",{side:"end"},"MERCHANT"===this.role&&("awaiting_for_confirmation"===e.status?t("ion-item-option",{color:"favorite",onClick:()=>this.confirmOrder(e._id)},"Confirmar"):t("ion-item-option",{color:"tertiary",onClick:()=>this.startCurrentOrder(e._id)},"Começar"))))))),t("ion-list-header",{hidden:("awaiting"===this.segment?this.awaitingOrders:this.scheduleOrders).length>0},"Não há sessões encontradas"))]}static get is(){return"page-schedule"}static get properties(){return{alertCtrl:{connect:"ion-alert-controller"},awaitingOrders:{state:!0},config:{context:"config"},el:{elementRef:!0},groups:{state:!0},loadingCtrl:{connect:"ion-loading-controller"},modalCtrl:{connect:"ion-modal-controller"},orders:{state:!0},queryText:{state:!0},role:{state:!0},scheduleOrders:{state:!0},segment:{state:!0},shownSessions:{state:!0},slided:{state:!0},store:{context:"store"},tab:{connect:"ion-tabs"},token:{state:!0}}}static get listeners(){return[{name:"ionChange",method:"segmentChanged"},{name:"ionInput",method:"searchbarChanged"},{name:"body:ionModalDidDismiss",method:"modalDidDismiss"},{name:"body:ionLoadingWillDismiss",method:"loadingWillDismiss"}]}static get style(){return".ion-item-divider.sticky{position:sticky;position:-webkit-sticky;top:0}.item-sliding-track ion-label{border-left:2px solid transparent;padding-left:10px}.item-sliding-track-trabalho ion-label{border-left-color:var(--ion-color-primary)}.item-sliding-track-jantar ion-label{border-left-color:var(--ion-color-angular)}.item-sliding-track-quarto ion-label{border-left-color:var(--ion-color-communication)}.item-sliding-track-cozinha ion-label{border-left-color:var(--ion-color-tooling)}.item-sliding-track-lazer ion-label{border-left-color:var(--ion-color-services)}.item-sliding-track-living ion-label{border-left-color:var(--ion-color-design)}.item-sliding-track-oficina ion-label{border-left-color:var(--ion-color-workshop)}.item-sliding-track-comida ion-label{border-left-color:var(--ion-color-food)}.item-sliding-track-biblioteca ion-label{border-left-color:var(--ion-color-documentation)}.item-sliding-track-comercial ion-label{border-left-color:var(--ion-color-navigation)}.aligned{min-height:56px}"}}class g{hostData(){return{role:"group",class:{[`${this.mode}`]:!0,[`item-group-${this.mode}`]:!0,item:!0}}}static get is(){return"ion-item-group"}static get style(){return"ion-item-group{display:block}.item-group-ios ion-item-sliding:last-child .item,.item-group-ios ion-item:last-child{--border-width:0}"}static get styleMode(){return"ios"}}class b{constructor(){this.disabled=!1,this.expandable=!1}onClick(t){t.target.closest("ion-item-option")&&t.preventDefault()}hostData(){const{disabled:t,expandable:e}=this;return{class:Object.assign({},d(this.color),{[`${this.mode}`]:!0,"item-option-disabled":t,"item-option-expandable":e,"ion-activatable":!0})}}render(){return t(void 0===this.href?"button":"a",{type:"button",class:"button-native",disabled:this.disabled,href:this.href},t("span",{class:"button-inner"},t("slot",{name:"top"}),t("div",{class:"horizontal-wrapper"},t("slot",{name:"start"}),t("slot",{name:"icon-only"}),t("slot",null),t("slot",{name:"end"})),t("slot",{name:"bottom"})),"md"===this.mode&&t("ion-ripple-effect",null))}static get is(){return"ion-item-option"}static get encapsulation(){return"shadow"}static get properties(){return{color:{type:String,attr:"color"},disabled:{type:Boolean,attr:"disabled"},el:{elementRef:!0},expandable:{type:Boolean,attr:"expandable"},href:{type:String,attr:"href"},mode:{type:String,attr:"mode"}}}static get listeners(){return[{name:"click",method:"onClick"}]}static get style(){return":host{--background:var(--ion-color-primary,#3880ff);--color:var(--ion-color-primary-contrast,#fff);background:var(--background);color:var(--color);font-family:var(--ion-font-family,inherit)}:host(.in-list.item-options-end:last-child){padding-right:calc(.7em + var(--ion-safe-area-right))}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host(.in-list.item-options-end:last-child){padding-right:unset;-webkit-padding-end:calc(.7em + var(--ion-safe-area-right));padding-inline-end:calc(.7em + var(--ion-safe-area-right))}}:host(.in-list.item-options-start:first-child){padding-left:calc(.7em + var(--ion-safe-area-left))}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host(.in-list.item-options-start:first-child){padding-left:unset;-webkit-padding-start:calc(.7em + var(--ion-safe-area-left));padding-inline-start:calc(.7em + var(--ion-safe-area-left))}}:host(.ion-color){background:var(--ion-color-base);color:var(--ion-color-contrast)}.button-native{font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;padding-left:.7em;padding-right:.7em;padding-top:0;padding-bottom:0;display:inline-block;position:relative;width:100%;height:100%;border:0;outline:none;background:transparent;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;-webkit-box-sizing:border-box;box-sizing:border-box}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.button-native{padding-left:unset;padding-right:unset;-webkit-padding-start:.7em;padding-inline-start:.7em;-webkit-padding-end:.7em;padding-inline-end:.7em}}.button-inner{-ms-flex-flow:column nowrap;flex-flow:column nowrap;height:100%}.button-inner,.horizontal-wrapper{display:-ms-flexbox;display:flex;-ms-flex-negative:0;flex-shrink:0;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%}.horizontal-wrapper{-ms-flex-flow:row nowrap;flex-flow:row nowrap}::slotted(*){-ms-flex-negative:0;flex-shrink:0}::slotted([slot=start]){margin-left:0;margin-right:5px;margin-top:0;margin-bottom:0}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){::slotted([slot=start]){margin-left:unset;margin-right:unset;-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:5px;margin-inline-end:5px}}::slotted([slot=end]){margin-left:5px;margin-right:0;margin-top:0;margin-bottom:0}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){::slotted([slot=end]){margin-left:unset;margin-right:unset;-webkit-margin-start:5px;margin-inline-start:5px;-webkit-margin-end:0;margin-inline-end:0}}::slotted([slot=icon-only]){padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;margin-left:10px;margin-right:10px;margin-top:0;margin-bottom:0;min-width:.9em;font-size:1.8em}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){::slotted([slot=icon-only]){margin-left:unset;margin-right:unset;-webkit-margin-start:10px;margin-inline-start:10px;-webkit-margin-end:10px;margin-inline-end:10px}}:host(.item-option-expandable){-ms-flex-negative:0;flex-shrink:0;-webkit-transition-duration:0;transition-duration:0;-webkit-transition-property:none;transition-property:none;-webkit-transition-timing-function:cubic-bezier(.65,.05,.36,1);transition-timing-function:cubic-bezier(.65,.05,.36,1)}:host(.item-option-disabled){pointer-events:none}:host(.item-option-disabled) .button-native{cursor:default;opacity:.5;pointer-events:none}:host{font-size:16px}:host(.activated){background:var(--ion-color-primary-shade,#3171e0)}:host(.ion-color.activated){background:var(--ion-color-shade)}"}static get styleMode(){return"ios"}}class y{constructor(){this.side="end"}fireSwipeEvent(){this.ionSwipe.emit({side:this.side})}hostData(){const t=h(this.win,this.side);return{class:{[`${this.mode}`]:!0,[`item-options-${this.mode}`]:!0,"item-options-start":!t,"item-options-end":t}}}static get is(){return"ion-item-options"}static get properties(){return{el:{elementRef:!0},fireSwipeEvent:{method:!0},side:{type:String,attr:"side"},win:{context:"window"}}}static get events(){return[{name:"ionSwipe",method:"ionSwipe",bubbles:!0,cancelable:!0,composed:!0}]}static get style(){return"ion-item-options{top:0;right:0;-ms-flex-pack:end;justify-content:flex-end;display:none;position:absolute;height:100%;font-size:14px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:1}:host-context([dir=rtl]) ion-item-options{-ms-flex-pack:start;justify-content:flex-start}:host-context([dir=rtl]) ion-item-options:not(.item-options-end){right:auto;left:0;-ms-flex-pack:end;justify-content:flex-end}.item-options-start{right:auto;left:0;-ms-flex-pack:start;justify-content:flex-start}:host-context([dir=rtl]) .item-options-start{-ms-flex-pack:end;justify-content:flex-end}.item-options-start ion-item-option:first-child{padding-right:var(--ion-safe-area-left)}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.item-options-start ion-item-option:first-child{padding-right:unset;-webkit-padding-end:var(--ion-safe-area-left);padding-inline-end:var(--ion-safe-area-left)}}.item-options-end ion-item-option:last-child{padding-right:var(--ion-safe-area-right)}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.item-options-end ion-item-option:last-child{padding-right:unset;-webkit-padding-end:var(--ion-safe-area-right);padding-inline-end:var(--ion-safe-area-right)}}:host-context([dir=rtl]) .item-sliding-active-slide.item-sliding-active-options-start ion-item-options:not(.item-options-end){width:100%;visibility:visible}.item-sliding-active-slide ion-item-options{display:-ms-flexbox;display:flex;visibility:hidden}.item-sliding-active-slide.item-sliding-active-options-end ion-item-options:not(.item-options-start),.item-sliding-active-slide.item-sliding-active-options-start .item-options-start{width:100%;visibility:visible}.item-options-ios{border-bottom-width:0;border-bottom-style:solid;border-bottom-color:var(--ion-item-border-color,var(--ion-border-color,var(--ion-color-step-150,#c8c7cc)))}.item-options-ios.item-options-end{border-bottom-width:.55px}.list-ios-lines-none .item-options-ios{border-bottom-width:0}.list-ios-lines-full .item-options-ios,.list-ios-lines-inset .item-options-ios.item-options-end{border-bottom-width:.55px}"}static get styleMode(){return"ios"}}const f=30,S=.55;let O;class v{constructor(){this.item=null,this.openAmount=0,this.initialOpenAmount=0,this.optsWidthRightSide=0,this.optsWidthLeftSide=0,this.sides=0,this.optsDirty=!0,this.state=2,this.disabled=!1}disabledChanged(){this.gesture&&this.gesture.setDisabled(this.disabled)}async componentDidLoad(){this.item=this.el.querySelector("ion-item"),await this.updateOptions(),this.gesture=(await import("./chunk-04f0cf95.js")).createGesture({el:this.el,queue:this.queue,gestureName:"item-swipe",gesturePriority:100,threshold:5,canStart:()=>this.canStart(),onStart:()=>this.onStart(),onMove:t=>this.onMove(t),onEnd:t=>this.onEnd(t)}),this.disabledChanged()}componentDidUnload(){this.gesture&&(this.gesture.destroy(),this.gesture=void 0),this.item=null,this.leftOptions=this.rightOptions=void 0,O===this.el&&(O=void 0)}getOpenAmount(){return Promise.resolve(this.openAmount)}getSlidingRatio(){return Promise.resolve(this.getSlidingRatioSync())}async open(t){if(null===this.item)return;const e=this.getOptions(t);e&&(void 0===t&&(t=e===this.leftOptions?"start":"end"),this.openAmount<0&&e===this.leftOptions||this.openAmount>0&&e===this.rightOptions||(this.closeOpened(),this.state=4,requestAnimationFrame(()=>{this.calculateOptsWidth(),O=this.el,this.setOpenAmount("end"===t?this.optsWidthRightSide:-this.optsWidthLeftSide,!1),this.state="end"===t?8:16})))}async close(){this.setOpenAmount(0,!0)}async closeOpened(){return void 0!==O&&(O.close(),O=void 0,!0)}getOptions(t){return void 0===t?this.leftOptions||this.rightOptions:"start"===t?this.leftOptions:this.rightOptions}async updateOptions(){const t=this.el.querySelectorAll("ion-item-options");let e=0;this.leftOptions=this.rightOptions=void 0;for(let s=0;s<t.length;s++){const i=await t.item(s).componentOnReady();"start"===i.side?(this.leftOptions=i,e|=1):(this.rightOptions=i,e|=2)}this.optsDirty=!0,this.sides=e}canStart(){return O&&O!==this.el?(this.closeOpened(),!1):!(!this.rightOptions&&!this.leftOptions)}onStart(){O=this.el,void 0!==this.tmr&&(clearTimeout(this.tmr),this.tmr=void 0),0===this.openAmount&&(this.optsDirty=!0,this.state=4),this.initialOpenAmount=this.openAmount,this.item&&(this.item.style.transition="none")}onMove(t){this.optsDirty&&this.calculateOptsWidth();let e,s=this.initialOpenAmount-t.deltaX;switch(this.sides){case 2:s=Math.max(0,s);break;case 1:s=Math.min(0,s);break;case 3:break;case 0:return;default:console.warn("invalid ItemSideFlags value",this.sides)}s>this.optsWidthRightSide?s=(e=this.optsWidthRightSide)+(s-e)*S:s<-this.optsWidthLeftSide&&(s=(e=-this.optsWidthLeftSide)+(s-e)*S),this.setOpenAmount(s,!1)}onEnd(t){const e=t.velocityX;let s=this.openAmount>0?this.optsWidthRightSide:-this.optsWidthLeftSide;(function(t,e,s){return!e&&s||t&&e})(this.openAmount>0==!(e<0),Math.abs(e)>.3,Math.abs(this.openAmount)<Math.abs(s/2))&&(s=0);const i=this.state;this.setOpenAmount(s,!0),0!=(32&i)&&this.rightOptions?this.rightOptions.fireSwipeEvent():0!=(64&i)&&this.leftOptions&&this.leftOptions.fireSwipeEvent()}calculateOptsWidth(){this.optsWidthRightSide=0,this.rightOptions&&(this.rightOptions.style.display="flex",this.optsWidthRightSide=this.rightOptions.offsetWidth,this.rightOptions.style.display=""),this.optsWidthLeftSide=0,this.leftOptions&&(this.leftOptions.style.display="flex",this.optsWidthLeftSide=this.leftOptions.offsetWidth,this.leftOptions.style.display=""),this.optsDirty=!1}setOpenAmount(t,e){if(void 0!==this.tmr&&(clearTimeout(this.tmr),this.tmr=void 0),!this.item)return;const s=this.item.style;if(this.openAmount=t,e&&(s.transition=""),t>0)this.state=t>=this.optsWidthRightSide+f?40:8;else{if(!(t<0))return this.tmr=setTimeout(()=>{this.state=2,this.tmr=void 0},600),O=void 0,void(s.transform="");this.state=t<=-this.optsWidthLeftSide-f?80:16}s.transform=`translate3d(${-t}px,0,0)`,this.ionDrag.emit({amount:t,ratio:this.getSlidingRatioSync()})}getSlidingRatioSync(){return this.openAmount>0?this.openAmount/this.optsWidthRightSide:this.openAmount<0?this.openAmount/this.optsWidthLeftSide:0}hostData(){return{class:{[`${this.mode}`]:!0,"item-sliding-active-slide":2!==this.state,"item-sliding-active-options-end":0!=(8&this.state),"item-sliding-active-options-start":0!=(16&this.state),"item-sliding-active-swipe-end":0!=(32&this.state),"item-sliding-active-swipe-start":0!=(64&this.state)}}}static get is(){return"ion-item-sliding"}static get properties(){return{close:{method:!0},closeOpened:{method:!0},disabled:{type:Boolean,attr:"disabled",watchCallbacks:["disabledChanged"]},el:{elementRef:!0},getOpenAmount:{method:!0},getSlidingRatio:{method:!0},open:{method:!0},queue:{context:"queue"},state:{state:!0}}}static get events(){return[{name:"ionDrag",method:"ionDrag",bubbles:!0,cancelable:!0,composed:!0}]}static get style(){return"ion-item-sliding{display:block;position:relative;width:100%;overflow:hidden}ion-item-sliding,ion-item-sliding .item{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.item-sliding-active-slide .item{position:relative;-webkit-transition:-webkit-transform .5s cubic-bezier(.36,.66,.04,1);transition:-webkit-transform .5s cubic-bezier(.36,.66,.04,1);transition:transform .5s cubic-bezier(.36,.66,.04,1);transition:transform .5s cubic-bezier(.36,.66,.04,1),-webkit-transform .5s cubic-bezier(.36,.66,.04,1);opacity:1;z-index:2;pointer-events:none;will-change:transform}.item-sliding-active-swipe-end .item-options-end .item-option-expandable{padding-left:100%;-ms-flex-order:1;order:1;-webkit-transition-duration:.6s;transition-duration:.6s;-webkit-transition-property:padding-left;transition-property:padding-left}:host-context([dir=rtl]) .item-sliding-active-swipe-end .item-options-end .item-option-expandable{-ms-flex-order:-1;order:-1}.item-sliding-active-swipe-start .item-options-start .item-option-expandable{padding-right:100%;-ms-flex-order:-1;order:-1;-webkit-transition-duration:.6s;transition-duration:.6s;-webkit-transition-property:padding-right;transition-property:padding-right}:host-context([dir=rtl]) .item-sliding-active-swipe-start .item-options-start .item-option-expandable{-ms-flex-order:1;order:1}"}}class w{create(t){return c(this.doc.createElement("ion-loading"),t)}dismiss(t,e,s){return u(this.doc,t,e,"ion-loading",s)}async getTop(){return p(this.doc,"ion-loading")}static get is(){return"ion-loading-controller"}static get properties(){return{create:{method:!0},dismiss:{method:!0},doc:{context:"document"},getTop:{method:!0}}}}class k{constructor(){this.disabled=!1,this.scrollable=!1}valueChanged(t){this.updateButtons(),this.ionChange.emit({value:t})}segmentClick(t){this.value=t.target.value}componentWillLoad(){this.emitStyle()}componentDidLoad(){if(null==this.value){const t=this.getButtons().find(t=>t.checked);t&&(this.value=t.value)}this.updateButtons()}emitStyle(){this.ionStyle.emit({segment:!0})}updateButtons(){const t=this.value;for(const e of this.getButtons())e.checked=e.value===t}getButtons(){return Array.from(this.el.querySelectorAll("ion-segment-button"))}hostData(){return{class:Object.assign({},d(this.color),{[`${this.mode}`]:!0,"segment-disabled":this.disabled,"segment-scrollable":this.scrollable})}}static get is(){return"ion-segment"}static get encapsulation(){return"scoped"}static get properties(){return{color:{type:String,attr:"color"},disabled:{type:Boolean,attr:"disabled"},el:{elementRef:!0},mode:{type:String,attr:"mode"},scrollable:{type:Boolean,attr:"scrollable"},value:{type:String,attr:"value",mutable:!0,watchCallbacks:["valueChanged"]}}}static get events(){return[{name:"ionChange",method:"ionChange",bubbles:!0,cancelable:!0,composed:!0},{name:"ionStyle",method:"ionStyle",bubbles:!0,cancelable:!0,composed:!0}]}static get listeners(){return[{name:"ionSelect",method:"segmentClick"}]}static get style(){return".sc-ion-segment-ios-h{--indicator-color-checked:initial;--ripple-color:initial;--color-activated:initial;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:-ms-flexbox;display:flex;-ms-flex-align:stretch;align-items:stretch;-ms-flex-pack:center;justify-content:center;width:100%;font-family:var(--ion-font-family,inherit);text-align:center}.sc-ion-segment-ios-s > .segment-button-disabled, .segment-disabled.sc-ion-segment-ios-h{pointer-events:none}.segment-scrollable.sc-ion-segment-ios-h{-ms-flex-pack:start;justify-content:start;width:auto;overflow-x:scroll}.segment-scrollable.sc-ion-segment-ios-h::-webkit-scrollbar{display:none}.sc-ion-segment-ios-h{--background:transparent;--background-hover:rgba(var(--ion-color-primary-rgb,56,128,255),0.1);--background-activated:rgba(var(--ion-color-primary-rgb,56,128,255),0.16);--background-checked:var(--ion-color-primary,#3880ff);--color:var(--ion-color-primary,#3880ff);--color-checked:var(--ion-color-primary-contrast,#fff);--color-disabled:rgba(var(--ion-color-primary-rgb,56,128,255),0.3);--color-checked-disabled:rgba(var(--ion-color-primary-contrast-rgb,255,255,255),0.3);--border-color:var(--ion-color-primary,#3880ff);--indicator-color:transparent}.segment-disabled.sc-ion-segment-ios-h{opacity:.3}.sc-ion-segment-ios-h.ion-color.sc-ion-segment-ios-s > ion-segment-button{--border-color:var(--ion-color-base);--background-hover:rgba(var(--ion-color-base-rgb),0.04);background:transparent;color:var(--ion-color-base)}.sc-ion-segment-ios-h.ion-color.sc-ion-segment-ios-s > .activated{background:rgba(var(--ion-color-base-rgb),.16);color:var(--ion-color-base)}.sc-ion-segment-ios-h.ion-color.sc-ion-segment-ios-s > .segment-button-checked, .sc-ion-segment-ios-h.ion-color.sc-ion-segment-ios-s > .segment-button-checked.activated{background:var(--ion-color-base);color:var(--ion-color-contrast)}.sc-ion-segment-ios-h.ion-color.sc-ion-segment-ios-s > .segment-button-disabled{color:rgba(var(--ion-color-base-rgb),.3)}.sc-ion-segment-ios-h.ion-color.sc-ion-segment-ios-s > .segment-button-checked.segment-button-disabled{color:rgba(var(--ion-color-contrast-rgb),.3)}.sc-ion-segment-ios-hion-toolbar.sc-ion-segment-ios-s > ion-segment-button, ion-toolbar .sc-ion-segment-ios-h.sc-ion-segment-ios-s > ion-segment-button{max-width:100px;font-size:12px;line-height:22px}.sc-ion-segment-ios-hion-toolbar:not(.ion-color).sc-ion-segment-ios-s > ion-segment-button, ion-toolbar .sc-ion-segment-ios-h:not(.ion-color).sc-ion-segment-ios-s > ion-segment-button{border-color:var(--ion-toolbar-color-checked,var(--border-color));color:var(--ion-toolbar-color-unchecked,var(--color))}.sc-ion-segment-ios-hion-toolbar:not(.ion-color).sc-ion-segment-ios-s > .segment-button-checked, ion-toolbar .sc-ion-segment-ios-h:not(.ion-color).sc-ion-segment-ios-s > .segment-button-checked{color:var(--ion-toolbar-color-checked,var(--color-checked))}.sc-ion-segment-ios-hion-toolbar.ion-color:not(.ion-color).sc-ion-segment-ios-s > ion-segment-button, ion-toolbar.ion-color .sc-ion-segment-ios-h:not(.ion-color).sc-ion-segment-ios-s > ion-segment-button{--color:var(--ion-color-contrast);--color-disabled:rgba(var(--ion-color-contrast-rgb),0.3);--color-checked:var(--ion-color-base);--color-checked-disabled:rgba(var(--ion-color-contrast-rgb),0.3);--background-hover:rgba(var(--ion-color-contrast-rgb),0.1);--background-activated:rgba(var(--ion-color-contrast-rgb),0.16);--background-checked:var(--ion-color-contrast);--border-color:var(--ion-color-contrast)}"}static get styleMode(){return"ios"}}let C=0;class A{constructor(){this.checked=!1,this.disabled=!1,this.layout="icon-top",this.value="ion-sb-"+C++}checkedChanged(t,e){t&&!e&&this.ionSelect.emit()}onClick(){this.checked=!0}get hasLabel(){return!!this.el.querySelector("ion-label")}get hasIcon(){return!!this.el.querySelector("ion-icon")}hostData(){const{checked:t,disabled:e,hasIcon:s,hasLabel:i,layout:o}=this;return{"aria-disabled":e?"true":null,class:{[`${this.mode}`]:!0,"segment-button-has-label":i,"segment-button-has-icon":s,"segment-button-has-label-only":i&&!s,"segment-button-has-icon-only":s&&!i,"segment-button-disabled":e,"segment-button-checked":t,[`segment-button-layout-${o}`]:!0,"ion-activatable":!0,"ion-activatable-instant":!0}}}render(){return[t("button",{type:"button","aria-pressed":this.checked?"true":null,class:"button-native",disabled:this.disabled},t("slot",null),"md"===this.mode&&t("ion-ripple-effect",null)),t("div",{class:"segment-button-indicator"})]}static get is(){return"ion-segment-button"}static get encapsulation(){return"shadow"}static get properties(){return{checked:{type:Boolean,attr:"checked",mutable:!0,watchCallbacks:["checkedChanged"]},disabled:{type:Boolean,attr:"disabled"},el:{elementRef:!0},layout:{type:String,attr:"layout"},mode:{type:String,attr:"mode"},value:{type:String,attr:"value"}}}static get events(){return[{name:"ionSelect",method:"ionSelect",bubbles:!0,cancelable:!0,composed:!0}]}static get listeners(){return[{name:"click",method:"onClick"}]}static get style(){return":host{--padding-start:0;--padding-end:0;--padding-top:0;--padding-bottom:0;display:-ms-flexbox;display:flex;-ms-flex:1 0 auto;flex:1 0 auto;-ms-flex-direction:column;flex-direction:column;height:auto;border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);color:var(--color);text-decoration:none;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;-webkit-font-kerning:none;font-kerning:none}:host(:first-of-type){border-top-left-radius:var(--border-radius);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:var(--border-radius)}:host([dir=rtl]:first-of-type){border-top-left-radius:0;border-top-right-radius:var(--border-radius);border-bottom-right-radius:var(--border-radius);border-bottom-left-radius:0}:host(:not(:first-of-type)){border-left-width:0}:host(:last-of-type){border-top-left-radius:0;border-top-right-radius:var(--border-radius);border-bottom-right-radius:var(--border-radius);border-bottom-left-radius:0}:host([dir=rtl]:last-of-type){border-top-left-radius:var(--border-radius);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:var(--border-radius)}.button-native{border-radius:inherit;font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;margin-left:var(--margin-start);margin-right:var(--margin-end);margin-top:var(--margin-top);margin-bottom:var(--margin-bottom);padding-left:var(--padding-start);padding-right:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);display:-ms-flexbox;display:flex;position:relative;-ms-flex-direction:inherit;flex-direction:inherit;-ms-flex-positive:1;flex-grow:1;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;min-width:inherit;max-width:inherit;height:auto;min-height:inherit;max-height:inherit;-webkit-transition:var(--transition);transition:var(--transition);border:none;outline:none;background:transparent;contain:content;cursor:pointer}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.button-native{margin-left:unset;margin-right:unset;-webkit-margin-start:var(--margin-start);margin-inline-start:var(--margin-start);-webkit-margin-end:var(--margin-end);margin-inline-end:var(--margin-end);padding-left:unset;padding-right:unset;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end)}}.segment-button-indicator{-ms-flex-item-align:end;align-self:flex-end;width:100%;height:2px;background-color:var(--indicator-color);opacity:1}:host(.segment-button-checked){background:var(--background-checked);color:var(--color-checked)}:host(.segment-button-checked) .segment-button-indicator{background-color:var(--indicator-color-checked,var(--color-checked))}:host(.activated){color:var(--color-activated,var(--color))}:host(.segment-button-disabled){color:var(--color-disabled)}:host(.segment-button-disabled.segment-button-checked){color:var(--color-checked-disabled)}::slotted(ion-icon){-ms-flex-order:-1;order:-1}::slotted(ion-label){display:block;-ms-flex-item-align:center;align-self:center;line-height:22px;text-overflow:ellipsis;white-space:nowrap;-webkit-box-sizing:border-box;box-sizing:border-box}:host(.segment-button-layout-icon-start) .button-native{-ms-flex-direction:row;flex-direction:row}:host(.segment-button-layout-icon-end) .button-native{-ms-flex-direction:row-reverse;flex-direction:row-reverse}:host(.segment-button-layout-icon-bottom) .button-native{-ms-flex-direction:column-reverse;flex-direction:column-reverse}:host(.segment-button-layout-icon-hide) ::slotted(ion-icon),:host(.segment-button-layout-label-hide) ::slotted(ion-label){display:none}ion-ripple-effect{color:var(--ripple-color,var(--color-checked))}:host{--border-radius:4px;--border-width:1px;--border-style:solid;--transition:100ms all linear;min-height:24px;font-size:13px;line-height:37px}.segment-button-indicator{display:none}::slotted(ion-icon){font-size:24px}:host(.segment-button-layout-icon-start) ::slotted(ion-label){margin-left:2px;margin-right:0}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host(.segment-button-layout-icon-start) ::slotted(ion-label){margin-left:unset;margin-right:unset;-webkit-margin-start:2px;margin-inline-start:2px;-webkit-margin-end:0;margin-inline-end:0}}:host(.segment-button-layout-icon-end) ::slotted(ion-label){margin-left:0;margin-right:2px}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host(.segment-button-layout-icon-end) ::slotted(ion-label){margin-left:unset;margin-right:unset;-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:2px;margin-inline-end:2px}}\@media (any-hover:hover){:host(:hover:not(.segment-button-checked)){background:var(--background-hover)}}:host(.activated){background:var(--background-activated)}:host(.segment-button-checked.activated){background:var(--background-checked);color:var(--color-checked)}"}static get styleMode(){return"ios"}}export{m as PageSchedule,g as IonItemGroup,b as IonItemOption,y as IonItemOptions,v as IonItemSliding,w as IonLoadingController,k as IonSegment,A as IonSegmentButton};