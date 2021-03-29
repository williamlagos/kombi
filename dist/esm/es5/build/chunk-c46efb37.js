var TypeKeys,has=Object.prototype.hasOwnProperty,hexTable=function(){for(var e=[],r=0;r<256;++r)e.push("%"+((r<16?"0":"")+r.toString(16)).toUpperCase());return e}(),compactQueue=function(e){for(var r;e.length;){var a=e.pop();if(r=a.obj[a.prop],Array.isArray(r)){for(var o=[],s=0;s<r.length;++s)void 0!==r[s]&&o.push(r[s]);a.obj[a.prop]=o}}return r},arrayToObject=function(e,r){for(var a=r&&r.plainObjects?Object.create(null):{},o=0;o<e.length;++o)void 0!==e[o]&&(a[o]=e[o]);return a},merge=function e(r,a,o){if(!a)return r;if("object"!=typeof a){if(Array.isArray(r))r.push(a);else{if("object"!=typeof r)return[r,a];(o.plainObjects||o.allowPrototypes||!has.call(Object.prototype,a))&&(r[a]=!0)}return r}if("object"!=typeof r)return[r].concat(a);var s=r;return Array.isArray(r)&&!Array.isArray(a)&&(s=arrayToObject(r,o)),Array.isArray(r)&&Array.isArray(a)?(a.forEach(function(a,s){has.call(r,s)?r[s]&&"object"==typeof r[s]?r[s]=e(r[s],a,o):r.push(a):r[s]=a}),r):Object.keys(a).reduce(function(r,s){var t=a[s];return r[s]=has.call(r,s)?e(r[s],t,o):t,r},s)},assign=function(e,r){return Object.keys(r).reduce(function(e,a){return e[a]=r[a],e},e)},decode=function(e){try{return decodeURIComponent(e.replace(/\+/g," "))}catch(r){return e}},encode=function(e){if(0===e.length)return e;for(var r="string"==typeof e?e:String(e),a="",o=0;o<r.length;++o){var s=r.charCodeAt(o);45===s||46===s||95===s||126===s||s>=48&&s<=57||s>=65&&s<=90||s>=97&&s<=122?a+=r.charAt(o):s<128?a+=hexTable[s]:s<2048?a+=hexTable[192|s>>6]+hexTable[128|63&s]:s<55296||s>=57344?a+=hexTable[224|s>>12]+hexTable[128|s>>6&63]+hexTable[128|63&s]:(s=65536+((1023&s)<<10|1023&r.charCodeAt(o+=1)),a+=hexTable[240|s>>18]+hexTable[128|s>>12&63]+hexTable[128|s>>6&63]+hexTable[128|63&s])}return a},compact=function(e){for(var r=[{obj:{o:e},prop:"o"}],a=[],o=0;o<r.length;++o)for(var s=r[o],t=s.obj[s.prop],i=Object.keys(t),n=0;n<i.length;++n){var c=i[n],d=t[c];"object"==typeof d&&null!==d&&-1===a.indexOf(d)&&(r.push({obj:t,prop:c}),a.push(d))}return compactQueue(r)},isRegExp=function(e){return"[object RegExp]"===Object.prototype.toString.call(e)},isBuffer=function(e){return null!=e&&!!(e.constructor&&e.constructor.isBuffer&&e.constructor.isBuffer(e))},utils={arrayToObject:arrayToObject,assign:assign,compact:compact,decode:decode,encode:encode,isBuffer:isBuffer,isRegExp:isRegExp,merge:merge},replace=String.prototype.replace,percentTwenties=/%20/g,formats={default:"RFC3986",formatters:{RFC1738:function(e){return replace.call(e,percentTwenties,"+")},RFC3986:function(e){return e}},RFC1738:"RFC1738",RFC3986:"RFC3986"},arrayPrefixGenerators={brackets:function(e){return e+"[]"},indices:function(e,r){return e+"["+r+"]"},repeat:function(e){return e}},toISO=Date.prototype.toISOString,defaults={delimiter:"&",encode:!0,encoder:utils.encode,encodeValuesOnly:!1,serializeDate:function(e){return toISO.call(e)},skipNulls:!1,strictNullHandling:!1},stringify=function e(r,a,o,s,t,i,n,c,d,u,m,f){var l=r;if("function"==typeof n)l=n(a,l);else if(l instanceof Date)l=u(l);else if(null===l){if(s)return i&&!f?i(a,defaults.encoder):a;l=""}if("string"==typeof l||"number"==typeof l||"boolean"==typeof l||utils.isBuffer(l))return i?[m(f?a:i(a,defaults.encoder))+"="+m(i(l,defaults.encoder))]:[m(a)+"="+m(String(l))];var y,p=[];if(void 0===l)return p;if(Array.isArray(n))y=n;else{var g=Object.keys(l);y=c?g.sort(c):g}for(var v=0;v<y.length;++v){var $=y[v];t&&null===l[$]||(p=Array.isArray(l)?p.concat(e(l[$],o(a,$),o,s,t,i,n,c,d,u,m,f)):p.concat(e(l[$],a+(d?"."+$:"["+$+"]"),o,s,t,i,n,c,d,u,m,f)))}return p},stringify_1=function(e,r){var a=e,o=r?utils.assign({},r):{};if(null!=o.encoder&&"function"!=typeof o.encoder)throw new TypeError("Encoder has to be a function.");var s=void 0===o.delimiter?defaults.delimiter:o.delimiter,t="boolean"==typeof o.strictNullHandling?o.strictNullHandling:defaults.strictNullHandling,i="boolean"==typeof o.skipNulls?o.skipNulls:defaults.skipNulls,n="boolean"==typeof o.encode?o.encode:defaults.encode,c="function"==typeof o.encoder?o.encoder:defaults.encoder,d="function"==typeof o.sort?o.sort:null,u=void 0!==o.allowDots&&o.allowDots,m="function"==typeof o.serializeDate?o.serializeDate:defaults.serializeDate,f="boolean"==typeof o.encodeValuesOnly?o.encodeValuesOnly:defaults.encodeValuesOnly;if(void 0===o.format)o.format=formats.default;else if(!Object.prototype.hasOwnProperty.call(formats.formatters,o.format))throw new TypeError("Unknown format option provided.");var l,y,p=formats.formatters[o.format];"function"==typeof o.filter?a=(y=o.filter)("",a):Array.isArray(o.filter)&&(l=y=o.filter);var g=[];if("object"!=typeof a||null===a)return"";var v=arrayPrefixGenerators[o.arrayFormat in arrayPrefixGenerators?o.arrayFormat:"indices"in o?o.indices?"indices":"repeat":"indices"];l||(l=Object.keys(a)),d&&l.sort(d);for(var $=0;$<l.length;++$){var k=l[$];i&&null===a[k]||(g=g.concat(stringify(a[k],k,v,t,i,n?c:null,y,d,u,m,p,f)))}var q=g.join(s);return q.length>0?(!0===o.addQueryPrefix?"?":"")+q:""},has$1=Object.prototype.hasOwnProperty,defaults$1={allowDots:!1,allowPrototypes:!1,arrayLimit:20,decoder:utils.decode,delimiter:"&",depth:5,parameterLimit:1e3,plainObjects:!1,strictNullHandling:!1},parseValues=function(e,r){for(var a={},o=(r.ignoreQueryPrefix?e.replace(/^\?/,""):e).split(r.delimiter,r.parameterLimit===1/0?void 0:r.parameterLimit),s=0;s<o.length;++s){var t,i,n=o[s],c=n.indexOf("]="),d=-1===c?n.indexOf("="):c+1;-1===d?(t=r.decoder(n,defaults$1.decoder),i=r.strictNullHandling?null:""):(t=r.decoder(n.slice(0,d),defaults$1.decoder),i=r.decoder(n.slice(d+1),defaults$1.decoder)),a[t]=has$1.call(a,t)?[].concat(a[t]).concat(i):i}return a},parseObject=function(e,r,a){for(var o=r,s=e.length-1;s>=0;--s){var t,i=e[s];if("[]"===i)t=(t=[]).concat(o);else{t=a.plainObjects?Object.create(null):{};var n="["===i.charAt(0)&&"]"===i.charAt(i.length-1)?i.slice(1,-1):i,c=parseInt(n,10);!isNaN(c)&&i!==n&&String(c)===n&&c>=0&&a.parseArrays&&c<=a.arrayLimit?(t=[])[c]=o:t[n]=o}o=t}return o},parseKeys=function(e,r,a){if(e){var o=a.allowDots?e.replace(/\.([^.[]+)/g,"[$1]"):e,s=/(\[[^[\]]*])/g,t=/(\[[^[\]]*])/.exec(o),i=t?o.slice(0,t.index):o,n=[];if(i){if(!a.plainObjects&&has$1.call(Object.prototype,i)&&!a.allowPrototypes)return;n.push(i)}for(var c=0;null!==(t=s.exec(o))&&c<a.depth;){if(c+=1,!a.plainObjects&&has$1.call(Object.prototype,t[1].slice(1,-1))&&!a.allowPrototypes)return;n.push(t[1])}return t&&n.push("["+o.slice(t.index)+"]"),parseObject(n,r,a)}},parse=function(e,r){var a=r?utils.assign({},r):{};if(null!=a.decoder&&"function"!=typeof a.decoder)throw new TypeError("Decoder has to be a function.");if(a.ignoreQueryPrefix=!0===a.ignoreQueryPrefix,a.delimiter="string"==typeof a.delimiter||utils.isRegExp(a.delimiter)?a.delimiter:defaults$1.delimiter,a.depth="number"==typeof a.depth?a.depth:defaults$1.depth,a.arrayLimit="number"==typeof a.arrayLimit?a.arrayLimit:defaults$1.arrayLimit,a.parseArrays=!1!==a.parseArrays,a.decoder="function"==typeof a.decoder?a.decoder:defaults$1.decoder,a.allowDots="boolean"==typeof a.allowDots?a.allowDots:defaults$1.allowDots,a.plainObjects="boolean"==typeof a.plainObjects?a.plainObjects:defaults$1.plainObjects,a.allowPrototypes="boolean"==typeof a.allowPrototypes?a.allowPrototypes:defaults$1.allowPrototypes,a.parameterLimit="number"==typeof a.parameterLimit?a.parameterLimit:defaults$1.parameterLimit,a.strictNullHandling="boolean"==typeof a.strictNullHandling?a.strictNullHandling:defaults$1.strictNullHandling,""===e||null==e)return a.plainObjects?Object.create(null):{};for(var o="string"==typeof e?parseValues(e,a):e,s=a.plainObjects?Object.create(null):{},t=Object.keys(o),i=0;i<t.length;++i){var n=t[i],c=parseKeys(n,o[n],a);s=utils.merge(s,c,a)}return utils.compact(s)},lib={formats:formats,parse:parse,stringify:stringify_1},Backend=function(){function e(){}return e.getDomain=function(){return e.backendDomain},e.setDomain=function(r){e.backendDomain=r},e.request=function(e,r,a,o,s,t){e=e.toUpperCase();var i=r;return Object.keys(o).length>0&&(i=r+"?"+lib.stringify(o)),t.method=e,t.headers={Accept:"application/json","Content-Type":"application/json","x-access-token":t.headers["x-access-token"]},"GET"!==e&&(a?t.body=JSON.stringify(a):s&&(t.body=lib.stringify(s))),fetch(i,t)},e.multipartRequest=function(e,r,a,o){for(var s=new FormData,t=a.files,i=0;i<t.length;i++)s.append("files[]",t[i]);return fetch(r,{method:e,headers:{"x-access-token":o.headers["x-access-token"]},body:s})},e.getUsersAsAdmin=function(r){void 0===r&&(r={});var a=r.$domain?r.$domain:e.getDomain(),o=r.$config||{headers:{}},s={};return void 0!==r.xAccessToken&&(o.headers["x-access-token"]=r.xAccessToken),void 0===r.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(void 0!==r.role&&(s.role=r.role),void 0===r.role?Promise.reject(new Error("Missing required  parameter: role")):(void 0!==r.keyword&&(s.keyword=r.keyword),void 0===r.keyword?Promise.reject(new Error("Missing required  parameter: keyword")):(void 0!==r.page&&(s.page=r.page),void 0===r.page?Promise.reject(new Error("Missing required  parameter: page")):(void 0!==r.pageSize&&(s.pageSize=r.pageSize),r.$queryParameters&&Object.keys(r.$queryParameters).forEach(function(e){s[e]=r.$queryParameters[e]}),e.request("get",a+"/admin/users",{},s,{},o)))))},e.deactivateUserAsAdmin=function(r){void 0===r&&(r={});var a=r.$domain?r.$domain:e.getDomain(),o=r.$config||{headers:{}},s="/admin/users/{id}",t={};return void 0!==r.xAccessToken&&(o.headers["x-access-token"]=r.xAccessToken),void 0===r.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(s=s.replace("{id}",""+r.id),void 0===r.id?Promise.reject(new Error("Missing required  parameter: id")):(r.$queryParameters&&Object.keys(r.$queryParameters).forEach(function(e){t[e]=r.$queryParameters[e]}),e.request("post",a+s,{},t,{},o)))},e.activateUserAsAdmin=function(r){void 0===r&&(r={});var a=r.$domain?r.$domain:e.getDomain(),o=r.$config||{headers:{}},s="/admin/users/{id}/activate",t={};return void 0!==r.xAccessToken&&(o.headers["x-access-token"]=r.xAccessToken),void 0===r.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(s=s.replace("{id}",""+r.id),void 0===r.id?Promise.reject(new Error("Missing required  parameter: id")):(r.$queryParameters&&Object.keys(r.$queryParameters).forEach(function(e){t[e]=r.$queryParameters[e]}),e.request("post",a+s,{},t,{},o)))},e.changeUserRole=function(r){void 0===r&&(r={});var a=r.$domain?r.$domain:e.getDomain(),o=r.$config||{headers:{}},s="/admin/users/{id}/role/{role}",t={};return void 0!==r.xAccessToken&&(o.headers["x-access-token"]=r.xAccessToken),void 0===r.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(s=s.replace("{id}",""+r.id),void 0===r.id?Promise.reject(new Error("Missing required  parameter: id")):(s=s.replace("{role}",""+r.role),void 0===r.role?Promise.reject(new Error("Missing required  parameter: role")):(r.$queryParameters&&Object.keys(r.$queryParameters).forEach(function(e){t[e]=r.$queryParameters[e]}),e.request("post",a+s,{},t,{},o))))},e.getChats=function(r){void 0===r&&(r={});var a=r.$domain?r.$domain:e.getDomain(),o=r.$config||{headers:{}},s={};return void 0!==r.xAccessToken&&(o.headers["x-access-token"]=r.xAccessToken),void 0===r.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(r.$queryParameters&&Object.keys(r.$queryParameters).forEach(function(e){s[e]=r.$queryParameters[e]}),e.request("get",a+"/chat/chats",{},s,{},o))},e.getChat=function(r){void 0===r&&(r={});var a=r.$domain?r.$domain:e.getDomain(),o=r.$config||{headers:{}},s="/chat/{chat}",t={};return void 0!==r.xAccessToken&&(o.headers["x-access-token"]=r.xAccessToken),void 0===r.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(s=s.replace("{chat}",""+r.chat),void 0===r.chat?Promise.reject(new Error("Missing required  parameter: chat")):(r.$queryParameters&&Object.keys(r.$queryParameters).forEach(function(e){t[e]=r.$queryParameters[e]}),e.request("get",a+s,{},t,{},o)))},e.addLead=function(r){void 0===r&&(r={});var a=r.$domain?r.$domain:e.getDomain(),o=r.$config||{headers:{}},s={},t={};return void 0!==r.lead&&(s=r.lead),r.$queryParameters&&Object.keys(r.$queryParameters).forEach(function(e){t[e]=r.$queryParameters[e]}),e.request("post",a+"/lead",s,t,{},o)},e.getLeads=function(r){void 0===r&&(r={});var a=r.$domain?r.$domain:e.getDomain(),o=r.$config||{headers:{}},s={};return void 0!==r.xAccessToken&&(o.headers["x-access-token"]=r.xAccessToken),void 0===r.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(r.$queryParameters&&Object.keys(r.$queryParameters).forEach(function(e){s[e]=r.$queryParameters[e]}),e.request("get",a+"/lead",{},s,{},o))},e.getLead=function(r){void 0===r&&(r={});var a=r.$domain?r.$domain:e.getDomain(),o=r.$config||{headers:{}},s="/lead/{id}",t={};return void 0!==r.xAccessToken&&(o.headers["x-access-token"]=r.xAccessToken),void 0===r.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(s=s.replace("{id}",""+r.id),void 0===r.id?Promise.reject(new Error("Missing required  parameter: id")):(r.$queryParameters&&Object.keys(r.$queryParameters).forEach(function(e){t[e]=r.$queryParameters[e]}),e.request("get",a+s,{},t,{},o)))},e.placeBid=function(r){void 0===r&&(r={});var a=r.$domain?r.$domain:e.getDomain(),o=r.$config||{headers:{}},s="/bid/{order}/place",t={},i={};return void 0!==r.xAccessToken&&(o.headers["x-access-token"]=r.xAccessToken),void 0===r.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(void 0!==r.bid&&(t=r.bid),s=s.replace("{order}",""+r.order),void 0===r.order?Promise.reject(new Error("Missing required  parameter: order")):(r.$queryParameters&&Object.keys(r.$queryParameters).forEach(function(e){i[e]=r.$queryParameters[e]}),e.request("post",a+s,t,i,{},o)))},e.placeFinalBid=function(r){void 0===r&&(r={});var a=r.$domain?r.$domain:e.getDomain(),o=r.$config||{headers:{}},s="/bid/{order}/final",t={},i={};return void 0!==r.xAccessToken&&(o.headers["x-access-token"]=r.xAccessToken),void 0===r.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(void 0!==r.bid&&(t=r.bid),s=s.replace("{order}",""+r.order),void 0===r.order?Promise.reject(new Error("Missing required  parameter: order")):(r.$queryParameters&&Object.keys(r.$queryParameters).forEach(function(e){i[e]=r.$queryParameters[e]}),e.request("post",a+s,t,i,{},o)))},e.getOrderBids=function(r){void 0===r&&(r={});var a=r.$domain?r.$domain:e.getDomain(),o=r.$config||{headers:{}},s="/bid/by-order/{order}",t={};return void 0!==r.xAccessToken&&(o.headers["x-access-token"]=r.xAccessToken),void 0===r.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(s=s.replace("{order}",""+r.order),void 0===r.order?Promise.reject(new Error("Missing required  parameter: order")):(r.$queryParameters&&Object.keys(r.$queryParameters).forEach(function(e){t[e]=r.$queryParameters[e]}),e.request("get",a+s,{},t,{},o)))},e.removeFavoriteMerchant=function(r){void 0===r&&(r={});var a=r.$domain?r.$domain:e.getDomain(),o=r.$config||{headers:{}},s="/customer/favorites/merchant/{merchant}",t={};return void 0!==r.xAccessToken&&(o.headers["x-access-token"]=r.xAccessToken),void 0===r.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(s=s.replace("{merchant}",""+r.merchant),void 0===r.merchant?Promise.reject(new Error("Missing required  parameter: merchant")):(r.$queryParameters&&Object.keys(r.$queryParameters).forEach(function(e){t[e]=r.$queryParameters[e]}),e.request("post",a+s,{},t,{},o)))},e.getFavoritesList=function(r){void 0===r&&(r={});var a=r.$domain?r.$domain:e.getDomain(),o=r.$config||{headers:{}},s={};return void 0!==r.xAccessToken&&(o.headers["x-access-token"]=r.xAccessToken),void 0===r.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(r.$queryParameters&&Object.keys(r.$queryParameters).forEach(function(e){s[e]=r.$queryParameters[e]}),e.request("get",a+"/customer/favorites/merchants",{},s,{},o))},e.getMerchantById=function(r){void 0===r&&(r={});var a=r.$domain?r.$domain:e.getDomain(),o=r.$config||{headers:{}},s="/merchant/{id}/details",t={};return s=s.replace("{id}",""+r.id),void 0===r.id?Promise.reject(new Error("Missing required  parameter: id")):(r.$queryParameters&&Object.keys(r.$queryParameters).forEach(function(e){t[e]=r.$queryParameters[e]}),e.request("get",a+s,{},t,{},o))},e.getMerchantByUsername=function(r){void 0===r&&(r={});var a=r.$domain?r.$domain:e.getDomain(),o=r.$config||{headers:{}},s="/merchant/by-username/{username}",t={};return s=s.replace("{username}",""+r.username),void 0===r.username?Promise.reject(new Error("Missing required  parameter: username")):(r.$queryParameters&&Object.keys(r.$queryParameters).forEach(function(e){t[e]=r.$queryParameters[e]}),e.request("get",a+s,{},t,{},o))},e.createMerchant=function(r){void 0===r&&(r={});var a=r.$domain?r.$domain:e.getDomain(),o=r.$config||{headers:{}},s={},t={};return void 0!==r.xAccessToken&&(o.headers["x-access-token"]=r.xAccessToken),void 0===r.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(void 0!==r.user&&(s=r.user),r.$queryParameters&&Object.keys(r.$queryParameters).forEach(function(e){t[e]=r.$queryParameters[e]}),e.request("post",a+"/merchant/account/payment",s,t,{},o))},e.getNearbyMerchants=function(r){void 0===r&&(r={});var a=r.$domain?r.$domain:e.getDomain(),o=r.$config||{headers:{}},s={};return void 0!==r.latitude&&(s.latitude=r.latitude),void 0===r.latitude?Promise.reject(new Error("Missing required  parameter: latitude")):(void 0!==r.longitude&&(s.longitude=r.longitude),void 0===r.longitude?Promise.reject(new Error("Missing required  parameter: longitude")):(void 0!==r.radius&&(s.radius=r.radius),void 0!==r.keyword&&(s.keyword=r.keyword),r.$queryParameters&&Object.keys(r.$queryParameters).forEach(function(e){s[e]=r.$queryParameters[e]}),e.request("get",a+"/merchant/nearby",{},s,{},o)))},e.getNearbyMerchantsByService=function(r){void 0===r&&(r={});var a=r.$domain?r.$domain:e.getDomain(),o=r.$config||{headers:{}},s="/merchant/nearby/{service}",t={};return s=s.replace("{service}",""+r.service),void 0===r.service?Promise.reject(new Error("Missing required  parameter: service")):(void 0!==r.latitude&&(t.latitude=r.latitude),void 0===r.latitude?Promise.reject(new Error("Missing required  parameter: latitude")):(void 0!==r.longitude&&(t.longitude=r.longitude),void 0===r.longitude?Promise.reject(new Error("Missing required  parameter: longitude")):(void 0!==r.keyword&&(t.keyword=r.keyword),void 0!==r.radius&&(t.radius=r.radius),r.$queryParameters&&Object.keys(r.$queryParameters).forEach(function(e){t[e]=r.$queryParameters[e]}),e.request("get",a+s,{},t,{},o))))},e.createOrder=function(r){void 0===r&&(r={});var a=r.$domain?r.$domain:e.getDomain(),o=r.$config||{headers:{}},s={},t={};return void 0!==r.xAccessToken&&(o.headers["x-access-token"]=r.xAccessToken),void 0===r.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(void 0!==r.order&&(s=r.order),r.$queryParameters&&Object.keys(r.$queryParameters).forEach(function(e){t[e]=r.$queryParameters[e]}),e.request("post",a+"/order",s,t,{},o))},e.getOrders=function(r){void 0===r&&(r={});var a=r.$domain?r.$domain:e.getDomain(),o=r.$config||{headers:{}},s={};return void 0!==r.xAccessToken&&(o.headers["x-access-token"]=r.xAccessToken),void 0===r.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(void 0!==r.status&&(s.status=r.status),r.$queryParameters&&Object.keys(r.$queryParameters).forEach(function(e){s[e]=r.$queryParameters[e]}),e.request("get",a+"/order",{},s,{},o))},e.getReadyOrders=function(r){void 0===r&&(r={});var a=r.$domain?r.$domain:e.getDomain(),o=r.$config||{headers:{}},s={};return void 0!==r.xAccessToken&&(o.headers["x-access-token"]=r.xAccessToken),void 0===r.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(r.$queryParameters&&Object.keys(r.$queryParameters).forEach(function(e){s[e]=r.$queryParameters[e]}),e.request("get",a+"/order/ready",{},s,{},o))},e.getOrdersByPeriod=function(r){void 0===r&&(r={});var a=r.$domain?r.$domain:e.getDomain(),o=r.$config||{headers:{}},s={};return void 0!==r.xAccessToken&&(o.headers["x-access-token"]=r.xAccessToken),void 0===r.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(void 0!==r.status&&(s.status=r.status),void 0!==r.startDate&&(s.startDate=r.startDate),void 0!==r.endDate&&(s.endDate=r.endDate),r.$queryParameters&&Object.keys(r.$queryParameters).forEach(function(e){s[e]=r.$queryParameters[e]}),e.request("get",a+"/order/between-dates",{},s,{},o))},e.getOrder=function(r){void 0===r&&(r={});var a=r.$domain?r.$domain:e.getDomain(),o=r.$config||{headers:{}},s="/order/{id}",t={};return void 0!==r.xAccessToken&&(o.headers["x-access-token"]=r.xAccessToken),void 0===r.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(s=s.replace("{id}",""+r.id),void 0===r.id?Promise.reject(new Error("Missing required  parameter: id")):(r.$queryParameters&&Object.keys(r.$queryParameters).forEach(function(e){t[e]=r.$queryParameters[e]}),e.request("get",a+s,{},t,{},o)))},e.acceptOrder=function(r){void 0===r&&(r={});var a=r.$domain?r.$domain:e.getDomain(),o=r.$config||{headers:{}},s="/order/{id}/accept",t={};return void 0!==r.xAccessToken&&(o.headers["x-access-token"]=r.xAccessToken),void 0===r.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(s=s.replace("{id}",""+r.id),void 0===r.id?Promise.reject(new Error("Missing required  parameter: id")):(r.$queryParameters&&Object.keys(r.$queryParameters).forEach(function(e){t[e]=r.$queryParameters[e]}),e.request("post",a+s,{},t,{},o)))},e.cancelOrder=function(r){void 0===r&&(r={});var a=r.$domain?r.$domain:e.getDomain(),o=r.$config||{headers:{}},s="/order/{id}/cancel",t={};return void 0!==r.xAccessToken&&(o.headers["x-access-token"]=r.xAccessToken),void 0===r.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(s=s.replace("{id}",""+r.id),void 0===r.id?Promise.reject(new Error("Missing required  parameter: id")):(r.$queryParameters&&Object.keys(r.$queryParameters).forEach(function(e){t[e]=r.$queryParameters[e]}),e.request("get",a+s,{},t,{},o)))},e.finishOrder=function(r){void 0===r&&(r={});var a=r.$domain?r.$domain:e.getDomain(),o=r.$config||{headers:{}},s="/order/{id}/finish",t={};return void 0!==r.xAccessToken&&(o.headers["x-access-token"]=r.xAccessToken),void 0===r.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(s=s.replace("{id}",""+r.id),void 0===r.id?Promise.reject(new Error("Missing required  parameter: id")):(r.$queryParameters&&Object.keys(r.$queryParameters).forEach(function(e){t[e]=r.$queryParameters[e]}),e.request("post",a+s,{},t,{},o)))},e.rateOrder=function(r){void 0===r&&(r={});var a=r.$domain?r.$domain:e.getDomain(),o=r.$config||{headers:{}},s="/order/{id}/rate/{rate}",t={};return void 0!==r.xAccessToken&&(o.headers["x-access-token"]=r.xAccessToken),void 0===r.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(s=s.replace("{id}",""+r.id),void 0===r.id?Promise.reject(new Error("Missing required  parameter: id")):(s=s.replace("{rate}",""+r.rate),void 0===r.rate?Promise.reject(new Error("Missing required  parameter: rate")):(r.$queryParameters&&Object.keys(r.$queryParameters).forEach(function(e){t[e]=r.$queryParameters[e]}),e.request("post",a+s,{},t,{},o))))},e.getReceivingModes=function(r){void 0===r&&(r={});var a=r.$domain?r.$domain:e.getDomain(),o=r.$config||{headers:{}},s={};return r.$queryParameters&&Object.keys(r.$queryParameters).forEach(function(e){s[e]=r.$queryParameters[e]}),e.request("get",a+"/order/receiving-modes",{},s,{},o)},e.getPaymentModes=function(r){void 0===r&&(r={});var a=r.$domain?r.$domain:e.getDomain(),o=r.$config||{headers:{}},s={};return r.$queryParameters&&Object.keys(r.$queryParameters).forEach(function(e){s[e]=r.$queryParameters[e]}),e.request("get",a+"/order/payment-modes/list",{},s,{},o)},e.getOrdersNearby=function(r){void 0===r&&(r={});var a=r.$domain?r.$domain:e.getDomain(),o=r.$config||{headers:{}},s={};return void 0!==r.latitude&&(s.latitude=r.latitude),void 0===r.latitude?Promise.reject(new Error("Missing required  parameter: latitude")):(void 0!==r.longitude&&(s.longitude=r.longitude),void 0===r.longitude?Promise.reject(new Error("Missing required  parameter: longitude")):(void 0!==r.radius&&(s.radius=r.radius),void 0!==r.keyword&&(s.keyword=r.keyword),void 0!==r.page&&(s.page=r.page),void 0===r.page?Promise.reject(new Error("Missing required  parameter: page")):(void 0!==r.pageSize&&(s.pageSize=r.pageSize),r.$queryParameters&&Object.keys(r.$queryParameters).forEach(function(e){s[e]=r.$queryParameters[e]}),e.request("get",a+"/order/by-location/nearby",{},s,{},o))))},e.setOrderMerchant=function(r){void 0===r&&(r={});var a=r.$domain?r.$domain:e.getDomain(),o=r.$config||{headers:{}},s="/order/{id}/merchant/{merchant}",t={};return void 0!==r.xAccessToken&&(o.headers["x-access-token"]=r.xAccessToken),void 0===r.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(s=s.replace("{id}",""+r.id),void 0===r.id?Promise.reject(new Error("Missing required  parameter: id")):(s=s.replace("{merchant}",""+r.merchant),void 0===r.merchant?Promise.reject(new Error("Missing required  parameter: merchant")):(r.$queryParameters&&Object.keys(r.$queryParameters).forEach(function(e){t[e]=r.$queryParameters[e]}),e.request("post",a+s,{},t,{},o))))},e.startOrder=function(r){void 0===r&&(r={});var a=r.$domain?r.$domain:e.getDomain(),o=r.$config||{headers:{}},s="/order/{id}/start",t={};return void 0!==r.xAccessToken&&(o.headers["x-access-token"]=r.xAccessToken),void 0===r.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(s=s.replace("{id}",""+r.id),void 0===r.id?Promise.reject(new Error("Missing required  parameter: id")):(r.$queryParameters&&Object.keys(r.$queryParameters).forEach(function(e){t[e]=r.$queryParameters[e]}),e.request("post",a+s,{},t,{},o)))},e.sendNotification=function(r){void 0===r&&(r={});var a=r.$domain?r.$domain:e.getDomain(),o=r.$config||{headers:{}},s={};return void 0!==r.xAccessToken&&(o.headers["x-access-token"]=r.xAccessToken),void 0===r.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(r.$queryParameters&&Object.keys(r.$queryParameters).forEach(function(e){s[e]=r.$queryParameters[e]}),e.request("post",a+"/notification/send",{},s,{},o))},e.getNotifications=function(r){void 0===r&&(r={});var a=r.$domain?r.$domain:e.getDomain(),o=r.$config||{headers:{}},s={};return void 0!==r.xAccessToken&&(o.headers["x-access-token"]=r.xAccessToken),void 0===r.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(r.$queryParameters&&Object.keys(r.$queryParameters).forEach(function(e){s[e]=r.$queryParameters[e]}),e.request("get",a+"/notification",{},s,{},o))},e.getNotification=function(r){void 0===r&&(r={});var a=r.$domain?r.$domain:e.getDomain(),o=r.$config||{headers:{}},s="/notification/{id}",t={};return void 0!==r.xAccessToken&&(o.headers["x-access-token"]=r.xAccessToken),void 0===r.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(s=s.replace("{id}",""+r.id),void 0===r.id?Promise.reject(new Error("Missing required  parameter: id")):(r.$queryParameters&&Object.keys(r.$queryParameters).forEach(function(e){t[e]=r.$queryParameters[e]}),e.request("get",a+s,{},t,{},o)))},e.accessWithFacebook=function(r){void 0===r&&(r={});var a=r.$domain?r.$domain:e.getDomain(),o=r.$config||{headers:{}},s={};return void 0!==r.accessToken&&(s.access_token=r.accessToken),void 0===r.accessToken?Promise.reject(new Error("Missing required  parameter: accessToken")):(r.$queryParameters&&Object.keys(r.$queryParameters).forEach(function(e){s[e]=r.$queryParameters[e]}),e.request("post",a+"/oauth/access/facebook",{},s,{},o))},e.addPicture=function(r){void 0===r&&(r={});var a=r.$domain?r.$domain:e.getDomain(),o=r.$config||{headers:{}},s={},t={};return void 0!==r.xAccessToken&&(o.headers["x-access-token"]=r.xAccessToken),void 0===r.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(void 0!==r.files&&(t.files=r.files),r.$queryParameters&&Object.keys(r.$queryParameters).forEach(function(e){s[e]=r.$queryParameters[e]}),e.multipartRequest("POST",a+"/picture/save",t,o))},e.getPicture=function(r){void 0===r&&(r={});var a=r.$domain?r.$domain:e.getDomain(),o=r.$config||{headers:{}},s="/picture/{id}",t={};return void 0!==r.xAccessToken&&(o.headers["x-access-token"]=r.xAccessToken),void 0===r.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(s=s.replace("{id}",""+r.id),void 0===r.id?Promise.reject(new Error("Missing required  parameter: id")):(r.$queryParameters&&Object.keys(r.$queryParameters).forEach(function(e){t[e]=r.$queryParameters[e]}),e.request("get",a+s,{},t,{},o)))},e.getPictures=function(r){void 0===r&&(r={});var a,o=r.$domain?r.$domain:e.getDomain(),s=r.$config||{headers:{}};return void 0!==r.xAccessToken&&(s.headers["x-access-token"]=r.xAccessToken),void 0===r.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):void 0===r.ids?Promise.reject(new Error("Missing required  parameter: id")):(a={ids:String(r.ids)},e.request("get",o+"/picture/multiple",{},a,{},s))},e.getLatest=function(r){void 0===r&&(r={});var a=r.$domain?r.$domain:e.getDomain(),o=r.$config||{headers:{}},s="/picture/{itemId}",t={};return void 0!==r.xAccessToken&&(o.headers["x-access-token"]=r.xAccessToken),void 0===r.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(s=s.replace("{itemId}",""+r.itemId),void 0===r.itemId?Promise.reject(new Error("Missing required  parameter: itemId")):(r.$queryParameters&&Object.keys(r.$queryParameters).forEach(function(e){t[e]=r.$queryParameters[e]}),e.request("get",a+s,{},t,{},o)))},e.removePicture=function(r){void 0===r&&(r={});var a=r.$domain?r.$domain:e.getDomain(),o=r.$config||{headers:{}},s="/picture/remove/{id}",t={};return void 0!==r.xAccessToken&&(o.headers["x-access-token"]=r.xAccessToken),void 0===r.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(s=s.replace("{id}",""+r.id),void 0===r.id?Promise.reject(new Error("Missing required  parameter: id")):(r.$queryParameters&&Object.keys(r.$queryParameters).forEach(function(e){t[e]=r.$queryParameters[e]}),e.request("post",a+s,{},t,{},o)))},e.createUser=function(r){void 0===r&&(r={});var a=r.$domain?r.$domain:e.getDomain(),o=r.$config||{headers:{}},s={},t={};return void 0!==r.user&&(s=r.user),r.$queryParameters&&Object.keys(r.$queryParameters).forEach(function(e){t[e]=r.$queryParameters[e]}),e.request("post",a+"/user/create",s,t,{},o)},e.isUniqueUsername=function(r){void 0===r&&(r={});var a=r.$domain?r.$domain:e.getDomain(),o=r.$config||{headers:{}},s="/user/username/exists/{username}",t={};return s=s.replace("{username}",""+r.username),void 0===r.username?Promise.reject(new Error("Missing required  parameter: username")):(r.$queryParameters&&Object.keys(r.$queryParameters).forEach(function(e){t[e]=r.$queryParameters[e]}),e.request("get",a+s,{},t,{},o))},e.getUserProfile=function(r){void 0===r&&(r={});var a=r.$domain?r.$domain:e.getDomain(),o=r.$config||{headers:{}},s={};return void 0!==r.xAccessToken&&(o.headers["x-access-token"]=r.xAccessToken),void 0===r.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(r.$queryParameters&&Object.keys(r.$queryParameters).forEach(function(e){s[e]=r.$queryParameters[e]}),e.request("get",a+"/user/profile",{},s,{},o))},e.authenticateUser=function(r){void 0===r&&(r={});var a=r.$domain?r.$domain:e.getDomain(),o=r.$config||{headers:{}},s={},t={};return void 0!==r.user&&(s=r.user),r.$queryParameters&&Object.keys(r.$queryParameters).forEach(function(e){t[e]=r.$queryParameters[e]}),e.request("post",a+"/user/authenticate",s,t,{},o)},e.updateUser=function(r){void 0===r&&(r={});var a=r.$domain?r.$domain:e.getDomain(),o=r.$config||{headers:{}},s={},t={};return void 0!==r.xAccessToken&&(o.headers["x-access-token"]=r.xAccessToken),void 0===r.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(void 0!==r.user&&(s=r.user),r.$queryParameters&&Object.keys(r.$queryParameters).forEach(function(e){t[e]=r.$queryParameters[e]}),e.request("post",a+"/user/update",s,t,{},o))},e.recoverPassword=function(r){void 0===r&&(r={});var a=r.$domain?r.$domain:e.getDomain(),o=r.$config||{headers:{}},s="/user/password/recover/{email}",t={};return s=s.replace("{email}",""+r.email),void 0===r.email?Promise.reject(new Error("Missing required  parameter: email")):(r.$queryParameters&&Object.keys(r.$queryParameters).forEach(function(e){t[e]=r.$queryParameters[e]}),e.request("post",a+s,{},t,{},o))},e.updatePassword=function(r){void 0===r&&(r={});var a=r.$domain?r.$domain:e.getDomain(),o=r.$config||{headers:{}},s={},t={};return void 0!==r.xAccessToken&&(o.headers["x-access-token"]=r.xAccessToken),void 0===r.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(void 0!==r.user&&(s=r.user),r.$queryParameters&&Object.keys(r.$queryParameters).forEach(function(e){t[e]=r.$queryParameters[e]}),e.request("post",a+"/user/password/update",s,t,{},o))},e.addSkip=function(r){void 0===r&&(r={});var a=r.$domain?r.$domain:e.getDomain(),o=r.$config||{headers:{}},s="/user/skips/{skip}",t={};return void 0!==r.xAccessToken&&(o.headers["x-access-token"]=r.xAccessToken),void 0===r.xAccessToken?Promise.reject(new Error("Missing required  parameter: xAccessToken")):(s=s.replace("{skip}",""+r.skip),void 0===r.skip?Promise.reject(new Error("Missing required  parameter: skip")):(r.$queryParameters&&Object.keys(r.$queryParameters).forEach(function(e){t[e]=r.$queryParameters[e]}),e.request("post",a+s,{},t,{},o)))},e}();Backend.backendDomain="",function(e){e.NULL="NULL",e.OPEN="OPEN",e.CLOSE="CLOSE",e.ERROR="ERROR",e.SET_TOKEN="SET_TOKEN",e.REVOKE_TOKEN="REVOKE_TOKEN",e.SKIP_INTRO="SKIP_INTRO",e.SKIP_TOUR="SKIP_TOUR",e.OPEN_REGISTER="OPEN_REGISTER",e.CLOSE_REGISTER="CLOSE_REGISTER",e.REGISTER_ORDER="REGISTER_ORDER",e.SELECT_ORDER="SELECT_ORDER",e.SHOW_ORDER="SHOW_ORDER",e.PLACE_ORDER="PLACE_ORDER",e.MY_ORDERS="MY_ORDERS",e.ORDER_BIDS="ORDER_BIDS",e.ORDER_MERCHANT="ORDER_MERCHANT",e.MERCHANT_ORDERS="MERCHANT_ORDERS",e.START_ORDER="START_ORDER",e.CANCEL_ORDER="CANCEL_ORDER",e.FINISH_ORDER="FINISH_ORDER",e.RATE_ORDER="RATE_ORDER",e.OPEN_PROFILE="OPEN_PROFILE",e.UPDATE_PROFILE="UPDATE_PROFILE"}(TypeKeys||(TypeKeys={}));export{Backend as a,TypeKeys as b};