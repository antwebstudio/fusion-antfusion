"use strict";(self.webpackChunktinymcefieldtype=self.webpackChunktinymcefieldtype||[]).push([[969],{4969:(t,e,r)=>{r.r(e),r.d(e,{default:()=>n});const s={props:{form:{},record:{},text:{},parent:{},variant:{},url:{},path:{},submitParams:{default:function(){return{}}},useParentSubmit:{default:!1}},data:function(){return{loading:!1}},methods:{submit:function(){var t=this;if(this.useParentSubmit)this.parent.submit();else{var e=this.form?this.form.data():this.record.data();(e=Object.assign(this.submitParams,e)).path=this.path,this.loading=!0,(this.form?this.form:this.record).submit("post",this.url,e).then((function(e){t.loading=!1,t.$emit("submitted"),t.$emit("refreshed"),e.message&&toast(e.message,"success"),e.redirect&&(e.target?window.open(e.redirect,e.target):t.$router.push(e.redirect))})).catch((function(e){if(t.loading=!1,e.errors){t.errors=e.errors;var r=Object.keys(e.errors).map((function(t){return e.errors[t].join(" ")})).join(" ");toast(r,"failed")}else toast(e.message,"failed")}))}}}};const n=(0,r(1900).Z)(s,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("span",[r("ui-button",t._b({attrs:{loading:t.loading},on:{click:t.submit}},"ui-button",t.$props,!1),[t._v(t._s(t.text))])],1)}),[],!1,null,null,null).exports},1900:(t,e,r)=>{function s(t,e,r,s,n,i,o,a){var u,c="function"==typeof t?t.options:t;if(e&&(c.render=e,c.staticRenderFns=r,c._compiled=!0),s&&(c.functional=!0),i&&(c._scopeId="data-v-"+i),o?(u=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),n&&n.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(o)},c._ssrRegister=u):n&&(u=a?function(){n.call(this,(c.functional?this.parent:this).$root.$options.shadowRoot)}:n),u)if(c.functional){c._injectStyles=u;var d=c.render;c.render=function(t,e){return u.call(e),d(t,e)}}else{var f=c.beforeCreate;c.beforeCreate=f?[].concat(f,u):[u]}return{exports:t,options:c}}r.d(e,{Z:()=>s})}}]);