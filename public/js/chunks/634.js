"use strict";(self.webpackChunktinymcefieldtype=self.webpackChunktinymcefieldtype||[]).push([[634],{5634:(e,n,t)=>{t.r(n),t.d(n,{default:()=>o});const r={props:{debug:{default:!1},form:{default:{}},text:{},props:{},as:{},record:{},children:{}},data:function(){return{fieldValues:this.form}},watch:{fieldValues:{handler:function(e){var n=this;Object.keys(e).forEach((function(t){n.form[t]=e[t]})),this.$emit("input",this.form)},deep:!0}}};const o=(0,t(1900).Z)(r,(function(){var e=this,n=e.$createElement,t=e._self._c||n;return t(e.as,e._b({tag:"component",attrs:{form:e.form,errors:e.form.errors}},"component",e.props,!1),[e.debug?t("span",[e._v(e._s(e.as))]):e._e(),e._v("\n\n    "+e._s(e.text)+"\n    "),e._l(e.children,(function(n,r){return e.children?t(n.component,e._g(e._b({directives:[{name:"show",rawName:"v-show",value:!n.hide,expression:"! childComponent.hide"}],key:n.handle+"_"+r,tag:"component",attrs:{form:e.form,errors:e.form.errors,record:e.record},model:{value:e.form[n.handle],callback:function(t){e.$set(e.form,n.handle,t)},expression:"form[childComponent.handle]"}},"component",n,!1),e.$listeners),[e.debug?t("span",[e._v(e._s(n.component))]):e._e(),e._v("\n\n        "+e._s(n.text)+"\n\n        "),e._l(n.children,(function(o,s){return n.children?t(o.component,e._g(e._b({directives:[{name:"show",rawName:"v-show",value:!o.hide,expression:"! grandchild.hide"}],key:o.handle+"_"+r+"_"+s,tag:"component",attrs:{form:e.form,errors:e.form.errors,record:e.record},model:{value:e.form[o.handle],callback:function(n){e.$set(e.form,o.handle,n)},expression:"form[grandchild.handle]"}},"component",o,!1),e.$listeners),[e.debug?t("span",[e._v(e._s(o.component))]):e._e(),e._v("\n\n            "+e._s(o.text)+"\n        ")]):e._e()}))],2):e._e()}))],2)}),[],!1,null,null,null).exports},1900:(e,n,t)=>{function r(e,n,t,r,o,s,i,a){var c,d="function"==typeof e?e.options:e;if(n&&(d.render=n,d.staticRenderFns=t,d._compiled=!0),r&&(d.functional=!0),s&&(d._scopeId="data-v-"+s),i?(c=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),o&&o.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(i)},d._ssrRegister=c):o&&(c=a?function(){o.call(this,(d.functional?this.parent:this).$root.$options.shadowRoot)}:o),c)if(d.functional){d._injectStyles=c;var l=d.render;d.render=function(e,n){return c.call(n),l(e,n)}}else{var f=d.beforeCreate;d.beforeCreate=f?[].concat(f,c):[c]}return{exports:e,options:d}}t.d(n,{Z:()=>r})}}]);