"use strict";(self.webpackChunktinymcefieldtype=self.webpackChunktinymcefieldtype||[]).push([[7787],{7787:(e,n,t)=>{t.r(n),t.d(n,{default:()=>l});const o={props:{parent:{},value:{default:{}},selectedRows:{}},data:function(){return{loading:!1,fields:[],record:null}},watch:{record:{deep:!0,handler:function(e){this.$emit("input",e)}}},mounted:function(){this.loadModal()},methods:{loadModal:function(){var e=this;this.loading=!0,axios.post(this.parent.params.url,{from:"ajax-modal",records:this.selectedRows}).then((function(n){e.loading=!1,console.log(n),e.fields=n.data.fields})).catch((function(n){e.loading=!1}))}}};const l=(0,t(1900).Z)(o,(function(){var e=this,n=e.$createElement,t=e._self._c||n;return e.loading?t("div",[e._v("\n    Loading...\n")]):t("div",[t("component-container",{attrs:{components:e.fields},model:{value:e.record,callback:function(n){e.record=n},expression:"record"}})],1)}),[],!1,null,null,null).exports}}]);