import{T as n,R as p,C as i,_ as m,s as d}from"./index-CyRcn2KU.js";function u(a){return function(t){return class extends t{constructor(){super(...arguments),this._handler=a}__update(e){this.hasUpdated?this.saveData():this.loadData()||this.saveData(),super.__update(e)}loadData(){const e=localStorage.getItem(this._handler);if(e){const r=JSON.parse(e);for(const[o,s]of Object.entries(r))this.getLineageStatePropertyNames().includes(o)&&(this[o]=s);return!0}else return!1}saveData(){const e={};for(const r of this.getLineageStatePropertyNames())e[r]=this[r];localStorage.setItem(this._handler,JSON.stringify(e))}}}}var f=Object.defineProperty,S=Object.getOwnPropertyDescriptor,h=(a,t,e,r)=>{for(var o=r>1?void 0:r?S(t,e):t,s=a.length-1,l;s>=0;s--)(l=a[s])&&(o=(r?l(t,e,o):l(o))||o);return r&&o&&f(t,e,o),o};let c=class extends p{constructor(){super(...arguments),this.colorMode=i.SYSTEM,this.themeColor="#6750A4"}async updated(a){a.has("colorMode")&&(n.mode=this.colorMode);const{themeFromSourceColor:t,applyTheme:e}=await m(async()=>{const{themeFromSourceColor:o,applyTheme:s}=await import("./index-DhKpNmY2.js");return{themeFromSourceColor:o,applyTheme:s}},[]),r=t(this.themeColor,n.appliedColorScheme==="dark","vibrant",0);e(document,r)}toggleMode(){const t=n.appliedColorScheme==="dark"?i.LIGHT:i.DARK,e=n.preferredColorScheme;this.colorMode=e!==void 0&&e===t?i.SYSTEM:t}};h([d()],c.prototype,"colorMode",2);h([d()],c.prototype,"themeColor",2);c=h([u("sfc:theme")],c);const _=window.themeStore=new c;window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>_.requestUpdate());n.init();export{_ as themeStore};
