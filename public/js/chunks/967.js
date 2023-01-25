/*! For license information please see 967.js.LICENSE.txt */
(self.webpackChunktinymcefieldtype=self.webpackChunktinymcefieldtype||[]).push([[967],{5980:(t,e,s)=>{const{OptionHolder:r}=s(5916);t.exports={Base:class extends r{constructor(t){super(t.opts),this.flattener=t,this.currentDepth=t.currentDepth,this.keynameFn=t.keynameFn}}}},4349:t=>{t.exports=(t,e)=>t+e.charAt(0).toUpperCase()+e.slice(1)},6381:(t,e,s)=>{const r=s(6214),i=s(4349),n={camelCase:i,snakeCase:(t,e)=>r(i(t,e))};t.exports={builtIn:n}},6214:t=>{t.exports=toSnakeCase=function(){var t=this.match(/([A-Z])/g);if(!t)return this;for(var e=this.toString(),s=0,r=t.length;s<r;s++)e=e.replace(new RegExp(t[s]),"_"+t[s].toLowerCase());return"_"===e.slice(0,1)&&(e=e.slice(1)),e}},7457:(t,e,s)=>{const{Logger:r}=s(7733),{builtIn:i}=s(6381);t.exports={FlatKey:class extends r{constructor(t={}){super(t);const{delimiter:e,keyType:s,keyFunction:r}=t;this.builtIn=t.builtIn||i,this.delimiter=e||".",this.keyType=s,this.keyFunction=s?this.builtIn[s]:r}config(t,e){return this.key=t,this.prev=e,this}get name(){return this.prev?this.flatKey:this.key}get flatKey(){return this.keyFunction?this.keyFunction(this.prev,this.key):this.basicFlatKey}get basicFlatKey(){return[this.prev,this.key].join(this.delimiter||".")}},builtIn:i}},7049:(t,e,s)=>{const{FlatKey:r}=s(7457),{createStepper:i}=s(7167),{OptionHolder:n}=s(5916),{isObject:o}=s(7733),a={createKeyNameFn(t,e){const s=t.FlatKeyClass||r,i=t.createFlatKeyFn?t.createFlatKeyFn(t):new s(t);return i.flattener=e,(t,e)=>i.config(t,e).name}},h=t=>(t.createKeyNameFn||a.createKeyNameFn)(t);class p extends n{constructor(t,e={}){super(e),this.target=t,this.reset()}get logger(){return this._logger}set logger(t){this._logger=t,this.opts.logger=t}reset(){this.output={},this.currentDepth=1,this.changed=!1;const t=this.opts;this.keynameFn=t.keyNameFn||h(t),this.createStepper=t.createStepper||i}validate(t){if(!o(t))throw new Error(`Invalid flatten target: must be an Object, was: ${this.target}`)}flat(t){this.reset(),this.target=t||this.target,this.logObj("flatten",{target:this.target,opts:this.opts});const e=this.createStepper(this.target,{flattener:this});return this.stepper=e,this.log("created stepper",{stepper:e}),e.doSteps(),this.changed?this.output:this.target}onKey(t,e){this.log("onKey",{key:t,depth:e}),this.addKey(t,e)}addKey(t,e){const s=this.lastDepth||0;this.ancestorKeys=this.ancestorKeys||[],e>s&&(this.ancestorKeys.push(t),this.lastAncestorKey=t),this.lastDepth=e}get lvKeys(){return this.stepper?this.stepper.lvKeys:[]}onStepsDone(t){this.log("onStepsDone",{depth:t}),this.ancestorKeys.pop()}publishObj(t,e){Object.keys(t).map((s=>{const r=t[s];this.publish(s,r,e)}))}publish(t,e,s){return this.subscribers.map((r=>{r(t,e,s)})),s}subscribeTo(t,e={}){const s=this.createSubscriber(t,e);this.addSubscriber(s)}createSubscriber(t,e){const{callback:s}=e;return(r,i,n)=>{t===r&&"function"==typeof subscribeValue&&(e.target=n||e.target,s(r,i,e))}}addSubscriber(t){this.subscribers=this.subscribers||[],this.subscribers.push(t)}}function l(t,e){return new p(t,e)}t.exports={createFlattener:l,flatten:function(t,e){return l(t,e).flat()},createKeyNameFn:h,Flattener:p}},2671:(t,e,s)=>{const{FlatKey:r,builtIn:i}=s(7457),{flatten:n,createFlattener:o,Flattener:a}=s(7049),{createStepper:h,Stepper:p,createKeyStepper:l,KeyStepper:c}=s(7167);t.exports={FlatKey:r,builtIn:i,flatten:n,createFlattener:o,Flattener:a,createStepper:h,Stepper:p,createKeyStepper:l,KeyStepper:c}},5916:(t,e,s)=>{const{Logger:r}=s(7733);t.exports={OptionHolder:class extends r{constructor(t={}){super(t),this.opts=t,this.configureOpts()}configureOpts(){let t=this.opts;this.delimiter=t.delimiter||".",this.lowerCase=t.toLowerCase||!1,this.upperCase=t.toUpperCase||!1,this.maxDepth=t.maxDepth,this.filter=t.filter||function(){return!0}}}}},7167:(t,e,s)=>{const{createStepper:r,Stepper:i}=s(9347),{createKeyStepper:n,KeyStepper:o}=s(3854);t.exports={createStepper:r,createKeyStepper:n,Stepper:i,KeyStepper:o}},3854:(t,e,s)=>{const{isObject:r,isBuffer:i,isArray:n}=s(7733),{Base:o}=s(5980);const a=()=>{};class h extends o{constructor(t,{flattener:e,stepper:s}){super(e);const r=this.opts||{};this.stepper=s||e.stepper,this.subscribeValue=r.subscribeValue||a,this.restoreFromStepper(s),this.key=t,this.value=this.object[t],this.configType(),this.configValid(),this.newKey=this.keynameFn(t,this.prev),this.transformValue=(r.transformValue||this.transformValue).bind(this)}restoreFromStepper(t){t&&(this.lvKeys=t.lvKeys,this.ancestorKeys=this.flattener.ancestorKeys,this.prev=t.prev,this.object=t.object,this.currentDepth=t.currentDepth)}configType(){this.isArray=this.opts.safe&&n(this.value),this.isBuffer=i(this.value),this.isObject=r(this.value),this.validType=!this.isArray&&!this.isBuffer&&this.isObject}configValid(){this.hasContent=Object.keys(this.value).length,this.validTypeWithContent=this.validType&&this.hasContent,this.withinMaxDepth=!this.opts.maxDepth||this.currentDepth<this.maxDepth,this.validDeeper=this.validTypeWithContent&&this.withinMaxDepth,this.shouldGoDeeper=this.validDeeper&&this.filter(this.value)}depthStepper(){return p(this.value,{prev:this.newKey,currentDepth:this.currentDepth+1,flattener:this.flattener,opts:this.opts})}get changed(){return this.flattener.changed}set changed(t){this.flattener.changed=t}setOutput(t,e,{target:s,key:r,prevKey:i,ancestorKeys:n,lvKeys:o}){const a={newKey:t,value:e,target:s,key:r,prevKey:i,ancestorKeys:n,lvKeys:o};this.log("setOutput",a),this.flattener.lastKey=this.flattener.lastKey||"",this.flattener.lastKey.indexOf(t)>=0||(this.flattener.lastKey=t,this.changed=!0,this.flattener.output[t]=this.transformValue(e,a),this.subscribeOutput(t,a))}subscribeOutput(t,e){"function"==typeof this.subscribeValue&&(e.ancestorKeys=e.ancestorKeys.slice(),e.lvKeys=e.lvKeys.slice(),this.subscribeTo(t,{callback:this.subscribeValue,output:this.flattener.output,opts:e}))}subscribeTo(t,e={}){this.flattener.subscribeTo(t,e)}transformValue(t,e={}){return t}get output(){return this.flattener.output}step(){return this.log("step"),this.shouldGoDeeper&&this.depthStepper().doSteps(),this.setOutput(this.newKey,this.value,{target:this.flattener.target,key:this.key,prevKey:this.prev,lvKeys:this.lvKeys,ancestorKeys:this.ancestorKeys}),this.output}}t.exports={createKeyStepper:function(t,e){return new h(t,e)},KeyStepper:h};const{createStepper:p}=s(9347)},9347:(t,e,s)=>{const{Base:r}=s(5980);class i extends r{constructor(t,{prev:e,currentDepth:s,flattener:r,opts:i}){super(r||i),i=i||this.opts,this.prev=e,this.currentDepth=s||this.currentDepth||1,this.object=t,this.keys=Object.keys(t),this.createKeyStepper=i.createKeyStepper||n}calcNewKey(t){return this.log("calcNewKey",{newKey:t}),this.lowerCase?t.toLowerCase():this.upperCase?t.toUpperCase():this.transformKeyFn&&isFunction(this.transformKeyFn)?this.transformKeyFn(t):t}doSteps(){this.newKey=this.calcNewKey(this.newKey),this.log("doSteps",{newKey:this.newKey,keys:this.keys});for(let t of this.keys)this.onKey(t);this.flattener.onStepsDone(this.currentDepth)}addKey(t){this.lvKeys=this.lvKeys||[],this.lvKeys.push(t)}onKey(t){this.flattener.onKey(t,this.currentDepth),this.addKey(t),this.doStep(t)}doStep(t){this.log("doStep",{key:t});this.createKeyStepper(t,{stepper:this,flattener:this.flattener}).step()}}t.exports={createStepper:function(t,{flattener:e,prev:s,currentDepth:r}){return new i(t,{flattener:e,prev:s,currentDepth:r})},Stepper:i};const{createKeyStepper:n}=s(3854)},2222:(t,e,s)=>{const{FlatKey:r,builtIn:i,flatten:n,createFlattener:o,Flattener:a,createStepper:h,Stepper:p,createKeyStepper:l,KeyStepper:c}=s(2671),{leaf:u,Logger:y}=s(7733);t.exports={leaf:u,Logger:y,FlatKey:r,builtIn:i,flatten:n,createFlattener:o,Flattener:a,createStepper:h,Stepper:p,createKeyStepper:l,KeyStepper:c}},7733:(t,e,s)=>{const r=s(5139),i=s(2114);t.exports={isObject:function(t){return t===Object(t)},isBuffer:r,isArray:function(t){return Array.isArray(t)},isFunction:function(t){return"function"==typeof t},isDefined:function(t){return void 0!==t},isNumber:function(t){return"number"==typeof t},getkey:function(t){var e=Number(t);return isNaN(e)||-1!==t.indexOf(".")?t:e},Logger:i,leaf:function(t,e,s){const r=e.split("."),i=r.pop();return r.reduce(((t,e)=>(void 0===t[e]&&(t[e]={}),t[e])),t)[i]=s,t}}},2114:t=>{const{log:e}=console;function s(t){return`[${t}] `}const r=()=>!0;t.exports=class{constructor(t={}){this.logging=!!t.logging,this.logOnly=Array.isArray(t.logOnly)?t.logOnly:[t.logOnly],this.logWhen=(t.logWhen||r).bind(this);const e=t.logger||this.logger;e&&(this.log=(e.log||this.log).bind(this),this.objLog=(e.objLog||this.objLog).bind(this)),this.logObj=this.objLog.bind(this)}get shouldLogName(){return!!(this.logOnly.indexOf(this.name)>=0||0===this.logOnly.length)}get shouldLog(){return this.shouldLogName&&this.logging&&this.logWhen(this)}get name(){return this.constructor.name}log(...t){this.shouldLog&&function(t,...r){e(s(t),...r)}(this.name,...t)}objLog(...t){this.shouldLog&&function(t,r,i,...n){e(s(t),r,JSON.stringify(i,null,2),n)}(this.name,...t)}}},5139:t=>{t.exports=function(t){return null!=t&&null!=t.constructor&&"function"==typeof t.constructor.isBuffer&&t.constructor.isBuffer(t)}},967:(t,e,s)=>{"use strict";s.r(e),s.d(e,{default:()=>n});var r=s(2222);const i={props:{field:{},parent:{},attribute:{},label:{}},computed:{flattened:function(){return(0,r.flatten)(this.parent)}}};const n=(0,s(1900).Z)(i,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"form-group"},[s("ui-label",[t._v(t._s(t.field.name))]),t._v(" "),s("div",[t._v(t._s(t.flattened[t.attribute]))]),t._v(" "),s("input",{attrs:{type:"hidden"},domProps:{value:t.flattened[t.attribute]}})],1)}),[],!1,null,null,null).exports},1900:(t,e,s)=>{"use strict";function r(t,e,s,r,i,n,o,a){var h,p="function"==typeof t?t.options:t;if(e&&(p.render=e,p.staticRenderFns=s,p._compiled=!0),r&&(p.functional=!0),n&&(p._scopeId="data-v-"+n),o?(h=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),i&&i.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(o)},p._ssrRegister=h):i&&(h=a?function(){i.call(this,(p.functional?this.parent:this).$root.$options.shadowRoot)}:i),h)if(p.functional){p._injectStyles=h;var l=p.render;p.render=function(t,e){return h.call(e),l(t,e)}}else{var c=p.beforeCreate;p.beforeCreate=c?[].concat(c,h):[h]}return{exports:t,options:p}}s.d(e,{Z:()=>r})}}]);