const r={context:void 0,registry:void 0};function B(e){r.context=e}function Q(){return{...r.context,id:`${r.context.id}${r.context.count++}-`,count:0}}const X=(e,n)=>e===n,U={equals:X};let O=R;const y=1,E=2,Y={owned:null,cleanups:null,context:null,owner:null};var p=null;let H=null,c=null,d=null,g=null,m=0;function J(e,n){const t=c,s=p,i=e.length===0,o=n===void 0?s:n,f=i?Y:{owned:null,cleanups:null,context:o?o.context:null,owner:o},l=i?e:()=>e(()=>x(()=>$(f)));p=f,c=null;try{return A(l,!0)}finally{c=t,p=s}}function ue(e,n){n=n?Object.assign({},U,n):U;const t={value:e,observers:null,observerSlots:null,comparator:n.equals||void 0},s=i=>(typeof i=="function"&&(i=i(t.value)),I(t,i));return[k.bind(t),s]}function _(e,n,t){const s=F(e,n,!1,y);T(s)}function Z(e,n,t){O=te;const s=F(e,n,!1,y);(!t||!t.render)&&(s.user=!0),g?g.push(s):T(s)}function x(e){if(c===null)return e();const n=c;c=null;try{return e()}finally{c=n}}function ce(e){Z(()=>x(e))}function k(){if(this.sources&&this.state)if(this.state===y)T(this);else{const e=d;d=null,A(()=>C(this),!1),d=e}if(c){const e=this.observers?this.observers.length:0;c.sources?(c.sources.push(this),c.sourceSlots.push(e)):(c.sources=[this],c.sourceSlots=[e]),this.observers?(this.observers.push(c),this.observerSlots.push(c.sources.length-1)):(this.observers=[c],this.observerSlots=[c.sources.length-1])}return this.value}function I(e,n,t){let s=e.value;return(!e.comparator||!e.comparator(s,n))&&(e.value=n,e.observers&&e.observers.length&&A(()=>{for(let i=0;i<e.observers.length;i+=1){const o=e.observers[i],f=H&&H.running;f&&H.disposed.has(o),(f?!o.tState:!o.state)&&(o.pure?d.push(o):g.push(o),o.observers&&q(o)),f||(o.state=y)}if(d.length>1e6)throw d=[],new Error},!1)),n}function T(e){if(!e.fn)return;$(e);const n=m;z(e,e.value,n)}function z(e,n,t){let s;const i=p,o=c;c=p=e;try{s=e.fn(n)}catch(f){return e.pure&&(e.state=y,e.owned&&e.owned.forEach($),e.owned=null),e.updatedAt=t+1,G(f)}finally{c=o,p=i}(!e.updatedAt||e.updatedAt<=t)&&(e.updatedAt!=null&&"observers"in e?I(e,s):e.value=s,e.updatedAt=t)}function F(e,n,t,s=y,i){const o={fn:e,state:s,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:n,owner:p,context:p?p.context:null,pure:t};return p===null||p!==Y&&(p.owned?p.owned.push(o):p.owned=[o]),o}function S(e){if(e.state===0)return;if(e.state===E)return C(e);if(e.suspense&&x(e.suspense.inFallback))return e.suspense.effects.push(e);const n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<m);)e.state&&n.push(e);for(let t=n.length-1;t>=0;t--)if(e=n[t],e.state===y)T(e);else if(e.state===E){const s=d;d=null,A(()=>C(e,n[0]),!1),d=s}}function A(e,n){if(d)return e();let t=!1;n||(d=[]),g?t=!0:g=[],m++;try{const s=e();return ee(t),s}catch(s){t||(g=null),d=null,G(s)}}function ee(e){if(d&&(R(d),d=null),e)return;const n=g;g=null,n.length&&A(()=>O(n),!1)}function R(e){for(let n=0;n<e.length;n++)S(e[n])}function te(e){let n,t=0;for(n=0;n<e.length;n++){const s=e[n];s.user?e[t++]=s:S(s)}if(r.context){if(r.count){r.effects||(r.effects=[]),r.effects.push(...e.slice(0,t));return}else r.effects&&(e=[...r.effects,...e],t+=r.effects.length,delete r.effects);B()}for(n=0;n<t;n++)S(e[n])}function C(e,n){e.state=0;for(let t=0;t<e.sources.length;t+=1){const s=e.sources[t];if(s.sources){const i=s.state;i===y?s!==n&&(!s.updatedAt||s.updatedAt<m)&&S(s):i===E&&C(s,n)}}}function q(e){for(let n=0;n<e.observers.length;n+=1){const t=e.observers[n];t.state||(t.state=E,t.pure?d.push(t):g.push(t),t.observers&&q(t))}}function $(e){let n;if(e.sources)for(;e.sources.length;){const t=e.sources.pop(),s=e.sourceSlots.pop(),i=t.observers;if(i&&i.length){const o=i.pop(),f=t.observerSlots.pop();s<i.length&&(o.sourceSlots[f]=s,i[s]=o,t.observerSlots[s]=f)}}if(e.owned){for(n=e.owned.length-1;n>=0;n--)$(e.owned[n]);e.owned=null}if(e.cleanups){for(n=e.cleanups.length-1;n>=0;n--)e.cleanups[n]();e.cleanups=null}e.state=0}function ne(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function G(e,n=p){throw ne(e)}let V=!1;function se(){V=!0}function ae(e,n){if(V&&r.context){const t=r.context;B(Q());const s=x(()=>e(n||{}));return B(t),s}return x(()=>e(n||{}))}function ie(e,n,t){let s=t.length,i=n.length,o=s,f=0,l=0,a=n[i-1].nextSibling,u=null;for(;f<i||l<o;){if(n[f]===t[l]){f++,l++;continue}for(;n[i-1]===t[o-1];)i--,o--;if(i===f){const h=o<s?l?t[l-1].nextSibling:t[o-l]:a;for(;l<o;)e.insertBefore(t[l++],h)}else if(o===l)for(;f<i;)(!u||!u.has(n[f]))&&n[f].remove(),f++;else if(n[f]===t[o-1]&&t[l]===n[i-1]){const h=n[--i].nextSibling;e.insertBefore(t[l++],n[f++].nextSibling),e.insertBefore(t[--o],h),n[i]=t[o]}else{if(!u){u=new Map;let w=l;for(;w<o;)u.set(t[w],w++)}const h=u.get(n[f]);if(h!=null)if(l<h&&h<o){let w=f,N=1,P;for(;++w<i&&w<o&&!((P=u.get(n[w]))==null||P!==h+N);)N++;if(N>h-l){const K=n[f];for(;l<h;)e.insertBefore(t[l++],K)}else e.replaceChild(t[l++],n[f++])}else f++;else n[f++].remove()}}}const D="_$DX_DELEGATE";function le(e,n,t,s={}){let i;return J(o=>{i=o,n===document?e():oe(n,e(),n.firstChild?null:void 0,t)},s.owner),()=>{i(),n.textContent=""}}function he(e,n,t){let s;const i=()=>{const f=document.createElement("template");return f.innerHTML=e,t?f.content.firstChild.firstChild:f.content.firstChild},o=n?()=>x(()=>document.importNode(s||(s=i()),!0)):()=>(s||(s=i())).cloneNode(!0);return o.cloneNode=o,o}function de(e,n=window.document){const t=n[D]||(n[D]=new Set);for(let s=0,i=e.length;s<i;s++){const o=e[s];t.has(o)||(t.add(o),n.addEventListener(o,W))}}function pe(e,n,t){!r.context&&(e[n]=t)}function ge(e,n,t){r.context||(t==null?e.removeAttribute(n):e.setAttribute(n,t))}function ye(e,n){r.context||(n==null?e.removeAttribute("class"):e.className=n)}function we(e,n,t){return x(()=>e(n,t))}function oe(e,n,t,s){if(t!==void 0&&!s&&(s=[]),typeof n!="function")return v(e,n,s,t);_(i=>v(e,n(),i,t),s)}function re(e,n,t={}){r.completed=globalThis._$HY.completed,r.events=globalThis._$HY.events,r.load=i=>globalThis._$HY.r[i],r.has=i=>i in globalThis._$HY.r,r.gather=i=>M(n,i),r.registry=new Map,r.context={id:t.renderId||"",count:0},M(n,t.renderId);const s=le(e,n,[...n.childNodes],t);return r.context=null,s}function xe(e){let n,t;return!r.context||!(n=r.registry.get(t=fe()))?e():(r.completed&&r.completed.add(n),r.registry.delete(t),n)}function be(){r.events&&!r.events.queued&&(queueMicrotask(()=>{const{completed:e,events:n}=r;for(n.queued=!1;n.length;){const[t,s]=n[0];if(!e.has(t))return;W(s),n.shift()}}),r.events.queued=!0)}function W(e){const n=`$$${e.type}`;let t=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==t&&Object.defineProperty(e,"target",{configurable:!0,value:t}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return t||document}}),r.registry&&!r.done&&(r.done=_$HY.done=!0);t;){const s=t[n];if(s&&!t.disabled){const i=t[`${n}Data`];if(i!==void 0?s.call(t,i,e):s.call(t,e),e.cancelBubble)return}t=t._$host||t.parentNode||t.host}}function v(e,n,t,s,i){if(r.context){!t&&(t=[...e.childNodes]);let l=[];for(let a=0;a<t.length;a++){const u=t[a];u.nodeType===8&&u.data.slice(0,2)==="!$"?u.remove():l.push(u)}t=l}for(;typeof t=="function";)t=t();if(n===t)return t;const o=typeof n,f=s!==void 0;if(e=f&&t[0]&&t[0].parentNode||e,o==="string"||o==="number"){if(r.context)return t;if(o==="number"&&(n=n.toString()),f){let l=t[0];l&&l.nodeType===3?l.data=n:l=document.createTextNode(n),t=b(e,t,s,l)}else t!==""&&typeof t=="string"?t=e.firstChild.data=n:t=e.textContent=n}else if(n==null||o==="boolean"){if(r.context)return t;t=b(e,t,s)}else{if(o==="function")return _(()=>{let l=n();for(;typeof l=="function";)l=l();t=v(e,l,t,s)}),()=>t;if(Array.isArray(n)){const l=[],a=t&&Array.isArray(t);if(L(l,n,t,i))return _(()=>t=v(e,l,t,s,!0)),()=>t;if(r.context){if(!l.length)return t;if(s===void 0)return[...e.childNodes];let u=l[0],h=[u];for(;(u=u.nextSibling)!==s;)h.push(u);return t=h}if(l.length===0){if(t=b(e,t,s),f)return t}else a?t.length===0?j(e,l,s):ie(e,t,l):(t&&b(e),j(e,l));t=l}else if(n.nodeType){if(r.context&&n.parentNode)return t=f?[n]:n;if(Array.isArray(t)){if(f)return t=b(e,t,s,n);b(e,t,null,n)}else t==null||t===""||!e.firstChild?e.appendChild(n):e.replaceChild(n,e.firstChild);t=n}}return t}function L(e,n,t,s){let i=!1;for(let o=0,f=n.length;o<f;o++){let l=n[o],a=t&&t[o],u;if(!(l==null||l===!0||l===!1))if((u=typeof l)=="object"&&l.nodeType)e.push(l);else if(Array.isArray(l))i=L(e,l,a)||i;else if(u==="function")if(s){for(;typeof l=="function";)l=l();i=L(e,Array.isArray(l)?l:[l],Array.isArray(a)?a:[a])||i}else e.push(l),i=!0;else{const h=String(l);a&&a.nodeType===3&&a.data===h?e.push(a):e.push(document.createTextNode(h))}}return i}function j(e,n,t=null){for(let s=0,i=n.length;s<i;s++)e.insertBefore(n[s],t)}function b(e,n,t,s){if(t===void 0)return e.textContent="";const i=s||document.createTextNode("");if(n.length){let o=!1;for(let f=n.length-1;f>=0;f--){const l=n[f];if(i!==l){const a=l.parentNode===e;!o&&!f?a?e.replaceChild(i,l):e.insertBefore(i,t):a&&l.remove()}else o=!0}}else e.insertBefore(i,t);return[i]}function M(e,n){const t=e.querySelectorAll("*[data-hk]");for(let s=0;s<t.length;s++){const i=t[s],o=i.getAttribute("data-hk");(!n||o.startsWith(n))&&!r.registry.has(o)&&r.registry.set(o,i)}}function fe(){const e=r.context;return`${e.id}${e.count++}`}const Ae=(...e)=>(se(),re(...e));export{_ as a,ye as b,ue as c,de as d,pe as e,le as f,xe as g,Ae as h,oe as i,ae as j,ce as o,be as r,ge as s,he as t,we as u};