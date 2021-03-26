var __awaiter=this&&this.__awaiter||function(e,t,n,i){return new(n||(n=Promise))(function(o,a){function r(e){try{l(i.next(e))}catch(e){a(e)}}function s(e){try{l(i.throw(e))}catch(e){a(e)}}function l(e){e.done?o(e.value):new n(function(t){t(e.value)}).then(r,s)}l((i=i.apply(e,t||[])).next())})},__generator=this&&this.__generator||function(e,t){var n,i,o,a,r={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function s(a){return function(s){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;r;)try{if(n=1,i&&(o=2&a[0]?i.return:a[0]?i.throw||((o=i.return)&&o.call(i),0):i.next)&&!(o=o.call(i,a[1])).done)return o;switch(i=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return r.label++,{value:a[1],done:!1};case 5:r.label++,i=a[1],a=[0];continue;case 7:a=r.ops.pop(),r.trys.pop();continue;default:if(!(o=(o=r.trys).length>0&&o[o.length-1])&&(6===a[0]||2===a[0])){r=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){r.label=a[1];break}if(6===a[0]&&r.label<o[1]){r.label=o[1],o=a;break}if(o&&r.label<o[2]){r.label=o[2],r.ops.push(a);break}o[2]&&r.ops.pop(),r.trys.pop();continue}a=t.call(e,r)}catch(e){a=[6,e],i=0}finally{n=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,s])}}};clipper.loadBundle("xrfwptjw",["exports","./chunk-ea768d49.js","./chunk-5822ea48.js"],function(e,t,n){var i=window.clipper.h,o="localhost"===(window&&window.location&&window.location.hostname)?"https://localhost:4000/":"https://app.shipping.net/",a=function(){function e(){this.client_id=process.env.FACEBOOK_ID,this.client_secret=process.env.FACEBOOK_SECRET,this.facebook_url="https://graph.facebook.com/v4.0"}return e.prototype.startTimer=function(){},e.prototype.storeFacebookToken=function(e){return __awaiter(this,void 0,void 0,function(){var t,n,i;return __generator(this,function(o){switch(o.label){case 0:return[4,e.json()];case 1:return t=o.sent(),[4,fetch(this.facebook_url+"/me?fields=id%2Cname%2Cemail%2Cpicture%2Cbirthday%2Caddress&access_token="+t.access_token)];case 2:return[4,o.sent().json()];case 3:return n=o.sent(),i={name:n.name,email:n.email,address:n.address,role:"CUSTOMER",password:n.id,birthDate:n.birthday},[4,fetch(n.picture.data.url)];case 4:return[4,o.sent().blob()];case 5:return[2,(i.files=[o.sent()],i)]}})})},e.prototype.checkFacebookCode=function(){return __awaiter(this,void 0,void 0,function(){var t,n,i;return __generator(this,function(a){switch(a.label){case 0:return(t=e.parseUrl()).hasOwnProperty("code")?(n=this.facebook_url+"/oauth/access_token?client_id="+this.client_id+"&client_secret="+this.client_secret+"&redirect_uri="+o+"&code="+t.code,console.log(n),i=this.storeFacebookToken,[4,fetch(n)]):[3,2];case 1:return[2,i.apply(this,[a.sent()])];case 2:return[2,null]}})})},e.prototype.openFacebook=function(){window.location.href="https://www.facebook.com/v4.0/dialog/oauth?client_id=411855926099953&redirect_uri="+o+"&state=loggedin"},e.parseUrl=function(){return window.location.search.slice(1).split("&").reduce(function(e,t){return e[t.split("=").slice(0)[0]]=t.split("=").slice(1)[0],e},{})},e}(),r=function(){function e(){this.username={valid:!1,value:""},this.password={valid:!1,value:""},this.name="",this.submitted=!1,this.registered=!1}return e.prototype.componentWillLoad=function(){return __awaiter(this,void 0,void 0,function(){var e,t,i;return __generator(this,function(o){switch(o.label){case 0:return this.store.mapStateToProps(this,function(e){var t=e.session;return{name:t.name,introduced:t.introduced,registered:t.registered}}),this.store.mapDispatchToProps(this,{setToken:n.setToken,toggleIntro:n.toggleIntro,openRegister:n.openRegister,closeRegister:n.closeRegister,register:n.register}),this.entrance=new a,[4,this.entrance.checkFacebookCode()];case 1:return null===(e=o.sent())?[3,4]:(t=e.email,i=e.password,[4,this.register(e)]);case 2:return o.sent(),[4,this.setToken(t,i)];case 3:o.sent(),o.label=4;case 4:return[2]}})})},e.prototype.handleUsername=function(e){this.validateUsername(),this.username=Object.assign({},this.username,{value:e.target.value})},e.prototype.handlePassword=function(e){this.validatePassword(),this.password.value=e.target.value,this.password=Object.assign({},this.password,{value:e.target.value})},e.prototype.validateUsername=function(){this.username=this.username.value&&this.username.value.length>0?Object.assign({},this.username,{valid:!0}):Object.assign({},this.username,{valid:!1})},e.prototype.validatePassword=function(){if(this.password.value&&this.password.value.length>0)return this.password.valid=!0,void(this.password=Object.assign({},this.password,{valid:!0}));this.password=Object.assign({},this.password,{valid:!1})},e.prototype.onLogin=function(e){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){return e.preventDefault(),this.validatePassword(),this.validateUsername(),this.submitted=!0,this.password.valid&&this.username.valid&&this.setToken(this.username.value,this.password.value),[2]})})},e.prototype.renderLogin=function(){var e=this;return[i("ion-header",null,i("ion-toolbar",null,i("ion-buttons",{slot:"start"},i("ion-menu-toggle",{"auto-hide":!1},i("ion-icon",{name:"menu"}))),i("ion-title",null,"Entrar"))),i("ion-content",{padding:!0},i("ion-grid",null,i("ion-row",null,i("ion-col",{"size-md":"4","offset-md":"4"},i("div",{class:"login-logo"},i("img",{src:"assets/img/appicon.svg",alt:"Ionic logo"})),i("form",{novalidate:"true",onSubmit:function(t){return e.onLogin(t)}},i("ion-list",{"no-lines":!0},i("ion-item",null,i("ion-label",{position:"stacked",color:"primary"},"E-mail"),i("ion-input",{name:"username",type:"text",value:this.username.value,onInput:function(t){return e.handleUsername(t)},spellcheck:!1,autocapitalize:"off",required:!0})),i("ion-text",{color:"danger"},i("p",{hidden:this.username.valid||!1===this.submitted,"padding-left":!0},"Nome do usuário é requerido")),i("ion-item",null,i("ion-label",{position:"stacked",color:"primary"},"Senha"),i("ion-input",{name:"password",type:"password",value:this.password.value,onInput:function(t){return e.handlePassword(t)},required:!0})),i("ion-text",{color:"danger"},i("p",{hidden:this.password.valid||!1===this.submitted,"padding-left":!0},"Senha é requerida"))),i("ion-row",{"responsive-sm":!0},i("ion-col",null,i("ion-button",{type:"submit",expand:"block"},"Entrar")),i("ion-col",null,i("ion-button",{onClick:function(){return e.openRegister()},color:"light",expand:"block"},"Registrar"))),i("ion-row",{"responsive-sm":!0},i("ion-col",null,i("ion-button",{onClick:function(){return e.entrance.openFacebook()},color:"tertiary",expand:"block"},"Entrar com o Facebook"))))))))]},e.prototype.render=function(){var e=this;return this.introduced?this.registered?this.renderLogin():i("register-wizard",{action:function(t){return e.register(t)},exit:function(){return e.closeRegister()}}):i("generic-carousel",null,i("div",{slot:"slide1"},i("div",{class:"slide-image-container"},i("img",{src:"assets/img/tour_1_clipper.svg",class:"slide-image"})),i("h2",{class:"slide-title"},"Bem-vindo ao ",i("b",null,"Shipping")),i("p",null,"O ",i("b",null,"Shipping")," é um aplicativo de serviços de mudança e fretagem, simples, prático e rápido."),i("ion-button",{fill:"clear",href:"#",onClick:function(){return e.toggleIntro(!0)}},"Continuar",i("ion-icon",{slot:"end",name:"arrow-forward"}))),i("div",{slot:"slide2"},i("div",{class:"slide-image-container"},i("img",{src:"assets/img/tour_2_map.svg",class:"slide-image"})),i("h2",{class:"slide-title"},"Por que usar o Shipping?"),i("p",null,i("b",null,"Shipping")," conta com prestadores de entrega e mudança bem selecionados e revisados pela nossa equipe."),i("ion-button",{fill:"clear",href:"#",onClick:function(){return e.toggleIntro(!0)}},"Continuar",i("ion-icon",{slot:"end",name:"arrow-forward"}))),i("div",{slot:"slide3"},i("div",{class:"slide-image-container"},i("img",{src:"assets/img/tour_3_payment.svg",class:"slide-image"})),i("h2",{class:"slide-title"},"Pago a mais para usar este serviço?"),i("p",null,"O aplicativo é ",i("b",null,"100% gratuito"),", apenas é cobrado o valor que é combinado pela plataforma entre o freteiro e você."),i("ion-button",{fill:"clear",href:"#",onClick:function(){return e.toggleIntro(!0)}},"Continuar",i("ion-icon",{slot:"end",name:"arrow-forward"}))),i("div",{slot:"slide4"},i("div",{class:"slide-image-container"},i("img",{src:"assets/img/tour_4_start.svg",class:"slide-image"})),i("h2",{class:"slide-title"},"Pronto para Começar?"),i("ion-button",{fill:"clear",href:"#",onClick:function(){return e.toggleIntro(!0)}},"Começar",i("ion-icon",{slot:"end",name:"arrow-forward"}))))},Object.defineProperty(e,"is",{get:function(){return"app-entrance"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{introduced:{state:!0},name:{state:!0},password:{state:!0},registered:{state:!0},store:{context:"store"},submitted:{state:!0},username:{state:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return"app-entrance{width:100%;height:100%}app-entrance .login-logo{padding:20px 0;min-height:200px;text-align:center}app-entrance .login-logo img{max-width:150px}app-entrance .signup-logo{padding:20px 0;min-height:200px;text-align:center}app-entrance .signup-logo img{max-width:150px}app-entrance .list{margin-bottom:0}"},enumerable:!0,configurable:!0}),e}(),s=function(){function e(){this.submitted=!1,this.username={valid:!1,value:""},this.password={valid:!1,value:""},this.data={}}return e.prototype.handleInput=function(e){this.data[e.target.name]=e.target.value},e.prototype.handleRadio=function(e){this.data[e.target.name]=[e.target.value]},e.prototype.handleFile=function(e){this.data.files=[e[0]]},e.prototype.handleAddress=function(e){this.data.address={street:e.target.value}},e.prototype.handleUsername=function(e){this.validateUsername(),this.username=Object.assign({},this.username,{value:e.target.value})},e.prototype.handlePassword=function(e){this.validatePassword(),this.password.value=e.target.value,this.password=Object.assign({},this.password,{value:e.target.value})},e.prototype.validateUsername=function(){this.username=this.username.value&&this.username.value.length>0?Object.assign({},this.username,{valid:!0}):Object.assign({},this.username,{valid:!1})},e.prototype.validatePassword=function(){if(this.password.value&&this.password.value.length>0)return this.password.valid=!0,void(this.password=Object.assign({},this.password,{valid:!0}));this.password=Object.assign({},this.password,{valid:!1})},e.prototype.unload=function(e){e.preventDefault(),this.exit()},e.prototype.submit=function(e){e.preventDefault();var t=Object.assign({},this.data,{username:this.username.value,password:this.password.value});this.action(t)},e.prototype.render=function(){var e=this;return[i("ion-header",null,i("ion-toolbar",null,i("ion-buttons",{slot:"start"},i("ion-back-button",{onClick:function(t){return e.unload(t)},defaultHref:"/"})),i("ion-title",null,"Registro"))),i("ion-content",{padding:!0},i("div",{class:"signup-logo"},i("img",{src:"assets/img/appicon.svg",alt:"Ionic Logo"})),i("generic-wizard",{id:"register",steps:4,action:function(t){return e.submit(t)}},i("div",{slot:"step-1"},i("ion-item",null,i("ion-label",{position:"stacked"},"Digite seu nome completo"),i("ion-input",{name:"name",onInput:function(t){return e.handleInput(t)}})),i("ion-item",null,i("ion-label",{position:"stacked"},"Digite seu endereço"),i("ion-input",{name:"address",onInput:function(t){return e.handleAddress(t)}})),i("ion-item",null,i("ion-label",{position:"stacked"},"Digite seu telefone para contato"),i("ion-input",{name:"phone",onInput:function(t){return e.handleInput(t)}})),i("ion-radio-group",{name:"role"},i("ion-list-header",null,i("ion-label",null,"Você é freteiro ou busca por frete?")),i("ion-item",null,i("ion-label",null,"Cliente"),i("ion-radio",{onClick:function(t){return e.handleRadio(t)},slot:"start",value:"CUSTOMER",checked:!0})),i("ion-item",null,i("ion-label",null,"Freteiro"),i("ion-radio",{onClick:function(t){return e.handleRadio(t)},slot:"start",value:"MERCHANT"})))),i("div",{slot:"step-2"},i("ion-item",null,i("ion-label",{position:"stacked"},"Insira imagens"),i("image-uploader",{send:function(t){return e.handleFile(t)},id:"file"}))),i("div",{slot:"step-3"},i("ion-item",null,i("ion-label",{position:"stacked"},"Digite seu e-mail para o login"),i("ion-input",{name:"email",onInput:function(t){return e.handleInput(t)}})),i("ion-item",null,i("ion-label",{position:"stacked"},"Digite um nome de usuário"),i("ion-input",{name:"username",type:"text",value:this.username.value,onInput:function(t){return e.handleUsername(t)},required:!0})),i("ion-text",{color:"danger"},i("p",{hidden:this.username.valid||!1===this.submitted,"padding-left":!0},"Nome do usuário é requerido")),i("ion-item",null,i("ion-label",{position:"stacked"},"Digite sua senha"),i("ion-input",{name:"password",type:"password",value:this.password.value,onInput:function(t){return e.handlePassword(t)},required:!0})),i("ion-text",{color:"danger"},i("p",{hidden:this.password.valid||!1===this.submitted,"padding-left":!0},"Senha é requerida")),i("ion-item",null,i("ion-label",{position:"stacked"},"Digite sua senha novamente"),i("ion-input",{type:"password",name:"scpassword"}))),i("div",{slot:"step-4"},i("ion-item",null,i("ion-label",{position:"stacked"},"Informações adicionais"),i("ion-textarea",{name:"info",rows:4,onInput:function(t){return e.handleInput(t)}})))))]},Object.defineProperty(e,"is",{get:function(){return"register-wizard"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{action:{type:"Any",attr:"action"},data:{state:!0},exit:{type:"Any",attr:"exit"},images:{type:"Any",attr:"images"},password:{state:!0},submitted:{state:!0},username:{state:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return""},enumerable:!0,configurable:!0}),e}();e.AppEntrance=r,e.RegisterWizard=s,Object.defineProperty(e,"__esModule",{value:!0})});