var e;!function(e){e.NULL="NULL",e.OPEN="OPEN",e.CLOSE="CLOSE",e.ERROR="ERROR",e.SET_TOKEN="SET_TOKEN",e.REVOKE_TOKEN="REVOKE_TOKEN",e.SKIP_INTRO="SKIP_INTRO",e.SKIP_TOUR="SKIP_TOUR",e.OPEN_REGISTER="OPEN_REGISTER",e.CLOSE_REGISTER="CLOSE_REGISTER",e.REGISTER_ORDER="REGISTER_ORDER",e.SELECT_ORDER="SELECT_ORDER",e.SHOW_ORDER="SHOW_ORDER",e.PLACE_ORDER="PLACE_ORDER",e.MY_ORDERS="MY_ORDERS",e.ORDER_BIDS="ORDER_BIDS",e.ORDER_MERCHANT="ORDER_MERCHANT",e.MERCHANT_ORDERS="MERCHANT_ORDERS",e.START_ORDER="START_ORDER",e.CANCEL_ORDER="CANCEL_ORDER",e.FINISH_ORDER="FINISH_ORDER",e.RATE_ORDER="RATE_ORDER",e.OPEN_PROFILE="OPEN_PROFILE",e.UPDATE_PROFILE="UPDATE_PROFILE"}(e||(e={}));var r=Object.prototype.hasOwnProperty,s=function(){for(var e=[],r=0;r<256;++r)e.push("%"+((r<16?"0":"")+r.toString(16)).toUpperCase());return e}(),t=function(e,r){for(var s=r&&r.plainObjects?Object.create(null):{},t=0;t<e.length;++t)void 0!==e[t]&&(s[t]=e[t]);return s},a={arrayToObject:t,assign:function(e,r){return Object.keys(r).reduce(function(e,s){return e[s]=r[s],e},e)},compact:function(e){for(var r=[{obj:{o:e},prop:"o"}],s=[],t=0;t<r.length;++t)for(var a=r[t],o=a.obj[a.prop],i=Object.keys(o),n=0;n<i.length;++n){var c=i[n],d=o[c];"object"==typeof d&&null!==d&&-1===s.indexOf(d)&&(r.push({obj:o,prop:c}),s.push(d))}return function(e){for(var r;e.length;){var s=e.pop();if(r=s.obj[s.prop],Array.isArray(r)){for(var t=[],a=0;a<r.length;++a)void 0!==r[a]&&t.push(r[a]);s.obj[s.prop]=t}}return r}(r)},decode:function(e){try{return decodeURIComponent(e.replace(/\+/g," "))}catch(r){return e}},encode:function(e){if(0===e.length)return e;for(var r="string"==typeof e?e:String(e),t="",a=0;a<r.length;++a){var o=r.charCodeAt(a);45===o||46===o||95===o||126===o||o>=48&&o<=57||o>=65&&o<=90||o>=97&&o<=122?t+=r.charAt(a):o<128?t+=s[o]:o<2048?t+=s[192|o>>6]+s[128|63&o]:o<55296||o>=57344?t+=s[224|o>>12]+s[128|o>>6&63]+s[128|63&o]:(o=65536+((1023&o)<<10|1023&r.charCodeAt(a+=1)),t+=s[240|o>>18]+s[128|o>>12&63]+s[128|o>>6&63]+s[128|63&o])}return t},isBuffer:function(e){return null!=e&&!!(e.constructor&&e.constructor.isBuffer&&e.constructor.isBuffer(e))},isRegExp:function(e){return"[object RegExp]"===Object.prototype.toString.call(e)},merge:function e(s,a,o){if(!a)return s;if("object"!=typeof a){if(Array.isArray(s))s.push(a);else{if("object"!=typeof s)return[s,a];(o.plainObjects||o.allowPrototypes||!r.call(Object.prototype,a))&&(s[a]=!0)}return s}if("object"!=typeof s)return[s].concat(a);var i=s;return Array.isArray(s)&&!Array.isArray(a)&&(i=t(s,o)),Array.isArray(s)&&Array.isArray(a)?(a.forEach(function(t,a){r.call(s,a)?s[a]&&"object"==typeof s[a]?s[a]=e(s[a],t,o):s.push(t):s[a]=t}),s):Object.keys(a).reduce(function(s,t){var i=a[t];return s[t]=r.call(s,t)?e(s[t],i,o):i,s},i)}},o=String.prototype.replace,i=/%20/g,n={default:"RFC3986",formatters:{RFC1738:function(e){return o.call(e,i,"+")},RFC3986:function(e){return e}},RFC1738:"RFC1738",RFC3986:"RFC3986"},c={brackets:function(e){return e+"[]"},indices:function(e,r){return e+"["+r+"]"},repeat:function(e){return e}},d=Date.prototype.toISOString,m={delimiter:"&",encode:!0,encoder:a.encode,encodeValuesOnly:!1,serializeDate:function(e){return d.call(e)},skipNulls:!1,strictNullHandling:!1},u=function e(r,s,t,o,i,n,c,d,u,l,y,$){var p=r;if("function"==typeof c)p=c(s,p);else if(p instanceof Date)p=l(p);else if(null===p){if(o)return n&&!$?n(s,m.encoder):s;p=""}if("string"==typeof p||"number"==typeof p||"boolean"==typeof p||a.isBuffer(p))return n?[y($?s:n(s,m.encoder))+"="+y(n(p,m.encoder))]:[y(s)+"="+y(String(p))];var g,k=[];if(void 0===p)return k;if(Array.isArray(c))g=c;else{var q=Object.keys(p);g=d?q.sort(d):q}for(var P=0;P<g.length;++P){var f=g[P];i&&null===p[f]||(k=Array.isArray(p)?k.concat(e(p[f],t(s,f),t,o,i,n,c,d,u,l,y,$)):k.concat(e(p[f],s+(u?"."+f:"["+f+"]"),t,o,i,n,c,d,u,l,y,$)))}return k},l=Object.prototype.hasOwnProperty,y={allowDots:!1,allowPrototypes:!1,arrayLimit:20,decoder:a.decode,delimiter:"&",depth:5,parameterLimit:1e3,plainObjects:!1,strictNullHandling:!1},$=function(e,r,s){if(e){var t=s.allowDots?e.replace(/\.([^.[]+)/g,"[$1]"):e,a=/(\[[^[\]]*])/g,o=/(\[[^[\]]*])/.exec(t),i=o?t.slice(0,o.index):t,n=[];if(i){if(!s.plainObjects&&l.call(Object.prototype,i)&&!s.allowPrototypes)return;n.push(i)}for(var c=0;null!==(o=a.exec(t))&&c<s.depth;){if(c+=1,!s.plainObjects&&l.call(Object.prototype,o[1].slice(1,-1))&&!s.allowPrototypes)return;n.push(o[1])}return o&&n.push("["+t.slice(o.index)+"]"),function(e,r,s){for(var t=r,a=e.length-1;a>=0;--a){var o,i=e[a];if("[]"===i)o=(o=[]).concat(t);else{o=s.plainObjects?Object.create(null):{};var n="["===i.charAt(0)&&"]"===i.charAt(i.length-1)?i.slice(1,-1):i,c=parseInt(n,10);!isNaN(c)&&i!==n&&String(c)===n&&c>=0&&s.parseArrays&&c<=s.arrayLimit?(o=[])[c]=t:o[n]=t}t=o}return t}(n,r,s)}},p={formats:n,parse:function(e,r){var s=r?a.assign({},r):{};if(null!=s.decoder&&"function"!=typeof s.decoder)throw new TypeError("Decoder has to be a function.");if(s.ignoreQueryPrefix=!0===s.ignoreQueryPrefix,s.delimiter="string"==typeof s.delimiter||a.isRegExp(s.delimiter)?s.delimiter:y.delimiter,s.depth="number"==typeof s.depth?s.depth:y.depth,s.arrayLimit="number"==typeof s.arrayLimit?s.arrayLimit:y.arrayLimit,s.parseArrays=!1!==s.parseArrays,s.decoder="function"==typeof s.decoder?s.decoder:y.decoder,s.allowDots="boolean"==typeof s.allowDots?s.allowDots:y.allowDots,s.plainObjects="boolean"==typeof s.plainObjects?s.plainObjects:y.plainObjects,s.allowPrototypes="boolean"==typeof s.allowPrototypes?s.allowPrototypes:y.allowPrototypes,s.parameterLimit="number"==typeof s.parameterLimit?s.parameterLimit:y.parameterLimit,s.strictNullHandling="boolean"==typeof s.strictNullHandling?s.strictNullHandling:y.strictNullHandling,""===e||null==e)return s.plainObjects?Object.create(null):{};for(var t="string"==typeof e?function(e,r){for(var s={},t=(r.ignoreQueryPrefix?e.replace(/^\?/,""):e).split(r.delimiter,r.parameterLimit===1/0?void 0:r.parameterLimit),a=0;a<t.length;++a){var o,i,n=t[a],c=n.indexOf("]="),d=-1===c?n.indexOf("="):c+1;-1===d?(o=r.decoder(n,y.decoder),i=r.strictNullHandling?null:""):(o=r.decoder(n.slice(0,d),y.decoder),i=r.decoder(n.slice(d+1),y.decoder)),s[o]=l.call(s,o)?[].concat(s[o]).concat(i):i}return s}(e,s):e,o=s.plainObjects?Object.create(null):{},i=Object.keys(t),n=0;n<i.length;++n){var c=i[n],d=$(c,t[c],s);o=a.merge(o,d,s)}return a.compact(o)},stringify:function(e,r){var s=e,t=r?a.assign({},r):{};if(null!=t.encoder&&"function"!=typeof t.encoder)throw new TypeError("Encoder has to be a function.");var o=void 0===t.delimiter?m.delimiter:t.delimiter,i="boolean"==typeof t.strictNullHandling?t.strictNullHandling:m.strictNullHandling,d="boolean"==typeof t.skipNulls?t.skipNulls:m.skipNulls,l="boolean"==typeof t.encode?t.encode:m.encode,y="function"==typeof t.encoder?t.encoder:m.encoder,$="function"==typeof t.sort?t.sort:null,p=void 0!==t.allowDots&&t.allowDots,g="function"==typeof t.serializeDate?t.serializeDate:m.serializeDate,k="boolean"==typeof t.encodeValuesOnly?t.encodeValuesOnly:m.encodeValuesOnly;if(void 0===t.format)t.format=n.default;else if(!Object.prototype.hasOwnProperty.call(n.formatters,t.format))throw new TypeError("Unknown format option provided.");var q,P,f=n.formatters[t.format];"function"==typeof t.filter?s=(P=t.filter)("",s):Array.isArray(t.filter)&&(q=P=t.filter);var h=[];if("object"!=typeof s||null===s)return"";var v=c[t.arrayFormat in c?t.arrayFormat:"indices"in t?t.indices?"indices":"repeat":"indices"];q||(q=Object.keys(s)),$&&q.sort($);for(var E=0;E<q.length;++E){var x=q[E];d&&null===s[x]||(h=h.concat(u(s[x],x,v,i,d,l?y:null,P,$,p,g,f,k)))}var A=h.join(o);return A.length>0?(!0===t.addQueryPrefix?"?":"")+A:""}};class g{static getDomain(){return g.backendDomain}static setDomain(e){g.backendDomain=e}static request(e,r,s,t,a,o){e=e.toUpperCase();let i=r;return Object.keys(t).length>0&&(i=r+"?"+p.stringify(t)),o.method=e,o.headers={Accept:"application/json","Content-Type":"application/json","x-access-token":o.headers["x-access-token"]},"GET"!==e&&(s?o.body=JSON.stringify(s):a&&(o.body=p.stringify(a))),fetch(i,o)}static multipartRequest(e,r,s,t){const a=new FormData,o=s.files;for(let e=0;e<o.length;e++)a.append("files[]",o[e]);return fetch(r,{method:e,headers:{"x-access-token":t.headers["x-access-token"]},body:a})}static getUsersAsAdmin(e={}){const r=e.$domain?e.$domain:g.getDomain(),s=e.$config||{headers:{}},t={};return void 0!==e.xAccessToken&&(s.headers["x-access-token"]=e.xAccessToken),void 0===e.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(void 0!==e.role&&(t.role=e.role),void 0===e.role?Promise.reject(new Error("Missing required  parameter: role")):(void 0!==e.keyword&&(t.keyword=e.keyword),void 0===e.keyword?Promise.reject(new Error("Missing required  parameter: keyword")):(void 0!==e.page&&(t.page=e.page),void 0===e.page?Promise.reject(new Error("Missing required  parameter: page")):(void 0!==e.pageSize&&(t.pageSize=e.pageSize),e.$queryParameters&&Object.keys(e.$queryParameters).forEach(r=>{t[r]=e.$queryParameters[r]}),g.request("get",r+"/admin/users",{},t,{},s)))))}static deactivateUserAsAdmin(e={}){const r=e.$domain?e.$domain:g.getDomain(),s=e.$config||{headers:{}};let t="/admin/users/{id}";const a={};return void 0!==e.xAccessToken&&(s.headers["x-access-token"]=e.xAccessToken),void 0===e.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(t=t.replace("{id}",`${e.id}`),void 0===e.id?Promise.reject(new Error("Missing required  parameter: id")):(e.$queryParameters&&Object.keys(e.$queryParameters).forEach(r=>{a[r]=e.$queryParameters[r]}),g.request("post",r+t,{},a,{},s)))}static activateUserAsAdmin(e={}){const r=e.$domain?e.$domain:g.getDomain(),s=e.$config||{headers:{}};let t="/admin/users/{id}/activate";const a={};return void 0!==e.xAccessToken&&(s.headers["x-access-token"]=e.xAccessToken),void 0===e.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(t=t.replace("{id}",`${e.id}`),void 0===e.id?Promise.reject(new Error("Missing required  parameter: id")):(e.$queryParameters&&Object.keys(e.$queryParameters).forEach(r=>{a[r]=e.$queryParameters[r]}),g.request("post",r+t,{},a,{},s)))}static changeUserRole(e={}){const r=e.$domain?e.$domain:g.getDomain(),s=e.$config||{headers:{}};let t="/admin/users/{id}/role/{role}";const a={};return void 0!==e.xAccessToken&&(s.headers["x-access-token"]=e.xAccessToken),void 0===e.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(t=t.replace("{id}",`${e.id}`),void 0===e.id?Promise.reject(new Error("Missing required  parameter: id")):(t=t.replace("{role}",`${e.role}`),void 0===e.role?Promise.reject(new Error("Missing required  parameter: role")):(e.$queryParameters&&Object.keys(e.$queryParameters).forEach(r=>{a[r]=e.$queryParameters[r]}),g.request("post",r+t,{},a,{},s))))}static getChats(e={}){const r=e.$domain?e.$domain:g.getDomain(),s=e.$config||{headers:{}},t={};return void 0!==e.xAccessToken&&(s.headers["x-access-token"]=e.xAccessToken),void 0===e.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(e.$queryParameters&&Object.keys(e.$queryParameters).forEach(r=>{t[r]=e.$queryParameters[r]}),g.request("get",r+"/chat/chats",{},t,{},s))}static getChat(e={}){const r=e.$domain?e.$domain:g.getDomain(),s=e.$config||{headers:{}};let t="/chat/{chat}";const a={};return void 0!==e.xAccessToken&&(s.headers["x-access-token"]=e.xAccessToken),void 0===e.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(t=t.replace("{chat}",`${e.chat}`),void 0===e.chat?Promise.reject(new Error("Missing required  parameter: chat")):(e.$queryParameters&&Object.keys(e.$queryParameters).forEach(r=>{a[r]=e.$queryParameters[r]}),g.request("get",r+t,{},a,{},s)))}static addLead(e={}){const r=e.$domain?e.$domain:g.getDomain(),s=e.$config||{headers:{}};let t={};const a={};return void 0!==e.lead&&(t=e.lead),e.$queryParameters&&Object.keys(e.$queryParameters).forEach(r=>{a[r]=e.$queryParameters[r]}),g.request("post",r+"/lead",t,a,{},s)}static getLeads(e={}){const r=e.$domain?e.$domain:g.getDomain(),s=e.$config||{headers:{}},t={};return void 0!==e.xAccessToken&&(s.headers["x-access-token"]=e.xAccessToken),void 0===e.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(e.$queryParameters&&Object.keys(e.$queryParameters).forEach(r=>{t[r]=e.$queryParameters[r]}),g.request("get",r+"/lead",{},t,{},s))}static getLead(e={}){const r=e.$domain?e.$domain:g.getDomain(),s=e.$config||{headers:{}};let t="/lead/{id}";const a={};return void 0!==e.xAccessToken&&(s.headers["x-access-token"]=e.xAccessToken),void 0===e.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(t=t.replace("{id}",`${e.id}`),void 0===e.id?Promise.reject(new Error("Missing required  parameter: id")):(e.$queryParameters&&Object.keys(e.$queryParameters).forEach(r=>{a[r]=e.$queryParameters[r]}),g.request("get",r+t,{},a,{},s)))}static placeBid(e={}){const r=e.$domain?e.$domain:g.getDomain(),s=e.$config||{headers:{}};let t="/bid/{order}/place",a={};const o={};return void 0!==e.xAccessToken&&(s.headers["x-access-token"]=e.xAccessToken),void 0===e.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(void 0!==e.bid&&(a=e.bid),t=t.replace("{order}",`${e.order}`),void 0===e.order?Promise.reject(new Error("Missing required  parameter: order")):(e.$queryParameters&&Object.keys(e.$queryParameters).forEach(r=>{o[r]=e.$queryParameters[r]}),g.request("post",r+t,a,o,{},s)))}static placeFinalBid(e={}){const r=e.$domain?e.$domain:g.getDomain(),s=e.$config||{headers:{}};let t="/bid/{order}/final",a={};const o={};return void 0!==e.xAccessToken&&(s.headers["x-access-token"]=e.xAccessToken),void 0===e.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(void 0!==e.bid&&(a=e.bid),t=t.replace("{order}",`${e.order}`),void 0===e.order?Promise.reject(new Error("Missing required  parameter: order")):(e.$queryParameters&&Object.keys(e.$queryParameters).forEach(r=>{o[r]=e.$queryParameters[r]}),g.request("post",r+t,a,o,{},s)))}static getOrderBids(e={}){const r=e.$domain?e.$domain:g.getDomain(),s=e.$config||{headers:{}};let t="/bid/by-order/{order}";const a={};return void 0!==e.xAccessToken&&(s.headers["x-access-token"]=e.xAccessToken),void 0===e.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(t=t.replace("{order}",`${e.order}`),void 0===e.order?Promise.reject(new Error("Missing required  parameter: order")):(e.$queryParameters&&Object.keys(e.$queryParameters).forEach(r=>{a[r]=e.$queryParameters[r]}),g.request("get",r+t,{},a,{},s)))}static removeFavoriteMerchant(e={}){const r=e.$domain?e.$domain:g.getDomain(),s=e.$config||{headers:{}};let t="/customer/favorites/merchant/{merchant}";const a={};return void 0!==e.xAccessToken&&(s.headers["x-access-token"]=e.xAccessToken),void 0===e.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(t=t.replace("{merchant}",`${e.merchant}`),void 0===e.merchant?Promise.reject(new Error("Missing required  parameter: merchant")):(e.$queryParameters&&Object.keys(e.$queryParameters).forEach(r=>{a[r]=e.$queryParameters[r]}),g.request("post",r+t,{},a,{},s)))}static getFavoritesList(e={}){const r=e.$domain?e.$domain:g.getDomain(),s=e.$config||{headers:{}},t={};return void 0!==e.xAccessToken&&(s.headers["x-access-token"]=e.xAccessToken),void 0===e.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(e.$queryParameters&&Object.keys(e.$queryParameters).forEach(r=>{t[r]=e.$queryParameters[r]}),g.request("get",r+"/customer/favorites/merchants",{},t,{},s))}static getMerchantById(e={}){const r=e.$domain?e.$domain:g.getDomain(),s=e.$config||{headers:{}};let t="/merchant/{id}/details";const a={};return t=t.replace("{id}",`${e.id}`),void 0===e.id?Promise.reject(new Error("Missing required  parameter: id")):(e.$queryParameters&&Object.keys(e.$queryParameters).forEach(r=>{a[r]=e.$queryParameters[r]}),g.request("get",r+t,{},a,{},s))}static getMerchantByUsername(e={}){const r=e.$domain?e.$domain:g.getDomain(),s=e.$config||{headers:{}};let t="/merchant/by-username/{username}";const a={};return t=t.replace("{username}",`${e.username}`),void 0===e.username?Promise.reject(new Error("Missing required  parameter: username")):(e.$queryParameters&&Object.keys(e.$queryParameters).forEach(r=>{a[r]=e.$queryParameters[r]}),g.request("get",r+t,{},a,{},s))}static createMerchant(e={}){const r=e.$domain?e.$domain:g.getDomain(),s=e.$config||{headers:{}};let t={};const a={};return void 0!==e.xAccessToken&&(s.headers["x-access-token"]=e.xAccessToken),void 0===e.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(void 0!==e.user&&(t=e.user),e.$queryParameters&&Object.keys(e.$queryParameters).forEach(r=>{a[r]=e.$queryParameters[r]}),g.request("post",r+"/merchant/account/payment",t,a,{},s))}static getNearbyMerchants(e={}){const r=e.$domain?e.$domain:g.getDomain(),s=e.$config||{headers:{}},t={};return void 0!==e.latitude&&(t.latitude=e.latitude),void 0===e.latitude?Promise.reject(new Error("Missing required  parameter: latitude")):(void 0!==e.longitude&&(t.longitude=e.longitude),void 0===e.longitude?Promise.reject(new Error("Missing required  parameter: longitude")):(void 0!==e.radius&&(t.radius=e.radius),void 0!==e.keyword&&(t.keyword=e.keyword),e.$queryParameters&&Object.keys(e.$queryParameters).forEach(r=>{t[r]=e.$queryParameters[r]}),g.request("get",r+"/merchant/nearby",{},t,{},s)))}static getNearbyMerchantsByService(e={}){const r=e.$domain?e.$domain:g.getDomain(),s=e.$config||{headers:{}};let t="/merchant/nearby/{service}";const a={};return t=t.replace("{service}",`${e.service}`),void 0===e.service?Promise.reject(new Error("Missing required  parameter: service")):(void 0!==e.latitude&&(a.latitude=e.latitude),void 0===e.latitude?Promise.reject(new Error("Missing required  parameter: latitude")):(void 0!==e.longitude&&(a.longitude=e.longitude),void 0===e.longitude?Promise.reject(new Error("Missing required  parameter: longitude")):(void 0!==e.keyword&&(a.keyword=e.keyword),void 0!==e.radius&&(a.radius=e.radius),e.$queryParameters&&Object.keys(e.$queryParameters).forEach(r=>{a[r]=e.$queryParameters[r]}),g.request("get",r+t,{},a,{},s))))}static createOrder(e={}){const r=e.$domain?e.$domain:g.getDomain(),s=e.$config||{headers:{}};let t={};const a={};return void 0!==e.xAccessToken&&(s.headers["x-access-token"]=e.xAccessToken),void 0===e.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(void 0!==e.order&&(t=e.order),e.$queryParameters&&Object.keys(e.$queryParameters).forEach(r=>{a[r]=e.$queryParameters[r]}),g.request("post",r+"/order",t,a,{},s))}static getOrders(e={}){const r=e.$domain?e.$domain:g.getDomain(),s=e.$config||{headers:{}},t={};return void 0!==e.xAccessToken&&(s.headers["x-access-token"]=e.xAccessToken),void 0===e.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(void 0!==e.status&&(t.status=e.status),e.$queryParameters&&Object.keys(e.$queryParameters).forEach(r=>{t[r]=e.$queryParameters[r]}),g.request("get",r+"/order",{},t,{},s))}static getReadyOrders(e={}){const r=e.$domain?e.$domain:g.getDomain(),s=e.$config||{headers:{}},t={};return void 0!==e.xAccessToken&&(s.headers["x-access-token"]=e.xAccessToken),void 0===e.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(e.$queryParameters&&Object.keys(e.$queryParameters).forEach(r=>{t[r]=e.$queryParameters[r]}),g.request("get",r+"/order/ready",{},t,{},s))}static getOrdersByPeriod(e={}){const r=e.$domain?e.$domain:g.getDomain(),s=e.$config||{headers:{}},t={};return void 0!==e.xAccessToken&&(s.headers["x-access-token"]=e.xAccessToken),void 0===e.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(void 0!==e.status&&(t.status=e.status),void 0!==e.startDate&&(t.startDate=e.startDate),void 0!==e.endDate&&(t.endDate=e.endDate),e.$queryParameters&&Object.keys(e.$queryParameters).forEach(r=>{t[r]=e.$queryParameters[r]}),g.request("get",r+"/order/between-dates",{},t,{},s))}static getOrder(e={}){const r=e.$domain?e.$domain:g.getDomain(),s=e.$config||{headers:{}};let t="/order/{id}";const a={};return void 0!==e.xAccessToken&&(s.headers["x-access-token"]=e.xAccessToken),void 0===e.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(t=t.replace("{id}",`${e.id}`),void 0===e.id?Promise.reject(new Error("Missing required  parameter: id")):(e.$queryParameters&&Object.keys(e.$queryParameters).forEach(r=>{a[r]=e.$queryParameters[r]}),g.request("get",r+t,{},a,{},s)))}static acceptOrder(e={}){const r=e.$domain?e.$domain:g.getDomain(),s=e.$config||{headers:{}};let t="/order/{id}/accept";const a={};return void 0!==e.xAccessToken&&(s.headers["x-access-token"]=e.xAccessToken),void 0===e.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(t=t.replace("{id}",`${e.id}`),void 0===e.id?Promise.reject(new Error("Missing required  parameter: id")):(e.$queryParameters&&Object.keys(e.$queryParameters).forEach(r=>{a[r]=e.$queryParameters[r]}),g.request("post",r+t,{},a,{},s)))}static cancelOrder(e={}){const r=e.$domain?e.$domain:g.getDomain(),s=e.$config||{headers:{}};let t="/order/{id}/cancel";const a={};return void 0!==e.xAccessToken&&(s.headers["x-access-token"]=e.xAccessToken),void 0===e.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(t=t.replace("{id}",`${e.id}`),void 0===e.id?Promise.reject(new Error("Missing required  parameter: id")):(e.$queryParameters&&Object.keys(e.$queryParameters).forEach(r=>{a[r]=e.$queryParameters[r]}),g.request("get",r+t,{},a,{},s)))}static finishOrder(e={}){const r=e.$domain?e.$domain:g.getDomain(),s=e.$config||{headers:{}};let t="/order/{id}/finish";const a={};return void 0!==e.xAccessToken&&(s.headers["x-access-token"]=e.xAccessToken),void 0===e.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(t=t.replace("{id}",`${e.id}`),void 0===e.id?Promise.reject(new Error("Missing required  parameter: id")):(e.$queryParameters&&Object.keys(e.$queryParameters).forEach(r=>{a[r]=e.$queryParameters[r]}),g.request("post",r+t,{},a,{},s)))}static rateOrder(e={}){const r=e.$domain?e.$domain:g.getDomain(),s=e.$config||{headers:{}};let t="/order/{id}/rate/{rate}";const a={};return void 0!==e.xAccessToken&&(s.headers["x-access-token"]=e.xAccessToken),void 0===e.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(t=t.replace("{id}",`${e.id}`),void 0===e.id?Promise.reject(new Error("Missing required  parameter: id")):(t=t.replace("{rate}",`${e.rate}`),void 0===e.rate?Promise.reject(new Error("Missing required  parameter: rate")):(e.$queryParameters&&Object.keys(e.$queryParameters).forEach(r=>{a[r]=e.$queryParameters[r]}),g.request("post",r+t,{},a,{},s))))}static getReceivingModes(e={}){const r=e.$domain?e.$domain:g.getDomain(),s=e.$config||{headers:{}},t={};return e.$queryParameters&&Object.keys(e.$queryParameters).forEach(r=>{t[r]=e.$queryParameters[r]}),g.request("get",r+"/order/receiving-modes",{},t,{},s)}static getPaymentModes(e={}){const r=e.$domain?e.$domain:g.getDomain(),s=e.$config||{headers:{}},t={};return e.$queryParameters&&Object.keys(e.$queryParameters).forEach(r=>{t[r]=e.$queryParameters[r]}),g.request("get",r+"/order/payment-modes/list",{},t,{},s)}static getOrdersNearby(e={}){const r=e.$domain?e.$domain:g.getDomain(),s=e.$config||{headers:{}},t={};return void 0!==e.latitude&&(t.latitude=e.latitude),void 0===e.latitude?Promise.reject(new Error("Missing required  parameter: latitude")):(void 0!==e.longitude&&(t.longitude=e.longitude),void 0===e.longitude?Promise.reject(new Error("Missing required  parameter: longitude")):(void 0!==e.radius&&(t.radius=e.radius),void 0!==e.keyword&&(t.keyword=e.keyword),void 0!==e.page&&(t.page=e.page),void 0===e.page?Promise.reject(new Error("Missing required  parameter: page")):(void 0!==e.pageSize&&(t.pageSize=e.pageSize),e.$queryParameters&&Object.keys(e.$queryParameters).forEach(r=>{t[r]=e.$queryParameters[r]}),g.request("get",r+"/order/by-location/nearby",{},t,{},s))))}static setOrderMerchant(e={}){const r=e.$domain?e.$domain:g.getDomain(),s=e.$config||{headers:{}};let t="/order/{id}/merchant/{merchant}";const a={};return void 0!==e.xAccessToken&&(s.headers["x-access-token"]=e.xAccessToken),void 0===e.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(t=t.replace("{id}",`${e.id}`),void 0===e.id?Promise.reject(new Error("Missing required  parameter: id")):(t=t.replace("{merchant}",`${e.merchant}`),void 0===e.merchant?Promise.reject(new Error("Missing required  parameter: merchant")):(e.$queryParameters&&Object.keys(e.$queryParameters).forEach(r=>{a[r]=e.$queryParameters[r]}),g.request("post",r+t,{},a,{},s))))}static startOrder(e={}){const r=e.$domain?e.$domain:g.getDomain(),s=e.$config||{headers:{}};let t="/order/{id}/start";const a={};return void 0!==e.xAccessToken&&(s.headers["x-access-token"]=e.xAccessToken),void 0===e.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(t=t.replace("{id}",`${e.id}`),void 0===e.id?Promise.reject(new Error("Missing required  parameter: id")):(e.$queryParameters&&Object.keys(e.$queryParameters).forEach(r=>{a[r]=e.$queryParameters[r]}),g.request("post",r+t,{},a,{},s)))}static sendNotification(e={}){const r=e.$domain?e.$domain:g.getDomain(),s=e.$config||{headers:{}},t={};return void 0!==e.xAccessToken&&(s.headers["x-access-token"]=e.xAccessToken),void 0===e.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(e.$queryParameters&&Object.keys(e.$queryParameters).forEach(r=>{t[r]=e.$queryParameters[r]}),g.request("post",r+"/notification/send",{},t,{},s))}static getNotifications(e={}){const r=e.$domain?e.$domain:g.getDomain(),s=e.$config||{headers:{}},t={};return void 0!==e.xAccessToken&&(s.headers["x-access-token"]=e.xAccessToken),void 0===e.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(e.$queryParameters&&Object.keys(e.$queryParameters).forEach(r=>{t[r]=e.$queryParameters[r]}),g.request("get",r+"/notification",{},t,{},s))}static getNotification(e={}){const r=e.$domain?e.$domain:g.getDomain(),s=e.$config||{headers:{}};let t="/notification/{id}";const a={};return void 0!==e.xAccessToken&&(s.headers["x-access-token"]=e.xAccessToken),void 0===e.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(t=t.replace("{id}",`${e.id}`),void 0===e.id?Promise.reject(new Error("Missing required  parameter: id")):(e.$queryParameters&&Object.keys(e.$queryParameters).forEach(r=>{a[r]=e.$queryParameters[r]}),g.request("get",r+t,{},a,{},s)))}static accessWithFacebook(e={}){const r=e.$domain?e.$domain:g.getDomain(),s=e.$config||{headers:{}},t={};return void 0!==e.accessToken&&(t.access_token=e.accessToken),void 0===e.accessToken?Promise.reject(new Error("Missing required  parameter: accessToken")):(e.$queryParameters&&Object.keys(e.$queryParameters).forEach(r=>{t[r]=e.$queryParameters[r]}),g.request("post",r+"/oauth/access/facebook",{},t,{},s))}static addPicture(e={}){const r=e.$domain?e.$domain:g.getDomain(),s=e.$config||{headers:{}},t={},a={};return void 0!==e.xAccessToken&&(s.headers["x-access-token"]=e.xAccessToken),void 0===e.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(void 0!==e.files&&(a.files=e.files),e.$queryParameters&&Object.keys(e.$queryParameters).forEach(r=>{t[r]=e.$queryParameters[r]}),g.multipartRequest("POST",r+"/picture/save",a,s))}static getPicture(e={}){const r=e.$domain?e.$domain:g.getDomain(),s=e.$config||{headers:{}};let t="/picture/{id}";const a={};return void 0!==e.xAccessToken&&(s.headers["x-access-token"]=e.xAccessToken),void 0===e.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(t=t.replace("{id}",`${e.id}`),void 0===e.id?Promise.reject(new Error("Missing required  parameter: id")):(e.$queryParameters&&Object.keys(e.$queryParameters).forEach(r=>{a[r]=e.$queryParameters[r]}),g.request("get",r+t,{},a,{},s)))}static getPictures(e={}){const r=e.$domain?e.$domain:g.getDomain(),s=e.$config||{headers:{}};let t={};return void 0!==e.xAccessToken&&(s.headers["x-access-token"]=e.xAccessToken),void 0===e.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):void 0===e.ids?Promise.reject(new Error("Missing required  parameter: id")):(t={ids:String(e.ids)},g.request("get",r+"/picture/multiple",{},t,{},s))}static getLatest(e={}){const r=e.$domain?e.$domain:g.getDomain(),s=e.$config||{headers:{}};let t="/picture/{itemId}";const a={};return void 0!==e.xAccessToken&&(s.headers["x-access-token"]=e.xAccessToken),void 0===e.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(t=t.replace("{itemId}",`${e.itemId}`),void 0===e.itemId?Promise.reject(new Error("Missing required  parameter: itemId")):(e.$queryParameters&&Object.keys(e.$queryParameters).forEach(r=>{a[r]=e.$queryParameters[r]}),g.request("get",r+t,{},a,{},s)))}static removePicture(e={}){const r=e.$domain?e.$domain:g.getDomain(),s=e.$config||{headers:{}};let t="/picture/remove/{id}";const a={};return void 0!==e.xAccessToken&&(s.headers["x-access-token"]=e.xAccessToken),void 0===e.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(t=t.replace("{id}",`${e.id}`),void 0===e.id?Promise.reject(new Error("Missing required  parameter: id")):(e.$queryParameters&&Object.keys(e.$queryParameters).forEach(r=>{a[r]=e.$queryParameters[r]}),g.request("post",r+t,{},a,{},s)))}static createUser(e={}){const r=e.$domain?e.$domain:g.getDomain(),s=e.$config||{headers:{}};let t={};const a={};return void 0!==e.user&&(t=e.user),e.$queryParameters&&Object.keys(e.$queryParameters).forEach(r=>{a[r]=e.$queryParameters[r]}),g.request("post",r+"/user/create",t,a,{},s)}static isUniqueUsername(e={}){const r=e.$domain?e.$domain:g.getDomain(),s=e.$config||{headers:{}};let t="/user/username/exists/{username}";const a={};return t=t.replace("{username}",`${e.username}`),void 0===e.username?Promise.reject(new Error("Missing required  parameter: username")):(e.$queryParameters&&Object.keys(e.$queryParameters).forEach(r=>{a[r]=e.$queryParameters[r]}),g.request("get",r+t,{},a,{},s))}static getUserProfile(e={}){const r=e.$domain?e.$domain:g.getDomain(),s=e.$config||{headers:{}},t={};return void 0!==e.xAccessToken&&(s.headers["x-access-token"]=e.xAccessToken),void 0===e.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(e.$queryParameters&&Object.keys(e.$queryParameters).forEach(r=>{t[r]=e.$queryParameters[r]}),g.request("get",r+"/user/profile",{},t,{},s))}static authenticateUser(e={}){const r=e.$domain?e.$domain:g.getDomain(),s=e.$config||{headers:{}};let t={};const a={};return void 0!==e.user&&(t=e.user),e.$queryParameters&&Object.keys(e.$queryParameters).forEach(r=>{a[r]=e.$queryParameters[r]}),g.request("post",r+"/user/authenticate",t,a,{},s)}static updateUser(e={}){const r=e.$domain?e.$domain:g.getDomain(),s=e.$config||{headers:{}};let t={};const a={};return void 0!==e.xAccessToken&&(s.headers["x-access-token"]=e.xAccessToken),void 0===e.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(void 0!==e.user&&(t=e.user),e.$queryParameters&&Object.keys(e.$queryParameters).forEach(r=>{a[r]=e.$queryParameters[r]}),g.request("post",r+"/user/update",t,a,{},s))}static recoverPassword(e={}){const r=e.$domain?e.$domain:g.getDomain(),s=e.$config||{headers:{}};let t="/user/password/recover/{email}";const a={};return t=t.replace("{email}",`${e.email}`),void 0===e.email?Promise.reject(new Error("Missing required  parameter: email")):(e.$queryParameters&&Object.keys(e.$queryParameters).forEach(r=>{a[r]=e.$queryParameters[r]}),g.request("post",r+t,{},a,{},s))}static updatePassword(e={}){const r=e.$domain?e.$domain:g.getDomain(),s=e.$config||{headers:{}};let t={};const a={};return void 0!==e.xAccessToken&&(s.headers["x-access-token"]=e.xAccessToken),void 0===e.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(void 0!==e.user&&(t=e.user),e.$queryParameters&&Object.keys(e.$queryParameters).forEach(r=>{a[r]=e.$queryParameters[r]}),g.request("post",r+"/user/password/update",t,a,{},s))}static addSkip(e={}){const r=e.$domain?e.$domain:g.getDomain(),s=e.$config||{headers:{}};let t="/user/skips/{skip}";const a={};return void 0!==e.xAccessToken&&(s.headers["x-access-token"]=e.xAccessToken),void 0===e.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(t=t.replace("{skip}",`${e.skip}`),void 0===e.skip?Promise.reject(new Error("Missing required  parameter: skip")):(e.$queryParameters&&Object.keys(e.$queryParameters).forEach(r=>{a[r]=e.$queryParameters[r]}),g.request("post",r+t,{},a,{},s)))}}g.backendDomain="";export{g as a,e as b};