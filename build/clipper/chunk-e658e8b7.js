function t(t){"requestIdleCallback"in window?window.requestIdleCallback(t):setTimeout(t,32)}function e(t){return!!t.shadowRoot&&!!t.attachShadow}function n(t){const e=t.closest("ion-item");return e?e.querySelector("ion-label"):null}function i(t,n,i,a,r){if(t||e(n)){let t=n.querySelector("input.aux-input");t||((t=n.ownerDocument.createElement("input")).type="hidden",t.classList.add("aux-input"),n.appendChild(t)),t.disabled=r,t.name=i,t.value=a||""}}function a(t,e,n){return Math.max(t,Math.min(e,n))}function r(t,e){if(!t){const t="ASSERT: "+e;throw console.error(t),new Error(t)}}function o(t){return t.timeStamp||Date.now()}function u(t){if(t){const e=t.changedTouches;if(e&&e.length>0){const t=e[0];return{x:t.clientX,y:t.clientY}}if(void 0!==t.pageX)return{x:t.pageX,y:t.pageY}}return{x:0,y:0}}function s(t,e){const n="rtl"===t.document.dir;switch(e){case"start":return n;case"end":return!n;default:throw new Error(`"${e}" is not a valid value for [side]. Use "start" or "end" instead.`)}}function c(t,e){const n=t._original||t;return{_original:t,emit:l(n.emit.bind(n),e)}}function l(t,e=0){let n;return(...i)=>{clearTimeout(n),n=setTimeout(t,e,...i)}}export{t as a,e as b,c,n as d,r as e,o as f,s as g,l as h,a as i,i as j,u as k};