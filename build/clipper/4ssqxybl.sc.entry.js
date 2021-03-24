const t=window.clipper.h;import"./chunk-c46efb37.js";import{b as e}from"./chunk-0ae5f34e.js";import{j as s}from"./chunk-f803942d.js";import{a as r}from"./chunk-20d97b4c.js";import{a as i,b as a,c as o,d as n}from"./chunk-0ef234de.js";class d{constructor(){this.gmapKey=process.env.GOOGLE_MAP_KEY,this.orders=[],this.startedOrders=[],this.finishedOrders=[]}async componentWillLoad(){this.mapData=await r.getMap(),this.store.mapStateToProps(this,t=>{const{session:{token:e,directions:s}}=t;return{token:e,directions:s}}),this.role=this.parseJwt(this.token)._role,"MERCHANT"===this.role?(this.store.mapStateToProps(this,t=>{const{merchant:{orders:e}}=t;return{orders:e}}),this.store.mapDispatchToProps(this,{open:s,showMyOrders:i,cancelOrder:a,rateOrder:o,finishOrder:n})):"CUSTOMER"===this.role&&(this.store.mapStateToProps(this,t=>{const{customer:{orders:e}}=t;return{orders:e}}),this.store.mapDispatchToProps(this,{open:s,showCustomerOrders:e,cancelOrder:a,rateOrder:o,finishOrder:n})),await this.populateOrders(),await function(t){const e=window,s=e.google;return s&&s.maps?Promise.resolve(s.maps):new Promise((s,r)=>{const i=document.createElement("script");i.src=`https://maps.googleapis.com/maps/api/js?key=${t}`,i.async=!0,i.defer=!0,document.body.appendChild(i),i.onload=(()=>{const t=e.google;t&&t.maps?s(t.maps):r("google maps not available")})})}(this.gmapKey)}async componentDidLoad(){await this.populateMap()}async populateMap(){const t=this.mapData,e=this.el.querySelector(".map-canvas"),s=new google.maps.Map(e,{center:this.startedOrders.length>0?this.startedOrders[0].job.origin.address.location:t.find(t=>t.center),zoom:16});t.forEach(()=>{google.maps.event.addListenerOnce(s,"idle",()=>{e.classList.add("show-map")})})}async componentWillUpdate(){await this.populateOrders(!1)}async populateOrders(t=!0){t&&("MERCHANT"===this.role?await this.showMyOrders(this.token):await this.showCustomerOrders(this.token)),this.startedOrders=this.orders.filter(t=>"started"===t.status),this.finishedOrders=this.orders.filter(t=>"finished"===t.status&&(t.customerRate<0||t.merchantRate<0)),this.hasOrder=this.startedOrders.length>0,this.hasFinishedOrder=this.finishedOrders.length>0}isEmpty(t){for(const e in t)if(t.hasOwnProperty(e))return!1;return!0}parseJwt(t){const e=t.split(".")[1].replace(/-/g,"+").replace(/_/g,"/");return JSON.parse(window.atob(e))}navigate(){const t=this.startedOrders[0].job;window.location.replace(`https://www.google.com/maps/dir/?api=1&travelmode=driving&origin=${`${t.origin.address.street}, ${t.origin.address.number}`}&destination=${`${t.destination.address.street}, ${t.destination.address.number}`}`)}async cancelCurrentOrder(t){await this.cancelOrder(t,this.token),await this.populateOrders()}async finishCurrentOrder(t){await this.finishOrder(t,this.token),await this.populateOrders()}async rateCurrentOrder(t){await this.rateOrder(t,this.rating,this.token),await this.populateOrders()}toggleStar(t,e){t.preventDefault(),this.rating=+e.split("-")[1],console.log(this.rating);for(let t=1;t<=5;t++)document.getElementById(`star-${t}`).classList.remove("marked");for(let t=1;t<=this.rating;t++)document.getElementById(`star-${t}`).classList.add("marked")}render(){let e="",s="";if(this.hasOrder||this.hasFinishedOrder){const t=this.hasFinishedOrder?this.finishedOrders[0].job:this.startedOrders[0].job;s=`${t.destination.address.street}, ${t.destination.address.number}`,e=`${t.origin.address.street}, ${t.origin.address.number}`}return[t("ion-header",null,t("ion-toolbar",null,t("ion-buttons",{slot:"start"},t("ion-menu-button",null)),t("ion-title",null,"Mapa"))),t("div",{style:this.hasOrder||this.hasFinishedOrder?{display:"none"}:{height:"100%"},class:"map-canvas"}),t("div",{style:{flex:"1",display:"flex","flex-direction":"column"}},(this.hasOrder||this.hasFinishedOrder)&&[t("iframe",{frameborder:"0",style:{border:"0",height:"100%",width:"100%"},src:`https://www.google.com/maps/embed/v1/directions?origin=${e}&destination=${s}&key=${this.gmapKey}`}),t("div",null,t("ion-card",null,t("ion-card-header",null,t("ion-card-subtitle",null,this.hasFinishedOrder?"Avalie seu frete":"Prepare seus itens"),t("ion-card-title",null,this.hasFinishedOrder?"Frete Concluído":"Frete em Andamento")),this.hasOrder&&[t("ion-card-content",null,"O freteiro está a caminho de ",this.startedOrders[0].job.origin.address.street+", "+this.startedOrders[0].job.origin.address.number,", a partir de ",this.startedOrders[0].job.scheduledTo,". Aguarde a chegada do prestador de serviços para começar o frete para o endereço"," "+this.startedOrders[0].job.destination.address.street+", "+this.startedOrders[0].job.destination.address.number,". Contate o"," "+this.startedOrders[0].merchant.name," pelo telefone ",this.startedOrders[0].merchant.phone," ou e-mail ",this.startedOrders[0].merchant.email," em caso de necessidade."),t("div",null,"MERCHANT"===this.role?t("div",{style:{display:"flex",padding:"0px 15px"}},t("ion-button",{style:{flex:"1"},color:"danger",onClick:()=>this.cancelCurrentOrder(this.startedOrders[0]._id)},"Cancelar"),t("ion-button",{style:{flex:"1"},color:"tertiary",onClick:()=>this.navigate()},"Navegar"),t("ion-button",{style:{flex:"1"},color:"success",onClick:()=>this.finishCurrentOrder(this.startedOrders[0]._id)},"Concluir")):t("div",{style:{display:"flex",padding:"0px 15px"}},t("ion-button",{style:{flex:"1"},color:"danger",onClick:()=>this.cancelCurrentOrder(this.startedOrders[0]._id),expand:"block"},"Cancelar"))),t("br",null)],this.hasFinishedOrder&&[t("ion-card-content",null,t("ion-buttons",{class:"stars"},t("ion-button",{id:"star-1",onClick:t=>this.toggleStar(t,"star-1")}),t("ion-button",{id:"star-2",onClick:t=>this.toggleStar(t,"star-2")}),t("ion-button",{id:"star-3",onClick:t=>this.toggleStar(t,"star-3")}),t("ion-button",{id:"star-4",onClick:t=>this.toggleStar(t,"star-4")}),t("ion-button",{id:"star-5",onClick:t=>this.toggleStar(t,"star-5")}))),t("div",{style:{display:"flex",padding:"0px 15px"}},t("ion-button",{style:{flex:"1"},color:"tertiary",onClick:()=>this.rateCurrentOrder(this.finishedOrders[0]._id),expand:"block"},"Enviar")),t("br",null)]))])]}static get is(){return"app-map"}static get properties(){return{directions:{state:!0},el:{elementRef:!0},finishedOrders:{state:!0},hasFinishedOrder:{state:!0},hasOrder:{state:!0},orders:{state:!0},rating:{state:!0},role:{state:!0},startedOrders:{state:!0},store:{context:"store"},token:{state:!0}}}static get style(){return".map-canvas{width:100%;-ms-flex:100%;flex:100%;background-color:transparent;opacity:0;-webkit-transition:opacity .15s ease-in;transition:opacity .15s ease-in}.show-map{opacity:1}.stars ion-button{background:grey;-webkit-clip-path:polygon(50% 0,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%);clip-path:polygon(50% 0,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%);height:2.75em!important;width:2.75em!important}.stars ion-button:hover{background:#00f}.stars ion-button.marked{background:#ff0!important}"}}export{d as AppMap};