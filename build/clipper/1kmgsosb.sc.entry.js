const e=window.clipper.h;import"./chunk-c46efb37.js";import{b as t,c as s,d as i,e as a,f as n}from"./chunk-f803942d.js";const o="localhost"===(window&&window.location&&window.location.hostname)?"https://localhost:4000/":"https://app.shipping.net/";class r{constructor(){this.client_id=process.env.FACEBOOK_ID,this.client_secret=process.env.FACEBOOK_SECRET,this.facebook_url="https://graph.facebook.com/v4.0"}startTimer(){}async storeFacebookToken(e){const t=await e.json(),s=`${this.facebook_url}/me?fields=id%2Cname%2Cemail%2Cpicture%2Cbirthday%2Caddress&access_token=${t.access_token}`,i=await fetch(s),{birthday:a,email:n,id:o,name:r,address:l,picture:d}=await i.json();return{name:r,email:n,address:l,role:"CUSTOMER",password:o,birthDate:a,files:[await(await fetch(d.data.url)).blob()]}}async checkFacebookCode(){const e=r.parseUrl();if(e.hasOwnProperty("code")){const t=`${this.facebook_url}/oauth/access_token?client_id=${this.client_id}&client_secret=${this.client_secret}&redirect_uri=${o}&code=${e.code}`;return console.log(t),this.storeFacebookToken(await fetch(t))}return null}openFacebook(){window.location.href=`https://www.facebook.com/v4.0/dialog/oauth?client_id=411855926099953&redirect_uri=${o}&state=loggedin`}static parseUrl(){return window.location.search.slice(1).split("&").reduce((e,t)=>(e[t.split("=").slice(0)[0]]=t.split("=").slice(1)[0],e),{})}}class l{constructor(){this.username={valid:!1,value:""},this.password={valid:!1,value:""},this.name="",this.submitted=!1,this.registered=!1}async componentWillLoad(){this.store.mapStateToProps(this,e=>{const{session:{name:t,introduced:s,registered:i}}=e;return{name:t,introduced:s,registered:i}}),this.store.mapDispatchToProps(this,{setToken:t,toggleIntro:s,openRegister:i,closeRegister:a,register:n}),this.entrance=new r;const e=await this.entrance.checkFacebookCode();if(null!==e){const{email:t,password:s}=e;await this.register(e),await this.setToken(t,s)}}handleUsername(e){this.validateUsername(),this.username=Object.assign({},this.username,{value:e.target.value})}handlePassword(e){this.validatePassword(),this.password.value=e.target.value,this.password=Object.assign({},this.password,{value:e.target.value})}validateUsername(){this.username=this.username.value&&this.username.value.length>0?Object.assign({},this.username,{valid:!0}):Object.assign({},this.username,{valid:!1})}validatePassword(){if(this.password.value&&this.password.value.length>0)return this.password.valid=!0,void(this.password=Object.assign({},this.password,{valid:!0}));this.password=Object.assign({},this.password,{valid:!1})}async onLogin(e){e.preventDefault(),this.validatePassword(),this.validateUsername(),this.submitted=!0,this.password.valid&&this.username.valid&&this.setToken(this.username.value,this.password.value)}renderLogin(){return[e("ion-header",null,e("ion-toolbar",null,e("ion-buttons",{slot:"start"},e("ion-menu-toggle",{"auto-hide":!1},e("ion-icon",{name:"menu"}))),e("ion-title",null,"Entrar"))),e("ion-content",{padding:!0},e("ion-grid",null,e("ion-row",null,e("ion-col",{"size-md":"4","offset-md":"4"},e("div",{class:"login-logo"},e("img",{src:"assets/img/appicon.svg",alt:"Ionic logo"})),e("form",{novalidate:"true",onSubmit:e=>this.onLogin(e)},e("ion-list",{"no-lines":!0},e("ion-item",null,e("ion-label",{position:"stacked",color:"primary"},"E-mail"),e("ion-input",{name:"username",type:"text",value:this.username.value,onInput:e=>this.handleUsername(e),spellcheck:!1,autocapitalize:"off",required:!0})),e("ion-text",{color:"danger"},e("p",{hidden:this.username.valid||!1===this.submitted,"padding-left":!0},"Nome do usuário é requerido")),e("ion-item",null,e("ion-label",{position:"stacked",color:"primary"},"Senha"),e("ion-input",{name:"password",type:"password",value:this.password.value,onInput:e=>this.handlePassword(e),required:!0})),e("ion-text",{color:"danger"},e("p",{hidden:this.password.valid||!1===this.submitted,"padding-left":!0},"Senha é requerida"))),e("ion-row",{"responsive-sm":!0},e("ion-col",null,e("ion-button",{type:"submit",expand:"block"},"Entrar")),e("ion-col",null,e("ion-button",{onClick:()=>this.openRegister(),color:"light",expand:"block"},"Registrar"))),e("ion-row",{"responsive-sm":!0},e("ion-col",null,e("ion-button",{onClick:()=>this.entrance.openFacebook(),color:"tertiary",expand:"block"},"Entrar com o Facebook"))))))))]}render(){return this.introduced?this.registered?this.renderLogin():e("register-wizard",{action:e=>this.register(e),exit:()=>this.closeRegister()}):e("generic-carousel",null,e("div",{slot:"slide1"},e("div",{class:"slide-image-container"},e("img",{src:"assets/img/tour_1_clipper.svg",class:"slide-image"})),e("h2",{class:"slide-title"},"Bem-vindo ao ",e("b",null,"Shipping")),e("p",null,"O ",e("b",null,"Shipping")," é um aplicativo de serviços de mudança e fretagem, simples, prático e rápido."),e("ion-button",{fill:"clear",href:"#",onClick:()=>this.toggleIntro(!0)},"Continuar",e("ion-icon",{slot:"end",name:"arrow-forward"}))),e("div",{slot:"slide2"},e("div",{class:"slide-image-container"},e("img",{src:"assets/img/tour_2_map.svg",class:"slide-image"})),e("h2",{class:"slide-title"},"Por que usar o Shipping?"),e("p",null,e("b",null,"Shipping")," conta com prestadores de entrega e mudança bem selecionados e revisados pela nossa equipe."),e("ion-button",{fill:"clear",href:"#",onClick:()=>this.toggleIntro(!0)},"Continuar",e("ion-icon",{slot:"end",name:"arrow-forward"}))),e("div",{slot:"slide3"},e("div",{class:"slide-image-container"},e("img",{src:"assets/img/tour_3_payment.svg",class:"slide-image"})),e("h2",{class:"slide-title"},"Pago a mais para usar este serviço?"),e("p",null,"O aplicativo é ",e("b",null,"100% gratuito"),", apenas é cobrado o valor que é combinado pela plataforma entre o freteiro e você."),e("ion-button",{fill:"clear",href:"#",onClick:()=>this.toggleIntro(!0)},"Continuar",e("ion-icon",{slot:"end",name:"arrow-forward"}))),e("div",{slot:"slide4"},e("div",{class:"slide-image-container"},e("img",{src:"assets/img/tour_4_start.svg",class:"slide-image"})),e("h2",{class:"slide-title"},"Pronto para Começar?"),e("ion-button",{fill:"clear",href:"#",onClick:()=>this.toggleIntro(!0)},"Começar",e("ion-icon",{slot:"end",name:"arrow-forward"}))))}static get is(){return"app-entrance"}static get properties(){return{introduced:{state:!0},name:{state:!0},password:{state:!0},registered:{state:!0},store:{context:"store"},submitted:{state:!0},username:{state:!0}}}static get style(){return"app-entrance{width:100%;height:100%}app-entrance .login-logo{padding:20px 0;min-height:200px;text-align:center}app-entrance .login-logo img{max-width:150px}app-entrance .signup-logo{padding:20px 0;min-height:200px;text-align:center}app-entrance .signup-logo img{max-width:150px}app-entrance .list{margin-bottom:0}"}}class d{constructor(){this.submitted=!1,this.username={valid:!1,value:""},this.password={valid:!1,value:""},this.data={}}handleInput(e){this.data[e.target.name]=e.target.value}handleRadio(e){this.data[e.target.name]=[e.target.value]}handleFile(e){this.data.files=[e[0]]}handleAddress(e){this.data.address={street:e.target.value}}handleUsername(e){this.validateUsername(),this.username=Object.assign({},this.username,{value:e.target.value})}handlePassword(e){this.validatePassword(),this.password.value=e.target.value,this.password=Object.assign({},this.password,{value:e.target.value})}validateUsername(){this.username=this.username.value&&this.username.value.length>0?Object.assign({},this.username,{valid:!0}):Object.assign({},this.username,{valid:!1})}validatePassword(){if(this.password.value&&this.password.value.length>0)return this.password.valid=!0,void(this.password=Object.assign({},this.password,{valid:!0}));this.password=Object.assign({},this.password,{valid:!1})}unload(e){e.preventDefault(),this.exit()}submit(e){e.preventDefault();const t=Object.assign({},this.data,{username:this.username.value,password:this.password.value});this.action(t)}render(){return[e("ion-header",null,e("ion-toolbar",null,e("ion-buttons",{slot:"start"},e("ion-back-button",{onClick:e=>this.unload(e),defaultHref:"/"})),e("ion-title",null,"Registro"))),e("ion-content",{padding:!0},e("div",{class:"signup-logo"},e("img",{src:"assets/img/appicon.svg",alt:"Ionic Logo"})),e("generic-wizard",{id:"register",steps:4,action:e=>this.submit(e)},e("div",{slot:"step-1"},e("ion-item",null,e("ion-label",{position:"stacked"},"Digite seu nome completo"),e("ion-input",{name:"name",onInput:e=>this.handleInput(e)})),e("ion-item",null,e("ion-label",{position:"stacked"},"Digite seu endereço"),e("ion-input",{name:"address",onInput:e=>this.handleAddress(e)})),e("ion-item",null,e("ion-label",{position:"stacked"},"Digite seu telefone para contato"),e("ion-input",{name:"phone",onInput:e=>this.handleInput(e)})),e("ion-radio-group",{name:"role"},e("ion-list-header",null,e("ion-label",null,"Você é freteiro ou busca por frete?")),e("ion-item",null,e("ion-label",null,"Cliente"),e("ion-radio",{onClick:e=>this.handleRadio(e),slot:"start",value:"CUSTOMER",checked:!0})),e("ion-item",null,e("ion-label",null,"Freteiro"),e("ion-radio",{onClick:e=>this.handleRadio(e),slot:"start",value:"MERCHANT"})))),e("div",{slot:"step-2"},e("ion-item",null,e("ion-label",{position:"stacked"},"Insira imagens"),e("image-uploader",{send:e=>this.handleFile(e),id:"file"}))),e("div",{slot:"step-3"},e("ion-item",null,e("ion-label",{position:"stacked"},"Digite seu e-mail para o login"),e("ion-input",{name:"email",onInput:e=>this.handleInput(e)})),e("ion-item",null,e("ion-label",{position:"stacked"},"Digite um nome de usuário"),e("ion-input",{name:"username",type:"text",value:this.username.value,onInput:e=>this.handleUsername(e),required:!0})),e("ion-text",{color:"danger"},e("p",{hidden:this.username.valid||!1===this.submitted,"padding-left":!0},"Nome do usuário é requerido")),e("ion-item",null,e("ion-label",{position:"stacked"},"Digite sua senha"),e("ion-input",{name:"password",type:"password",value:this.password.value,onInput:e=>this.handlePassword(e),required:!0})),e("ion-text",{color:"danger"},e("p",{hidden:this.password.valid||!1===this.submitted,"padding-left":!0},"Senha é requerida")),e("ion-item",null,e("ion-label",{position:"stacked"},"Digite sua senha novamente"),e("ion-input",{type:"password",name:"scpassword"}))),e("div",{slot:"step-4"},e("ion-item",null,e("ion-label",{position:"stacked"},"Informações adicionais"),e("ion-textarea",{name:"info",rows:4,onInput:e=>this.handleInput(e)})))))]}static get is(){return"register-wizard"}static get properties(){return{action:{type:"Any",attr:"action"},data:{state:!0},exit:{type:"Any",attr:"exit"},images:{type:"Any",attr:"images"},password:{state:!0},submitted:{state:!0},username:{state:!0}}}static get style(){return""}}export{l as AppEntrance,d as RegisterWizard};