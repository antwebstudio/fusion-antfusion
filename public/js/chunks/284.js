"use strict";(self.webpackChunktinymcefieldtype=self.webpackChunktinymcefieldtype||[]).push([[284],{9284:(e,t,n)=>{n.r(t),n.d(t,{default:()=>r});const o={data:function(){return{meta:null}},beforeRouteUpdate:function(e,t,n){var o=this;axios.get("/api/antfusion/resource/"+e.params.resource+"/meta").then((function(e){o.meta=e.data,console.log(e.data)})).catch((function(e){if(e.response.data.errors&&e.response.data.errors["*"]){var t=e.response.data.errors["*"];toast(t.join(" "),"error")}else toast(e.response.data.message,"error")}))},beforeRouteEnter:function(e,t,n){axios.get("/api/antfusion/resource/"+e.params.resource+"/meta").then((function(e){n((function(t){t.meta=e.data,console.log(e.data)}))})).catch((function(e){if(e.response.data.errors&&e.response.data.errors["*"]){var t=e.response.data.errors["*"];toast(t.join(" "),"error")}else toast(e.response.data.message,"error")}))}};const r=(0,n(1900).Z)(o,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("portal",{attrs:{to:"title"}},[n("page-title",{attrs:{icon:e.meta.icon}},[e._v(e._s(e.meta.title))])],1),e._v(" "),e.meta&&e.meta.components?n("div",e._l(e.meta.components,(function(t,o){return n(t.is,e._b({key:o,tag:"component",staticClass:"form__group"},"component",t,!1))})),1):e._e()],1)}),[],!1,null,null,null).exports},1900:(e,t,n)=>{function o(e,t,n,o,r,s,a,i){var c,u="function"==typeof e?e.options:e;if(t&&(u.render=t,u.staticRenderFns=n,u._compiled=!0),o&&(u.functional=!0),s&&(u._scopeId="data-v-"+s),a?(c=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),r&&r.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(a)},u._ssrRegister=c):r&&(c=i?function(){r.call(this,(u.functional?this.parent:this).$root.$options.shadowRoot)}:r),c)if(u.functional){u._injectStyles=c;var p=u.render;u.render=function(e,t){return c.call(t),p(e,t)}}else{var d=u.beforeCreate;u.beforeCreate=d?[].concat(d,c):[c]}return{exports:e,options:u}}n.d(t,{Z:()=>o})}}]);