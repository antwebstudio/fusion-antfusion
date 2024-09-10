"use strict";(self.webpackChunktinymcefieldtype=self.webpackChunktinymcefieldtype||[]).push([[71],{1433:(e,t,r)=>{r.d(t,{Z:()=>n});const n={methods:{processActionResponse:function(e){e.message&&toast(e.message,"success"),e.redirect&&(e.target?window.open(e.redirect,e.target):this.$router.push(e.redirect))}}}},9071:(e,t,r)=>{r.r(t),r.d(t,{default:()=>a});const n={methods:{catchError:function(e){if(this.loading=!1,console.log("errors",e.response),e.response.data.errors&&e.response.data.errors["*"]){var t=e.response.data.errors["*"];toast(t.join(" "),"error")}else toast(e.response.data.message,"error")}}};function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}const c={mixins:[{mixins:[r(1433).Z,n],props:{path:{},url:{default:null}},methods:{submit:function(){return this.performAction()},performAction:function(e,t){var r=this;if(this.url)return e=s(s({},e),{},{route:this.route,path:this.path,resourceIds:this.record&&this.record.id?[this.record.id]:null}),t?t.post(this.url,e).then(this.processActionResponse).catch(this.catchError):axios.post(this.url,e).then((function(e){r.processActionResponse(e.data)})).catch(this.catchError);toast("Error: URL of action is missing. ","error")}}},{props:{value:{required:!1,default:null}},computed:{model:{get:function(){return this.value},set:function(e){this.$emit("input",e)}}}}],props:{name:{},clearOnSubmit:{default:!0}},data:function(){return{}},methods:{submit:function(){return this.clearOnSubmit&&(this.model=null),this.performAction({value:this.model})}}};const a=(0,r(1900).Z)(c,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("ui-label",[e._v(e._s(e.name))]),e._v(" "),r("input",{directives:[{name:"focus",rawName:"v-focus"},{name:"model",rawName:"v-model",value:e.model,expression:"model"}],staticClass:"field field--input",domProps:{value:e.model},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.submit.apply(null,arguments)},input:function(t){t.target.composing||(e.model=t.target.value)}}})],1)}),[],!1,null,null,null).exports},1900:(e,t,r)=>{function n(e,t,r,n,o,s,i,c){var a,u="function"==typeof e?e.options:e;if(t&&(u.render=t,u.staticRenderFns=r,u._compiled=!0),n&&(u.functional=!0),s&&(u._scopeId="data-v-"+s),i?(a=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),o&&o.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(i)},u._ssrRegister=a):o&&(a=c?function(){o.call(this,(u.functional?this.parent:this).$root.$options.shadowRoot)}:o),a)if(u.functional){u._injectStyles=a;var l=u.render;u.render=function(e,t){return a.call(t),l(e,t)}}else{var p=u.beforeCreate;u.beforeCreate=p?[].concat(p,a):[a]}return{exports:e,options:u}}r.d(t,{Z:()=>n})}}]);