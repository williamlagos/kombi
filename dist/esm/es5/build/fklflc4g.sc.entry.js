import*as tslib_1 from"../polyfills/tslib.js";import{h}from"../clipper.core.js";import"./chunk-c46efb37.js";import{b as showMyOrders$1}from"./chunk-b29ff8f0.js";import{d as open}from"./chunk-fe10219c.js";import{a as config}from"./chunk-a28cfce0.js";import{a as showMyOrders,b as cancelOrder,c as rateOrder,d as finishOrder}from"./chunk-3c944ae9.js";import{a as ConferenceData}from"./chunk-f41ac15c.js";var Route=function(){function e(){this.gmapKey=config.env.GOOGLE_MAP_KEY,this.orders=[],this.startedOrders=[],this.finishedOrders=[]}return e.prototype.componentWillLoad=function(){return tslib_1.__awaiter(this,void 0,void 0,function(){var e;return tslib_1.__generator(this,function(t){switch(t.label){case 0:return e=this,[4,ConferenceData.getMap()];case 1:return e.mapData=t.sent(),this.store.mapStateToProps(this,function(e){var t=e.session;return{token:t.token,directions:t.directions}}),this.role=this.parseJwt(this.token)._role,"MERCHANT"===this.role?(this.store.mapStateToProps(this,function(e){return{orders:e.merchant.orders}}),this.store.mapDispatchToProps(this,{open:open,showMyOrders:showMyOrders,cancelOrder:cancelOrder,rateOrder:rateOrder,finishOrder:finishOrder})):"CUSTOMER"===this.role&&(this.store.mapStateToProps(this,function(e){return{orders:e.customer.orders}}),this.store.mapDispatchToProps(this,{open:open,showCustomerOrders:showMyOrders$1,cancelOrder:cancelOrder,rateOrder:rateOrder,finishOrder:finishOrder})),[4,this.populateOrders()];case 2:return t.sent(),[4,getGoogleMaps(this.gmapKey)];case 3:return t.sent(),[2]}})})},e.prototype.componentDidLoad=function(){return tslib_1.__awaiter(this,void 0,void 0,function(){return tslib_1.__generator(this,function(e){switch(e.label){case 0:return[4,this.populateMap()];case 1:return e.sent(),[2]}})})},e.prototype.populateMap=function(){return tslib_1.__awaiter(this,void 0,void 0,function(){var e,t,r;return tslib_1.__generator(this,function(s){return e=this.mapData,t=this.el.querySelector(".map-canvas"),r=new google.maps.Map(t,{center:this.startedOrders.length>0?this.startedOrders[0].job.origin.address.location:e.find(function(e){return e.center}),zoom:16}),e.forEach(function(){google.maps.event.addListenerOnce(r,"idle",function(){t.classList.add("show-map")})}),[2]})})},e.prototype.componentWillUpdate=function(){return tslib_1.__awaiter(this,void 0,void 0,function(){return tslib_1.__generator(this,function(e){switch(e.label){case 0:return[4,this.populateOrders(!1)];case 1:return e.sent(),[2]}})})},e.prototype.populateOrders=function(e){return void 0===e&&(e=!0),tslib_1.__awaiter(this,void 0,void 0,function(){return tslib_1.__generator(this,function(t){switch(t.label){case 0:return e?"MERCHANT"!==this.role?[3,2]:[4,this.showMyOrders(this.token)]:[3,5];case 1:return t.sent(),[3,4];case 2:return[4,this.showCustomerOrders(this.token)];case 3:t.sent(),t.label=4;case 4:t.label=5;case 5:return this.startedOrders=this.orders.filter(function(e){return"started"===e.status}),this.finishedOrders=this.orders.filter(function(e){return"finished"===e.status&&(e.customerRate<0||e.merchantRate<0)}),this.hasOrder=this.startedOrders.length>0,this.hasFinishedOrder=this.finishedOrders.length>0,[2]}})})},e.prototype.isEmpty=function(e){for(var t in e)if(e.hasOwnProperty(t))return!1;return!0},e.prototype.parseJwt=function(e){var t=e.split(".")[1].replace(/-/g,"+").replace(/_/g,"/");return JSON.parse(window.atob(t))},e.prototype.navigate=function(){var e=this.startedOrders[0].job;window.location.replace("https://www.google.com/maps/dir/?api=1&travelmode=driving&origin="+e.origin.address.street+", "+e.origin.address.number+"&destination="+e.destination.address.street+", "+e.destination.address.number)},e.prototype.cancelCurrentOrder=function(e){return tslib_1.__awaiter(this,void 0,void 0,function(){return tslib_1.__generator(this,function(t){switch(t.label){case 0:return[4,this.cancelOrder(e,this.token)];case 1:return t.sent(),[4,this.populateOrders()];case 2:return t.sent(),[2]}})})},e.prototype.finishCurrentOrder=function(e){return tslib_1.__awaiter(this,void 0,void 0,function(){return tslib_1.__generator(this,function(t){switch(t.label){case 0:return[4,this.finishOrder(e,this.token)];case 1:return t.sent(),[4,this.populateOrders()];case 2:return t.sent(),[2]}})})},e.prototype.rateCurrentOrder=function(e){return tslib_1.__awaiter(this,void 0,void 0,function(){return tslib_1.__generator(this,function(t){switch(t.label){case 0:return[4,this.rateOrder(e,this.rating,this.token)];case 1:return t.sent(),[4,this.populateOrders()];case 2:return t.sent(),[2]}})})},e.prototype.toggleStar=function(e,t){e.preventDefault(),this.rating=+t.split("-")[1],console.log(this.rating);for(var r=1;r<=5;r++)document.getElementById("star-"+r).classList.remove("marked");for(r=1;r<=this.rating;r++)document.getElementById("star-"+r).classList.add("marked")},e.prototype.render=function(){var e=this,t="",r="";if(this.hasOrder||this.hasFinishedOrder){var s=this.hasFinishedOrder?this.finishedOrders[0].job:this.startedOrders[0].job;r=s.destination.address.street+", "+s.destination.address.number,t=s.origin.address.street+", "+s.origin.address.number}return[h("ion-header",null,h("ion-toolbar",null,h("ion-buttons",{slot:"start"},h("ion-menu-button",null)),h("ion-title",null,"Mapa"))),h("div",{style:this.hasOrder||this.hasFinishedOrder?{display:"none"}:{height:"100%"},class:"map-canvas"}),h("div",{style:{flex:"1",display:"flex","flex-direction":"column"}},(this.hasOrder||this.hasFinishedOrder)&&[h("iframe",{frameborder:"0",style:{border:"0",height:"100%",width:"100%"},src:"https://www.google.com/maps/embed/v1/directions?origin="+t+"&destination="+r+"&key="+this.gmapKey}),h("div",null,h("ion-card",null,h("ion-card-header",null,h("ion-card-subtitle",null,this.hasFinishedOrder?"Avalie seu frete":"Prepare seus itens"),h("ion-card-title",null,this.hasFinishedOrder?"Frete Concluído":"Frete em Andamento")),this.hasOrder&&[h("ion-card-content",null,"O freteiro está a caminho de ",this.startedOrders[0].job.origin.address.street+", "+this.startedOrders[0].job.origin.address.number,", a partir de ",this.startedOrders[0].job.scheduledTo,". Aguarde a chegada do prestador de serviços para começar o frete para o endereço"," "+this.startedOrders[0].job.destination.address.street+", "+this.startedOrders[0].job.destination.address.number,". Contate o"," "+this.startedOrders[0].merchant.name," pelo telefone ",this.startedOrders[0].merchant.phone," ou e-mail ",this.startedOrders[0].merchant.email," em caso de necessidade."),h("div",null,"MERCHANT"===this.role?h("div",{style:{display:"flex",padding:"0px 15px"}},h("ion-button",{style:{flex:"1"},color:"danger",onClick:function(){return e.cancelCurrentOrder(e.startedOrders[0]._id)}},"Cancelar"),h("ion-button",{style:{flex:"1"},color:"tertiary",onClick:function(){return e.navigate()}},"Navegar"),h("ion-button",{style:{flex:"1"},color:"success",onClick:function(){return e.finishCurrentOrder(e.startedOrders[0]._id)}},"Concluir")):h("div",{style:{display:"flex",padding:"0px 15px"}},h("ion-button",{style:{flex:"1"},color:"danger",onClick:function(){return e.cancelCurrentOrder(e.startedOrders[0]._id)},expand:"block"},"Cancelar"))),h("br",null)],this.hasFinishedOrder&&[h("ion-card-content",null,h("ion-buttons",{class:"stars"},h("ion-button",{id:"star-1",onClick:function(t){return e.toggleStar(t,"star-1")}}),h("ion-button",{id:"star-2",onClick:function(t){return e.toggleStar(t,"star-2")}}),h("ion-button",{id:"star-3",onClick:function(t){return e.toggleStar(t,"star-3")}}),h("ion-button",{id:"star-4",onClick:function(t){return e.toggleStar(t,"star-4")}}),h("ion-button",{id:"star-5",onClick:function(t){return e.toggleStar(t,"star-5")}}))),h("div",{style:{display:"flex",padding:"0px 15px"}},h("ion-button",{style:{flex:"1"},color:"tertiary",onClick:function(){return e.rateCurrentOrder(e.finishedOrders[0]._id)},expand:"block"},"Enviar")),h("br",null)]))])]},Object.defineProperty(e,"is",{get:function(){return"app-map"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{directions:{state:!0},el:{elementRef:!0},finishedOrders:{state:!0},hasFinishedOrder:{state:!0},hasOrder:{state:!0},orders:{state:!0},rating:{state:!0},role:{state:!0},startedOrders:{state:!0},store:{context:"store"},token:{state:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return".map-canvas{width:100%;-ms-flex:100%;flex:100%;background-color:transparent;opacity:0;-webkit-transition:opacity .15s ease-in;transition:opacity .15s ease-in}.show-map{opacity:1}.stars ion-button{background:grey;-webkit-clip-path:polygon(50% 0,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%);clip-path:polygon(50% 0,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%);height:2.75em!important;width:2.75em!important}.stars ion-button:hover{background:#00f}.stars ion-button.marked{background:#ff0!important}"},enumerable:!0,configurable:!0}),e}();function getGoogleMaps(e){var t=window,r=t.google;return r&&r.maps?Promise.resolve(r.maps):new Promise(function(r,s){var n=document.createElement("script");n.src="https://maps.googleapis.com/maps/api/js?key="+e,n.async=!0,n.defer=!0,document.body.appendChild(n),n.onload=function(){var e=t.google;e&&e.maps?r(e.maps):s("google maps not available")}})}export{Route as AppMap};