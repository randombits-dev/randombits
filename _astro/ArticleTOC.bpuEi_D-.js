import{d as E,c as L,o as A,g as i,i as n,u as k,s as o,a as $,r as S,t as c}from"./web.OmaAzR48.js";const H=c('<div class=rb-article__nav> <b class="block text-xl pb-3">Table of Contents</b><nav aria-label="Table of Contents">'),M=c("<div><div class=font-bold></div><div class=rb-article__sub-nav>"),N=c('<div><a class="">'),O=c("<div><a class=font-bold>"),R=c('<div class=rb-article__nav><b class="block text-xl pb-3">Table of Contents</b><nav aria-label="Article Sections">'),Y=c("<div><a>"),h=["!sticky","top-5"],B=({path:w,relatedPages:m,headings:x})=>{const[u,j]=L("");let l;A(()=>{let t=0;window.addEventListener("scroll",()=>{window.scrollY>(t||l.offsetTop)?(t=t||l.offsetTop,l.classList.add(...h)):l.classList.remove(...h)})});const C=t=>{};return m?(()=>{const t=i(H),b=t.firstChild,p=b.nextSibling,f=p.nextSibling,a=l;return typeof a=="function"?k(a,t):l=t,n(f,()=>m.sort((e,d)=>e.data.order-d.data.order).map(e=>w===e.slug?(()=>{const s=i(M),r=s.firstChild,T=r.nextSibling;return n(r,()=>e.data.toc||e.data.title),n(T,()=>x.map((v,q)=>{const y=u()===v.slug;return(()=>{const g=i(N),_=g.firstChild;return _.$$click=()=>C(),o(_,"aria-selected",y),n(_,()=>v.text),$(()=>o(_,"href","#"+v.slug)),S(),g})()})),$(()=>o(r,"aria-selected",!u())),s})():(()=>{const s=i(O),r=s.firstChild;return n(r,()=>e.data.toc||e.data.title),$(()=>o(r,"href",e.slug)),s})())),t})():(()=>{const t=i(R),b=t.firstChild,p=b.nextSibling,f=l;return typeof f=="function"?k(f,t):l=t,n(p,()=>x.map(a=>{const e=u()===a.slug;return(()=>{const d=i(Y),s=d.firstChild;return s.$$click=()=>C(),o(s,"aria-selected",e),n(s,()=>a.text),$(()=>o(s,"href","#"+a.slug)),S(),d})()})),t})()};E(["click"]);export{B as default};