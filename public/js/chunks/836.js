"use strict";(self.webpackChunktinymcefieldtype=self.webpackChunktinymcefieldtype||[]).push([[836],{6836:(n,o,e)=>{e.r(o),e.d(o,{default:()=>a});const t={props:{value:{},record:{default:{}},wrap:{default:!1},suffix:{},components:{Fragment:e(266).HY}},watch:{loadedRecord:{deep:!0,handler:function(n){this.$emit("input",n)}}},data:function(){return{loadedRecord:Object.assign({},this.value,this.record),loadingCount:0}},methods:{componentExist:function(n){return this.$options.components&&this.$options.components[n]},onLoading:function(){this.loadingCount++},onLoaded:function(){this.loadingCount--}},computed:{processedComponents:function(){var n=this;return this.suffix?this.components.map((function(o){var e=o.component+n.suffix;return n.componentExist(e)&&(o.component=e),o})):this.components},loading:function(){return this.loadingCount>0}}},d=t;const a=(0,e(1900).Z)(d,(function(){var n=this,o=n.$createElement,e=n._self._c||o;return n.wrap?e("div",n._b({staticClass:"flex flex-wrap"},"div",n.$props,!1),n._l(n.processedComponents,(function(o,t){return e(o.component,n._b({key:t,tag:"component",attrs:{loading:n.loading},on:{load:n.onLoading,loaded:n.onLoaded},model:{value:n.loadedRecord[o.handle],callback:function(e){n.$set(n.loadedRecord,o.handle,e)},expression:"loadedRecord[component.handle]"}},"component",o,!1))})),1):e("fragment",n._l(n.processedComponents,(function(o,t){return e(o.component,n._b({key:t,tag:"component",attrs:{loading:n.loading},on:{load:n.onLoading,loaded:n.onLoaded},model:{value:n.loadedRecord[o.handle],callback:function(e){n.$set(n.loadedRecord,o.handle,e)},expression:"loadedRecord[component.handle]"}},"component",o,!1))})),1)}),[],!1,null,null,null).exports}}]);