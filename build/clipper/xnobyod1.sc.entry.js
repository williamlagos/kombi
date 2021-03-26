const e=window.clipper.h;import"./chunk-c46efb37.js";import{c as t,d as i}from"./chunk-0ae5f34e.js";import{a as o}from"./chunk-46805004.js";import{h as r}from"./chunk-0ef234de.js";class s{constructor(){this.data={value:0,description:""}}async componentWillLoad(){this.store.mapStateToProps(this,e=>{const{session:{token:t},customer:{bids:i}}=e;return{token:t,bids:i}}),this.store.mapDispatchToProps(this,{placeOrder:r,showOrderBids:t,selectMerchantForOrder:i,close:o}),await this.showOrderBids(this.token,this.orderId)}async dismiss(e){this.el.closest("ion-modal").dismiss(null===e?{success:0}:e),(await this.tab.componentOnReady()).select("tab-drawer"),this.close()}offer(){console.log(this.order._id),console.log(this.orderId);const e=Object.assign({},this.data,{user:this.userId});this.placeOrder(e,this.orderId,this.token),this.dismiss({success:0})}schedule(){const e=document.querySelector("#merchants");this.selectMerchantForOrder(e.value,this.orderId,this.token),this.dismiss({success:0})}handleInput(e){e.preventDefault(),this.data[e.target.name]="description"!==e.target.name?+e.target.value:e.target.value}render(){const t=this.config.get("mode");return[e("ion-header",null,e("ion-toolbar",null,e("ion-buttons",{slot:"md"===t?"end":"start"},e("ion-button",{onClick:()=>this.dismiss()},"Cancelar")),e("ion-title",null,this.order.title))),e("ion-content",{class:"outer-content"},e("ion-grid",null,e("ion-row",null,e("ion-col",{style:{"text-align":"center"},"col-10":!0,"push-1":!0,"col-sm-6":!0,"push-sm-3":!0},e("ion-item",null,this.order.hasOwnProperty("pictures")&&this.order.pictures.length>0?e("img",{style:{"text-align":"center",margin:"10px 10px 10px 0px"},src:this.order.pictures[0].externalRef,alt:"Aqui fica a imagem do pedido"}):e("img",{style:{"text-align":"center",margin:"10px 10px 10px 0px"},alt:"Aqui fica a imagem do pedido"}),e("ion-label",{style:{"text-align":"left"}},e("p",null,"Origem: ",this.order.job.origin.address.street+", "+this.order.job.origin.address.number),e("p",null,"Destino: ",this.order.job.destination.address.street+", "+this.order.job.destination.address.number),e("p",null,this.order.job.origin.items.length>1?e("ion-list",null,this.order.job.origin.items.map(t=>e("ion-item",null,t.description))):this.order.job.origin.items.length>0&&this.order.job.origin.items[0].description))))),e("ion-row",null,e("ion-col",null,"MERCHANT"===this.role?e("form",{style:{width:"100%"}},e("ion-item",null,e("ion-label",null,"Média de preço ofertada: ",Math.round(100*(this.bids.length>0?this.bids.reduce((e,t)=>e.value+t.value)/this.bids.length:0))/100)),e("ion-item",null,e("ion-label",{position:"stacked",color:"primary"},"Digite uma observação"),e("ion-textarea",{name:"description",value:"",onInput:e=>this.handleInput(e)})),e("ion-item",null,e("ion-label",{position:"stacked",color:"primary"},"Digite o valor desejado"),e("ion-input",{name:"value",type:"number",value:"",onInput:e=>this.handleInput(e)})),e("ion-button",{expand:"full",color:"primary",onClick:()=>this.offer(),fill:"clear"},"Ofertar")):e("ion-list",null,e("ion-radio-group",{id:"merchants"},e("ion-list-header",null,e("ion-label",null,"Selecione a oferta de um freteiro:")),this.bids.map((t,i)=>e("ion-item",null,e("ion-label",null,t.user.name," ofereceu R$ ",t.value),e("ion-radio",{slot:"start",value:t.user._id,checked:0===i})))),e("ion-button",{expand:"block",onClick:()=>this.schedule()},"Agendar frete"))))))]}static get is(){return"page-order-detail"}static get properties(){return{bids:{state:!0},config:{context:"config"},data:{state:!0},el:{elementRef:!0},order:{type:"Any",attr:"order"},orderId:{type:String,attr:"order-id"},role:{type:String,attr:"role"},store:{context:"store"},tab:{connect:"ion-tabs"},token:{state:!0},userId:{type:"Any",attr:"user-id"}}}static get style(){return"page-order-detail ion-card{text-align:center}page-order-detail img{max-width:140px;margin:0 auto 20px}page-order-detail p{color:#60646b}.outer-content{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center}"}}export{s as PageOrderDetail};