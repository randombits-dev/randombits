import{d as delegateEvents,c as createSignal,g as getNextElement,i as insert,a as createRenderEffect,r as runHydrationEvents,b as className,t as template}from"./web.65dd132a.js";const _tmpl$=template('<div class="exec"><div class="exec-input"><div class="exec-symbol"><div class="arrow-right"></div></div><input spellcheck="false" type="text"><div>Reset</div></div><div class="exec-out"><div>'),calc=code=>{try{return eval(code)}catch(e){return e.message}},ExecuteJavascript=({code:e})=>{const[a,c]=createSignal(e),[r,l]=createSignal(!1),d=t=>{l(!0),c(t.target.value)},o=()=>{l(!1),c(e)};return(()=>{const t=getNextElement(_tmpl$),i=t.firstChild,v=i.firstChild,s=v.nextSibling,n=s.nextSibling,u=i.nextSibling,g=u.firstChild;return s.$$input=d,n.$$click=o,insert(g,()=>JSON.stringify(calc(a()))),createRenderEffect(()=>className(n,"exec-reset"+(r()?" visible":""))),createRenderEffect(()=>s.value=a()),runHydrationEvents(),t})()};delegateEvents(["input","click"]);export{ExecuteJavascript as default};