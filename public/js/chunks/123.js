"use strict";(self.webpackChunktinymcefieldtype=self.webpackChunktinymcefieldtype||[]).push([[123],{7123:(t,e,n)=>{n.r(e),n.d(e,{default:()=>a});const o={data:function(){return{loadingCount:0,meta:null,page:null,resource:null,actions:null}},methods:{onLoading:function(){this.loadingCount++},onLoaded:function(){this.loadingCount--}},computed:{loading:function(){return this.loadingCount>0}},beforeRouteUpdate:function(t,e,n){var o=this;axios.get("/api/antfusion/page/"+t.params.page).then((function(t){o.meta=t.data,o.page=t.data.page,o.actions=t.data.actions,console.log(t.data)})).catch((function(t){if(t.response.data.errors&&t.response.data.errors["*"]){var e=t.response.data.errors["*"];toast(e.join(" "),"error")}else toast(t.response.data.message,"error")}))},beforeRouteEnter:function(t,e,n){axios.get("/api/antfusion/page/"+t.params.page).then((function(t){n((function(e){e.meta=t.data,e.page=t.data.page,e.resource=t.data.resource,e.actions=t.data.actions,console.log(t.data)}))})).catch((function(t){if(t.response.data.errors&&t.response.data.errors["*"]){var e=t.response.data.errors["*"];toast(e.join(" "),"error")}else toast(t.response.data.message,"error")}))}};const a=(0,n(1900).Z)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("portal",{attrs:{to:"title"}},[n("page-title",{attrs:{icon:t.page.icon||"layer-group"}},[t._v(t._s(t.page.title))])],1),t._v(" "),n("portal",{attrs:{to:"actions"}},[n("span",{staticClass:"print:hidden"},t._l(t.actions,(function(e,o){return n(e.component,t._b({key:o,tag:"component",attrs:{loading:t.loading},on:{load:t.onLoading,loaded:t.onLoaded,submitted:t.load}},"component",e,!1),[t._v("\n                "+t._s(e.text)+"\n            ")])})),1)]),t._v(" "),n("component-container",{attrs:{components:t.meta.components}})],1)}),[],!1,null,null,null).exports},1900:(t,e,n)=>{function o(t,e,n,o,a,s,r,i){var c,d="function"==typeof t?t.options:t;if(e&&(d.render=e,d.staticRenderFns=n,d._compiled=!0),o&&(d.functional=!0),s&&(d._scopeId="data-v-"+s),r?(c=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),a&&a.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(r)},d._ssrRegister=c):a&&(c=i?function(){a.call(this,(d.functional?this.parent:this).$root.$options.shadowRoot)}:a),c)if(d.functional){d._injectStyles=c;var l=d.render;d.render=function(t,e){return c.call(e),l(t,e)}}else{var p=d.beforeCreate;d.beforeCreate=p?[].concat(p,c):[c]}return{exports:t,options:d}}n.d(e,{Z:()=>o})}}]);