let e=0;function n(n,t){const o=n.ownerDocument;!function(n){0===e&&(e=1,n.addEventListener("focusin",e=>{const t=i(n);if(t&&t.backdropDismiss&&!function(e,n){for(;n;){if(n===e)return!0;n=n.parentElement}return!1}(t,e.target)){const e=t.querySelector("input,button");e&&e.focus()}}),n.addEventListener("ionBackButton",e=>{const t=i(n);t&&t.backdropDismiss&&e.detail.register(100,()=>t.dismiss(void 0,u))}),n.addEventListener("keyup",e=>{if("Escape"===e.key){const e=i(n);e&&e.backdropDismiss&&e.dismiss(void 0,u)}}))}(o),Object.assign(n,t),n.classList.add("overlay-hidden");const r=e++;return n.overlayIndex=r,n.hasAttribute("id")||(n.id=`ion-overlay-${r}`),s(o).appendChild(n),n.componentOnReady()}function t(e,n,t,o,r){const s=i(e,o,r);return s?s.dismiss(n,t):Promise.reject("overlay does not exist")}function i(e,n,t){const i=function(e,n){const t=Array.from(s(e).children).filter(e=>e.overlayIndex>0);return void 0===n?t:(n=n.toUpperCase(),t.filter(e=>e.tagName===n))}(e,n);return void 0===t?i[i.length-1]:i.find(e=>e.id===t)}async function o(e,n,t,i,o){if(e.presented)return;e.presented=!0,e.willPresent.emit();const r=e.enterAnimation?e.enterAnimation:e.config.get(n,"ios"===e.mode?t:i);await a(e,r,e.el,o)&&e.didPresent.emit()}async function r(e,n,t,i,o,r,s){if(!e.presented)return!1;e.presented=!1;try{e.willDismiss.emit({data:n,role:t});const d=e.leaveAnimation?e.leaveAnimation:e.config.get(i,"ios"===e.mode?o:r);await a(e,d,e.el,s),e.didDismiss.emit({data:n,role:t})}catch(e){console.error(e)}return e.el.remove(),!0}function s(e){return e.querySelector("ion-app")||e.body}async function a(e,n,t,i){if(e.animation)return e.animation.destroy(),e.animation=void 0,!1;t.classList.remove("overlay-hidden");const o=t.shadowRoot||e.el,r=e.animation=await import("./chunk-d84dff50.js").then(e=>e.create(n,o,i));e.animation=r,e.animated&&e.config.getBoolean("animated",!0)||r.duration(0),e.keyboardClose&&r.beforeAddWrite(()=>{const e=t.ownerDocument.activeElement;e&&e.matches("input, ion-input, ion-textarea")&&e.blur()}),await r.playAsync();const s=r.hasCompleted;return r.destroy(),e.animation=void 0,s}function d(e,n){let t;const i=new Promise(e=>t=e);return function(e,n,i){const o=i=>{e.removeEventListener(n,o),(e=>{t(e.detail)})(i)};e.addEventListener(n,o)}(e,n),i}function c(e){return"cancel"===e||e===u}const u="backdrop";export{o as a,r as b,d as c,n as d,t as e,i as f,u as g,c as h};