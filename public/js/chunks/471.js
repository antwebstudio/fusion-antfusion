"use strict";(self.webpackChunktinymcefieldtype=self.webpackChunktinymcefieldtype||[]).push([[471],{9471:(t,n,e)=>{e.r(n),e.d(n,{default:()=>i});const o={props:{cssClass:{},url:{},confirmButtonText:{default:"Confirm"},cancelButtonLabel:{default:"Cancel"},title:{},record:{},resourceId:{},resourceHandle:{},actionHandle:{},confirmTitle:{},confirmText:{},to:{},text:{}},data:function(){return{loading:!1}},computed:{needConfirmation:function(){return this.confirmText},modalTitle:function(){return this.confirmTitle?this.confirmTitle:this.title},modalName:function(){return"action-link-confirmation-"+this._uid}},methods:{toggle:function(){this.$parent&&this.$parent.toggle&&this.$parent.toggle()},performAction:function(){this.to||(console.log("need ",this.needConfirmation),this.needConfirmation?this.askConfirmation():this.confirm())},askConfirmation:function(){this.openModal(this.modalName)},confirm:function(){var t=this;this.loading=!0;var n=this.record?[this.record.id]:[];axios.post(this.url,{resourceIds:n}).then((function(n){console.log("action button",n),n.data.redirect?n.data.target?window.open(n.data.redirect,n.data.target):t.$router.push(n.data.redirect):(t.loading=!1,toast(n.data.message,"success"),t.closeModal(t.modalName),t.$emit("updated"))})).catch((function(n){t.loading=!1,toast(n.response.data.message,"error")}))},closeModal:function(t,n){this.$bus.$emit("toggle-modal-"+t,n)},openModal:function(t,n){this.$bus.$emit("toggle-modal-"+t,n)}}};const i=(0,e(1900).Z)(o,(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[e("ui-dropdown-link",t._b({class:t.cssClass,on:{click:function(n){return n.preventDefault(),t.performAction.apply(null,arguments)}}},"ui-dropdown-link",t.$props,!1),[t._v("\n        "+t._s(t.text)+"\n    ")]),t._v(" "),t.needConfirmation?e("portal",{attrs:{to:"modals"}},[e("ui-modal",{key:t.modalName,attrs:{name:t.modalName,title:t.modalTitle},scopedSlots:t._u([{key:"footer",fn:function(n){return[e("ui-button",{staticClass:"ml-3",attrs:{disabled:t.loading,variant:"danger"},on:{click:function(n){return t.confirm()}}},[t._v(t._s(t.confirmButtonText))]),t._v(" "),e("ui-button",{attrs:{disabled:t.loading,variant:"secondary"},on:{click:function(n){return t.closeModal(t.modalName)}}},[t._v(t._s(t.cancelButtonLabel))])]}}],null,!1,4211464818)},[e("p",[t._v(t._s(t.confirmText))])])],1):t._e()],1)}),[],!1,null,null,null).exports},1900:(t,n,e)=>{function o(t,n,e,o,i,a,r,s){var l,c="function"==typeof t?t.options:t;if(n&&(c.render=n,c.staticRenderFns=e,c._compiled=!0),o&&(c.functional=!0),a&&(c._scopeId="data-v-"+a),r?(l=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),i&&i.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(r)},c._ssrRegister=l):i&&(l=s?function(){i.call(this,(c.functional?this.parent:this).$root.$options.shadowRoot)}:i),l)if(c.functional){c._injectStyles=l;var d=c.render;c.render=function(t,n){return l.call(n),d(t,n)}}else{var u=c.beforeCreate;c.beforeCreate=u?[].concat(u,l):[l]}return{exports:t,options:c}}e.d(n,{Z:()=>o})}}]);