import*as tslib_1 from"../polyfills/tslib.js";import{h}from"../clipper.core.js";import"./chunk-c46efb37.js";import{b as showMyOrders}from"./chunk-b29ff8f0.js";import{d as createOverlay,e as dismissOverlay,f as getOverlay}from"./chunk-794673eb.js";import{e as showOrder}from"./chunk-3c944ae9.js";import{a as Plugins}from"./chunk-b5dfde61.js";var Browser=Plugins.Browser,PageOrderList=function(){function e(){this.speakers=[],this.orders=[],this.orderNumberStart=0,this.orderNumberEnd=12}return e.prototype.componentWillLoad=function(){return tslib_1.__awaiter(this,void 0,void 0,function(){return tslib_1.__generator(this,function(e){switch(e.label){case 0:return this.store.mapStateToProps(this,function(e){return{token:e.session.token}}),this.role=this.parseJwt(this.token)._role,"MERCHANT"!==this.role?[3,2]:(this.store.mapStateToProps(this,function(e){return{orders:e.merchant.orders}}),this.store.mapDispatchToProps(this,{showOrder:showOrder}),[4,this.showOrder(this.token)]);case 1:return e.sent(),[3,4];case 2:return"CUSTOMER"!==this.role?[3,4]:(console.log("YES"),this.store.mapStateToProps(this,function(e){return{orders:e.customer.orders}}),this.store.mapDispatchToProps(this,{showMyOrders:showMyOrders}),[4,this.showMyOrders(this.token)]);case 3:e.sent(),e.label=4;case 4:return[2]}})})},e.prototype.goToSpeakerTwitter=function(e){console.log("goToSpeakerTwitter",e),Browser.open({url:"https://twitter.com/"+e.twitter})},e.prototype.openSpeakerShare=function(e){return tslib_1.__awaiter(this,void 0,void 0,function(){return tslib_1.__generator(this,function(t){switch(t.label){case 0:return[4,this.actionSheetCtrl.create({header:"Share "+e.name,buttons:[{text:"Copy Link",handler:function(){console.log("Copy link clicked on https://twitter.com/"+e.twitter),window.cordova&&window.cordova.plugins.clipboard&&window.cordova.plugins.clipboard.copy("https://twitter.com/"+e.twitter)}},{text:"Share via ..."},{text:"Cancel",role:"cancel"}]})];case 1:return t.sent().present(),[2]}})})},e.prototype.openContact=function(e){return tslib_1.__awaiter(this,void 0,void 0,function(){var t;return tslib_1.__generator(this,function(r){switch(r.label){case 0:return[4,this.actionSheetCtrl.create({header:"Contact "+e.name,buttons:[{text:"Email ( "+e.email+" )",icon:"ios"!==(t=this.mode)?"mail":null,handler:function(){window.open("mailto:"+e.email)}},{text:"Call ( "+e.phone+" )",icon:"ios"!==t?"call":null,handler:function(){window.open("tel:"+e.phone)}}]})];case 1:return r.sent().present(),[2]}})})},e.prototype.parseJwt=function(e){var t=e.split(".")[1].replace(/-/g,"+").replace(/_/g,"/");return JSON.parse(window.atob(t))},e.prototype.offer=function(e,t){return tslib_1.__awaiter(this,void 0,void 0,function(){var r;return tslib_1.__generator(this,function(o){switch(o.label){case 0:return[4,this.modalCtrl.create({component:"page-order-detail",componentProps:{role:this.role,userId:this.parseJwt(this.token)._id,orderId:e.target.id,order:t}})];case 1:return[4,(r=o.sent()).present()];case 2:return o.sent(),[4,r.onDidDismiss()];case 3:return 0===o.sent().data.success&&(e.target.disabled=!0),[2]}})})},e.prototype.previousOrders=function(){this.orderNumberStart-=12,this.orderNumberEnd-=12},e.prototype.nextOrders=function(){this.orderNumberStart+=12,this.orderNumberEnd+=12},e.prototype.render=function(){var e=this,t=this.orders.reverse().slice(this.orderNumberStart,this.orderNumberEnd);return[h("ion-header",null,h("ion-toolbar",null,h("ion-buttons",{slot:"start"},h("ion-menu-button",null)),h("ion-title",null,"Ofertar"))),h("ion-content",{class:"outer-content"},h("ion-list",null,h("ion-grid",{fixed:!0},h("ion-row",{"align-items-stretch":!0},this.orders.length>12&&[h("ion-button",{fill:"clear",disabled:0===this.orderNumberStart,onClick:function(){return e.previousOrders()}},"Anterior"),h("ion-button",{fill:"clear",disabled:this.orderNumberEnd>=this.orders.length,onClick:function(){return e.nextOrders()}},"Próximo")],t.map(function(t){return"created"===t.status&&h("ion-col",{size:"12","size-md":"6"},h("ion-card",{class:"speaker-card"},h("a",{style:{"text-decoration":"none"},href:"/speakers/"+t.id},h("img",{style:{"text-align":"center"},src:t.hasOwnProperty("pictures")&&t.pictures.length>0?t.pictures[0].externalRef:"assets/img/box.svg",alt:"Aqui fica a imagem do pedido"})),h("ion-card-header",null,h("ion-card-subtitle",null,t.job.origin.address.street+", "+t.job.origin.address.number),h("ion-card-title",null,t.title)),h("ion-card-content",null,t.job.origin.items.length>1?h("ion-list",null,t.job.origin.items.map(function(e){return h("ion-item",null,e.description)})):t.job.origin.items.length>0&&t.job.origin.items[0].description),h("ion-button",{id:t._id,expand:"full",color:"primary",disabled:t.placed,fill:"clear",onClick:function(r){return e.offer(r,t)}},"MERCHANT"===e.role?t.placed?"Frete já ofertado":"Ofertar":t.placed?"Frete já selecionado":"Ver ofertas")))})))))]},Object.defineProperty(e,"is",{get:function(){return"page-order-list"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{actionSheetCtrl:{connect:"ion-action-sheet-controller"},modalCtrl:{connect:"ion-modal-controller"},orderNumberEnd:{state:!0},orderNumberStart:{state:!0},orders:{state:!0},role:{state:!0},store:{context:"store"},token:{state:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return".speaker-card a img{border-top-left-radius:4px;border-top-right-radius:4px;border-bottom-left-radius:0;border-bottom-right-radius:0}"},enumerable:!0,configurable:!0}),e}(),ActionSheetController=function(){function e(){}return e.prototype.create=function(e){return createOverlay(this.doc.createElement("ion-action-sheet"),e)},e.prototype.dismiss=function(e,t,r){return dismissOverlay(this.doc,e,t,"ion-action-sheet",r)},e.prototype.getTop=function(){return tslib_1.__awaiter(this,void 0,void 0,function(){return tslib_1.__generator(this,function(e){return[2,getOverlay(this.doc,"ion-action-sheet")]})})},Object.defineProperty(e,"is",{get:function(){return"ion-action-sheet-controller"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{create:{method:!0},dismiss:{method:!0},doc:{context:"document"},getTop:{method:!0}}},enumerable:!0,configurable:!0}),e}();export{PageOrderList,ActionSheetController as IonActionSheetController};