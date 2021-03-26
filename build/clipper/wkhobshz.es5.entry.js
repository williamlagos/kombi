var __awaiter=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))(function(o,i){function s(e){try{c(n.next(e))}catch(e){i(e)}}function a(e){try{c(n.throw(e))}catch(e){i(e)}}function c(e){e.done?o(e.value):new r(function(t){t(e.value)}).then(s,a)}c((n=n.apply(e,t||[])).next())})},__generator=this&&this.__generator||function(e,t){var r,n,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;s;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return s.label++,{value:i[1],done:!1};case 5:s.label++,n=i[1],i=[0];continue;case 7:i=s.ops.pop(),s.trys.pop();continue;default:if(!(o=(o=s.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){s=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){s.label=i[1];break}if(6===i[0]&&s.label<o[1]){s.label=o[1],o=i;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(i);break}o[2]&&s.ops.pop(),s.trys.pop();continue}i=t.call(e,s)}catch(e){i=[6,e],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}};clipper.loadBundle("wkhobshz",["exports","./chunk-ea768d49.js","./chunk-3d67fd9c.js","./chunk-6d54f4e5.js","./chunk-0cbca864.js","./chunk-cd2d6891.js"],function(e,t,r,n,o,i){var s=window.clipper.h,a=i.Plugins.Browser,c=function(){function e(){this.speakers=[],this.orders=[],this.orderNumberStart=0,this.orderNumberEnd=12}return e.prototype.componentWillLoad=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){switch(e.label){case 0:return this.store.mapStateToProps(this,function(e){return{token:e.session.token}}),this.role=this.parseJwt(this.token)._role,"MERCHANT"!==this.role?[3,2]:(this.store.mapStateToProps(this,function(e){return{orders:e.merchant.orders}}),this.store.mapDispatchToProps(this,{showOrder:o.showOrder}),[4,this.showOrder(this.token)]);case 1:return e.sent(),[3,4];case 2:return"CUSTOMER"!==this.role?[3,4]:(console.log("YES"),this.store.mapStateToProps(this,function(e){return{orders:e.customer.orders}}),this.store.mapDispatchToProps(this,{showMyOrders:r.showMyOrders}),[4,this.showMyOrders(this.token)]);case 3:e.sent(),e.label=4;case 4:return[2]}})})},e.prototype.goToSpeakerTwitter=function(e){console.log("goToSpeakerTwitter",e),a.open({url:"https://twitter.com/"+e.twitter})},e.prototype.openSpeakerShare=function(e){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){switch(t.label){case 0:return[4,this.actionSheetCtrl.create({header:"Share "+e.name,buttons:[{text:"Copy Link",handler:function(){console.log("Copy link clicked on https://twitter.com/"+e.twitter),window.cordova&&window.cordova.plugins.clipboard&&window.cordova.plugins.clipboard.copy("https://twitter.com/"+e.twitter)}},{text:"Share via ..."},{text:"Cancel",role:"cancel"}]})];case 1:return t.sent().present(),[2]}})})},e.prototype.openContact=function(e){return __awaiter(this,void 0,void 0,function(){var t;return __generator(this,function(r){switch(r.label){case 0:return[4,this.actionSheetCtrl.create({header:"Contact "+e.name,buttons:[{text:"Email ( "+e.email+" )",icon:"ios"!==(t=this.mode)?"mail":null,handler:function(){window.open("mailto:"+e.email)}},{text:"Call ( "+e.phone+" )",icon:"ios"!==t?"call":null,handler:function(){window.open("tel:"+e.phone)}}]})];case 1:return r.sent().present(),[2]}})})},e.prototype.parseJwt=function(e){var t=e.split(".")[1].replace(/-/g,"+").replace(/_/g,"/");return JSON.parse(window.atob(t))},e.prototype.offer=function(e,t){return __awaiter(this,void 0,void 0,function(){var r;return __generator(this,function(n){switch(n.label){case 0:return[4,this.modalCtrl.create({component:"page-order-detail",componentProps:{role:this.role,userId:this.parseJwt(this.token)._id,orderId:e.target.id,order:t}})];case 1:return[4,(r=n.sent()).present()];case 2:return n.sent(),[4,r.onDidDismiss()];case 3:return 0===n.sent().data.success&&(e.target.disabled=!0),[2]}})})},e.prototype.previousOrders=function(){this.orderNumberStart-=12,this.orderNumberEnd-=12},e.prototype.nextOrders=function(){this.orderNumberStart+=12,this.orderNumberEnd+=12},e.prototype.render=function(){var e=this,t=this.orders.reverse().slice(this.orderNumberStart,this.orderNumberEnd);return[s("ion-header",null,s("ion-toolbar",null,s("ion-buttons",{slot:"start"},s("ion-menu-button",null)),s("ion-title",null,"Ofertar"))),s("ion-content",{class:"outer-content"},s("ion-list",null,s("ion-grid",{fixed:!0},s("ion-row",{"align-items-stretch":!0},this.orders.length>12&&[s("ion-button",{fill:"clear",disabled:0===this.orderNumberStart,onClick:function(){return e.previousOrders()}},"Anterior"),s("ion-button",{fill:"clear",disabled:this.orderNumberEnd>=this.orders.length,onClick:function(){return e.nextOrders()}},"Próximo")],t.map(function(t){return"created"===t.status&&s("ion-col",{size:"12","size-md":"6"},s("ion-card",{class:"speaker-card"},s("a",{style:{"text-decoration":"none"},href:"/speakers/"+t.id},s("img",{style:{"text-align":"center"},src:t.hasOwnProperty("pictures")&&t.pictures.length>0?t.pictures[0].externalRef:"assets/img/box.svg",alt:"Aqui fica a imagem do pedido"})),s("ion-card-header",null,s("ion-card-subtitle",null,t.job.origin.address.street+", "+t.job.origin.address.number),s("ion-card-title",null,t.title)),s("ion-card-content",null,t.job.origin.items.length>1?s("ion-list",null,t.job.origin.items.map(function(e){return s("ion-item",null,e.description)})):t.job.origin.items.length>0&&t.job.origin.items[0].description),s("ion-button",{id:t._id,expand:"full",color:"primary",disabled:t.placed,fill:"clear",onClick:function(r){return e.offer(r,t)}},"MERCHANT"===e.role?t.placed?"Frete já ofertado":"Ofertar":t.placed?"Frete já selecionado":"Ver ofertas")))})))))]},Object.defineProperty(e,"is",{get:function(){return"page-order-list"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{actionSheetCtrl:{connect:"ion-action-sheet-controller"},modalCtrl:{connect:"ion-modal-controller"},orderNumberEnd:{state:!0},orderNumberStart:{state:!0},orders:{state:!0},role:{state:!0},store:{context:"store"},token:{state:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return".speaker-card a img{border-top-left-radius:4px;border-top-right-radius:4px;border-bottom-left-radius:0;border-bottom-right-radius:0}"},enumerable:!0,configurable:!0}),e}(),l=function(){function e(){}return e.prototype.create=function(e){return n.createOverlay(this.doc.createElement("ion-action-sheet"),e)},e.prototype.dismiss=function(e,t,r){return n.dismissOverlay(this.doc,e,t,"ion-action-sheet",r)},e.prototype.getTop=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){return[2,n.getOverlay(this.doc,"ion-action-sheet")]})})},Object.defineProperty(e,"is",{get:function(){return"ion-action-sheet-controller"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{create:{method:!0},dismiss:{method:!0},doc:{context:"document"},getTop:{method:!0}}},enumerable:!0,configurable:!0}),e}();e.PageOrderList=c,e.IonActionSheetController=l,Object.defineProperty(e,"__esModule",{value:!0})});