"use strict";(self.webpackChunktinymcefieldtype=self.webpackChunktinymcefieldtype||[]).push([[801],{7801:(e,t,n)=>{n.r(t),n.d(t,{default:()=>r});const o={data:function(){return{meta:null}},beforeRouteEnter:function(e,t,n){axios.get("/api/antfusion/resource/".concat(e.params.resource,"/").concat(e.params.id,"/view")).then((function(e){n((function(t){t.meta=e.data,t.$emit("updateHead")}))})).catch((function(){vm.$router.push("/resource/".concat(vm.$router.currentRoute.params.resource)),toast("Requested entry could not be found.","danger")}))}};const r=(0,n(1900).Z)(o,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e.meta&&e.meta.children?n("component-container",{attrs:{suffix:"_view",components:e.meta.children}}):e._e()],1)}),[],!1,null,null,null).exports},1900:(e,t,n)=>{function o(e,t,n,o,r,s,a,i){var c,u="function"==typeof e?e.options:e;if(t&&(u.render=t,u.staticRenderFns=n,u._compiled=!0),o&&(u.functional=!0),s&&(u._scopeId="data-v-"+s),a?(c=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),r&&r.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(a)},u._ssrRegister=c):r&&(c=i?function(){r.call(this,(u.functional?this.parent:this).$root.$options.shadowRoot)}:r),c)if(u.functional){u._injectStyles=c;var d=u.render;u.render=function(e,t){return c.call(t),d(e,t)}}else{var f=u.beforeCreate;u.beforeCreate=f?[].concat(f,c):[c]}return{exports:e,options:u}}n.d(t,{Z:()=>o})}}]);