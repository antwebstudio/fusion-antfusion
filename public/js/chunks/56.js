"use strict";(self.webpackChunktinymcefieldtype=self.webpackChunktinymcefieldtype||[]).push([[56],{4056:(t,e,n)=>{n.r(e),n.d(e,{default:()=>r});const o={data:function(){return{meta:null,resource:null,actions:null}},computed:{dropdownActions:function(){return this.actions.filter((function(t){return t.dropdown}))}},beforeRouteUpdate:function(t,e,n){var o=this;axios.get("/api/antfusion/resource/"+t.params.resource).then((function(t){o.meta=t.data,o.actions=t.data.actions,console.log(t.data),n()})).catch((function(t){if(t.response.data.errors&&t.response.data.errors["*"]){var e=t.response.data.errors["*"];toast(e.join(" "),"error")}else toast(t.response.data.message,"error")}))},beforeRouteEnter:function(t,e,n){axios.get("/api/antfusion/resource/"+t.params.resource).then((function(t){n((function(e){e.meta=t.data,e.resource=t.data.resource,e.actions=t.data.actions,console.log(t.data)}))})).catch((function(t){if(t.response.data.errors&&t.response.data.errors["*"]){var e=t.response.data.errors["*"];toast(e.join(" "),"error")}else toast(t.response.data.message,"error")}))}};const r=(0,n(1900).Z)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("portal",{attrs:{to:"title"}},[n("page-title",{attrs:{icon:t.resource.icon}},[t._v(t._s(t.meta.title))])],1),t._v(" "),n("portal",{attrs:{to:"actions"}},[n("div",[t._l(t.actions,(function(e,o){return n("span",{key:o},[e.dropdown?t._e():n(e.component,t._b({tag:"component",on:{submitted:t.load}},"component",e,!1),[t._v("\n                    "+t._s(e.text)+"\n                ")])],1)})),t._v(" "),t.dropdownActions&&t.dropdownActions.length?n("ui-actions",{key:"entry_actions",attrs:{id:"entry_actions"}},t._l(t.actions,(function(e,o){return n("div",{key:o},[e.dropdown?n(e.component,t._b({tag:"component",on:{submitted:t.load}},"component",e,!1),[t._v("\n                        "+t._s(e.text)+"\n                    ")]):t._e()],1)})),0):t._e()],2)]),t._v(" "),t.meta&&t.meta.components?n("div",t._l(t.meta.components,(function(e,o){return n(e.is,t._b({key:e.id,tag:"component",staticClass:"form__group"},"component",e,!1))})),1):t._e()],1)}),[],!1,null,null,null).exports},1900:(t,e,n)=>{function o(t,e,n,o,r,s,a,i){var c,d="function"==typeof t?t.options:t;if(e&&(d.render=e,d.staticRenderFns=n,d._compiled=!0),o&&(d.functional=!0),s&&(d._scopeId="data-v-"+s),a?(c=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),r&&r.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(a)},d._ssrRegister=c):r&&(c=i?function(){r.call(this,(d.functional?this.parent:this).$root.$options.shadowRoot)}:r),c)if(d.functional){d._injectStyles=c;var u=d.render;d.render=function(t,e){return c.call(e),u(t,e)}}else{var p=d.beforeCreate;d.beforeCreate=p?[].concat(p,c):[c]}return{exports:t,options:d}}n.d(e,{Z:()=>o})}}]);