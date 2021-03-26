var __awaiter=this&&this.__awaiter||function(e,n,t,r){return new(t||(t=Promise))(function(i,o){function a(e){try{u(r.next(e))}catch(e){o(e)}}function s(e){try{u(r.throw(e))}catch(e){o(e)}}function u(e){e.done?i(e.value):new t(function(n){n(e.value)}).then(a,s)}u((r=r.apply(e,n||[])).next())})},__generator=this&&this.__generator||function(e,n){var t,r,i,o,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function s(o){return function(s){return function(o){if(t)throw new TypeError("Generator is already executing.");for(;a;)try{if(t=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return a.label++,{value:o[1],done:!1};case 5:a.label++,r=o[1],o=[0];continue;case 7:o=a.ops.pop(),a.trys.pop();continue;default:if(!(i=(i=a.trys).length>0&&i[i.length-1])&&(6===o[0]||2===o[0])){a=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){a.label=o[1];break}if(6===o[0]&&a.label<i[1]){a.label=i[1],i=o;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(o);break}i[2]&&a.ops.pop(),a.trys.pop();continue}o=n.call(e,a)}catch(e){o=[6,e],r=0}finally{t=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,s])}}};clipper.loadBundle("chunk-6d54f4e5.js",["require","exports"],function(e,n){var t=0;function r(e,n,t){var r=function(e,n){var t=Array.from(i(e).children).filter(function(e){return e.overlayIndex>0});return void 0===n?t:(n=n.toUpperCase(),t.filter(function(e){return e.tagName===n}))}(e,n);return void 0===t?r[r.length-1]:r.find(function(e){return e.id===t})}function i(e){return e.querySelector("ion-app")||e.body}function o(n,t,r,i){return __awaiter(this,void 0,void 0,function(){var o,a,s,u;return __generator(this,function(c){switch(c.label){case 0:return n.animation?(n.animation.destroy(),n.animation=void 0,[2,!1]):(r.classList.remove("overlay-hidden"),o=r.shadowRoot||n.el,s=n,[4,new Promise(function(n,t){e(["./chunk-a0282687.js"],n,t)}).then(function(e){return e.create(t,o,i)})]);case 1:return a=s.animation=c.sent(),n.animation=a,n.animated&&n.config.getBoolean("animated",!0)||a.duration(0),n.keyboardClose&&a.beforeAddWrite(function(){var e=r.ownerDocument.activeElement;e&&e.matches("input, ion-input, ion-textarea")&&e.blur()}),[4,a.playAsync()];case 2:return c.sent(),u=a.hasCompleted,a.destroy(),n.animation=void 0,[2,u]}})})}n.present=function(e,n,t,r,i){return __awaiter(this,void 0,void 0,function(){var a;return __generator(this,function(s){switch(s.label){case 0:return e.presented?[2]:(e.presented=!0,e.willPresent.emit(),a=e.enterAnimation?e.enterAnimation:e.config.get(n,"ios"===e.mode?t:r),[4,o(e,a,e.el,i)]);case 1:return s.sent()&&e.didPresent.emit(),[2]}})})},n.dismiss=function(e,n,t,r,i,a,s){return __awaiter(this,void 0,void 0,function(){var u,c;return __generator(this,function(l){switch(l.label){case 0:if(!e.presented)return[2,!1];e.presented=!1,l.label=1;case 1:return l.trys.push([1,3,,4]),e.willDismiss.emit({data:n,role:t}),u=e.leaveAnimation?e.leaveAnimation:e.config.get(r,"ios"===e.mode?i:a),[4,o(e,u,e.el,s)];case 2:return l.sent(),e.didDismiss.emit({data:n,role:t}),[3,4];case 3:return c=l.sent(),console.error(c),[3,4];case 4:return e.el.remove(),[2,!0]}})})},n.eventMethod=function(e,n){var t,r=new Promise(function(e){return t=e});return function(e,n,r){var i=function(r){e.removeEventListener(n,i),t(r.detail)};e.addEventListener(n,i)}(e,n),r},n.createOverlay=function(e,n){var o=e.ownerDocument;!function(e){0===t&&(t=1,e.addEventListener("focusin",function(n){var t=r(e);if(t&&t.backdropDismiss&&!function(e,n){for(;n;){if(n===e)return!0;n=n.parentElement}return!1}(t,n.target)){var i=t.querySelector("input,button");i&&i.focus()}}),e.addEventListener("ionBackButton",function(n){var t=r(e);t&&t.backdropDismiss&&n.detail.register(100,function(){return t.dismiss(void 0,"backdrop")})}),e.addEventListener("keyup",function(n){if("Escape"===n.key){var t=r(e);t&&t.backdropDismiss&&t.dismiss(void 0,"backdrop")}}))}(o),Object.assign(e,n),e.classList.add("overlay-hidden");var a=t++;return e.overlayIndex=a,e.hasAttribute("id")||(e.id="ion-overlay-"+a),i(o).appendChild(e),e.componentOnReady()},n.dismissOverlay=function(e,n,t,i,o){var a=r(e,i,o);return a?a.dismiss(n,t):Promise.reject("overlay does not exist")},n.getOverlay=r,n.BACKDROP="backdrop",n.isCancel=function(e){return"cancel"===e||"backdrop"===e}});