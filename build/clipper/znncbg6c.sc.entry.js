class t{constructor(){this.type="bounded"}async addRipple(t,s){return new Promise(i=>{this.queue.read(()=>{const o=this.el.getBoundingClientRect(),r=o.width,d=o.height,u=Math.sqrt(r*r+d*d),a=Math.max(d,r),p=this.unbounded?a:u+e,l=Math.floor(a*n),c=p/l;let h=t-o.left,f=s-o.top;this.unbounded&&(h=.5*r,f=.5*d);const y=h-.5*l,g=f-.5*l,m=.5*r-h,w=.5*d-f;this.queue.write(()=>{const t=this.win.document.createElement("div");t.classList.add("ripple-effect");const e=t.style;e.top=g+"px",e.left=y+"px",e.width=e.height=l+"px",e.setProperty("--final-scale",`${c}`),e.setProperty("--translate-end",`${m}px, ${w}px`),(this.el.shadowRoot||this.el).appendChild(t),setTimeout(()=>{i(()=>{!function(t){t.classList.add("fade-out"),setTimeout(()=>{t.remove()},200)}(t)})},325)})})})}get unbounded(){return"unbounded"===this.type}hostData(){return{role:"presentation",class:{[`${this.mode}`]:!0,unbounded:this.unbounded}}}static get is(){return"ion-ripple-effect"}static get encapsulation(){return"shadow"}static get properties(){return{addRipple:{method:!0},el:{elementRef:!0},queue:{context:"queue"},type:{type:String,attr:"type"},win:{context:"window"}}}static get style(){return".sc-ion-ripple-effect-h{left:0;right:0;top:0;bottom:0;position:absolute;contain:strict;pointer-events:none}.unbounded.sc-ion-ripple-effect-h{contain:layout size style}.ripple-effect.sc-ion-ripple-effect{border-radius:50%;position:absolute;background-color:currentColor;color:inherit;contain:strict;opacity:0;-webkit-animation:rippleAnimation 225ms forwards,fadeInAnimation 75ms forwards;animation:rippleAnimation 225ms forwards,fadeInAnimation 75ms forwards;will-change:transform,opacity;pointer-events:none}.fade-out.sc-ion-ripple-effect{-webkit-transform:translate(var(--translate-end)) scale(var(--final-scale,1));transform:translate(var(--translate-end)) scale(var(--final-scale,1));-webkit-animation:fadeOutAnimation .15s forwards;animation:fadeOutAnimation .15s forwards}\@-webkit-keyframes rippleAnimation{0%{-webkit-animation-timing-function:cubic-bezier(.4,0,.2,1);animation-timing-function:cubic-bezier(.4,0,.2,1);-webkit-transform:scale(1);transform:scale(1)}to{-webkit-transform:translate(var(--translate-end)) scale(var(--final-scale,1));transform:translate(var(--translate-end)) scale(var(--final-scale,1))}}\@keyframes rippleAnimation{0%{-webkit-animation-timing-function:cubic-bezier(.4,0,.2,1);animation-timing-function:cubic-bezier(.4,0,.2,1);-webkit-transform:scale(1);transform:scale(1)}to{-webkit-transform:translate(var(--translate-end)) scale(var(--final-scale,1));transform:translate(var(--translate-end)) scale(var(--final-scale,1))}}\@-webkit-keyframes fadeInAnimation{0%{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0}to{opacity:.16}}\@keyframes fadeInAnimation{0%{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0}to{opacity:.16}}\@-webkit-keyframes fadeOutAnimation{0%{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:.16}to{opacity:0}}\@keyframes fadeOutAnimation{0%{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:.16}to{opacity:0}}"}}const e=10,n=.5;export{t as IonRippleEffect};