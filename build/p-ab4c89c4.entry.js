import{r as t}from"./p-5a3a7011.js";import{r as i}from"./p-1ebc0f64.js";import{i as e}from"./p-011655de.js";import"./p-65d8e78f.js";const o="https://maps.googleapis.com/maps/api/geocode/json?",s=class{constructor(i){t(this,i),this.descriptions=[{description:""}],this.descriptionsLength=1,this.data={job:{origin:{items:[]},destination:{}}}}componentWillLoad(){this.store.mapStateToProps(this,(t=>{const{session:{token:i,directions:e}}=t;return{token:i,directions:e}})),this.store.mapDispatchToProps(this,{registerOrder:i,close:e})}parseJwt(t){const i=t.split(".")[1].replace(/-/g,"+").replace(/_/g,"/");return JSON.parse(window.atob(i))}async handleSubmit(t){t.preventDefault(),this.data.customer=this.parseJwt(this.token)._id,this.data.job.scheduledTo=document.querySelector("ion-datetime").value;const i=this.data.job.origin.address,e=this.data.job.destination.address,s=i.street+", "+i.number,n=e.street+", "+e.number,a=process.env.GOOGLE_MAP_KEY,r=await fetch(o+"key="+a+"&address="+s),h=await fetch(o+"key="+a+"&address="+n),d=(await r.json()).results[0].geometry.location,l=(await h.json()).results[0].geometry.location;this.data.job.origin.address.location={lat:d.lat,lng:d.lng},this.data.job.destination.address.location={lat:l.lat,lng:l.lng},this.data.job.origin.items=[...this.descriptions.slice(0,this.descriptionsLength)],this.registerOrder(this.data,this.token),(await this.tab.componentOnReady()).select("tab-drawer"),this.close()}handleAddress(t,i,e){t.preventDefault(),this.data.job[e]=i}handleFile(t){const i=[];for(let e=0;e<t.length;e++)i.push(t[e]);this.data.files=[...i]}handleInput(t){this.data[t.target.name]=t.target.value}handleDescription(t){t.preventDefault(),this.descriptions[this.descriptionsLength-1]={description:t.target.value},this.descriptions[this.descriptionsLength]={description:""}}addDescription(t){t.preventDefault(),this.descriptionsLength+=1}dateInterval(){const t=new Date,i=String(t.getDate()).padStart(2,"0"),e=String(t.getMonth()+1).padStart(2,"0");return{today:t.getFullYear()+"-"+e+"-"+i,tomorrow:t.getFullYear()+1+"-"+e+"-"+i}}render(){const{today:t,tomorrow:i}=this.dateInterval(),e=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],o=e.map((t=>t.slice(0,3)));return[h("ion-header",null,h("ion-toolbar",null,h("ion-buttons",{slot:"start"},h("ion-menu-button",null)),h("ion-title",null,"Criar Frete"))),h("ion-content",{padding:!0},"CREATE"===this.directions.slice(-1)[0].component&&h("generic-wizard",{id:"create",steps:4,action:async t=>{await this.handleSubmit(t)}},h("div",{slot:"step-1"},h("ion-item",null,h("ion-label",{position:"stacked",color:"primary"},"Insira imagens do produto"),h("image-uploader",{send:t=>this.handleFile(t)})),h("ion-item",null,h("ion-label",{position:"stacked",color:"primary"},"Insira o título do seu anúncio"),h("ion-input",{name:"title",type:"text",value:"",clearInput:!0,onInput:t=>this.handleInput(t),required:!0})),h("ion-item",null,h("ion-label",{position:"stacked",color:"primary"},"Data de saída"),h("ion-datetime",{min:t,max:i,"display-format":"MMM DD, YYYY HH:mm",value:"",monthNames:e,monthShortNames:o,cancelText:"Cancelar",doneText:"Confirmar",name:"scheduledTo"}))),h("div",{slot:"step-2"},this.descriptions.map((t=>h("ion-item",null,h("ion-label",{position:"stacked",color:"primary"},"Descreva o item que você precisa carregar"),h("ion-textarea",{rows:2,name:"description",onInput:t=>this.handleDescription(t),required:!0,value:t.description})))),h("ion-button",{onClick:t=>this.addDescription(t),color:"tertiary",expand:"block"},"Adicionar outro item")),h("div",{slot:"step-3"},h("address-input",{input:(t,i)=>this.handleAddress(t,i,"origin"),label:"Endereço de saída"})),h("div",{slot:"step-4"},h("address-input",{input:(t,i)=>this.handleAddress(t,i,"destination"),label:"Endereço de chegada"}))))]}};s.style="";export{s as page_create}